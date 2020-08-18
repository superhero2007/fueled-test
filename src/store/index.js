import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    items: [],
    editingRow: Number
  },
  mutations: {
    setItems(state, items) {
      state.items = items;
    },
    updateItems(state, item) {
      state.items = state.items.map((itm, index) => {
        if (index === state.editingRow) {
          return item;
        }
        return itm;
      });
    },
    deleteItem(state, id) {
      state.items = state.items.filter(item => item.id !== id);
    },
    setEditingRow(state, id) {
      state.editingRow = id;
    }
  },
  getters: {
    items: state => state.items,
    editingRow: state => state.editingRow
  }
});
