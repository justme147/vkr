<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Добавить позицию</h4>
      </div>
      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <select ref="select" v-model="current" @change="changeHandler">
            <option v-for="c in categories" :key="c.id" :value="c.id">{{ c.title }}</option>
          </select>
          <label>Выберите категорию</label>
        </div>
        <div class="input-field">
          <select ref="subselect" v-model="currentSub">
            <option v-for="s in subcategories" :key="s.id" :value="s.id">{{ s.title }}</option>
          </select>
          <label>Выберите подкатегорию</label>
        </div>
        <div class="input-field">
          <input
            id="nameCreate"
            type="text"
            v-model="title"
            :class="{ invalid: $v.title.$dirty && !$v.title.required }"
          />
          <label for="nameCreate">Название позиции</label>
          <span
            class="helper-text invalid"
            v-if="$v.title.$dirty && !$v.title.required"
          >Введите название позиции</span>
        </div>

        <div class="input-field">
          <input
            id="price"
            type="text"
            v-model="price"
            :class="{
              invalid:
                ($v.price.$dirty && !$v.price.required) ||
                ($v.price.$dirty && !v.price.minValue),
            }"
          />
          <label for="price">Цена</label>
          <span
            class="helper-text invalid"
            v-if="$v.price.$dirty && !$v.price.required"
          >Введите цену</span>
          <span class="helper-text invalid" v-else-if="$v.price.$dirty && !$v.title.minValue">
            Цена не должна быть меньше
            {{ $v.price.$params.minValue.min }}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Добавить
          <i class="material-icons right">add_circle_outline</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from "vuelidate/lib/validators";
export default {
  props: {
    categories: {
      type: Array,
      required: true
    },
    subcategories: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      select: null,
      subselect: null,
      current: null,
      currentSub: null,
      title: "",
      price: null
    };
  },
  validations: {
    title: { required },
    price: { required, minValue: minValue(0) }
  },
  created() {
    this.current = this.subcategories[0].categoryId;
    this.currentSub = this.subcategories[0].id;
  },
  methods: {
    changeHandler() {
      this.$emit("updateSelect", this.current);
    },
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      try {
        await this.$store.dispatch("createPosition", {
          categoryId: this.current,
          subCategoryId: this.currentSub,
          title: this.title,
          price: this.price
        });
        this.title = "";
        this.price = "";
        this.$message("Позиция успешно создана");
      } catch (e) {}
    }
  },
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select);
    M.updateTextFields();
    this.subselect = M.FormSelect.init(this.$refs.subselect);
    M.updateTextFields();
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
    if (this.subselect && this.subselect.destroy) {
      this.subselect.destroy();
    }
  }
};
</script>

<style lang="scss"></style>
