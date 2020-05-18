<template>
  <div>
    <div class="page-title">
      <h3>Акции</h3>
    </div>
    <Loader v-if="loading" />
    <section v-else class="discount">
      <div class="discount__create">
        <div class="page-subtitle">
          <h4>Добавить</h4>
        </div>
        <form @submit.prevent="submitHandler">
          <div class="input-field">
            <input id="title" type="text" v-model="title" />
            <label for="title">Название акции</label>
          </div>
          <div class="input-field">
            <input id="promocode" type="text" v-model="promocode" />
            <label for="promocode">Промокод</label>
          </div>

          <div class="input-field">
            <textarea id="description" v-model="description" class="materialize-textarea"></textarea>
            <label for="description">Описание акции</label>
          </div>
          <div class="input-field">
            <select ref="select" v-model="current">
              <option value="order">Скидка на заказ</option>
              <option value="position">Скидка на позицию</option>
            </select>
            <label for="description">Выберите действие</label>
          </div>

          <div class="input-field" v-if="current === 'order'">
            <input id="discountOrder" type="text" v-model="discountOrder" />
            <label for="discountOrder">Процент скидки %</label>
          </div>

          <div class="discount__positions" v-if="current === 'position'">
            <div>
              <span
                v-for="p in positions"
                @click="posClickHandler(p)"
                :key="p.id"
                class="discount__positions-item"
              >{{ p.title }}</span>
            </div>
            <div class="input-field">
              <input id="discountPosition" type="text" v-model="discountPosition" />
              <label for="discountPosition">Процент скидки %</label>
            </div>
          </div>

          <button class="btn waves-effect waves-light" type="submit">
            Добавить
            <i class="material-icons right">add_circle_outline</i>
          </button>
        </form>
      </div>
      <div class="discount__list">
        <div class="page-subtitle">
          <h4>Список</h4>
        </div>
        <div>
          <div
            v-for="d in discounts"
            :key="d.id"
            class="discount__list-item"
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
              <button class="btn waves-effect waves-light" @click="deleteDiscount(d.id)">
                Удалить
                <i class="material-icons right">delete_forever</i>
              </button>
            </div>
          </div>
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
      title: "",
      promocode: "",
      description: "",
      current: "order",
      discountOrder: "",
      positions: [],
      discountPosition: "",
      posDiscount: [],
      discounts: [],
      clickItem: ""
    };
  },
  methods: {
    async deleteDiscount(id) {
      try {
        await this.$store.dispatch("deleteDiscount", id);
        this.$message("Акция успешно удалена");
        this.discounts = await this.$store.dispatch("fetchDiscount");
        this.discounts = this.discounts.reverse();
      } catch (e) {}
    },
    clickItemHandler(id) {
      if (this.clickItem === id) {
        this.clickItem = "";
        return;
      }
      this.clickItem = id;
    },
    posClickHandler(id) {
      this.posDiscount.push(id);
    },
    async submitHandler() {
      const formData = {
        title: this.title,
        promocode: this.promocode,
        description: this.description,
        type: this.current,
        discount:
          this.current === "order" ? this.discountOrder : this.discountPosition,
        positions: this.current === "position" ? this.posDiscount : null
      };

      try {
        const discount = await this.$store.dispatch("createDiscount", formData);

        console.log(discount);

        this.title = "";
        this.promocode = "";
        this.description = "";
        this.current = "order";
        this.discountOrder = "";
        this.discountPosition = "";
        this.posDiscount = [];
        this.discounts.unshift(discount);
        this.$message("Акция успешно создана");
      } catch (e) {}

      // console.log(formData);
    }
  },
  async mounted() {
    this.positions = await this.$store.dispatch("fetchPositions");
    this.discounts = await this.$store.dispatch("fetchDiscount");
    this.discounts = this.discounts.reverse();

    this.loading = false;

    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select);
      M.updateTextFields();
    }, 0);
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  }
};
</script>

<style lang="scss">
.discount {
  display: flex;

  &__create {
    width: 50%;
    border-right: 1px solid black;
    padding: 0 20px;
  }

  &__list {
    width: 50%;
    // display: flex;
    // flex-wrap: wrap;
    padding: 0 20px;

    &-item {
      width: 100%;
      padding: 15px 0;
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

  &__positions > .input-field {
    width: 100%;
  }

  &__positions,
  &__positions > div {
    display: flex;
    flex-wrap: wrap;

    &-item {
      display: block;
      padding: 10px;
      border: 1px solid #eee;
      margin: 5px 10px 5px 0;
      cursor: pointer;

      &:hover {
        border-color: #999;
      }
    }
  }
}
</style>
