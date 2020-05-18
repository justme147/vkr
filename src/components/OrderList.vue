<template>
  <div>
    <div class="page-title">
      <h3>Список заказов</h3>
    </div>
    <Loader v-if="loading" />
    <section v-else>
      <div class="row">
        <table class="highlight" v-if="orders.length">
          <thead>
            <tr>
              <th>#</th>
              <th>Имя</th>
              <th>Дата заказа</th>
              <th>Стоимость</th>
              <th>Открыть</th>
              <th>Отменить</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(order, idx) in orders" :key="order.id">
              <td>{{ idx + 1 }}</td>
              <td>{{ order.name }}</td>
              <td>{{ order.date | date('datetime') }}</td>
              <td>{{ order.price }} руб.</td>
              <td>
                <button class="btn-small btn" @click="$router.push('/detail/' + order.id)">
                  <i class="material-icons">open_in_new</i>
                </button>
              </td>
              <td>
                <button class="btn-small btn" @click="deleteOrder(order.id)">
                  <i class="material-icons">delete_forever</i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-else>
          Заказов пока нет, нажмите чтобы
          <router-link to="/new_order">создать</router-link>
        </p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      orders: []
    };
  },
  async mounted() {
    this.orders = await this.$store.dispatch("fetchOrder");
    this.orders = this.orders.reverse();
    this.loading = false;
  },
  methods: {
    async deleteOrder(id) {
      try {
        await this.$store.dispatch("deleteOrder", id);
        this.$message("Заказ успешно отменен");
        this.orders = await this.$store.dispatch("fetchOrder");
        this.orders = this.orders.reverse();
      } catch (e) {}
    }
  }
};
</script>

<style></style>
