<template>
  <div class="play-view">

    <!-- Timer bar - flush below nav, full width -->
    <div v-if="store.gameState === 'playing'" class="timer-bar">
      <div
        class="timer-fill"
        :style="{ width: timerPercent + '%', transition: store.timeLeft === 15 ? 'none' : '' }"
        :class="{ urgent: store.timeLeft <= 5 }"
      ></div>
    </div>

    <!-- Centred content -->
    <div class="play-content">

      <p v-if="store.gameState === 'playing'" class="progress">
        Question {{ store.progress.current }} of {{ store.progress.total }}
      </p>

      <QuestionCard
        v-if="store.gameState === 'playing' && store.currentQuestion"
        :question="store.currentQuestion"
        :selectedAnswer="store.selectedAnswer"
        @answer="store.submitAnswer"
      />

      <ScoreBoard
        v-else-if="store.gameState === 'end'"
        :score="store.score"
        :total="store.questions.length"
        @restart="handleRestart"
      />

      <div v-if="store.gameState === 'end'">
        <h2>Game Over</h2>
        <p>You scored {{ store.score }} of {{ store.questions.length }}</p>
        <div v-if="!store.scoreSubmitted">
          <input
            v-model="store.playerName"
            placeholder="Enter your name"
          />
          <button @click="store.submitScore()">Submit Score</button>
        </div>
        <p v-else>Score submitted! ✓</p>
        <button @click="handleRestart">Play Again</button>
      </div>

    </div>

  </div>
</template>

<script>
import { useGameStore } from '../stores/gameStore.js'
import QuestionCard from '../components/QuestionCard.vue'
import ScoreBoard from '../components/ScoreBoard.vue'

export default {
  name: 'PlayView',
  components: { QuestionCard, ScoreBoard },

  setup() {
    const store = useGameStore()
    return { store }
  },

  computed: {
    timerPercent() {
      return (this.store.timeLeft / 15) * 100
    }
  },

  methods: {
    handleRestart() {
      this.store.resetGame()
      this.$router.push({ name: 'home' })
    }
  }
}
</script>

<style scoped>
.play-view {
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.timer-bar {
  width: 100%;
  height: 8px;
  background: #333;
  overflow: hidden;
  flex-shrink: 0;
}

.timer-fill {
  height: 100%;
  background: #4caf50;
  transition: width 0.9s linear;
  margin-left: auto;
}

.timer-fill.urgent {
  background: #e53935;
}

.play-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  box-sizing: border-box;
  gap: 1rem;
}

.progress {
  text-align: center;
  color: #aaa;
  margin: 0;
}
</style>
