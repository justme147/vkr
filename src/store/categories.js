import firebase from "firebase/app";

export default {
  actions: {
    async createCategory({ commit, dispatch }, title) {
      try {
        const uid = await dispatch("getUid");
        const category = await firebase
          .database()
          .ref(`/users/${uid}/categories`)
          .push({ title });
        return { title, id: category.key };
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async createSubCategory({ commit, dispatch }, { title, categoryId }) {
      try {
        const uid = await dispatch("getUid");
        const subCategory = await firebase
          .database()
          .ref(`/users/${uid}/subcategories`)
          .push({ title, categoryId });
        return { title, categoryId, id: subCategory.key };
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async createPosition({ commit, dispatch }, data) {
      try {
        const uid = await dispatch("getUid");
        await firebase
          .database()
          .ref(`/users/${uid}/positions`)
          .push({ ...data });
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async fetchCategories({ commit, dispatch }) {
      try {
        const uid = await dispatch("getUid");
        const categories =
          (
            await firebase
              .database()
              .ref(`/users/${uid}/categories`)
              .once("value")
          ).val() || {};

        return Object.keys(categories).map((key) => ({
          ...categories[key],
          id: key,
        }));
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async fetchCategoryById({ commit, dispatch }, id) {
      try {
        const uid = await dispatch("getUid");
        const category =
          (
            await firebase
              .database()
              .ref(`/users/${uid}/categories`)
              .child(id)
              .once("value")
          ).val() || {};

        return { ...category, id };
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async fetchSubCategories({ commit, dispatch }) {
      try {
        const uid = await dispatch("getUid");
        const subcategories =
          (
            await firebase
              .database()
              .ref(`/users/${uid}/subcategories`)
              .once("value")
          ).val() || {};
        return Object.keys(subcategories).map((key) => ({
          ...subcategories[key],
          id: key,
        }));
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async fetchSubCategoryById({ commit, dispatch }, id) {
      try {
        const uid = await dispatch("getUid");
        const subcategory =
          (
            await firebase
              .database()
              .ref(`/users/${uid}/subcategories`)
              .child(id)
              .once("value")
          ).val() || {};
        return { ...subcategory, id };
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async fetchPositions({ commit, dispatch }) {
      try {
        const uid = await dispatch("getUid");
        const positions =
          (
            await firebase
              .database()
              .ref(`/users/${uid}/positions`)
              .once("value")
          ).val() || {};
        return Object.keys(positions).map((key) => ({
          ...positions[key],
          id: key,
        }));
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async fetchPositionById({ commit, dispatch }, id) {
      try {
        const uid = await dispatch("getUid");
        const position =
          (
            await firebase
              .database()
              .ref(`/users/${uid}/positions`)
              .child(id)
              .once("value")
          ).val() || {};
        return { ...position, id };
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async removePosition({ commit, dispatch }, id) {
      try {
        const uid = await dispatch("getUid");
        await firebase
          .database()
          .ref(`/users/${uid}/positions`)
          .child(id)
          .remove();
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
  },
};
