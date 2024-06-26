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

<script>
export default {
  data(){
    return{
      title : ""
    };
  },
  methods : {
    addTodo(){
      this.$emit("AddNewTodo", this.title);
      this.title = "";
    },
  },
};
</script>