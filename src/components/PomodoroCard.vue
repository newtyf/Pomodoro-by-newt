<template>
    <div id="card">
      <div class="pomodoro types">
        <p @click="typeTime(settingsUser.pomodoro.name, settingsUser.pomodoro.type)" :class="{active: tag == 'Pomodoro'}">Pomodoro</p>
      </div>
      <div class="shortBreak types">
        <p @click="typeTime(settingsUser.shortBreak.name, settingsUser.shortBreak.type)" :class="{active: tag == 'Short break'}">Short break</p>
      </div>
      <div class="longBreak types">
        <p @click="typeTime(settingsUser.longBreak.name, settingsUser.longBreak.type)" :class="{active: tag == 'Long Break'}">Long Break</p>
      </div>
      <div class="time">
        <div class="time-currently">
          <span class="minutes">{{ settingsUser[type].minutes.toLocaleString(undefined, { minimumIntegerDigits: 2 }) }}</span>:<span
            class="seconds">{{ seconds.toLocaleString(undefined, { minimumIntegerDigits: 2 }) }}</span>
        </div>
        <button v-show="!played" class="play btn" @click="start" tabindex="1">
          START
        </button>
        <button v-show="played" class="stop btn" @click="stop" tabindex="1">
          STOP
        </button>
        <img class="restart" @click="restartTimer" src="../assets/PomodoroCard/imgs/resetart.svg" alt="">
        <p class="time-tag">{{ tag }}</p>
      </div>
    </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import tictacSong from "../assets/PomodoroCard/sounds/rain-6.mp3"
import buttonSong from "../assets/PomodoroCard/sounds/button-sound.mp3"
import alertFinish from "../assets/PomodoroCard/sounds/alerta-por-subnormal-graciosos-.mp3"
import { UsesettingsUser } from '../store/settingsUser'

const settingsUser = UsesettingsUser();

const type = ref("pomodoro")
let minutesBackup = settingsUser[type.value].back
const seconds = ref(0)
const played = ref(false)
const tag = ref("Pomodoro")

//instanciando sonido boton
const btnSong = new Audio(buttonSong)
// instanciando el audio de tic-tac
const tictac = new Audio(tictacSong)
// instanciando alerta de fin
const alertEnd = new Audio(alertFinish)
// indentificador del intervalo
let timer

// metodos:
// seteamos el tipo de timer
const typeTime = (name, typechan) => {
  type.value = typechan
  minutesBackup = settingsUser[type.value].back
  settingsUser[type.value].minutes = minutesBackup
  tag.value = name
  tictac.currentTime = 0
  tictac.pause()
  seconds.value = 0
  played.value = false
  clearInterval(timer)
}
//iniciando contador
const start = () => {
  document.querySelector(".restart").classList.add("active")
  played.value = true
  tictac.loop = true
  setTimeout(() => {
    tictac.play()
  }, 500)
  btnSong.play()
  alertEnd.pause()

  // (intervalo), cuenta regresiva con minutos y segubdos
  timer = setInterval(() => {
    seconds.value--
    // resta minutos cada 60seg si los minutos no son 0
    if (seconds.value < 0 && settingsUser[type.value].minutes != 0) {
      settingsUser[type.value].minutes--
      seconds.value = 59
    }
    // termina el intervlo
    if (settingsUser[type.value].minutes <= 0 && seconds.value <= 0) {
      clearInterval(timer)
      settingsUser[type.value].minutes = minutesBackup
      played.value = false
      tictac.pause()
      alertEnd.play()
      console.log("finalizo");
    }
  }, 1000)
}
//parar contador
const stop = () => {
  document.querySelector(".restart").classList.remove("active")
  played.value = false

  btnSong.play()
  tictac.pause()
  clearInterval(timer)
}

const restartTimer = () => {
  settingsUser[type.value].minutes = minutesBackup
  tictac.currentTime = 0
  tictac.pause()
  played.value = false
  seconds.value = 0
  clearInterval(timer)
}

</script>

<style lang="scss" scoped>
#card {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 50px 1fr;
  border-radius: 10px;
  margin: 15px;
  @media (min-width: 768px) {
    margin: 15px 50px;
  }
  text-align: center;
  background-color: rgba($color: #FAF9F9, $alpha: 0.2);
  .time {
    grid-column-start: 1;
    grid-column-end: 4;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    margin-top: 5px;
    position: relative;
    .time-currently {
      font-size: 110px;
      font-weight: bold;
      color: #FAF9F9;
    }
    .btn {
      padding: 10px 0;
      font-size: 30px;
      border: none;
      background-color: #FAF9F9;
      border-radius: 10px;
      font-weight: bold;
      width: 70%;
      margin-bottom: 20px;
      color: rgb(90, 207, 184);
      cursor: pointer;
      margin-top: 10px;
      &.play {
        transform: translateY(-5px);
        box-shadow: 0 5px #BEE3DB;
      }
    }
    .restart {
      width: 30px;
      height: 30px;
      position: absolute;
      right: 30px;
      bottom: 93px;
      transition: all 0.5s ease;
      transform: scale(0);
      opacity: 0;
      @media (max-width: 764px) {
        width: 25px;
        height: 25px;
        right: 15px;
      }
      &.active {
        transform: scale(1);
        opacity: 1;
      }
    }
    .time-tag {
      width: 70%;
      background-color: rgba($color: #FAF9F9, $alpha: 0.2);
      padding: 10px;
      border-radius: 10px;
      margin-bottom: 20px;
      color: #BEE3DB;
      font-weight: bold;
    }
  }
  .types {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #FAF9F9;
    font-weight: bold;
    margin-top: 20px;
    p {
      cursor: pointer;
      border-radius: 5px;
      padding: 5px;
      border-radius: 5px;
      &.active {
        transition: 0.2s ease-in-out;
        background-color:rgba($color: #555B6E, $alpha: 0.8);
      }
    }
  }
}
</style>