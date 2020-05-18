<template>
  <div>
    <div class="page-title">
      <h3>Список позиций</h3>
    </div>
    <Loader v-if="loading" />
    <section v-else-if="items">
      <table class="highlight">
        <thead>
          <tr>
            <th>#</th>
            <th @click="filterList" data-type="name">Название</th>
            <th @click="filterList" data-type="category">Категория</th>
            <th @click="filterList" data-type="subcategory">Подкатегория</th>
            <th @click="filterList" data-type="price">Цена</th>
            <th>Удалить</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(record, index) in items" :key="record.id">
            <td>{{ index + 1 }}</td>
            <td>{{ record.title }}</td>
            <td>{{ record.categoryName }}</td>
            <td>{{ record.subCategoryName }}</td>
            <td>{{ record.price }} руб</td>
            <td>
              <button class="btn-small btn" @click="deletePosition(record.id)">
                <i class="material-icons">delete_forever</i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <Paginate
        :page-count="pageCount"
        :click-handler="pageChangeHandler"
        :prev-text="'Назад'"
        :next-text="'Вперед'"
        :container-class="'pagination'"
        :page-class="'waves-effect'"
      />
    </section>
    <p v-else>
      Позиций пока нет, нажмите чтобы
      <router-link to="/new_position">создать</router-link>
    </p>
  </div>
</template>

<script>
import paginationMixin from "../mixins/pagination.mixin";
export default {
  mixins: [paginationMixin],
  data() {
    return {
      loading: true,
      positions: [],
      categories: [],
      subcategories: [],
      filter: true
    };
  },
  async mounted() {
    this.positions = await this.$store.dispatch("fetchPositions");
    this.categories = await this.$store.dispatch("fetchCategories");
    this.subcategories = await this.$store.dispatch("fetchSubCategories");

    this.setup(this.categories, this.subcategories);

    this.loading = false;
  },
  methods: {
    setup(categories, subcategories) {
      this.setUpPagination(
        this.positions.map(position => {
          return {
            ...position,
            categoryName: categories.find(c => c.id === position.categoryId)
              .title,
            subCategoryName: subcategories.find(
              s => s.id === position.subCategoryId
            ).title
          };
        })
      );
    },
    async deletePosition(id) {
      this.$store.dispatch("removePosition", id);

      this.positions = await this.$store.dispatch("fetchPositions");
      this.categories = await this.$store.dispatch("fetchCategories");
      this.subcategories = await this.$store.dispatch("fetchSubCategories");

      this.setup(this.categories, this.subcategories);
      this.$message("Позиция успешно удалена");
    },
    filterList(item) {
      const th = item.target.attributes["data-type"].value;
      this.positions = this.positions.sort((a, b) => {
        switch (th) {
          case "name":
            if (this.filter) {
              if (a.title > b.title) {
                return 1;
              }
              if (a.title < b.title) {
                return -1;
              }
              return 0;
            } else {
              if (a.title < b.title) {
                return 1;
              }
              if (a.title > b.title) {
                return -1;
              }
              return 0;
            }
            break;
          case "category":
            const categorynameA = this.categories.find(
              c => c.id === a.categoryId
            ).title;

            const categorynameB = this.categories.find(
              c => c.id === b.categoryId
            ).title;
            if (this.filter) {
              if (categorynameA > categorynameB) {
                return 1;
              }
              if (categorynameA < categorynameB) {
                return -1;
              }
              return 0;
            } else {
              if (categorynameA < categorynameB) {
                return 1;
              }
              if (categorynameA > categorynameB) {
                return -1;
              }
              return 0;
            }

            break;
          case "subcategory":
            const subcategorynameA = this.subcategories.find(
              c => c.id === a.subCategoryId
            ).title;

            const subcategorynameB = this.subcategories.find(
              c => c.id === b.subCategoryId
            ).title;
            if (this.filter) {
              if (subcategorynameA > subcategorynameB) {
                return 1;
              }
              if (subcategorynameA < subcategorynameB) {
                return -1;
              }
              return 0;
            } else {
              if (subcategorynameA < subcategorynameB) {
                return 1;
              }
              if (subcategorynameA > subcategorynameB) {
                return -1;
              }
              return 0;
            }

            break;
          case "price":
            if (this.filter) {
              if (+a.price > +b.price) {
                return 1;
              }
              if (+a.price < +b.price) {
                return -1;
              }
              return 0;
            } else {
              if (+a.price < +b.price) {
                return 1;
              }
              if (+a.price > +b.price) {
                return -1;
              }
              return 0;
            }

            break;
        }
      });
      this.filter = !this.filter;
      this.setup(this.categories, this.subcategories);
    }
  }
};
</script>

<style>
th {
  cursor: pointer;
}
</style>
