<template>
    <li class="card" draggable="true">
        <div class="cb-container">
          <input type="checkbox" :checked="todo.isCompleted ? true : null" @click="changeStatus" class="cb-input" />
          <span class="check"></span>
        </div>
        <p class="item">
          <del v-if="todo.isCompleted">{{ todo.title }}</del>
          <span v-else v-text="todo.title"></span>
        </p>
        <button class="clear" @click="deleteTodo">
          <img :src="CrossImage" alt="Clear it" />
        </button>
      </li>
</template>

<script setup>
import {defineEmits, defineProps, toRef} from "vue"
import CrossImage from '../assets/images/icon-cross.svg';

const emits = defineEmits(['removeTodoById','changeStatusComplete']);

const props = defineProps({
  todo : Object,
});

const todos = toRef(props, "todo");

function deleteTodo(){
  if(confirm("آیا از حذف اطمینان دارید ؟ "))
  {
    emits("removeTodoById", todos.value.id);
  }
}
function changeStatus(){
  emits("changeStatusComplete", todos.value.id, !todos.value.isCompleted) ;
}
</script>