// Set current year in footer
document.addEventListener("DOMContentLoaded", () => {
  const currentYearElement = document.getElementById("currentYear")
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear()
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        const offsetTop = target.offsetTop - 80 // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })

  // Navbar background on scroll
  const navbar = document.querySelector(".navbar")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.style.background = "rgba(30, 41, 59, 0.98)"
    } else {
      navbar.style.background = "rgba(30, 41, 59, 0.95)"
    }
  })

  // Animate elements on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe cards and sections for animation
  document.querySelectorAll(".problem-card, .benefit-card, .feature-grid-card, .contact-card").forEach((card) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(20px)"
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(card)
  })

  // Add loading animation to buttons
  document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("click", function () {
      if (!this.classList.contains("loading")) {
        this.classList.add("loading")
        setTimeout(() => {
          this.classList.remove("loading")
        }, 2000)
      }
    })
  })

  // Parallax effect for hero section
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const heroBackground = document.querySelector(".hero-background")
    if (heroBackground) {
      heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`
    }
  })

  // Add ripple effect to buttons
  document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span")
      const rect = this.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2

      ripple.style.width = ripple.style.height = size + "px"
      ripple.style.left = x + "px"
      ripple.style.top = y + "px"
      ripple.classList.add("ripple")

      this.appendChild(ripple)

      setTimeout(() => {
        ripple.remove()
      }, 600)
    })
  })
})

// Add CSS for ripple effect
const style = document.createElement("style")
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .btn.loading {
        pointer-events: none;
        opacity: 0.7;
    }
`
document.head.appendChild(style)
