<template>
  <form>
    <div class="user" v-if="showLoginData">
      <label for="name">name</label>
      <input id="name" name="name" type="text" v-model="name">
      <label for="email">Email</label>
      <input id="email" name="email" type="email" v-model="email">
      <label for="password">password</label>
      <input id="password" name="password" type="password" v-model="password">
    </div>
    <label for="postcode">postcode</label>
    <input id="postcode" name="postcode" type="text" v-model="postcode">
    <label for="address">address</label>
    <input id="address" name="address" type="text" v-model="address">
    <label for="number">number</label>
    <input id="number" name="number" type="text" v-model="number">
    <label for="city">city</label>
    <input id="city" name="city" type="text" v-model="city">
    <label for="county">county</label>
    <input id="county" name="county" type="text" v-model="county">
    <div class="button">
      <slot></slot>
    </div>
  </form>
</template>
<script>

import { mapFields } from "@/helpers/helpers.js"
import { postcodeLookup } from "@/services/services.js"

export default  {
  data() {
    return {
      error: false, // Initialize error flag to false
    }
  },
  name: "UserForm",
  computed: { 
    ...mapFields({
      fields: ["name" , "email", "password", "postcode", "address", "number", "city", "county"],
      base: "user",
      mutation: "UPDATE_USER"
    }),
    showLoginData() {
      return (!this.$store.state.login || this.$route.name === 'account')
    }
  },
  methods: {
    async getAddress(postcode) {
      try {
        await postcodeLookup(postcode).then(response => {
          const result = response.data.result;
          this.address = result.admin_ward
          this.number = result.incode
          this.city = result.parliamentary_constituency
          this.county = result.pfa
      })
      } catch (error) {
        this.error = true;
      }
    }
  },
  watch: {
    postcode: function() {
      this.getAddress(this.postcode)
    }
  },
}
</script>
<style scoped>
form,
.user {
  display: grid;
  grid-template-columns: 80px 1fr;
  align-items: center;
}

.user {
  grid-column: 1 / 3;
}

.button {
  grid-column: 2;
  margin-top: 10px;
}
</style>
