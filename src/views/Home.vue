<template>
  <div id="page">
    <div id="home">
    <NavBaarVue />
    <pomodoroCardVue />
  </div>
  </div>
</template>

<script setup>
import NavBaarVue from '../components/NavBaar.vue';
import PomodoroCardVue from '../components/PomodoroCard.vue';

</script>

<style lang="scss" scoped>
#page {
  background-color: #f28482;
  height: 100vh;
}
  #home {
    margin: 0 100px;
      @media (max-width: 768px) {
      margin: 0 10px;
    }
  }
</style>