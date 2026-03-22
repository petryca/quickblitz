<template>
  <div class="question-card">
    <p class="question-text">{{ question.question }}</p>
    <div class="answers">
      <button
        v-for="(answer, index) in question.answers"
        :key="index"
        :class="buttonClass(index)"
        :disabled="selectedAnswer !== null"
        @click="selectAnswer(index)"
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
      required: true
      // { question: String, answers: Array, correct: Number }
    },
    selectedAnswer: {
      type: Number,
      default: null
      // null = no answer chosen yet
      // 0/1/2/3 = the index of the button the player clicked
    }
  },

  emits: ['answer'],

  data() {
    return {
      // nothing needed here — state comes from props
    }
  },


  methods: {
    selectAnswer(index) {
      if (this.selectedAnswer !== null) return  // already answered, ignore
      this.$emit('answer', index)
    },

    buttonClass(index) {
      if (this.selectedAnswer === null) return ''
      if (index === this.question.correct) return 'correct'
      if (index === this.selectedAnswer) return 'wrong'
      return ''
    },

    // answerClass(index) {
    //   if (!this.answered || this.selectedIndex === null) return ''
    //   if (index === this.question.correct) return 'correct'
    //   if (index === this.selectedIndex) return 'wrong'
    //   return ''
    // },
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
