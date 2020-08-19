import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    items: []
  },
  mutations: {
    setItems(state, items) {
      state.items = items;
    },
    updateItems(state, updatedItem) {
      state.items = state.items.map(item => {
        if (updatedItem.id === item.id) {
          return updatedItem;
        }
        return item;
      });
    },
    deleteItem(state, id) {
      state.items = state.items.filter(item => item.id !== id);
    }
  },
  getters: {
    items: state => state.items
  }
});
