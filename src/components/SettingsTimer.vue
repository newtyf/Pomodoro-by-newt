<template>
  <div id="modal">
    <div id="back-quit" @click="cerrarModal"></div>
    <div id="settings-modal">
      <div class="timer-config section">
        <div class="time">
          <p>Pomodoro:</p>
          <input type="number" v-model="pomodoroMinutes" />
        </div>
        <div class="time">
          <p>Short Break:</p>
          <input type="number" v-model="shortBreakMinutes" />
        </div>
        <div class="time">
          <p>Long Break:</p>
          <input type="number" v-model="longBreakMinutes" />
        </div>
      </div>
      <div class="section">
        <p>Auto Start Break</p>
        <SwitchButtonVue />
      </div>
      <div class="section">
        <button class="btn" @click="cerrarModal">SAVE</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import SwitchButtonVue from "./common/SwitchButton.vue";
import { UsesettingsUser } from "../store/settingsUser";
import { ref, watch } from "vue";

const settingsUser = UsesettingsUser();

const pomodoroMinutes = ref(settingsUser.pomodoro.minutes);
const shortBreakMinutes = ref(settingsUser.shortBreak.minutes);
const longBreakMinutes = ref(settingsUser.longBreak.minutes);

watch(pomodoroMinutes, () => {
  settingsUser.pomodoro.minutes = pomodoroMinutes.value;
  settingsUser.pomodoro.back = pomodoroMinutes.value;
  settingsUser.SaveInLocalStorage(
    pomodoroMinutes.value,
    shortBreakMinutes.value,
    longBreakMinutes.value
  );
});

watch(shortBreakMinutes, () => {
  settingsUser.shortBreak.minutes = shortBreakMinutes.value;
  settingsUser.shortBreak.back = shortBreakMinutes.value;
  settingsUser.SaveInLocalStorage(
    pomodoroMinutes.value,
    shortBreakMinutes.value,
    longBreakMinutes.value
  );
});

watch(longBreakMinutes, () => {
  settingsUser.longBreak.minutes = longBreakMinutes.value;
  settingsUser.longBreak.back = longBreakMinutes.value;
  settingsUser.SaveInLocalStorage(
    pomodoroMinutes.value,
    shortBreakMinutes.value,
    longBreakMinutes.value
  );
});

const cerrarModal = () => {
  document.getElementById("modal").classList.remove("active");
};
</script>

<style lang="scss" scoped>
#modal {
  display: none;
  &.active {
    display: flex;
    justify-content: center;
  }
  #back-quit {
    position: fixed;
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 0;
    background-color: rgba($color: #000000, $alpha: 0.5);
    z-index: 100;
    justify-content: center;
    z-index: 90;
  }

  #settings-modal {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #faf9f9;
    border-radius: 10px;
    top: 30px;
    padding: 30px;
    position: absolute;
    width: 60%;
    @media (max-width: 765px) {
      padding: 20px;
      width: 100%;
    }
    font-weight: bold;
    z-index: 100;
    .section {
      display: flex;
      width: 100%;
      margin-bottom: 20px;
      justify-content: space-between;
      .btn {
        padding: 10px 0;
        font-size: 20px;
        border: 2px solid #bee3db;
        background-color: #faf9f9;
        border-radius: 10px;
        font-weight: bold;
        width: 100%;
        color: rgb(90, 207, 184);
        cursor: pointer;
        transform: translateY(-5px);
        box-shadow: 0 5px #bee3db;
        &:active {
          transform: translateY(5px);
          box-shadow: none;
        }
      }
      &.timer-config {
        display: flex;
        .time {
          input {
            width: 80px;
            height: 30px;
            padding-left: 10px;
            font-size: 18px;
            font-weight: bold;
            margin-top: 10px;
            outline: none;
            border: 1px solid gray;
            border-radius: 5px;
            box-shadow: 5px 2px rgba($color: gray, $alpha: 0.5);
          }
        }
      }
    }
  }
}
</style>
