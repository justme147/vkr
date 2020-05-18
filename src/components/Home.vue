<template>
  <div class="app-page-content">
    <router-link
      v-for="link in links"
      :key="link.title"
      :to="link.url"
      tag="div"
      class="app-page-content__item"
    >{{ link.title }}</router-link>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      links: [
        { title: "Новый заказ", url: "/new_order" },
        { title: "Список заказов", url: "/order_list" },
        { title: "Добавить позицию", url: "/new_position" },
        { title: "Список позиций", url: "/position_list" },
        { title: "Акции", url: "/discounts" },
        { title: "Отчеты/Статистика", url: "/statistics" }
      ]
    };
  }
};
</script>

<style lang="scss">
.app-page-content {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;

  &__item {
    width: calc(33% - 20px);
    min-width: 200px;
    text-align: center;
    padding: 50px 0;
    margin: 10px 0;
    font-size: 18px;
    color: #fff;
    cursor: pointer;
    background-color: #0ec261;
    // #151b1f
    &:hover {
      background-color: #0da755;
    }

    &:active {
      background-color: #0d8646;
    }
  }
}
</style>
