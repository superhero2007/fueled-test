<template>
  <div class="app-header">
    <div
      class="container d-flex align-center justify-content-space-between h-100"
    >
      <div class="header-title">
        <span class="font-light">order</span>
        <span class="font-heavy bold">form</span>
      </div>
      <div class="cart-info">
        <span>Cart</span>
        <Badge v-bind:badge="carts" />
      </div>
    </div>
  </div>
</template>

<script>
import Badge from "./Badge.vue";

export default {
  name: "app-header",
  components: {
    Badge
  },
  data: () => {
    return {
      carts: 3
    };
  }
};
</script>

<style scoped>
.app-header {
  background-color: #ae0000;
  height: 69.5px;
}

.header-title {
  text-transform: uppercase;
  font-size: 1.1rem;
  letter-spacing: 2.1px;
}

.bold {
  letter-spacing: 2px;
}

.cart-info {
  display: flex;
  align-items: center;
  margin-right: -2px;
  margin-top: 1px;
}

.cart-info span {
  font-family: SFLight, sans-serif;
  letter-spacing: 0.2px;
}
</style>
