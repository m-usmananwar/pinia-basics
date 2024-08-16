import { defineStore } from "pinia";

export const useTasksStore = defineStore('task-store', {
  state: () => ({
    tasks: []
  }),
  getters: {
    favs() {
      return this.tasks.filter(task => task.isFav);
    },
    favCount() {
      return this.tasks.filter(task => task.isFav).length;
    },
    totalCount() {
      return this.tasks.length;
    }
  },
  actions: {
    async getTasks() {
        const response = await fetch('http://localhost:3000/tasks');
        const data = await response.json();
        this.tasks = data;
    },
    async addTask(task) {
        this.tasks.push(task);

        const response = await fetch('http://localhost:3000/tasks', {
            method: 'POST',
            body: JSON.stringify(task),
            headers: {'Content-Type': 'application/json'}
        });
        if(response.error) {
            console.error(response.error);
        }
    },
    async deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id != id);
        const response = await fetch(`http://localhost:3000/tasks/${id}`, {
            method: 'DELETE',
        });
        if(response.error) {
            console.error(response.error);
        }
    },
    async toggleFav(id) {
        const task = this.tasks.find(task => task.id == id);
        task.isFav = !task.isFav;

        const response = await fetch(`http://localhost:3000/tasks/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({isFav: task.isFav}),
            headers: {'Content-Type': 'application/json'}
        });
        if(response.error) {
            console.error(response.error);
        }
    }
  }
});
