import { createApp } from "vue";
import "vue3-toastify/dist/index.css";
import App from "./App.vue";
import "./assets/css/tailwind.css";
import router from "./router";
import store from "./store";

const app = createApp(App);

app.use(store).use(router).mount("#app");
