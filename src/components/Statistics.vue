<template>
  <div>
    <div class="page-title">
      <h3>Статистика</h3>
    </div>
    <Loader v-if="loading" />
    <!-- <section v-else> -->
    <div class="chart">
      <div class="input-field">
        <select ref="select" v-model="current">
          <option value="fullIncome">Общий доход</option>
          <option value="fullOutcome">Общий расход</option>
          <option value="categoryIncome">Доход по категориям</option>
          <option value="categoryOutcome">Расход по категориям</option>
        </select>
        <label>Выберите категорию</label>
      </div>
      <div class="chart__timezone">
        <span class="chart__timezone-item">за все время</span>
        <span class="chart__timezone-item">за год</span>
        <span class="chart__timezone-item">за месяц</span>
        <span class="chart__timezone-item">за неделю</span>
      </div>
      <canvas ref="canvas"></canvas>
    </div>
    <!-- </section> -->
  </div>
</template>

<script>
import { Pie } from "vue-chartjs";

export default {
  extends: Pie,
  data() {
    return {
      loading: true,
      categories: [],
      orders: [],
      current: "fullIncome"
    };
  },
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");
    this.orders = await this.$store.dispatch("fetchOrder");

    // const income = this.categories.map(item => {
    //   return this.orders.reduce((sum, current) => {
    //     for (let i = 0; i < current.positions.length; i++) {
    //       if (current.positions[i].categoryId === item.id) {
    //         sum += +current.positions[i].price;
    //       }
    //     }
    //     return sum;
    //   }, 0);
    // });

    // console.log(income);

    this.setup();
    this.select = M.FormSelect.init(this.$refs.select);
    M.updateTextFields();

    this.loading = false;
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
  methods: {
    setup() {
      this.renderChart({
        labels: this.categories.map(c => c.title),
        datasets: [
          {
            label: "Доходы по категориям",
            data: this.categories.map(item => {
              return this.orders.reduce((sum, current) => {
                for (let i = 0; i < current.positions.length; i++) {
                  if (current.positions[i].categoryId === item.id) {
                    sum += +current.positions[i].price;
                  }
                }
                return sum;
              }, 0);
            }),
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(225, 222, 38, 0.2)",
              "rgba(116, 237, 192, 0.2)",
              "rgba(100, 169, 192, 0.2)",
              "rgba(115, 244, 38, 0.2)",
              "rgba(223, 76, 64, 0.2)",
              "rgba(97, 169, 90, 0.2)",
              "rgba(222, 67, 190, 0.2)"
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(225, 222, 38, 1)",
              "rgba(116, 237, 192, 1)",
              "rgba(100, 169, 192, 1)",
              "rgba(115, 244, 38, 1)",
              "rgba(223, 76, 64, 1)",
              "rgba(97, 169, 90, 1)",
              "rgba(222, 67, 190, 1)"
            ],
            borderWidth: 1
          }
        ]
      });
    }
  }
};
</script>

<style lang="scss">
.chart {
  max-width: 800px;
  margin: 0 auto;

  &__timezone {
    margin-bottom: 2px;

    &-item {
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
}
</style>