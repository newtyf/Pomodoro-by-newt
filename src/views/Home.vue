<template>
  <div id="page">
    <video autoplay muted loop id="myVideo">
      <source src="/Pixel Art Rain Shader.mp4" type="video/mp4" />
    </video>
    <div id="home">
      <SettingsTimerVue />
      <NavBarVue />
      <PomodoroCardVue />
    </div>
  </div>
</template>

<script setup>
import NavBarVue from "../components/NavBar.vue";
import PomodoroCardVue from "../components/PomodoroCard.vue";
import SettingsTimerVue from "../components/SettingsTimer.vue";

import { UsesettingsUser } from "../store/settingsUser";

const settingsUser = UsesettingsUser();

if (localStorage.getItem("pomodoro")) {
  settingsUser.GetOfLocalStorage();
}
</script>

<style lang="scss" scoped>
#page {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  background-color: rgb(17, 184, 150);
  #myVideo {
    position: fixed;
    right: 0;
    bottom: 0;
    min-width: 100%;
    min-height: 100%;
    z-index: 1;
  }
}
#home {
  position: relative;
  z-index: 2;
  width: 600px;
  min-width: 350px;
}
</style>
