<template>
  <div>
    <div class="app-main-layout">
      <Navbar />
      <main class="app-content">
        <div class="app-page">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/app/Navbar";
import messages from "../utils/messages";

export default {
  name: "main-layout",
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch("fetchInfo");
    }
  },
  components: { Navbar },
  computed: {
    error() {
      return this.$store.getters.error;
    }
  },
  watch: {
    error(fbError) {
      console.log(fbError);
      this.$error(messages[fbError.code] || "Что-то пошло не так");
    }
  }
};
</script>
