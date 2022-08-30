import { createApp } from "vue";
import App from "./App.vue";
import "./assets/scss/styles.css";
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

const app = createApp(App);

const options = {
  draggable: false,
  containerClassName: "my-container-class",
};
app.use(Toast, options);
app.mount("#app");
