import Vue from "vue";
import Vuelidate from "vuelidate";
import Paginate from "vuejs-paginate";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import Loader from "./components/app/Loader";
import "materialize-css/dist/js/materialize.min.js";
import dateFilter from "./filters/date.filter";
import messagePlugin from "./utils/message.plugin";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

Vue.config.productionTip = false;

Vue.use(messagePlugin);
Vue.use(Vuelidate);
Vue.filter("date", dateFilter);
Vue.component("Loader", Loader);
Vue.component("Paginate", Paginate);

firebase.initializeApp({
  apiKey: "AIzaSyAbuPTGyaClyDBiK1BRCUyNZcfaf08hzq0",
  authDomain: "my-vkr.firebaseapp.com",
  databaseURL: "https://my-vkr.firebaseio.com",
  projectId: "my-vkr",
  storageBucket: "my-vkr.appspot.com",
  messagingSenderId: "571127927737",
  appId: "1:571127927737:web:7a6eeea585929f55ac9c68",
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
