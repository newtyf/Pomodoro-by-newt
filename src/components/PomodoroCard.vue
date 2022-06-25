<template>
  <div>
    <div id="card">
      <div class="pomodoro" @click="typeTime('Pomodoro')">
        <p>Pomodoro</p>
      </div>
      <div class="shortBreak" @click="typeTime('Short break')">
        <p>Short break</p>
      </div>
      <div class="longBreak" @click="typeTime('Long Break')">
        <p>Long Break</p>
      </div>
      <div class="time">
        <div class="time-currently">
          <span class="minutes">{{minutes.toLocaleString(undefined,{minimumIntegerDigits: 2})}}</span>:<span class="seconds">{{seconds.toLocaleString(undefined,{minimumIntegerDigits: 2})}}</span>
        </div>
        <button class="start" @click="start">
          START
        </button>
        <p class="time-tag">{{tag}}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";

  const minutes = ref(0)
  const seconds = ref(3)

// cuenta regresiva con minutos y segubdos
  const start = () => {
    const timer = setInterval(() => {
      seconds.value--
      // resta minutos cada 60seg si los minutos no son 0
      if (seconds.value === 0 && minutes.value != 0) {
        minutes.value--
        seconds.value = 60
      }
      // termina el intervlo
      if (minutes.value == 0 && seconds.value == 0) {
        clearInterval(timer)
      }
    }, 1000)
  }

  const tag = ref("Pomodoro")

  const typeTime = (property) => {
    tag.value = property
  }

</script>

<style lang="scss" scoped>

</style>