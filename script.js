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
  duration: 2,
  ease: "power4.inOut"
})
