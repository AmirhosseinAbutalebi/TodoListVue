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
          <img :src="cross" alt="Clear it" />
        </button>
      </li>
</template>

<script>
import CrossImage from '../assets/images/icon-cross.svg';
export default {
  props : {
    todo: Object,
  },
  data(){
    return{
      cross : CrossImage
    };
  },
  methods : {
    deleteTodo(){
      if(confirm("آیا از حذف اطمینان دارید ؟ "))
      {
        this.$emit("removeTodoById", this.todo.id);
      }
    },
    changeStatus(){
      this.$emit("changeStatusComplete", this.todo.id, !this.todo.isCompleted) ;
    },
  },
};
</script>