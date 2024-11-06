<template>
  <div v-if="product" class="product">
  <ul class="images" v-if="product.images">
    <li v-for="(image,index) in product.images" :key="index">
      <img :src="image.src" :alt="image.title">
    </li>
  </ul>
  <div class="info">
    <h1 class="title">{{ product.name }}</h1>
    <p class="price">{{ product.price | priceFormat}}</p>
    <p class="description">{{ product.description }}</p>
    <transition mode="out-in" v-if="product.sold === 'false'">
      <button class="btn" v-if="!buyNow" @click="buyNow = true">Add to basket</button>
      <BuyProduct v-else :product="product"/>
    </transition>
    <button v-else class="btn" disabled>Out of stock.</button>
  </div>
  </div>
</template>
<script>

import BuyProduct from '@/components/BuyProduct.vue'
import { api } from '@/services/services.js'

export default  {
  name: "ProductView",
  components: {
    BuyProduct
  },
  props: ["id"],
  data() {
    return {
      product: null,
      buyNow: false
    }
  },
  methods: {
    getProduct() {
      api.get(`/product/${this.id}`).then(response => 
        this.product = response.data
    )},
  },
  created() {
    this.getProduct()
  }
}
</script>
<style scoped>
.product {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
  max-width: 900px;
  padding: 60px 20px;
  margin: 0 auto;
}

.price {
  color: #e80;
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 40px;
}

.images {
  grid-row: 1 / 3;
}

.info {
  position: sticky;
  top: 20px;
}

.description {
  font-size: 1.2rem;
}

img {
  margin-bottom: 30px;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.2);
  border-radius: 4px;
}

.btn {
  margin-top: 60px;
  width: 200px;
}

@media screen and (max-width: 500px) {
  .product {
    grid-template-columns: 1fr;
  }
  .images {
    grid-row: 2;
  }
  .info {
    position: initial;
  }
}
</style>