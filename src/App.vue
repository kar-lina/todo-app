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
        <li
          class="nav-item all"
          :class="{ active: this.selectedTab === 'all' }"
          @click.stop="changeSelectedTab('all')"
        >
          All
        </li>
        <li
          class="nav-item done"
          :class="{ active: this.selectedTab === 'done' }"
          @click.stop="changeSelectedTab('done')"
        >
          Done
        </li>
        <li
          class="nav-item undone"
          :class="{ active: this.selectedTab === 'undone' }"
          @click.stop="changeSelectedTab('undone')"
        >
          Undone
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
    <TaskList
      @change-task-state="changeTaskState"
      v-if="tasks.length"
      :tasks="selectedTasks"
      :tab="selectedTab"
    />
  </div>
</template>

<script>
import { useToast } from "vue-toastification";
import TaskList from "./components/TaskList.vue";
import {
  setToLocalStorage,
  getFromLocalStorage,
} from "./api/local-storage-manager";

export default {
  name: "App",
  components: {
    TaskList,
  },
  data() {
    return {
      task: "",
      tasks: [],

      selectedTab: "all",
    };
  },
  created() {
    // Get toast interface
    this.$toast = useToast();
    this.tasks = getFromLocalStorage("tasks");
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

      this.tasks.push({ name: this.task, isDone: false });
      setToLocalStorage("tasks", this.tasks);

      this.task = "";
    },
    changeSelectedTab(name) {
      this.selectedTab = name;
      console.log(this.selectedTab);
    },
    changeTaskState(taskToDo) {
      this.tasks
        .filter((t) => t.name === taskToDo.name)
        .forEach((t) => (t.isDone = !t.isDone));
      setToLocalStorage("tasks", this.tasks);
    },
  },
  computed: {
    undoneTasks() {
      return this.tasks.filter((el) => !el.isDone);
    },
    doneTasks() {
      return this.tasks.filter((el) => el.isDone);
    },
    selectedTasks() {
      switch (this.selectedTab) {
        case "undone":
          return this.undoneTasks;
        case "done":
          return this.doneTasks;
        default:
          return this.tasks;
      }
    },
    watch: {
      tasks: {
        handler() {
          setToLocalStorage("tasks", this.tasks);
        },
        deep: true,
      },
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
