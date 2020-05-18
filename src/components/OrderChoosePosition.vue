<template>
  <div>
    <Loader v-if="loading" />
    <section v-else>
      <div class="order">
        <div class="order-categories">
          <p v-if="!categories.length">
            Категорий пока нет, нажмите чтобы
            <router-link to="/new_position">создать.</router-link>
          </p>
          <span
            v-else
            v-for="c in categories"
            :key="c.id"
            class="order-categories__item"
            @click="catClick(c.id)"
            :class="{active : catId === c.id}"
          >{{ c.title }}</span>
        </div>
        <hr />
        <div class="order-subcategories">
          <p v-if="!subcategoriesbyId.length">
            В данной категории подкатегорий нет, нажмите чтобы
            <router-link to="/new_position">создать.</router-link>
          </p>
          <span
            v-else
            v-for="s in subcategoriesbyId"
            :key="s.id"
            class="order-subcategories__item"
            @click="subCatClick(s.id)"
            :class="{active : subcatId === s.id}"
          >{{ s.title }}</span>
        </div>
        <hr class="mb-15" />
        <div class="order-positions">
          <p v-if="!positionsbyId.length">
            В данной подкатегории позиций нет, нажмите чтобы
            <router-link to="/new_position">создать.</router-link>
          </p>
          <div
            v-else
            class="order-positions__item"
            v-for="p in positionsbyId"
            :key="p.id"
            @click="positionClick(p)"
          >
            <p>{{ p.title }}</p>
            <p>{{ p.price }} руб</p>
          </div>
        </div>
        <div class="order-descr">
          <h4 class="order-descr__title">Стоимость: {{orderPrice}} руб</h4>
          <router-link
            to="/new_order/info"
            class="btn waves-effect waves-light btn-rotate"
            v-if="orderPrice !== 0"
          >
            <i class="material-icons">arrow_forward</i>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      categories: [],
      catId: null,
      subcategories: [],
      subcatId: null,
      subcategoriesbyId: [],
      positions: [],
      positionsbyId: [],
      count: "",
      order: this.$attrs.order
    };
  },
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");

    if (this.categories.length) {
      this.catId = this.categories[0].id;
    }

    this.subcategories = await this.$store.dispatch("fetchSubCategories");

    this.positions = await this.$store.dispatch("fetchPositions");

    this.subcategoriesbyId = this.subcategories.filter(
      item => item.categoryId === this.catId
    );

    if (this.subcategoriesbyId.length && this.subcategoriesbyId.length === 1) {
      this.subcatId = this.subcategoriesbyId[0].id;
    } else {
      this.subcatId = this.subcategoriesbyId[1].id;
    }

    this.positionsbyId = this.positions.filter(
      item =>
        item.categoryId === this.catId && item.subCategoryId === this.subcatId
    );

    this.loading = false;
  },
  methods: {
    catClick(id) {
      this.catId = id;
      this.subcategoriesbyId = this.subcategories.filter(
        item => item.categoryId === id
      );
      this.subcatId =
        this.subcategoriesbyId.length && this.subcategoriesbyId.length === 1
          ? this.subcategoriesbyId[0].id
          : this.subcategoriesbyId[1].id;
      this.positionsbyId = this.positions.filter(
        item => item.subCategoryId === this.subcatId
      );
    },
    subCatClick(id) {
      this.subcatId = id;
      this.positionsbyId = this.positions.filter(
        item => item.subCategoryId === id
      );
    },
    positionClick(item) {
      // const price = this.orderPrice;
      this.order.push(item);
      // this.$root.$emit("updateOrder", this.order);
      this.$emit("update", this.order);
      this.$emit("updatePrice", this.orderPrice, this.orderExpenses);
      // console.log({ ...this.order });
    }
  },
  computed: {
    orderPrice() {
      const result = this.order.reduce((sum, current) => {
        return sum + +current.price;
      }, 0);
      return result;
    },
    orderExpenses() {
      const result = this.order.reduce((sum, current) => {
        return sum + +current.expenses;
      }, 0);
      return result;
    }
  }
};
</script>

<style lang="scss">
.mb-15 {
  margin-bottom: 15px;
}

.btn-rotate {
  // transform: rotate(180deg);

  & i {
    font-size: 24px;
  }
}

.order {
  .active {
    border-color: #0ec261;
  }
  &-categories {
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-between;

    &__item {
      min-width: 120px;
      padding: 10px;
      margin: 0 10px 10px;
      text-align: center;
      // background-color: #0ec261;
      border: 1px solid #eee;
      cursor: pointer;

      &:hover {
        border-color: #999;
      }
    }
  }

  &-subcategories {
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-between;

    &__item {
      min-width: 120px;
      padding: 10px;
      margin: 10px;
      text-align: center;
      // background-color: #0da755;
      border: 1px solid #eee;
      cursor: pointer;

      &:hover {
        border-color: #999;
      }
    }
  }

  &-positions {
    display: flex;
    flex-wrap: wrap;

    &__item {
      width: 250px;
      padding: 20px 0;
      border: 1px solid #eee;
      cursor: pointer;
      text-align: center;

      & p {
        margin: 0 0 10px;

        &:last-child {
          margin: 0;
        }
      }

      &:hover {
        border-color: #999;
      }

      &:active {
        border-color: #0ec261;
      }
    }
  }

  &-descr {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 15px;

    &__title {
      margin-bottom: 0;
    }
  }
}
</style>