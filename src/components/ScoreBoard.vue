<template>
  <div class="score-board">
    <h1>Game Over</h1>
    <p class="score">You scored {{ score }} / 10</p>
    <button @click="$emit('restart')">Play Again</button>
  </div>
</template>

<script>
export default {
  name: 'ScoreBoard',
  props: {
    score: {
      type: Number,
      required: true,
    },
  },
  emits: ['restart'],
}
</script>

<style scoped>
.score-board {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

h1 {
  font-size: 3rem;
  margin: 0;
}

.score {
  font-size: 1.5rem;
  margin: 0;
}

button {
  margin-top: 1rem;
  padding: 0.75rem 2.5rem;
  font-size: 1.25rem;
  cursor: pointer;
}
</style>
