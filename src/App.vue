<template>
  <div class="flex justify-center items-center min-h-screen bg-[#edede9]">
    <div class="text-center p-10">
      <div class="w-full bg-white p-6 rounded-lg shadow-lg mx-auto">
        <h1 class="text-2xl font-bold text-center mb-6 text-[#023047]">To-Do List By NINJA</h1>
        
        <div class="flex items-center mb-6">
          <input v-model="newTask" type="text" placeholder="Add a new task"
            class="flex-1 p-2 rounded-l-lg border-t border-l border-b border-[#023047] focus:outline-none">
          <button class="bg-[#ffb703] hover:bg-[#fb8500] text-white font-semibold p-2 rounded-lg w-1/6" @click="addTask()">Add</button>
        </div>

        <div class="flex justify-between mb-4 gap-x-2">
          <button :class="[filterButton == 'all' ? 'bg-[#023047]' : 'bg-[#fb8500]']" class="w-full text-center  text-white py-1 rounded-sm" @click="filterButton = 'all'">All</button>
          <button :class="[filterButton == 'favorite' ? 'bg-[#023047]' : 'bg-[#fb8500]']" class="w-full text-center  text-white py-1 rounded-sm" @click="filterButton = 'favorite'">Favorite</button>
        </div>

        <div class="space-y-4">
          <template v-if="filterButton == 'all'">
            <p class="text-left">All <span class="font-bold">({{ taskStore.totalCount }})</span> to do</p>
            <div class="bg-[#ffb703] text-white py-2 px-1 rounded-sm flex justify-between items-center gap-x-4" v-for="task in taskStore.tasks" :key="task">
              <div>{{ task.title }}</div>
              <div class="flex gap-x-1">
                <div class="bg-red-600 p-1 rounded-sm cursor-pointer" @click="taskStore.deleteTask(task.id)">Delete</div>
                <div :class="[task.isFav ? 'bg-green-500' : 'bg-gray-500']" class="p-1 rounded-sm cursor-pointer" @click="taskStore.toggleFav(task.id)">{{ task.isFav ? 'Remove Fvrt' : 'Add Fvrt' }}</div>
              </div>
          </div>
          </template>
          <template v-if="filterButton == 'favorite'">
            <p class="text-left">Favorite <span class="font-bold">({{ taskStore.favCount }})</span>to do</p>
            <div class="bg-[#ffb703] text-white py-2 px-1 rounded-sm flex justify-between items-center gap-x-4" v-for="task in taskStore.favs" :key="task">
              <div>{{ task.title }}</div>
              <div class="flex gap-x-1">
                <div class="bg-red-600 p-1 rounded-sm cursor-pointer" @click="taskStore.deleteTask(task.id)">Delete</div>
                <div :class="[task.isFav ? 'bg-green-500' : 'bg-gray-500']" class="p-1 rounded-sm cursor-pointer" @click="taskStore.toggleFav(task.id)">{{ task.isFav ? 'Remove Fvrt' : 'Add Fvrt' }}</div>
              </div>
          </div>
          </template>
         
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { useTasksStore } from './stores/task-store';
export default {
  data() {
    return { 
      filterButton: 'all',
      taskStore: useTasksStore(),
      newTask: ''
    }
  },
 
  computed: {
    
  },

  methods: {
    async addTask() {
      if(this.newTask.length) {
        await this.taskStore.addTask({
          'title': this.newTask,
          'isFav': false,
          'id': Math.floor(Math.random() * 100000)
        });
        this.newTask = '';
      }
    }
  },
  mounted() {
    this.taskStore.getTasks();
  },
}
</script>
