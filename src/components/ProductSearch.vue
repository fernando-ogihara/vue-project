<template>
  <form>
    <input type="text" name="search" id="search" v-model="search" placeholder="Search...">
    <input type="submit" name="lookup" id="lookup" @click.prevent="findProduct">
  </form>
</template>
<script>

export default  {
    name: "ProductSearch",
    data() {
      return {
        search: ""
      }
    },
    methods: {
      findProduct() {
        this.$router.push({query: {q:this.search}})
      }
    },
    watch: {
      search(newSearchValue) {
      this.findProduct(newSearchValue);
    },
    }
  }
</script>
<style scoped>
form {
  max-width: 600px;
  margin: 30px auto 60px auto;
  position: relative;
  padding: 0 10px;
}

#search {
  width: 100%;
  padding: 20px;
  border: none;
}

#search:focus,
#search:hover {
  transform: scale(1.1);
}

#lookup {
  width: 62px;
  height: 62px;
  background: url("../assets/search.svg") no-repeat center center;
  text-indent: -150px;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 0px;
  right: 0px;
  box-shadow: none;
}
</style>