<template>
  <section class="products-container">
    <transition mode="out-in">
      <div v-if="products && products.length > 0" class="products" key="products">
        <div class="product" v-for="(product,index) in products" :key="index">
          <router-link :to="{name: 'product', params: {id: product.id}}">
            <img v-if="product.images" :src="product.images[0].src" :alt="product.images[0].title">
            <p class="price">{{ product.price | priceFormat }}</p>
            <h2 class="title">{{ product.name }}</h2>
            <p class="description">{{ product.description }}</p>
          </router-link>
        </div>
        <PaginationComponent :productsTotal="productsTotal" :productsPerPage="productsPerPage"/>
      </div>
      <div v-else-if="products && products.length === 0">
        <p>Item not found. Try anoter item.</p>
      </div>
      <div v-else class="no-results">
      <LoadingComponent key="loading"/>
      </div>
    </transition>
  </section>
</template>
<script>

import { api } from '@/services/services.js'
import { serialize } from '@/helpers/helpers.js'
import PaginationComponent from './PaginationComponent.vue'
import LoadingComponent from './LoadingComponent.vue'

export default  {
  name: "ProductsList",
  components: {
    PaginationComponent,
    LoadingComponent
  },
    data() {
      return {
        products: null,
        productsPerPage: 9,
        productsTotal: ""
      }
    },
    computed: {
      url() {
        const query = serialize(this.$route.query);
        return `/product/?_limit=${this.productsPerPage}${query}`   
      }
    },
    methods: {
      getProducts() {
        setTimeout(() => {
          this.products = null
          api.get(this.url).then(response => 
        {
          this.productsTotal = Number(response.headers["x-total-count"])
          this.products = response.data
        })
        },1500)
      }
    },
    watch: {
      url() {
        this.getProducts();
      }
    },
    created() {
      this.getProducts()
    },
  }
</script>
<style scoped>
.products-container {
  max-width: 1000px;
  margin: 0 auto;
}

.products {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
  margin: 30px;
}

@media screen and (max-width: 500px) {
  .products {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
    margin: 10px;
  }
}

.product {
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  padding: 10px;
  background: #fff;
  border-radius: 4px;
  transition: all 0.2s;
}

.product:hover {
  box-shadow: 0 6px 12px rgba(30, 60, 90, 0.2);
  transform: scale(1.1);
  position: relative;
  z-index: 1;
}

.product img {
  border-radius: 4px;
  margin-bottom: 20px;
}

.title {
  margin-bottom: 10px;
}

.price {
  color: #e80;
  font-weight: bold;
}

.no-results {
  text-align: center;
}
</style>
