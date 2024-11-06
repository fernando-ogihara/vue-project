<template>
  <section class="user">
    <nav class="sidenav">
      <ul>
        <li>
          <router-link :to="{ name : 'user'}">Products</router-link>
        </li>
        <li>
          <router-link :to="{ name : 'buy'}">Buy</router-link>
        </li>
        <li>
          <router-link :to="{ name : 'sell'}">Sell</router-link>
        </li>
        <li>
          <router-link :to="{ name : 'account'}">Manage account</router-link>
        </li>
        <li>
          <button @click="logout">Logout</button>
        </li>
      </ul>
    </nav>
    <transition mode="out-in">
      <router-view></router-view>
    </transition>
  </section>
</template>

<script>

export default {
  name: "UserView",
  methods: {
    logout() {
      this.$store.dispatch("logout")
      this.$router.push("/login")
    }
  },
}
</script>

<style scoped>
.user {
  display: grid;
  grid-template-columns: minmax(140px, 200px) 1fr;
  max-width: 1100px;
  margin: 40px auto;
  grid-gap: 30px;
  padding: 20px;
}

nav {
  all:inherit
}

.sidenav a,
.sidenav button {
  padding: 10px;
  display: block;
  background: #f4f7fc;
  margin-bottom: 10px;
  border-radius: 4px;
}

.sidenav a.router-link-exact-active,
.sidenav a:hover,
.sidenav button:hover {
  background: #87f;
  color: #fff;
}

.sidenav button {
  border: none;
  width: 100%;
  font-size: 1rem;
  text-align: left;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  cursor: pointer;
}
</style>
