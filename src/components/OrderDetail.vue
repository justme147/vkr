<template>
  <div>
    <div class="page-title">
      <h3>
        <router-link to="/order_list">
          <span class="navbar-left__arrow" title="К списку заказов">
            <i class="material-icons black-text">arrow_back</i>
          </span>
        </router-link>Информация о заказе
      </h3>
    </div>
    <Loader v-if="loading" />
    <section v-else-if="positions.length" class="detail__inner">
      <div class="detail__positions">
        <div class="detail__item" v-for="(pos, idx) in positions" :key="pos.id + idx">
          <p>
            <font>Категория:</font>
            {{ pos.categoryTitle }}
          </p>
          <p>
            <font>Подкатегория:</font>
            {{ pos.subCategoryTitle }}
          </p>
          <p>
            <font>Позиция:</font>
            {{ pos.title }}
          </p>
          <p>
            <font>Цена:</font>
            {{ pos.price }} руб
          </p>
        </div>
      </div>
      <div class="detail__info">
        <p>
          <font>Имя:</font>
          {{ order.name }}
        </p>
        <p>
          <font>Телефон:</font>
          {{ order.phone }}
        </p>
        <p>
          <font>Дата заказа:</font>
          {{ order.date | date('date') }}
        </p>
        <p>
          <font>Время заказа:</font>
          {{ order.date | date('time') }}
        </p>
        <p>
          <font>Адрес:</font>
          ул. {{ order.street + ' ' + order.house + ','}} кв. {{ order.appartment }}
        </p>
        <p>
          <font>Подъезд:</font>
          {{ order.porch }}
        </p>
        <p>
          <font>Этаж:</font>
          {{ order.floor }}
        </p>
        <p>
          <font>Общая стоимость:</font>
          {{ order.price + ' руб.' }}
        </p>
        <button class="btn waves-effect waves-light right mt" @click="deleteOrder">
          Отменить
          <i class="material-icons right">delete_forever</i>
        </button>
      </div>
    </section>
    <p class="error" v-else>Запись с id={{ $route.params.id }} не найдена</p>
  </div>
</template>

<script>
export default {
  name: "detail",
  data() {
    return {
      loading: true,
      order: null,
      positions: []
    };
  },
  async mounted() {
    const id = this.$route.params.id;
    this.order = await this.$store.dispatch("fetchOrderById", id);

    if (this.order.positions) {
      this.order.positions.map(async item => {
        const position = await this.$store.dispatch(
          "fetchPositionById",
          item.id
        );
        const category = await this.$store.dispatch(
          "fetchCategoryById",
          position.categoryId
        );
        const subcategory = await this.$store.dispatch(
          "fetchSubCategoryById",
          position.subCategoryId
        );

        this.positions.push({
          id: position.id,
          title: position.title,
          categoryTitle: category.title,
          subCategoryTitle: subcategory.title,
          price: item.price
        });
      });
    }

    console.log(this.positions);
    this.loading = false;
  },
  methods: {
    async deleteOrder() {
      try {
        await this.$store.dispatch("deleteOrder", this.$route.params.id);
        this.$message("Заказ успешно отменен");
        this.$router.push("/order_list");
      } catch (e) {}
    }
  }
};
</script>

<style lang="scss">
.error {
  font-weight: bold;
}
.mt {
  margin-top: 15px;
}
.detail {
  &__inner {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  &__positions {
    display: flex;
    flex-wrap: wrap;
  }

  &__item {
    padding: 10px 20px;
    border: 1px solid #263238;
    margin: 5px;
    min-width: 250px;

    & p {
      & font {
        font-weight: bold;
      }
    }
  }

  &__info {
    border-left: 1px solid #263238;
    padding: 10px 20px;
    min-width: 300px;
    // text-align: right;
    & p {
      & font {
        font-weight: bold;
      }
    }
  }
}
</style>