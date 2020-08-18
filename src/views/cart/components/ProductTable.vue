<template>
  <div class="product-table">
    <div class="thead d-flex">
      <div
          v-for="(field, index) of fields"
          class="th"
          :class="'col-' + index"
          :key="index"
      >
        <span class="th-text" v-if="field !== 'Image'">
          {{ field }}
        </span>
      </div>
    </div>
    <div class="tbody">
      <div v-for="(item, index) of items" class="tr d-flex" :key="index">
        <div class="td col-0 d-flex">
          <img class="item-image" :src="item.image" alt="product-image" />
        </div>
        <div class="td col-1">
          <span class="item-name">{{ item.name }}</span><br/>
          <span class="item-id">{{ item.id }}</span>
        </div>
        <div class="td col-2">
          <input type="number" v-if="editingRow === index" v-model="price" />
          <span class="item-price" v-else>${{ formatPrice(item.price) }}</span>
        </div>
        <div class="td col-3 d-flex align-center item-quantity">
          <input type="number" v-if="editingRow === index" v-model="quantity" />
          <div
              v-else
              class="notification d-flex justify-content-center align-center"
          >
            <span>{{ item.quantity }}</span>
          </div>
          <a
              class="btn underline"
              v-if="editingRow === index"
              v-on:click="updateItem"
          >
            done
          </a>
          <a v-else class="btn underline" v-on:click="editItem(index)">
            Update
          </a>
        </div>
        <div class="td col-4">
          <button class="btn btn-close" v-on:click="deleteItem(item.id)">
            ⨉
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import numeral from "numeral";
import itemsApi from "../../../services/api/Items";

export default {
  name: "ProductTable",
  data: function() {
    return {
      updatedItem: {
        price: 0,
        quantity: 0
      },
      fields: ["Image", "Product Name", "Price", "Quantity", "Remove"]
    };
  },
  async mounted() {
    this.items = await this.getItems();
    this.editingRow = -1;
  },
  methods: {
    formatPrice(price) {
      return numeral(price.toString()).format("0,0[.]00");
    },
    updateItem() {
      this.$store.commit("updateItems", {
        ...this.items[this.editingRow],
        price: this.validation(this.updatedItem.price),
        quantity: this.validation(this.updatedItem.quantity)
      });
      this.$store.commit("setEditingRow", -1);
    },
    editItem(id) {
      this.updatedItem.price = this.items[id].price;
      this.updatedItem.quantity = this.items[id].quantity;
      this.$store.commit("setEditingRow", id);
    },
    deleteItem(id) {
      this.$store.commit("deleteItem", id);
    },
    validation(value) {
      if (value.length === 0 || isNaN(value)) value = 0;
      return value;
    },
    getItems() {
      return itemsApi
          .getItems()
          .then(res => {
            this.$store.commit("setItems", res.data);
            return res.data;
          })
          .catch(err => console.log(err));
    }
  },
  computed: {
    items: {
      get: function() {
        return this.$store.getters.items;
      },
      set: function(val) {
        return val;
      }
    },
    editingRow: {
      get: function() {
        return this.$store.getters.editingRow;
      },
      set: function(val) {
        return val;
      }
    },
    price: {
      get: function() {
        return this.items[this.$store.getters.editingRow].price;
      },
      set: function(price) {
        this.updatedItem.price = parseFloat(price);
      }
    },
    quantity: {
      get: function() {
        return this.items[this.$store.getters.editingRow].quantity;
      },
      set: function(quantity) {
        this.updatedItem.quantity = parseInt(quantity);
      }
    }
  }
};
</script>

<style scoped>
.product-table {
  margin-top: 63.5px;
  margin-left: -0.5px;
}

.product-table input {
  font-size: 20px;
  width: 160px;
}

.product-table .thead {
  min-width: 768px;
  background-color: #0b0b0b;
  padding: 12.5px 0;
  border-radius: 5px;
  line-height: 21px;
  letter-spacing: 0.1px;
  margin-right: -0.5px;
}

.product-table .thead .th-text {
  font-family: SFLight, sans-serif;
  line-height: 20px;
}

.product-table .tbody {
  min-width: 768px;
}

.product-table .tr {
  border-radius: 5px;
  align-items: center;
  padding-right: 25px;
}

.product-table .tr:nth-child(even) {
  background-color: #000000;
}

.product-table .tr:nth-child(even) .notification {
  background-color: #1b1b1b;
}

.product-table .tr:nth-child(odd) {
  padding: 29px 25px 32px 0;
}

.product-table .tr:nth-child(odd) .notification {
  background-color: #000000;
}

.product-table .tr .td,
.product-table .th {
  flex: 1;
}

.product-table .td.col-0,
.product-table .th.col-0 {
  max-width: 128.5px;
}

.product-table .td.col-1,
.product-table .th.col-1 {
  max-width: 365.5px;
}

.product-table .td.col-1 {
  margin: -7px 0 0 0;
}

.product-table .td.col-2,
.product-table .th.col-2 {
  max-width: 338px;
}

.product-table .td.col-3,
.product-table .th.col-3 {
  max-width: 413px;
}

.product-table .td.col-4,
.product-table .th.col-4 {
  padding-right: 20px;
  flex: 0;
}

.product-table .td.col-4 {
  margin-top: 2px;
  margin-left: 0.5px;
}

.product-table .tr .td .item-image {
  width: 104px;
  height: 104px;
}

.product-table .tr .td .item-name {
  font-size: 20px;
  line-height: 36px;
}

.product-table .tr .td .item-id {
  color: #a4a4a4;
  font-size: 16px;
  letter-spacing: 0;
}

.product-table .tr .td .item-price {
  font-size: 20px;
  letter-spacing: 0.1px;
  margin-left: -1px;
}

.product-table .tr .td .notification {
  padding: 0 18.5px;
  height: 45.5px;
  font-size: 20px;
  line-height: 1px;
  border-radius: 6px;
  margin: 0.5px 5px 0 0;
}

.product-table .tr .td.item-quantity input {
  width: 100px;
}

.product-table .tr .td.item-quantity .underline {
  font-family: SFLight, sans-serif;
  font-size: 14px;
  margin: 2px 0 0 5px;
}

@media (max-width: 768px) {
  .product-table {
    overflow-x: scroll;
  }
}
</style>
