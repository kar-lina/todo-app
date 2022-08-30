<template>
  <div class="container">
    <header class="task-header">
      <div class="logo">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="logo-icon"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>

        <h1 class="header">To Do List</h1>
      </div>
      <ul class="nav">
        <li class="nav-item all active">
          <a @click="changeSelectedTab('all')" href="" class="nav-link active"
            >All</a
          >
        </li>
        <li class="nav-item done">
          <a @click="changeSelectedTab('undone')" href="" class="nav-link"
            >Done</a
          >
        </li>
        <li class="nav-item undone">
          <a @click="changeSelectedTab('done')" href="" class="nav-link"
            >Undone</a
          >
        </li>
      </ul>
    </header>
    <div class="input">
      <input
        v-model="task"
        type="text"
        class="input-task"
        placeholder="Add a task..."
      />
      <button @click="addTask" class="add-btn">ADD</button>
    </div>
    <TaskList @doATask="doTask(doneTask)" v-if="tasks.length" :tasks="tasks" />
  </div>
</template>

<script>
import { useToast } from "vue-toastification";
import TaskList from "./components/TaskList.vue";

export default {
  name: "App",
  components: {
    TaskList,
  },
  data() {
    return {
      task: "",
      tasks: [],
      doneTasks: [],
      selectedTab: "all",
    };
  },
  created() {
    // Get toast interface
    this.$toast = useToast();
    if (localStorage.getItem("tasks")) {
      this.tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    console.log(this.tasks);
  },

  methods: {
    addTask() {
      if (this.task === "") {
        this.$toast.warning("Task can't be empty", {
          // For the actual toast, including different toast types:
          // containerClassName: "my-container-class",
          position: "top-right",
          timeout: 5000,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          pauseOnHover: true,
          draggable: true,
          draggablePercent: 0.6,
          showCloseButtonOnHover: false,
          hideProgressBar: true,
          closeButton: "button",
          icon: true,
          rtl: false,
        });
        return;
      }

      this.tasks.push({ task: this.task, isDone: false });
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
      this.task = "";
    },
    changeSelectedTab(name) {
      this.seletedTab = name;
    },
    doTask(doneTask) {
      console.log(doneTask);
      this.tasks.find((t) => t.task === doneTask).isDone = true;
    },
  },
  computed: {
    undoneTasks() {
      return this.tasks.filter((el) => el.isDone);
    },
  },
};
</script>
<style>
/* This will affect all 6 containers */
.Vue-Toastification__container.my-container-class {
  min-height: 0;
  width: 326px;
}
.Vue-Toastification__toast-body {
  background-color: #ffc107;
}
</style>
