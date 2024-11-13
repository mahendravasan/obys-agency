function locoScrollAnimation() {
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
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y
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
}

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
  tl.to("#loader .line", {
    opacity: 0,
    delay: 3,
    duration: 1.5
  })
  tl.to("#loader", {
    duration: 1.5,
    y: "-102%",
    ease: "power4.inOut"
  })
  // tl.from("#page1", {
  //   y: "100%",
  //   duration: 1.5,
  //   ease: "power4.inOut"
  // })
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
  // document.addEventListener("mousemove", (e) => {
  //   // console.log("mousemove", e.x, e.y)
  //   gsap.to(".cursor", {
  //     x: e.x,
  //     y: e.y
  //     // duration: 0.1
  //   })
  // })

  Shery.mouseFollower({
    skew: true,
    ease: "cubic-bezier(0.23, 1, 0.320, 1)",
    duration: 1
  })

  Shery.makeMagnet(".nav-menu li, .logo, .footer-links ul li", {
    // ease: "cubic-bezier(0.23, 1, 0.320, 1)",
    // duration: 0.5
  })
  var videoContainer = document.querySelector(".video-main")
  var video = document.querySelector(".video-main video")
  videoContainer.addEventListener("mouseenter", () => {
    videoContainer.addEventListener("mousemove", (e) => {
      gsap.to(".mousefollower", {
        opacity: 0
      })
      gsap.to(".video-cursor", {
        x: e.x - 1700,
        y: e.y - 250
      })
    })
  })
  videoContainer.addEventListener("mouseleave", () => {
    gsap.to(".mousefollower", {
      opacity: 1
    })
    gsap.to(".video-cursor", {
      x: "-50%", // 80% of window width
      y: "-10%"
    })
  })

  var flag = 0
  videoContainer.addEventListener("click", () => {
    if (flag == 0) {
      document.querySelector(".video-cursor").innerHTML = "<i class='ri-pause-fill'></i>"
      gsap.to(".video-cursor", {
        scale: 0.5
      })
      video.play()
      video.style.opacity = 1
      flag = 1
    } else {
      document.querySelector(".video-cursor").innerHTML = "<i class='ri-play-fill'></i>"
      gsap.to(".video-cursor", {
        scale: 1
      })
      video.pause()
      video.style.opacity = 0
      flag = 0
    }
  })
}

function sheryAnimation() {
  Shery.imageEffect(".img-item", {
    style: 5,
    // debug: true,
    config: {
      a: { value: 1.15, range: [0, 30] },
      b: { value: -0.74, range: [-1, 1] },
      zindex: { value: -9996999, range: [-9999999, 9999999] },
      aspect: { value: 0.714294018485148 },
      ignoreShapeAspect: { value: true },
      shapePosition: { value: { x: 0, y: 0 } },
      shapeScale: { value: { x: 0.5, y: 0.5 } },
      shapeEdgeSoftness: { value: 0.05, range: [0, 0.5] },
      shapeRadius: { value: 0.02, range: [0, 2] },
      currentScroll: { value: 0 },
      scrollLerp: { value: 0.07 },
      gooey: { value: true },
      infiniteGooey: { value: false },
      growSize: { value: 4, range: [1, 15] },
      durationOut: { value: 1, range: [0.1, 5] },
      durationIn: { value: 1.5, range: [0.1, 5] },
      displaceAmount: { value: 0.5 },
      masker: { value: true },
      maskVal: { value: 1.4, range: [1, 5] },
      scrollType: { value: 0 },
      geoVertex: { range: [1, 64], value: 1 },
      noEffectGooey: { value: true },
      onMouse: { value: 1 },
      noise_speed: { value: 0.75, range: [0, 10] },
      metaball: { value: 0.49, range: [0, 2] },
      discard_threshold: { value: 0.5, range: [0, 1] },
      antialias_threshold: { value: 0, range: [0, 0.1] },
      noise_height: { value: 0.37, range: [0, 2] },
      noise_scale: { value: 10, range: [0, 100] }
    },
    gooey: true
  })
}

function fillUnderlineAnimation() {
  document.querySelectorAll(".underline").forEach((underline) => {
    gsap.from(underline, {
      width: 0,
      duration: 1,
      scrollTrigger: {
        trigger: underline,
        scroller: "#main",
        // markers: true,
        start: "top 100%",
        end: "top 60%",
        scrub: 3
      }
    })
  })
}

function textAnimation() {
  var titleText1 = document.querySelector("#footer-title1").textContent.trim()
  var titleText2 = document.querySelector("#footer-title2").textContent.trim()

  var clutteredText1 = ""
  var clutteredText2 = ""

  titleText1.split("").forEach((char) => {
    clutteredText1 += `<span class='letter'>${char === " " ? "&nbsp;" : char}</span>`
  })

  titleText2.split("").forEach((char) => {
    clutteredText2 += `<span class='letter'>${char === " " ? "&nbsp;" : char}</span>`
  })

  document.querySelector("#footer-title1").innerHTML = clutteredText1
  document.querySelector("#footer-title2").innerHTML = clutteredText2

  document.querySelector("#footer-title1").addEventListener("mouseenter", () => {
    gsap.to("#footer-title1 .letter", {
      opacity: 0,
      stagger: 0.05,
      duration: 0.3,
      zIndex: 0
    })
    gsap.to("#footer-title2 .letter", {
      opacity: 1,
      delay: 0.2,
      stagger: 0.05,
      duration: 0.3,
      zIndex: 1
    })
    gsap.to(".footer .arrow", {
      x: 50,
      delay: 1,
      duration: 0.3
    })
  })
  document.querySelector("#footer-title1").addEventListener("mouseleave", () => {
    gsap.to("#footer-title1 .letter", {
      opacity: 1,
      delay: 0.2,
      stagger: 0.05,
      duration: 0.3,
      zIndex: 1
    })
    gsap.to("#footer-title2 .letter", {
      opacity: 0,
      stagger: 0.05,
      duration: 0.3,
      zIndex: 0
    })
    gsap.to(".footer .arrow", {
      x: 0,
      delay: 1,
      duration: 0.3
    })
  })
}

locoScrollAnimation()
loadingAnimation()
cursorAnimation()
sheryAnimation()
fillUnderlineAnimation()
textAnimation()
