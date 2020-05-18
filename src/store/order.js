import firebase from "firebase/app";

export default {
  actions: {
    async createOrder({ commit, dispatch }, data) {
      try {
        const uid = await dispatch("getUid");
        await firebase
          .database()
          .ref(`/users/${uid}/order`)
          .push(data);
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async fetchOrder({ commit, dispatch }) {
      try {
        const uid = await dispatch("getUid");
        const orders =
          (
            await firebase
              .database()
              .ref(`/users/${uid}/order`)
              .once("value")
          ).val() || {};

        return Object.keys(orders).map((key) => ({
          ...orders[key],
          id: key,
        }));
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async fetchOrderById({ commit, dispatch }, id) {
      try {
        const uid = await dispatch("getUid");
        const order =
          (
            await firebase
              .database()
              .ref(`/users/${uid}/order`)
              .child(id)
              .once("value")
          ).val() || {};
        return { ...order, id };
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async deleteOrder({ commit, dispatch }, id) {
      try {
        const uid = await dispatch("getUid");
        await firebase
          .database()
          .ref(`/users/${uid}/order`)
          .child(id)
          .remove();
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
  },
};
