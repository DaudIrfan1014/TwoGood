function scrolltri() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
scrolltri();
// --------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>--------------------------------
function playAnimation() {
  let video = document.querySelector("#videoDiv");
  let play = document.querySelector("#play");
  video.addEventListener("mouseenter", function () {
    gsap.to(play, {
      opacity: 1,
      scale: 1,
    });
  });
  video.addEventListener("mouseleave", function () {
    gsap.to(play, {
      opacity: 0,
      scale: 0,
    });
  });
  video.addEventListener("mousemove", function (dets) {
    gsap.to(play, {
      left: dets.x - 70,
      top: dets.y - 80,
    
    });
  });
}
playAnimation();
// --------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>--------------------------------
function pagecolor() {
  document.querySelector("#items1").addEventListener("mouseenter", function () {
    gsap.to("#cursor", {
      opacity: 1,
      scale: 1,
      backgroundColor: "lightgrey",
    });
  });
  document.querySelector("#items1").addEventListener("mouseleave", function () {
    gsap.to("#cursor", {
      opacity: 0,
      scale: 0,
    });
  });
  document
    .querySelector("#items1")
    .addEventListener("mousemove", function (dets) {
      gsap.to("#cursor", {
        left: dets.x - 70,
        top: dets.y - 80,
      });
    });

  document.querySelector("#items2").addEventListener("mouseenter", function () {
    gsap.to("#cursor", {
      opacity: 1,
      scale: 1,
      backgroundColor: "#0a2474",
      opacity: 0.6,
    });
  });
  document.querySelector("#items2").addEventListener("mouseleave", function () {
    gsap.to("#cursor", {
      opacity: 0,
      scale: 0,
    });
  });
  document
    .querySelector("#items2")
    .addEventListener("mousemove", function (dets) {
      gsap.to("#cursor", {
        left: dets.x - 70,
        top: dets.y - 80,
      });
    });
  document.querySelector("#items3").addEventListener("mouseenter", function () {
    gsap.to("#cursor", {
      opacity: 1,
      scale: 1,
      backgroundColor: "black",
      opacity: 0.4,
    });
  });
  document.querySelector("#items3").addEventListener("mouseleave", function () {
    gsap.to("#cursor", {
      opacity: 0,
      scale: 0,
    });
  });
  document
    .querySelector("#items3")
    .addEventListener("mousemove", function (dets) {
      gsap.to("#cursor", {
        left: dets.x - 70,
        top: dets.y - 80,
      });
    });
  document.querySelector("#items4").addEventListener("mouseenter", function () {
    gsap.to("#cursor", {
      opacity: 1,
      scale: 1,
      backgroundColor: "green",
      opacity: 0.4,
    });
  });
  document.querySelector("#items4").addEventListener("mouseleave", function () {
    gsap.to("#cursor", {
      opacity: 0,
      scale: 0,
    });
  });
  document
    .querySelector("#items4")
    .addEventListener("mousemove", function (dets) {
      gsap.to("#cursor", {
        left: dets.x - 70,
        top: dets.y - 80,
      });
    });
}
pagecolor();
// --------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>--------------------------------
function loading() {
  gsap.from("#page1 h1", {
    y: 100,
    opacity: 0,
    delay: 0.5,
    duration: 0.7,
    stagger: 0.3,
  });
  gsap.from("#page1 #videoDiv", {
    y: 100,
    opacity: 0,
    delay: 0.5,
    duration: 1,
  });
}
loading();
// --------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>--------------------------------
function headerAnimation() {
  gsap.to("header #logo svg", {
    transform: "translateY(-100%)",
    scrollTrigger: {
      trigger: "#page1",
      scroller: "#main",
      scrub: true,
      start: "top 0%",
      end: "top -5%",
    },
  });
  gsap.to("header #wrap #links", {
    opacity: 0,
    scrollTrigger: {
      trigger: "#page1",
      scroller: "#main",
      scrub: true,
      start: "top 0%",
      end: "top -5%",
    },
  });
}
headerAnimation();
// --------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>--------------------------------

if (window.innerWidth >= 550) {
  gsap.to("#page2 #images #imgDiv", {
    scrollTrigger: {
      trigger: "#videoDiv", // Specify the trigger element
      scroller: "#main",
      scrub: true,
      start: "top 15%",
      end: "top 5%",
      onEnter: () => {
        gsap.from("#page2 #images #imgDiv", {
          y: 10,
          opacity: 0,
          delay: 0.7,
          duration: 0.7,
          stagger: 0.3,
        });
      },
    },
  });
}

// --------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>--------------------------------
function hoverDiv() {
  const imgContainers = document.querySelectorAll("#imgDiv");

  // Iterate through each .img-container element
  imgContainers.forEach((imgContainer) => {
    // Get references to the elements within the current .img-container
    const oldDiv = imgContainer.querySelector(".old-div");
    const newDiv = imgContainer.querySelector(".new-div");
    const div1Image = imgContainer.querySelector("#div1 img");
    const div2Image = imgContainer.querySelector("#div2 img");

    // Create a variable to track the visibility state
    let isNewDivVisible = false;

    // Function to toggle the newDiv's visibility
    function toggleNewDiv() {
      if (isNewDivVisible) {
        newDiv.style.display = "none";
        isNewDivVisible = false;
      } else {
        newDiv.style.display = "flex";
        isNewDivVisible = true;
      }
    }

    // Set the styles for .new-div #div1 img and #div2 img using JavaScript
    div1Image.style.width = "60%";
    div2Image.style.width = "60%";

    // Event listeners for mouseover and mouseout on oldDiv
    oldDiv.addEventListener("mouseover", () => {
      toggleNewDiv(); // Toggle the visibility of newDiv
      oldDiv.style.borderRadius = "25px 25px 0px 0px";
      oldDiv.style.height = "4vw";
    });

    oldDiv.addEventListener("mouseout", () => {
      toggleNewDiv(); // Toggle the visibility of newDiv
      oldDiv.style.borderRadius = "25px";
      oldDiv.style.height = "3vw";
    });
  });
}
hoverDiv();
// --------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>--------------------------------
function input() {
  const btn = document.getElementById("btn");
  btn.addEventListener("click", function handleClick(event) {
    event.preventDefault();
    const firstNameInput = document.getElementById("first_name");
    console.log(firstNameInput.value);
    firstNameInput.value = "";
  });
}
input();
