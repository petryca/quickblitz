<template>
  <div class="start-screen">
    <h1>QuizBlitz</h1>
    <p class="tagline">Test your knowledge at lightning speed!</p>
    <button @click="$emit('start')">Play</button>
  </div>
</template>

<script>
export default {
  name: 'StartScreen',
  emits: ['start'],
}
</script>

<style scoped>
.start-screen {
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

.tagline {
  font-size: 1.25rem;
  margin: 0;
  opacity: 0.75;
}

button {
  margin-top: 1rem;
  padding: 0.75rem 2.5rem;
  font-size: 1.25rem;
  cursor: pointer;
}
</style>
