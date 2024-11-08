gsap.registerPlugin(ScrollTrigger)

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
})
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update)

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
})

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
ScrollTrigger.addEventListener("refresh", () => locoScroll.update())

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh()

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
  tl.from(
    "#hero-text1, #page2",
    {
      opacity: 0,
      duration: 0.5
    },
    "-=1.2" // this element will start first using this code(-=1.2)
  )
}

function cursorAnimation() {
  document.addEventListener("mousemove", (e) => {
    // console.log("mousemove", e.x, e.y)
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
