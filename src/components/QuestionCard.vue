<template>
  <div class="question-card">
    <p class="question-text">{{ question.question }}</p>
    <div class="answers">
      <button
        v-for="(answer, index) in question.answers"
        :key="index"
        :disabled="answered"
        :class="answerClass(index)"
        @click="handleAnswer(index)"
      >
        {{ answer }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuestionCard',

  props: {
    question: {
      type: Object,
      required: true,
    },
  },

  emits: ['answer'],

  data() {
    return {
      answered: false,
      selectedIndex: null,
    }
  },

  methods: {
    handleAnswer(index) {
      this.answered = true
      this.selectedIndex = index

      const isCorrect = index === this.question.correct

      setTimeout(() => {
        this.$emit('answer', isCorrect)
        this.answered = false
        this.selectedIndex = null
      }, 1000)
    },

    answerClass(index) {
      if (!this.answered || this.selectedIndex === null) return ''
      if (index === this.question.correct) return 'correct'
      if (index === this.selectedIndex) return 'wrong'
      return ''
    },
  },
}
</script>

<style scoped>
.question-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.question-text {
  font-size: 1.5rem;
  text-align: center;
  margin: 0;
}

.answers {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  width: 100%;
  max-width: 500px;
}

button {
  padding: 0.75rem 1rem;
  font-size: 1rem;
  cursor: pointer;
}

button:disabled {
  cursor: not-allowed;
}

button.correct {
  background-color: #22c55e;
  color: white;
  border-color: #16a34a;
}

button.wrong {
  background-color: #ef4444;
  color: white;
  border-color: #dc2626;
}
</style>
