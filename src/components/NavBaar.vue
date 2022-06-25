<template>
  <div>
    <nav id="nav">
      <div class="logo">
        <img src="../assets/NavBar/imgs/logo.png" width="auto" height="80px" alt="foto-anime">
        <div class="titulo">
          <h2>POMODORO<span> by newt</span></h2>
        </div>
      </div>
      <div class="options">
        <div class="config">
          rueda
          <img src="" alt="">
        </div>
        <div class="profile">
          user
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
  #nav {
    display: flex;
    height: 100px;
    width: 100vw;
    justify-content: space-between;
    padding: 10px;
    background-color: #ffd6ba;
    .logo {
      display: flex;
      align-items: center;
        img {
          border: 3px solid #FAF9F9;
          border-radius: 10px;
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
    }
  }
</style>