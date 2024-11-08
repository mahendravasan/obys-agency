function loadingAnimation() {
  var tl = gsap.timeline()
  tl.from(".line h1", {
    y: 150,
    stagger: 0.2,
    duration: 0.5,
    delay: 0.4
  })
  tl.from(".loader-counter, .now", {
    opacity: 0,
    duration: 1,
    onStart: () => {
      var count = document.querySelector(".loader-count")
      var grow = 0
      setInterval(() => {
        if (grow < 100) {
          count.innerHTML = grow++
        } else {
          count.innerHTML = grow
        }
      }, 35)
    }
  })
  tl.to("#loader", {
    opacity: 0,
    duration: 0.5,
    delay: 3,
    display: "none"
  })
  tl.from("#page1", {
    y: "100%",
    duration: 1.5,
    ease: "power4.inOut"
  })
  tl.from("nav", {
    opacity: 0,
    duration: 0.5
  })
  tl.from(".hero-text h1, .hero-text h2", {
    y: 150,
    stagger: 0.2
  })
}

function cursorAnimation() {
  document.addEventListener("mousemove", (e) => {
    console.log("mousemove", e.x, e.y)
    gsap.to(".cursor", {
      x: e.x,
      y: e.y
      // duration: 0.1
    })
  })

  Shery.makeMagnet(".nav-menu li, .logo, .footer-links ul li", {
    // ease: "cubic-bezier(0.23, 1, 0.320, 1)",
    // duration: 0.5
  })
}

loadingAnimation()

cursorAnimation()
