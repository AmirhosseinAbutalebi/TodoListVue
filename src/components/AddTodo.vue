<template>
    <div class="card add">
      <div class="cb-container">
        <button id="add-btn" @click="addTodo">+</button>
      </div>
      <div class="txt-container">
        <label for="addt">افزودن </label>
        <input v-model="title" type="text" class="txt-input" placeholder="افزودن وظیفه جدید..." spellcheck="false" autocomplete="off"
          id="addt" dir="rtl" @keypress.enter="addTodo"/>
      </div>
    </div>
</template>

<script setup>
import {ref, defineEmits} from "vue";

const title = ref("");
const emits = defineEmits(['AddNewTodo']);

function addTodo(){
  if (!title.value)
    return
  emits("AddNewTodo", title.value);
  title.value = "";
}

</script>