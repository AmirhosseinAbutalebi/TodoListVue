<template>
    <header class="card">
        <h1>لیست وظایف </h1>  
        <button id="theme-switcher" @click="changeIcon">
        <img v-if="defaultTheme=='light'" :src= "moonIcon" alt="Change color theme" />
        <img v-else :src= "sunIcon" alt="Change color theme" />
        </button>
    </header>
</template>

<script>
import Sun from '../assets/images/icon-sun.svg';
import Moon from '../assets/images/icon-moon.svg';
export default {
    data(){
        return{
            sunIcon  : Sun,
            moonIcon : Moon,
            defaultTheme : 'dark'
        };
    },
    methods : {
        changeIcon(){
            if (this.defaultTheme == 'light')
            {
                this.defaultTheme = 'dark';
                document.querySelector("body").classList.remove("light")
            }
            else
            {   
                this.defaultTheme = 'light';
                document.querySelector("body").classList.add("light")
            }
        },
    },
};
</script>