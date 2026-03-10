window.addEventListener("load", () => {

    const preloader = document.getElementById("preloader")

    preloader.style.opacity = "0"

    setTimeout(() => {
        preloader.style.display = "none"
    }, 600)

})

// Event counter 
const eventDate = new Date("2026-03-21T10:00:00").getTime()

function updateValue(id, value) {

    const el = document.getElementById(id)

    if (el.innerText != value) {

        el.style.transform = "scale(1.2)"

        setTimeout(() => {
            el.innerText = value
            el.style.transform = "scale(1)"
        }, 150)

    }

}

function updateCountdown() {

    const now = new Date().getTime()

    const distance = eventDate - now

    const days = Math.floor(distance / (1000 * 60 * 60 * 24))
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((distance % (1000 * 60)) / 1000)

    updateValue("days", days)
    updateValue("hours", hours)
    updateValue("minutes", minutes)
    updateValue("seconds", seconds)
}

setInterval(updateCountdown, 1000)
updateCountdown()

// Counter animation for Active members, projects and all 
const counters = document.querySelectorAll(".stat-number")

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const counter = entry.target
            const target = +counter.dataset.target

            let count = 0

            const update = () => {

                const increment = target / 80

                count += increment

                if (count < target) {

                    counter.innerText = Math.ceil(count)

                    requestAnimationFrame(update)

                } else {

                    counter.innerText = target

                }

            }

            update()

            observer.unobserve(counter)

        }

    })

})

counters.forEach(counter => {
    observer.observe(counter)
})


// Scroll reveal script 
const revealElements = document.querySelectorAll(".reveal")

const revealObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("active")

        }

    })

}, { threshold: 0.2 })

revealElements.forEach(el => {
    revealObserver.observe(el)
})


// Particle background 
particlesJS("particles-js", {

    particles: {

        number: {
            value: 60
        },

        color: {
            value: "#00D4FF"
        },

        shape: {
            type: "circle"
        },

        opacity: {
            value: 0.5
        },

        size: {
            value: 3
        },

        line_linked: {
            enable: true,
            distance: 120,
            color: "#00D4FF",
            opacity: 0.3,
            width: 1
        },

        move: {
            enable: true,
            speed: 1
        }

    }

})