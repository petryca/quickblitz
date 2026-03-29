import { defineStore } from 'pinia'
import { QUESTIONS as questionBank } from '../data/questions.js'

export const useGameStore = defineStore('game', {

    state: () => ({
        questions: [],
        currentIndex: 0,
        score: 0,
        gameState: 'start',    // 'start' | 'playing' | 'end'
        selectedAnswer: null,  // index of the button the player clicked, or null
        timeLeft: 15,
        _timerInterval: null,  // internal — managed by the store only
        _advanceTimeout: null,  // internal — tracks the 1s post-answer delay
        playerName: '',
        scoreSubmitted: false
    }),

    getters: {

        // The question the player is currently looking at
        currentQuestion: (state) => state.questions[state.currentIndex],

        // True when the current question is the last one
        isLastQuestion: (state) => state.currentIndex >= state.questions.length - 1,

        // Progress info for the "Question X of Y" display
        progress: (state) => ({
            current: state.currentIndex + 1,
            total: state.questions.length
        })

    },

    actions: {

        _startTimer() {
            this._stopTimer()           // always clear any existing timer first
            this._timerInterval = setInterval(() => {
                this.tick()
            }, 1000)
        },

        _stopTimer() {
            if (this._timerInterval) {
                clearInterval(this._timerInterval)
                this._timerInterval = null
            }
        },

        tick() {
            if (this.timeLeft > 0) {
                this.timeLeft--
            } else {
                this.nextQuestion()   // time's up — skip to next, no points
            }
        },

        async startGame() {
            const response = await fetch('http://localhost:3000/api/questions/random')
            const questions = await response.json()
            this.questions = questions
            this.currentIndex = 0
            this.score = 0
            this.gameState = 'playing'
            this.selectedAnswer = null
            this.timeLeft = 15
            this._startTimer()
            // this.questions = [...questionBank]   // fresh copy each game
            // this.currentIndex = 0
            // this.score = 0
            // this.gameState = 'playing'
            // this.selectedAnswer = null
            // this.timeLeft = 15
            // this._startTimer()
        },

        submitAnswer(answerIndex) {
            if (this.selectedAnswer !== null) return  // ignore double-clicks
            this._stopTimer()
            this.selectedAnswer = answerIndex
            const isCorrect = answerIndex === this.currentQuestion.correct
            if (isCorrect) this.score++
            this._advanceTimeout = setTimeout(() => {
                this._advanceTimeout = null
                this.nextQuestion()
            }, 1000)
        },

        nextQuestion() {
            // Cancel any pending post-answer advance to prevent double-advancing
            if (this._advanceTimeout) {
                clearTimeout(this._advanceTimeout)
                this._advanceTimeout = null
            }
            this.selectedAnswer = null
            this.timeLeft = 15
            if (this.isLastQuestion) {
                this._stopTimer()
                this.gameState = 'end'
            } else {
                this.currentIndex++
                this._startTimer()
            }
        },

        resetGame() {
            this._stopTimer()
            if (this._advanceTimeout) {
                clearTimeout(this._advanceTimeout)
                this._advanceTimeout = null
            }
            this.questions = []
            this.currentIndex = 0
            this.score = 0
            this.gameState = 'start'
            this.selectedAnswer = null
            this.timeLeft = 15
            this.playerName = ''
            this.scoreSubmitted = false
        },

        async submitScore() {
            if (!this.playerName.trim()) return
            const response = await fetch('http://localhost:3000/api/scores', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    playerName: this.playerName,
                    score: this.score,
                    totalQuestions: this.questions.length
                })
            })
            if (response.ok) {
                this.scoreSubmitted = true
            }
        }

    }

})
