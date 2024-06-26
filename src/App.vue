<template>
 <AppHeader></AppHeader>

  <main>
    <AddTodo @addNewTodo="addTodo"></AddTodo>

    <ul class="todos" >
      <TodoList v-for="(item, index) in getTodo" :key="item.id" :todo="item" @dragstart="dragStarted(index)" @drop="drop(index)" @removeTodoById="deleteItem" @changeStatusComplete="changeStatus" @dragover.prevent></TodoList>
    </ul>

    <div class="card stat">
      <p class="corner"><span id="items-left">{{getActiveTodoCount}}</span> مورد باقی مانده</p>
      <div class="filter">
        <button id="all" :class="{ on: activeTab == 'all'}" @click="changeTab('all')">همه</button>
        <button id="active" :class="{ on: activeTab == 'active'}" @click="changeTab('active')">فعال</button>
        <button id="completed" :class="{ on: activeTab == 'completed'}" @click="changeTab('completed')">تکمیل</button>
      </div>
      <div class="corner"> 
        <button id="clear-completed" @click="deleteTodos">حذف تکمیل شده ها</button>
      </div>
    </div>
  </main>

  <AppFooter></AppFooter>

</template>

<script>

import AppHeader from "./components/AppHeader.vue"
import AppFooter from "./components/AppFooter.vue"
import AddTodo from "./components/AddTodo.vue"
import TodoList from "./components/AppTodo.vue"

export default {
  name: 'App',
  components : {
    AppHeader,
    AppFooter,
    AddTodo,
    TodoList,
  },
  data(){
    return{
      todos:[],
      currentPosition : -1,
      activeTab : "all"
    }
  },
  computed : {
    getActiveTodoCount(){
      return this.todos.filter(f=>f.isCompleted === false).length;
    },
    getTodo(){
      switch (this.activeTab){

        case "all" : 
          return this.todos;

        case "active" :
          return this.todos.filter(f=> f.isCompleted == false);

        case "completed" : 
          return this.todos.filter(f=> f.isCompleted == true);

        default :
          return this.todos;
      }
    },
  },
  methods : {
    addTodo(title){
      const id = Math.random().toString(16).slice(2);
      const todo = {id , title, isCompleted : false};
      this.todos.push(todo);
      this.$toast.success("وظیفه با موفقیت ایجاد شد.");
    },
    deleteItem(id){ 
      const todo = this.todos.find(f=> f.id == id);
      this.todos = this.todos.filter(f=> f.id !== id);
      this.$toast.error(`${todo.title} حذف شد`);
    }, 
    changeStatus(id, newstatus){
      var newTodos = [...this.todos];
      var selectedTodo = newTodos.find(f=>f.id === id);
      selectedTodo.isCompleted = newstatus;
      this.todos = newTodos;
    },
    deleteTodos(){
      if(confirm("آیا از حذف وظایف تکمیل شده اطمینان دارید؟"))
      {
        this.todos = this.todos.filter(f=> f.isCompleted === false)
      }
    },
    dragStarted(index){
       this.currentPosition = index;
    },
    drop(index){
       var newItem = this.todos.splice(this.currentPosition, 1)[0];
       this.todos.splice(index, 0, newItem);
    },
    changeTab(activeString){
      this.activeTab = activeString;
    },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
