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

<script setup>
import {ref, computed} from "vue";
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";
import AddTodo from "./components/AddTodo.vue";
import TodoList from "./components/AppTodo.vue";
import { useToast } from 'vue-toastification';

const toast = useToast()

var todos = ref([]);
const currentPosition = ref(-1);
const activeTab = ref("all");

const getActiveTodoCount = computed(()=>{
      return todos.value.filter(f=>f.isCompleted === false).length;
});
var getTodo = computed(()=>{
      switch (activeTab.value){

        case "all" : 
          return todos.value;

        case "active" :
          return todos.value.filter(f=> f.isCompleted == false);

        case "completed" : 
          return todos.value.filter(f=> f.isCompleted == true);

        default :
          return todos.value;
      }
    });
    function addTodo(title){
      const id = Math.random().toString(16).slice(2);
      const todo = {id , title, isCompleted : false};
      todos.value.push(todo);
      toast.success("وظیفه با موفقیت ایجاد شد.");
    }
    function deleteItem(id){ 
      const todo = todos.value.find(f=> f.id == id);
      todos.value = todos.value.filter(f=> f.id !== id);
      toast.error(`${todo.title} حذف شد`);
    }
    function changeStatus(id, newstatus){
      var newTodos = [...todos.value];
      var selectedTodo = newTodos.find(f=>f.id === id);
      selectedTodo.isCompleted = newstatus;
      todos.value = newTodos;
    }
    function deleteTodos(){
      if(confirm("آیا از حذف وظایف تکمیل شده اطمینان دارید؟"))
      {
        todos.value = todos.value.filter(f=> f.isCompleted === false)
      }
    }
    function dragStarted(index){
       currentPosition.value = index;
    }
    function drop(index){
       var newItem = todos.value.splice(this.currentPosition, 1)[0];
       todos.value.splice(index, 0, newItem);
    }
    function changeTab(activeString){
      activeTab.value = activeString;
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
