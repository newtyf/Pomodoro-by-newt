<template>
  <div>
    <nav id="nav">
      <div class="logo">
        <img src="../assets/NavBar/imgs/logo.webp" alt="foto-anime">
        <div class="titulo">
          <h2>POMODORO<span> by newt</span></h2>
        </div>
      </div>
      <div class="options">
        <div class="config">
          <img src="../assets/NavBar/imgs/minimize-solid.svg" v-show="full" @click="fullClose" alt="minimizise"/>
          <img src="../assets/NavBar/imgs/maximize-solid.svg" v-show="!full" @click="fullOpen" alt="maximizise"/>
        </div>
        <div class="config">
          <img src="../assets/NavBar/imgs/sliders-solid.svg" @click="openModal" alt="options">
        </div>
        <!-- <div class="profile">
          <img src="../assets/NavBar/imgs/user-solid.svg" alt="">
        </div> -->
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref } from 'vue';


const full = ref(false)

const openModal = () => {
  const modal = document.getElementById("modal")
  modal.classList.add("active")
}

const fullOpen = () => {
  document.getElementById('page').requestFullscreen()
  full.value = true
}

const fullClose = () => {
  document.exitFullscreen()
  full.value = false
}

</script>

<style lang="scss" scoped>
  #nav {
    display: flex;
    height: 80px;
    width: 100%;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #FAF9F9;
    .logo {
      display: flex;
      align-items: center;
        img {
          border: 3px solid #FAF9F9;
          border-radius: 10px;
          height: 100%;
        }
        .titulo {
          margin-left: 10px;
          color: #FAF9F9;
        }
        @media (max-width: 768px) {
          .titulo {
            display: none;
          }
        }
    }
    .options {
      display: flex;
      font-weight: bold;
      align-items: center;
      div {
        margin-right: 10px;
      }
      .config {
        height: 40px;
        border: 2px solid #FAF9F9;
        border-radius: 5px;
        padding: 5px;
        cursor: pointer;
        &:hover {
          border-color: #BEE3DB;
        }
        img {
          width: 100%;
          height: 100%;
        }
      }
      .profile {
        height: 40px;
        border: 2px solid #FAF9F9;
        border-radius: 5px;
        padding: 5px;
        cursor: pointer;
        &:hover {
          border-color: #BEE3DB;
        }
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>