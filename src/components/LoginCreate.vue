<template>
  <section>
    <h2>Create account</h2>
    <ErrorComponent :errors="errors"/>
    <transition mode="out-in">
      <button v-if="!create" class="btn create" @click="create = true">Register</button>
      <UserForm v-else>
        <button class="btn btn-form" @click.prevent="createUser">Create new user</button>
      </UserForm>
    </transition>
  </section>
</template>

<script>

import UserForm from "@/components/UserForm.vue"

export default {
  name: "LoginCreate",
  components: {
    UserForm
  },
  data() {
    return {
      create: false,
      errors: []
    }
  },
  methods: {
    async createUser() {
      this.errors = []
      try {
        await this.$store.dispatch("createUser", this.$store.state.user)
        await this.$store.dispatch("loginUser", this.$store.state.user)
        await this.$store.dispatch("getUser")
        this.$router.push({name: "user"})
      } catch(e) {
        this.errors.push(e.response.data.message)
      }
    }
  }
}
</script>

<style scoped>
h2 {
  text-align: center;
  margin-top: 40px;
  margin-bottom: 10px;
}

.btn {
  width: 100%;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}

.btn-form {
  max-width: 100%;
}
</style>
