// stores/counter.js
import { defineStore } from 'pinia'

export const UsesettingsUser = defineStore('settings', {
  state: () => ({
    pomodoro: {
      type: 'pomodoro',
      name: 'Pomodoro',
      minutes: 25
    },
    shortBreak: {
      type: 'shortBreak',
      name: 'Short break',
      minutes: 5
    },
    longBreak: {
      type: 'longBreak',
      name: 'Long Break',
      minutes: 15
    }
  }),
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    increment() {
      this.count++
    },
  },
})