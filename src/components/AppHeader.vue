<template>
    <header class="card">
        <h1>لیست وظایف </h1>  
        <button id="theme-switcher" @click="changeIcon">
        <img v-if="defaultTheme=='light'" :src= "Moon" alt="Change color theme" />
        <img v-else :src= "Sun" alt="Change color theme" />
        </button>
    </header>
</template>

<script setup>
import {ref} from "vue"
import Sun from '../assets/images/icon-sun.svg';
import Moon from '../assets/images/icon-moon.svg';

const defaultTheme = ref('dark')
function changeIcon(){
    if (defaultTheme.value == 'light')
        {
            defaultTheme.value = 'dark';
            document.querySelector("body").classList.remove("light")
        }
    else
    {   
            defaultTheme.value = 'light';
            document.querySelector("body").classList.add("light")
    }
}
</script>