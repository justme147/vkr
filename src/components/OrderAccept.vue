<template>
  <div>
    <div class="page-subtitle">
      <h4>Подтверждение заказа</h4>
    </div>
    <section class="order__accept">
      <div class="order__accept-info">
        <p>
          <font>Имя:</font>
          {{ $attrs.info.name }}
        </p>
        <p>
          <font>Телефон:</font>
          {{ $attrs.info.phone }}
        </p>
        <p>
          <font>Адрес:</font>
          ул. {{ $attrs.info.street + ' ' + $attrs.info.house + ','}} кв. {{ $attrs.info.appartment }}
        </p>
        <p>
          <font>Подъезд:</font>
          {{ $attrs.info.porch }}
        </p>
        <p>
          <font>Этаж:</font>
          {{ $attrs.info.floor }}
        </p>
      </div>
      <div class="order__accept-discount">
        <div class="input-field">
          <input id="code" type="text" v-model="code" />
          <label for="code">Промокод</label>
        </div>
        <div
          v-for="d in filterDiscount"
          :key="d.id"
          class="order__accept-discount-item"
          @click="clickItemHandler(d.id)"
        >
          <p>
            <font>Название:</font>
            {{ d.title }}
          </p>
          <div v-if="clickItem === d.id">
            <p>
              <font>Промокод:</font>
              {{ d.promocode }}
            </p>
            <p>
              <font>Описание:</font>
              {{ d.description }}
            </p>
            <p v-if="d.type === 'order'">
              <font>Тип:</font> Скидка на заказ
            </p>
            <p v-if="d.type === 'position'">
              <font>Тип:</font> Скидка на позицию
            </p>
            <p v-for="p in d.positions" :key="p.id">
              <font>Название позиции:</font>
              {{ p.title }}
            </p>
            <p>
              <font>Скидка:</font>
              {{ d.discount }}%
            </p>
            <button class="btn waves-effect waves-light" @click.prevent="applyDiscount(d)">
              Применить
              <i class="material-icons right">add_circle_outline</i>
            </button>
          </div>
        </div>
      </div>
      <div class="order__accept-positions">
        <p v-for="(p, idx) in positions" :key="p.id + idx">
          <font>{{p.title}}</font>
          - {{p.price}} руб
        </p>
        <p>
          <font>{{price}} руб</font>
        </p>
        <button
          class="btn waves-effect waves-light left"
          @click.prevent="clickHandler"
        >Оформить заказ</button>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      code: "",
      discount: [],
      clickItem: "",
      positions: this.$attrs.order,
      price: this.$attrs.price,
      expenses: this.$attrs.expenses
    };
  },
  async mounted() {
    this.discount = await this.$store.dispatch("fetchDiscount");
    this.discount = this.discount.reverse();
  },
  computed: {
    filterDiscount() {
      const filters = this.discount.filter(item =>
        item.promocode.includes(this.code)
      );
      return filters;
    }
  },
  methods: {
    applyDiscount(item) {
      // console.log(item);
      if (item.type === "order") {
        this.price = this.price - (this.price * +item.discount) / 100;
      }

      if (item.type === "position") {
        const filterPos = [];

        for (let i = 0; i < item.positions.length; i++) {
          for (let j = 0; j < this.positions.length; j++) {
            if (item.positions[i].id === this.positions[j].id) {
              filterPos.push(this.positions[j]);
              break;
            }
          }
        }

        // console.log(item.positions)
        console.log(filterPos);

        if (filterPos.length === 0 && +item.discount === 100) {
          item.positions.map(pos => {
            this.positions.push({ ...pos, price: 0 });
          });
          this.expenses = this.positions.reduce((sum, current) => {
            return sum + +current.expenses;
          }, 0);
        } else if (
          filterPos.length < item.positions.length &&
          +item.discount === 100
        ) {
          const noPos = [];
          for (let i = 0; i < item.positions.length; i++) {
            let flag = false;
            for (let j = 0; j < filterPos.length; j++) {
              if (item.positions[i].id === filterPos[j].id) {
                flag = true;
              }
            }
            if (!flag) {
              noPos.push(item.positions[i]);
            }
          }
          console.log(noPos);

          noPos.map(pos => {
            this.positions.push({ ...pos, price: 0 });
          });

          const findPos = filterPos.map(pos => {
            return this.positions.indexOf(pos);
          });

          console.log(findPos);

          findPos.map(pos => (this.positions[pos].price = 0));

          this.price = this.positions.reduce((sum, current) => {
            return sum + +current.price;
          }, 0);
          this.expenses = this.positions.reduce((sum, current) => {
            return sum + +current.expenses;
          }, 0);
        } else {
          const findPos = filterPos.map(pos => {
            return this.positions.indexOf(pos);
          });
          console.log(findPos);

          findPos.map(pos => {
            if (this.positions[pos].price > 0) {
              this.positions[pos].price =
                +this.positions[pos].price -
                (+this.positions[pos].price * +item.discount) / 100;
            } else {
              this.positions[pos].price = 0;
            }
          });

          this.price = this.positions.reduce((sum, current) => {
            return sum + +current.price;
          }, 0);
          this.expenses = this.positions.reduce((sum, current) => {
            return sum + +current.expenses;
          }, 0);
        }
      }
    },
    clickItemHandler(id) {
      if (this.clickItem === id) {
        this.clickItem = "";
        return;
      }
      this.clickItem = id;
    },
    async clickHandler() {
      try {
        const formData = {
          positions: this.positions,
          ...this.$attrs.info,
          price: this.price,
          date: new Date().toJSON(),
          expenses: this.expenses
        };

        console.log(formData);

        await this.$store.dispatch("createOrder", formData);

        this.$message("Заказ успешно оформлен");
        this.$emit("update", []);
        this.$emit("updateInfo", {});
        this.$emit("updatePrice", 0, 0);
        this.$router.push("/");
      } catch (e) {}
    }
  }
};
</script>

<style lang="scss">
.order {
  &__accept {
    display: flex;
    // justify-content: space-between;

    &-info {
      width: 33%;
      border-right: 1px solid #999;
      padding: 0 20px;

      font {
        font-weight: bold;
      }
    }

    &-discount {
      width: 33%;
      border-right: 1px solid #999;
      padding: 0 20px;
      text-align: center;

      & > .input-field {
        // margin: 10px auto;
        width: 100%;
      }

      &-item {
        width: 100%;
        padding: 10px 0;
        text-align: center;
        border: 1px solid #999;
        cursor: pointer;
        border-bottom-color: transparent;

        &:last-child {
          border-bottom-color: #999;
        }

        & p {
          font {
            font-weight: bold;
          }
        }
      }
    }

    &-positions {
      width: 33%;
      padding: 0 25px;

      font {
        font-weight: bold;
      }
    }
  }
}
</style>