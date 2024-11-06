<template>
  <section class="login">
    <h1>Login</h1>
    <form action="">
      <label for="email">Email</label>
      <input type="email" name="email" id="email" v-model="login.email">
      <label for="password">Password</label>
      <input type="password" name="password" id="password" v-model="login.password">
      <button class="btn" @click.prevent="loginAction">Login</button>
      <ErrorComponent :errors="errors"/>
    </form>
    <p class="lost">
      <a href="http://localhost/wp-login.php?action=lostpassword" target="_blank">Forgot your password? Click here.</a>
    </p>
    <LoginCreate />
  </section>
</template>

<script>

import LoginCreate from '../components/LoginCreate.vue'

export default {
  components: {
    LoginCreate
  },
  name: 'LoginView',
  data() {
    return {
      login: {
        email: "",
        password: ""
      },
      errors: []
    }
  },
  methods: {
    loginAction() {
      this.errors = []
      this.$store.dispatch("loginUser",this.login)
      .then(() => {
        this.$store.dispatch("getUser")
        this.$router.push({name: 'user'})
      }).catch(e => {
        this.errors.push(e.response.data.message)
      })
    }
  }
}
</script>

<style scoped>

.login {
  max-width: 500px;
  margin: 0 auto;
  padding: 0 20px;
}

h1 {
  text-align: center;
  font-size: 2rem;
  margin-top: 40px;
  color: #87f;
}

form {
  display: grid;
}

.btn {
  width: 100%;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}

.lost {
  text-align: center;
  margin: 20px auto 0 auto;
}

.lost a:hover {
  color: #87f;
  text-decoration: underline;
}

</style>
