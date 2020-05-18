<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Добавить категорию/подкатегорию</h4>
      </div>
      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input id="name" type="text" v-model="title" :disabled="agree" />
          <label for="name">Название категории</label>
        </div>

        <div class="input-field">
          <select ref="select" v-model="current">
            <option v-for="c in categories" :key="c.id" :value="c.id">{{c.title}}</option>
          </select>
          <label>Выберите категорию</label>
        </div>

        <div class="input-field">
          <input id="subname" type="text" v-model="subtitle" :disabled="!agree" />
          <label for="subname">Название подкатегории</label>
        </div>

        <!-- <p> -->
        <!-- <label>
            <input type="checkbox" v-model="agree" />
            <span>Добавить подкатегорию</span>
        </label>-->
        <div class="switch">
          <label>
            категория
            <input type="checkbox" v-model="agree" />
            <span class="lever"></span>
            подкатегория
          </label>
        </div>
        <!-- </p> -->

        <button class="btn waves-effect waves-light" type="submit">
          Создать
          <i class="material-icons right">add_circle_outline</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
// import { required } from "vuelidate/lib/validators";
export default {
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      title: "",
      subtitle: "",
      current: null,
      agree: false
    };
  },
  created() {
    const { id } = this.categories[0];
    this.current = id;
  },
  methods: {
    async submitHandler() {
      try {
        if (!this.agree) {
          const category = await this.$store.dispatch(
            "createCategory",
            this.title
          );
          const subcategory = await this.$store.dispatch("createSubCategory", {
            title: "Без подкатегории",
            categoryId: category.id
          });
          this.title = "";
          // this.$v.$reset();
          this.$message("Категория успешно создана");
          this.$emit("created", category);
        } else {
          const subcategoryData = {
            categoryId: this.current,
            title: this.subtitle
          };

          const subcategory = await this.$store.dispatch(
            "createSubCategory",
            subcategoryData
          );
          this.subtitle = "";
          this.$message("Подкатегория успешно создана");
          this.$emit("createdSub", subcategory);
        }
      } catch (e) {}
    }
  },
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select);
    M.updateTextFields();
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  }
};
</script>

<style>
.switch {
  margin-bottom: 25px;
}
</style>
