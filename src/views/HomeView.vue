<template>
  <section>
    <h1>💸 Buy or Sell 💸</h1>
    <ProductSearch />
    <ProductsList/>
  </section>
</template>

<script>
import ProductsList from '../components/ProductsList.vue'
import ProductSearch from '../components/ProductSearch.vue'

export default {
  name: 'HomeView',
  components: {
    ProductsList,
    ProductSearch
  }
}
</script>

<style scoped>

h1 {
  color: #87f;
  margin-top: 40px;
  font-size: 2rem;
  text-align: center;
}

</style>
