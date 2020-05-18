<template>
  <div>
    <div class="page-title">
      <h3>Новый заказ</h3>
      <ul class="order-list">
        <router-link
          v-for="item in list"
          :key="item.id"
          tag="li"
          :to="item.path"
          active-class="active-link"
          :exact="item.exact"
          class="order-list__item"
        >{{ item.title }}</router-link>
      </ul>
    </div>
    <router-view
      :order="order"
      :info="info"
      :price="orderPrice"
      @update="updateOrder"
      @updateInfo="updateInfo"
      @updatePrice="updatePrice"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        { id: 1, title: "Позиции", path: "/new_order", exact: true },
        { id: 2, title: "Инфо", path: "/new_order/info" },
        { id: 3, title: "Подтверждение", path: "/new_order/accept" }
      ],
      order: [],
      info: {},
      orderPrice: 0
    };
  },
  methods: {
    updateOrder(item) {
      // this.order.push(item);
      this.order = item;
    },
    updatePrice(item) {
      this.orderPrice = item;
    },
    updateInfo(item) {
      this.info = item;
    }
  }
};
</script>

<style lang="scss">
.active-link {
  border-color: #0ec261 !important;
}

.order-list {
  display: flex;
  &__item {
    padding: 5px 10px;
    min-width: 100px;
    text-align: center;
    cursor: pointer;
    border: 1px solid #eee;

    &:hover {
      border-color: #999;
    }

    &:first-child {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }

    &:last-child {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  }
}
</style>
