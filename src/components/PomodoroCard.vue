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
          <span class="minutes">{{ minutes.toLocaleString(undefined, { minimumIntegerDigits: 2 }) }}</span>:<span
            class="seconds">{{ seconds.toLocaleString(undefined, { minimumIntegerDigits: 2 }) }}</span>
        </div>
        <button v-show="!played" class="play btn" @click="start" tabindex="1">
          START
        </button>
        <button v-show="played" class="stop btn" @click="stop" tabindex="1">
          STOP
        </button>
        <p class="time-tag">{{ tag }}</p>
      </div>
    </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import tictacSong from "../assets/PomodoroCard/sounds/reloj-tic-tac.mp3"
import buttonSong from "../assets/PomodoroCard/sounds/button-sound.mp3"
import alertFinish from "../assets/PomodoroCard/sounds/alerta-por-subnormal-graciosos-.mp3"
import { UsesettingsUser } from '../store/settingsUser'

const settingsUser = UsesettingsUser();

const minutes = ref(settingsUser.pomodoro.minutes)
const seconds = ref(0)
const played = ref(false)
const tag = ref("pomodoro")

//instanciando sonido boton
const btnSong = new Audio(buttonSong)
// instanciando el audio de tic-tac
const tictac = new Audio(tictacSong)
// instanciando alerta de fin
const alertEnd = new Audio(alertFinish)
// indentificador del intervalo
let timer

// metodos
// seteamos el tipo de timer
const typeTime = (name, type) => {
  tag.value = name
  minutes.value = settingsUser[type].minutes
  tictac.currentTime = 0
  tictac.pause()
  seconds.value = 0
  played.value = false
  clearInterval(timer)
}
//iniciando contador
const start = () => {
  played.value = true
  tictac.loop = true
  tictac.play()
  btnSong.play()
  alertEnd.pause()

  // (intervalo), cuenta regresiva con minutos y segubdos
  timer = setInterval(() => {
    seconds.value--
    // resta minutos cada 60seg si los minutos no son 0
    if (seconds.value < 0 && minutes.value != 0) {
      minutes.value--
      seconds.value = 59
    }
    // termina el intervlo
    if (minutes.value <= 0 && seconds.value <= 0) {
      clearInterval(timer)
      played.value = false
      tictac.pause()
      alertEnd.play()
      console.log("finalizo");
    }
  }, 1000)
}
//parar contador
const stop = () => {
  played.value = false

  btnSong.play()
  tictac.pause()
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
    .time-tag {
      width: 70%;
      background-color: rgba($color: #FAF9F9, $alpha: 0.2);
      padding: 10px;
      border-radius: 10px;
      margin-bottom: 20px;
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
        background-color:rgba($color: #555B6E, $alpha: 0.3);
      }
    }
  }
}
</style>