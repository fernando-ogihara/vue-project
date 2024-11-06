<template>
  <section>
    
    <UserForm>
      <button class="btn" @click.prevent="updateUser">Update user</button>
    </UserForm>
    <ErrorComponent :errors="errors"/>
  </section>
</template>

<script>

import UserForm from '@/components/UserForm.vue'
import { api } from '@/services/services.js';

export default {
  name: "UserAccount",
  components: {
    UserForm
  },
  data() {
    return {
      errors: []
    }
  },
  methods: {
    updateUser() {
      this.errors = [];
      api.put('/user',this.$store.state.user)
      .then(() => {
        this.$store.dispatch("getUser", this.$store.state.user.email);
        this.$router.push({name: "user"});
      }).catch((e) => {
        this.errors.push(e.response.data.message)
      })
    }
  },
}
</script>

<style scoped>

</style>
