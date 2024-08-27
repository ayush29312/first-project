function locomotiveAnimation(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
});




// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
locomotiveAnimation()

function navBarAnimation() {
    gsap.to(".top-icon svg",{
        transform:"translateY(-100%)",
        scrollTrigger:{
            trigger:".page1",
            scroller:".main",
            start:"top 0",
            end:"top -5%",
            scrub:true
        }
    })
    gsap.to(".nav-elms .nav-links",{
        transform:"translateY(-100%)",
        opacity:0,
        scrollTrigger:{
            trigger:".page1",
            scroller:".main",
            start:"top 0",
            end:"top -5%",
            scrub:true
        }
    })
}
navBarAnimation()

function playButtonAnimation(){
    let videoCont = document.querySelector(".video-container")
let play = document.querySelector(".play")
videoCont.addEventListener("mouseenter",function(){
    gsap.to(play,{
        scale:1,
        opacity:1
    })

})
videoCont.addEventListener("mouseleave",function(){
    gsap.to(play,{
        scale:0,
        opacity:0
    })
})
videoCont.addEventListener("mousemove",function(dets){
    gsap.to(play,{
        left:dets.x-80,
        top:dets.y-70,
    })
})
}
playButtonAnimation()

function changeTheCourseAnimation(){
gsap.to(".page1 h1",{
    y:-50,
    opacity:1,
    delay:0.5,
    duration:0.9,
    stagger:0.2
})
gsap.to(".page1 .video-container",{
    scale:1,
    opacity:1,
    delay:1.3,
    duration:0.3,
    stagger:0.3
})
}
changeTheCourseAnimation()

function circleMoveWithMouse(){
document.addEventListener("mousemove",function(dets){
    gsap.to(".moving-cursor",{
        left:dets.x,
        top:dets.y

    })
})
let cur =  document.querySelectorAll(".page3-cont").forEach(function(elm){
    elm.addEventListener("mouseenter",function(){
        gsap.to(".moving-cursor",{
            transform: 'translate(-50%,-50%) scale(1)',
        })
    })
    elm.addEventListener("mouseleave",function(){
        gsap.to(".moving-cursor",{
            transform: 'translate(-50%,-50%) scale(0)',
        })
    })
})
}
circleMoveWithMouse()