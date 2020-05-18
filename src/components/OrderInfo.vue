<template>
  <div>
    <Loader v-if="loading" />
    <section v-else>
      <div class="page-subtitle">
        <h4>Информация о заказе</h4>
      </div>

      <form class="order-info" @submit.prevent="submitHandler">
        <div class="order__detail">
          <div class="input-field">
            <input id="inputName" type="text" v-model="name" />
            <label for="inputName">Имя</label>
          </div>
          <div class="input-field">
            <input id="inputPhone" type="tel" v-model="phone" />
            <label for="inputPhone">Телефон</label>
          </div>
          <div class="input-field">
            <input id="inputStreet" type="text" v-model="street" />
            <label for="inputStreet">Улица</label>
          </div>
          <div class="input-field">
            <input id="inputHouse" type="text" v-model="house" />
            <label for="inputHouse">Дом</label>
          </div>
          <div class="input-field">
            <input id="inputPorch" type="text" v-model="porch" />
            <label for="inputPorch">Подъезд</label>
          </div>
          <div class="input-field">
            <input id="inputFloor" type="text" v-model="floor" />
            <label for="inputFloor">Этаж</label>
          </div>
          <div class="input-field">
            <input id="inputAppartament" type="text" v-model="appartment" />
            <label for="inputAppartament">Квартира</label>
          </div>
        </div>
        <div class="order__list">
          <p v-if="name">Имя: {{name}}</p>
          <p v-if="phone">Телефон: {{phone}}</p>
          <p v-if="street">Улица: {{street}}</p>
          <p v-if="house">Дом: {{house}}</p>
          <p v-if="porch">Подъезд: {{porch}}</p>
          <p v-if="floor">Этаж: {{floor}}</p>
          <p v-if="appartment">Квартира: {{appartment}}</p>
          <button class="btn waves-effect waves-light" type="submit">
            Подтверждение
            <i class="material-icons right">arrow_forward</i>
          </button>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      name: this.$attrs.info.name || "",
      phone: this.$attrs.info.phone || "",
      street: this.$attrs.info.street || "",
      house: this.$attrs.info.house || "",
      porch: this.$attrs.info.porch || "",
      floor: this.$attrs.info.floor || "",
      appartment: this.$attrs.info.appartment || ""
    };
  },
  mounted() {
    this.loading = false;
    setInterval(() => {
      M.updateTextFields();
    }, 0);
  },
  methods: {
    submitHandler() {
      const formData = {
        name: this.name !== "" ? this.name : null,
        phone: this.phone !== "" ? this.phone : null,
        street: this.street !== "" ? this.street : null,
        house: this.house !== "" ? this.house : null,
        porch: this.porch !== "" ? this.porch : null,
        floor: this.floor !== "" ? this.floor : null,
        appartment: this.appartment !== "" ? this.appartment : null
      };

      this.$emit("updateInfo", formData);
      this.$router.push("/new_order/accept");
      // console.log(formData);
    }
  }
};
</script>

<style lang="scss">
.order {
  &-info {
    display: flex;
    // flex-wrap: wrap;
    justify-content: space-between;
    align-items: start;
  }

  &__detail {
    display: flex;
    flex-wrap: wrap;
  }

  &__list {
    min-width: 250px;
    padding: 0 15px 0 25px;
    border-left: 1px solid black;
  }
}

.input-field {
  margin: 10px;
  width: 200px;

  &__xs {
    width: 75px;
  }
}
</style>