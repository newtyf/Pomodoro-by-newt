// stores/counter.js
import { defineStore } from 'pinia'

export const UsesettingsUser = defineStore('settings', {
  state: () => ({
    pomodoro: {
      type: 'pomodoro',
      name: 'Pomodoro',
      minutes: 25,
      back: 25
    },
    shortBreak: {
      type: 'shortBreak',
      name: 'Short break',
      minutes: 5,
      back: 5
    },
    longBreak: {
      type: 'longBreak',
      name: 'Long Break',
      minutes: 15,
      back: 15
    }
  }),
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    SaveInLocalStorage(minutesPomodoro, minutesShort, minutesLong) {
      localStorage.setItem('pomodoro', minutesPomodoro.toLocaleString(undefined, { minimumIntegerDigits: 2 }))
      localStorage.setItem('short', minutesShort.toLocaleString(undefined, { minimumIntegerDigits: 2 }))
      localStorage.setItem('long', minutesLong.toLocaleString(undefined, { minimumIntegerDigits: 2 }))
    },
    GetOfLocalStorage() {
      this.pomodoro.minutes = localStorage.getItem('pomodoro')
      this.pomodoro.back = localStorage.getItem('pomodoro')

      this.shortBreak.minutes = localStorage.getItem('short')
      this.shortBreak.back = localStorage.getItem('short')

      this.longBreak.minutes = localStorage.getItem('long')
      this.longBreak.back =localStorage.getItem('long')
    }
  },
})