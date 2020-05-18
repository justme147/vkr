import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth";
import info from "./info";
import categories from "./categories";
import order from "./order";
import discount from "./discount";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    error: null,
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    cleareError(state) {
      state.error = null;
    },
  },
  getters: {
    error: (s) => s.error,
  },
  actions: {},
  modules: {
    auth,
    info,
    categories,
    order,
    discount,
  },
});
