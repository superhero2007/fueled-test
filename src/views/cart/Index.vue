<template>
  <div class="cart">
    <Header v-bind:carts="this.$store.getters.items.length" />
    <div class="content">
      <div class="container">
        <div class="top d-flex justify-content-space-between align-center">
          <span class="title">{{ title }}</span>
          <button class="btn btn-dark small" v-on:click="checkout">
            <div class="btn-text">
              Home
              <img
                class="symbol"
                src="../../assets/image/arrow-right.png"
                alt="arrow-icon"
              />
              Checkout
            </div>
          </button>
        </div>

        <ProductTable />

        <div class="bottom d-flex flex-wrap justify-content-space-between">
          <div class="additional-comments">
            <span>Additional Comments</span>
            <div class="comments"></div>
          </div>
          <div class="delivery-info">
            <span>Delivery Info</span>
            <div class="description">
              All orders will be sent by Special Delivery, which will be insured
              and will need to be signed for.<br />
              Allow 4-6 weeks for delivery.
            </div>
          </div>
          <div class="right-end d-flex flex-direction-column align-center">
            <ul class="pricing-table">
              <li>
                <span class="label font-light">Sub Total</span>
                <span class="price font-bold">
                  ${{ formatPrice(totalPrice) }}
                </span>
              </li>
              <li>
                <span class="label font-light">Tax</span>
                <span class="price font-bold">${{ tax }}</span>
              </li>
              <li class="color-black total">
                <span class="label font-light">Total</span>
                <span class="price font-bold"
                  >${{ formatPrice(totalPrice) }}
                </span>
              </li>
            </ul>
            <div class="ctas d-flex align-center flex-direction-column">
              <button class="btn btn-red large" v-on:click="checkout">
                Checkout
              </button>
              <span class="next-btn">
                or
                <button class="btn underline">Continue Shopping</button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../../components/Header.vue";
import ProductTable from "./components/ProductTable.vue";
import numeral from "numeral";
import itemsApi from "../../services/api/Items.js";

export default {
  name: "Cart",
  components: {
    Header,
    ProductTable
  },
  data: () => {
    return {
      title: "Your Cart",
      tax: 0
    };
  },
  computed: {
    totalPrice() {
      let total = 0;
      this.$store.getters.items.map(
        item => (total += item.price * item.quantity)
      );
      return total;
    }
  },
  methods: {
    formatPrice(price) {
      return numeral(price.toString()).format("0,0[.]00");
    },
    checkout() {
      itemsApi
        .setItems(this.$store.getters.items)
        .then(res => console.log(res.msg));
    }
  }
};
</script>

<style scoped>
.cart .content {
  padding-top: 65px;
  background-color: #1b1b1b;
}

.cart .top .title {
  font-size: 28px;
}

.cart .top .symbol {
  margin-bottom: 1.5px;
  margin-right: 0.5px;
  margin-left: -0.5px;
}

.cart .top .btn {
  margin-top: -1px;
  margin-right: -0.5px;
}

.cart .top .btn-text {
  letter-spacing: 0.5px;
  line-height: 49px;
}

.cart .bottom {
  padding: 38.5px 0 98px;
}

.cart .bottom .additional-comments {
  max-width: 418px;
  flex: 1;
}

.cart .bottom .additional-comments .comments {
  background-color: #000000;
  height: 188px;
  margin: 11px 0 0 -0.5px;
  border-radius: 6px;
}

.cart .bottom .delivery-info {
  max-width: 395px;
  flex: 1;
  margin: 0 30px;
  padding-left: 1px;
}

.cart .bottom .delivery-info .description {
  font-family: SFLight, sans-serif;
  color: #a4a4a4;
  margin-top: 15.5px;
  line-height: 22px;
  letter-spacing: 0.12px;
  padding-right: 7px;
}

.cart .bottom .right-end {
  max-width: 305px;
  flex: 1;
}

.cart .bottom .right-end .pricing-table {
  margin: -5px 0 39px;
  width: 100%;
  padding: 0 2px;
}

.cart .bottom .pricing-table li {
  list-style: none;
  display: flex;
  justify-content: space-between;
  padding: 5px 6px 6px 5px;
  border-radius: 6px;
}

.cart .bottom .pricing-table li.total {
  margin: 3px -4px 4px -2.5px;
  padding: 6.5px 10px 7px 7.5px;
  line-height: 18px;
}

.cart .bottom .pricing-table .label {
  letter-spacing: 0.1px;
}

.cart .bottom .ctas .next-btn {
  margin-top: 18px;
  font-size: 14px;
  font-family: SFLight, sans-serif;
}

.cart .bottom .ctas .next-btn .btn {
  font-family: SFLight, sans-serif;
  letter-spacing: 0.4px;
  line-height: 13px;
}

@media (max-width: 768px) {
  .cart .bottom .additional-comments {
    width: 100%;
    max-width: none;
    flex: none;
    margin-bottom: 30px;
  }

  .cart .bottom .delivery-info {
    margin: 0;
  }
}

@media (max-width: 576px) {
  .cart .bottom .delivery-info {
    width: 100%;
    max-width: none;
    flex: none;
  }

  .cart .bottom .right-end {
    margin: 30px 0;
    max-width: none;
    flex: none;
    width: 100%;
  }
}
</style>
