<template>
  <div class="play-view">
    <template v-if="gameState === 'playing'">
      <div class="progress">Question {{ currentIndex + 1 }} / {{ questions.length }}</div>
      <QuestionCard
        :key="currentIndex"
        :question="questions[currentIndex]"
        @answer="handleAnswer"
      />
    </template>

    <ScoreBoard
      v-else-if="gameState === 'end'"
      :score="score"
      @restart="startGame"
    />
  </div>
</template>

<script>
import QuestionCard from '../components/QuestionCard.vue'
import ScoreBoard from '../components/ScoreBoard.vue'

const QUESTIONS = [
  {
    question: 'What is the capital of France?',
    answers: ['Berlin', 'Madrid', 'Paris', 'Rome'],
    correct: 2,
  },
  {
    question: 'Which planet is known as the Red Planet?',
    answers: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
    correct: 1,
  },
  {
    question: 'How many sides does a hexagon have?',
    answers: ['5', '6', '7', '8'],
    correct: 1,
  },
  {
    question: 'Who wrote "Romeo and Juliet"?',
    answers: ['Charles Dickens', 'Jane Austen', 'William Shakespeare', 'Mark Twain'],
    correct: 2,
  },
  {
    question: 'What is the chemical symbol for water?',
    answers: ['O2', 'CO2', 'H2O', 'NaCl'],
    correct: 2,
  },
  {
    question: 'Which country invented the Olympic Games?',
    answers: ['Italy', 'Egypt', 'China', 'Greece'],
    correct: 3,
  },
  {
    question: 'What is the largest ocean on Earth?',
    answers: ['Atlantic', 'Indian', 'Arctic', 'Pacific'],
    correct: 3,
  },
  {
    question: 'How many keys does a standard piano have?',
    answers: ['76', '88', '92', '100'],
    correct: 1,
  },
  {
    question: 'Which gas do plants absorb from the atmosphere?',
    answers: ['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Hydrogen'],
    correct: 2,
  },
  {
    question: 'What is 12 multiplied by 12?',
    answers: ['124', '144', '132', '148'],
    correct: 1,
  },
]

export default {
  name: 'PlayView',

  components: { QuestionCard, ScoreBoard },

  data() {
    return {
      questions: QUESTIONS,
      currentIndex: 0,
      score: 0,
      gameState: 'playing',
    }
  },

  mounted() {
    this.startGame()
  },

  methods: {
    startGame() {
      this.currentIndex = 0
      this.score = 0
      this.gameState = 'playing'
    },

    handleAnswer(isCorrect) {
      if (isCorrect) this.score++

      if (this.currentIndex < this.questions.length - 1) {
        this.currentIndex++
      } else {
        this.gameState = 'end'
      }
    },

    goHome() {
      this.$router.push({ name: 'home' })
    },
  },
}
</script>

<style scoped>
.play-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}

.progress {
  font-size: 1rem;
  opacity: 0.6;
  letter-spacing: 0.05em;
}
</style>
