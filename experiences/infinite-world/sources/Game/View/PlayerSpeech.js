import * as THREE from 'three'

export default class PlayerSpeech
{
    constructor(player)
    {
        this.player = player
        this.view = player.view
        this.state = player.state

        this.distanceTraveled = 0
        this.lastMilestone = 0
        this.stepDistanceThreshold = 18 // Units of movement between speech iterations
        this.speechTimer = null
        this.isVisible = false
        this.hovered = false
        this.hasShownGreeting = false

        this.currentX = window.innerWidth / 2
        this.currentY = window.innerHeight / 2
        this.headPos = new THREE.Vector3()

        this.quotes = [
            // --- JOKES ---
            { type: 'joke', badge: 'DEV HUMOR 🤖', text: "Why do programmers prefer dark mode? Because light attracts bugs. 🐛" },
            { type: 'joke', badge: 'DEV HUMOR 🤖', text: "There are 10 types of people in the world: those who understand binary, and those who don't." },
            { type: 'joke', badge: 'DEV HUMOR 🤖', text: "A SQL query walks into a bar, sees two tables and asks: 'Can I join you?' 🍺" },
            { type: 'joke', badge: 'DEV HUMOR 🤖', text: "Why was the JavaScript developer sad? Because they didn't know how to 'null' their feelings." },
            { type: 'joke', badge: 'DEV HUMOR 🤖', text: "Hardware is the part of a computer you can kick. Software is what you curse at. 💻" },
            { type: 'joke', badge: 'DEV HUMOR 🤖', text: "How many programmers does it take to change a lightbulb? None, that's a hardware issue." },
            { type: 'joke', badge: 'DEV HUMOR 🤖', text: "Debugging: Being the detective in a crime movie where you are also the murderer. 🔍" },
            { type: 'joke', badge: 'DEV HUMOR 🤖', text: "CSS is like playing Tetris where the blocks are on fire and the board is upside down." },
            { type: 'joke', badge: 'DEV HUMOR 🤖', text: "Why do Java programmers wear glasses? Because they can't C#." },
            { type: 'joke', badge: 'DEV HUMOR 🤖', text: "!false — it's funny because it's true." },

            // --- MOVIE PICKS ---
            { type: 'movie', badge: 'CINEMA PICK 🎬', text: "Interstellar (2014) — 'We used to look up at the sky and wonder at our place in the stars.' Masterpiece." },
            { type: 'movie', badge: 'CINEMA PICK 🎬', text: "Spider-Man: Into the Spider-Verse — Pure creative genius, comic craft, and kinetic animation perfection." },
            { type: 'movie', badge: 'CINEMA PICK 🎬', text: "The Social Network — Sorkin's razor-sharp tempo and the electric birth of modern hacker culture." },
            { type: 'movie', badge: 'CINEMA PICK 🎬', text: "Inception — Christopher Nolan showing what happens when human imagination has zero boundaries." },
            { type: 'movie', badge: 'CINEMA PICK 🎬', text: "The Matrix (1999) — The original red pill. Still the coolest cyber-philosophy film ever made." },
            { type: 'movie', badge: 'CINEMA PICK 🎬', text: "Blade Runner 2049 — Stunning cinematography, haunting synth atmosphere, absolute pure cinema." },
            { type: 'movie', badge: 'CINEMA PICK 🎬', text: "Whiplash — Obsessive dedication, relentless rhythm, and what it truly costs to become extraordinary." },
            { type: 'movie', badge: 'CINEMA PICK 🎬', text: "Arrival — Non-linear time perception, profound storytelling, and brilliant alien linguistics." },

            // --- FUTURE MOTIVATION ---
            { type: 'motivation', badge: 'FUTURE MOTIVATION ⚡', text: "'The best way to predict the future is to invent it.' Build bold ideas without waiting for permission." },
            { type: 'motivation', badge: 'FUTURE MOTIVATION ⚡', text: "Code is modern wizardry. You think an idea into existence and the world can experience it. ✨" },
            { type: 'motivation', badge: 'FUTURE MOTIVATION ⚡', text: "'Every master was once a beginner who refused to quit.' Keep sprinting forward." },
            { type: 'motivation', badge: 'FUTURE MOTIVATION ⚡', text: "'Simplicity is prerequisite for reliability.' Keep your architecture clean, fast, and ambitious." },
            { type: 'motivation', badge: 'FUTURE MOTIVATION ⚡', text: "Focus obsessively on the craft. When the work is undeniable, everything else takes care of itself." },
            { type: 'motivation', badge: 'FUTURE MOTIVATION ⚡', text: "Stay curious, design with taste, and never be afraid to push the boundary of what's possible." },
            { type: 'motivation', badge: 'FUTURE MOTIVATION ⚡', text: "'The difference between ordinary and extraordinary is that little extra.' Leave your mark." }
        ]

        this.lastQuoteIndex = -1

        this.createDOM()
        this.setupEvents()
    }

    createDOM()
    {
        this.element = document.createElement('div')
        this.element.className = 'player-speech-bubble'
        this.element.innerHTML = `
            <div class="speech-glass-card">
                <div class="speech-header">
                    <span class="speech-badge">BHAVISHYA 👋</span>
                </div>
                <div class="speech-body">
                    <p class="speech-text">Hi! I'm Bhavishya. Run around and explore the world with me! 🚀</p>
                </div>
                <div class="speech-footer">
                    <span class="speech-hint">click to cycle • keep running</span>
                </div>
            </div>
            <div class="speech-pointer"></div>
        `

        document.body.appendChild(this.element)

        this.badgeEl = this.element.querySelector('.speech-badge')
        this.textEl = this.element.querySelector('.speech-text')

        // Click to cycle immediately
        this.element.addEventListener('click', (e) =>
        {
            e.stopPropagation()
            this.showNextQuote()
        })
    }

    setupEvents()
    {
        this.raycaster = new THREE.Raycaster()
        this.mouse = new THREE.Vector2()

        window.addEventListener('mousemove', (event) =>
        {
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
            this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

            // Screen distance check to projected player head
            const dx = event.clientX - this.currentX
            const dy = event.clientY - (this.currentY + 40)
            const dist = Math.sqrt(dx * dx + dy * dy)

            if(dist < 90)
            {
                if(!this.hovered)
                {
                    this.hovered = true
                    if(!this.isVisible && !this.hasShownGreeting)
                    {
                        this.showGreeting()
                    }
                }
            }
            else
            {
                this.hovered = false
            }
        })
    }

    showGreeting()
    {
        this.hasShownGreeting = true
        this.badgeEl.textContent = 'BHAVISHYA 👋'
        this.badgeEl.style.borderColor = 'rgba(0, 240, 255, 0.6)'
        this.badgeEl.style.color = '#00f0ff'
        this.badgeEl.style.background = 'rgba(0, 240, 255, 0.12)'
        this.textEl.textContent = "Hi! I'm Bhavishya. Use WASD or Arrow Keys to run and explore this world with me! 🌟"
        this.show()
    }

    showNextQuote()
    {
        let nextIndex
        do {
            nextIndex = Math.floor(Math.random() * this.quotes.length)
        } while (nextIndex === this.lastQuoteIndex && this.quotes.length > 1)

        this.lastQuoteIndex = nextIndex
        const quote = this.quotes[nextIndex]

        // Color badge based on category
        let color = '#00f0ff' // cyan for dev humor
        let bg = 'rgba(0, 240, 255, 0.12)'
        if(quote.type === 'movie') {
            color = '#ff0077' // neon magenta/rose for cinema
            bg = 'rgba(255, 0, 119, 0.12)'
        }
        if(quote.type === 'motivation') {
            color = '#00ff88' // neon emerald for motivation
            bg = 'rgba(0, 255, 136, 0.12)'
        }

        this.badgeEl.textContent = quote.badge
        this.badgeEl.style.borderColor = color
        this.badgeEl.style.color = color
        this.badgeEl.style.background = bg
        this.textEl.textContent = quote.text

        this.show()
    }

    show()
    {
        this.isVisible = true
        this.element.classList.add('is-visible')

        if(this.speechTimer)
            clearTimeout(this.speechTimer)

        // Stays visible for 6.0 seconds, then fades out
        this.speechTimer = setTimeout(() =>
        {
            this.hide()
        }, 6000)
    }

    hide()
    {
        this.isVisible = false
        this.element.classList.remove('is-visible')
    }

    update(delta)
    {
        const playerState = this.state.player
        if(!playerState || !this.player.group)
            return

        // Track movement distance to trigger thoughts on iteration
        const speed = playerState.speed || 0
        if(speed > 0.005)
        {
            this.distanceTraveled += speed * (delta || 0.016) * 60

            if(this.distanceTraveled - this.lastMilestone >= this.stepDistanceThreshold)
            {
                this.lastMilestone = this.distanceTraveled
                this.showNextQuote()
            }
        }

        // Project 3D player head position to 2D screen coordinates
        const camera = this.view.camera ? this.view.camera.instance : null
        if(camera)
        {
            this.headPos.set(
                playerState.position.current[0],
                playerState.position.current[1] + 1.85,
                playerState.position.current[2]
            )

            this.headPos.project(camera)

            // Behind camera check
            if(this.headPos.z > 1.0)
            {
                this.element.style.opacity = '0'
                this.element.style.pointerEvents = 'none'
                return
            }

            const targetX = (this.headPos.x * 0.5 + 0.5) * window.innerWidth
            const targetY = (-this.headPos.y * 0.5 + 0.5) * window.innerHeight - 30

            // Smooth lerp to prevent camera movement jitter
            this.currentX += (targetX - this.currentX) * 0.28
            this.currentY += (targetY - this.currentY) * 0.28

            this.element.style.left = `${this.currentX}px`
            this.element.style.top = `${this.currentY}px`
        }
    }
}
