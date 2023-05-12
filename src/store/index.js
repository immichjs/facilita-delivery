import "vue3-toastify/dist/index.css";
import { createStore } from "vuex";

export default createStore({
  state: {
    checkoutItems: [],
  },
  getters: {
    checkoutItems: (state) => state.checkoutItems,
  },
  mutations: {
    addItem(state, payload) {
      const itemExists = state.checkoutItems.findIndex(
        (item) => item.id === payload.id
      );

      if (itemExists >= 0) {
        if (state.checkoutItems[itemExists].quantity >= 15) {
          return;
        }

        state.checkoutItems[itemExists].quantity++;
        return;
      }

      state.checkoutItems.push(payload);
    },
    removeItem(state, payload) {
      state.checkoutItems.splice(payload, 1);
    },
    clearCart(state) {
      state.checkoutItems = [];
    },
  },
  actions: {},
  modules: {},
});
