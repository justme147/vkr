<template>
  <div>
    <div class="page-title">
      <h3>Новая позиция</h3>
    </div>
    <section>
      <Loader v-if="loading" />
      <div class="row" v-else>
        <CreatePosition
          :categories="categories"
          :subcategories="subById"
          :key="Date.now()"
          @updateSelect="updateSelect"
        />
        <NewCategory
          @created="addNewCategory"
          @createdSub="addNewSubCategory"
          :categories="categories"
          :key="Date.now() + 1"
        />
      </div>
    </section>
  </div>
</template>

<script>
import NewCategory from "./NewCategory";
import CreatePosition from "./CreatePosition";
export default {
  components: { NewCategory, CreatePosition },
  data() {
    return {
      categories: [],
      subcategories: [],
      subById: [],
      loading: true
    };
  },
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");
    this.subcategories = await this.$store.dispatch("fetchSubCategories");
    console.log(this.categories);
    console.log(this.subcategories);
    if (this.subcategories.length) {
      this.subById = this.subcategories.filter(
        item => item.categoryId === this.categories[0].id
      );
    }

    this.loading = false;
  },
  methods: {
    updateSelect(id) {
      this.subById = this.subcategories.filter(item => item.categoryId === id);
    },
    addNewCategory(category) {
      this.categories.push(category);
    },
    addNewSubCategory(subcategories) {
      this.subcategories.push(subcategories);
    }
  }
};
</script>

<style lang="scss">
.row {
  display: flex;
  justify-content: space-between;
}
</style>
