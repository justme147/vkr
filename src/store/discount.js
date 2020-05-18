import firebase from "firebase/app";

export default {
  actions: {
    async createDiscount({ commit, dispatch }, data) {
      try {
        const uid = await dispatch("getUid");
        const discount = await firebase
          .database()
          .ref(`/users/${uid}/discount`)
          .push(data);
        return { ...data, id: discount.key };
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async fetchDiscount({ commit, dispatch }) {
      try {
        const uid = await dispatch("getUid");
        const discounts =
          (
            await firebase
              .database()
              .ref(`/users/${uid}/discount`)
              .once("value")
          ).val() || {};

        return Object.keys(discounts).map((key) => ({
          ...discounts[key],
          id: key,
        }));
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async deleteDiscount({ commit, dispatch }, id) {
      try {
        const uid = await dispatch("getUid");
        await firebase
          .database()
          .ref(`/users/${uid}/discount`)
          .child(id)
          .remove();
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
  },
};
