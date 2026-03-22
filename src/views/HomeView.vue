<template>
  <div class="home-view">
    <StartScreen @start="startGame" />
  </div>
</template>

<script>
import { useGameStore } from '../stores/gameStore.js'
import StartScreen from '../components/StartScreen.vue'

export default {
  name: 'HomeView',

  components: { StartScreen },

  setup() {
    return { store: useGameStore() }
  },

  methods: {
    startGame() {
      this.store.startGame()
      this.$router.push({ name: 'play' })
    }
  }
}
</script>

<style scoped>
.home-view {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
