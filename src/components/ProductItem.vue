<template>
  <div class="product" v-if="product">
    <router-link class="product-img" :to="{name: 'product' , params: { id:product.id }}">
      <img v-if="product.images" :src="product.images[0].src" :alt="product.images[0].title">
      <p>See image</p>
    </router-link>
    <div class="info">
      <p class="price">{{ product.price | priceFormat }}</p>
      <h2 class="title">{{ product.name }}</h2>
      <slot></slot>
    </div>
  </div>
</template>
<script>

export default {
  name: "ProductItem",
  props: ["product"]
}
</script>
<style scoped>
.product {
  display: grid;
  grid-template-columns: minmax(100px, 200px) 1fr;
  grid-gap: 20px;
  margin-bottom: 40px;
  position: relative;
}

@media screen and (max-width: 500px) {
  .product {
    grid-template-columns: 1fr;
    grid-gap: 10px;
  }
}

.info {
  align-self: end;
}

.product-img {
  border-radius: 4px;
  overflow: hidden;
  height: 100px;
}
</style>