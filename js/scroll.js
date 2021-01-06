$(function() {

    gsap.registerPlugin(ScrollTrigger);
    let tl1 = gsap.timeline({
        scrollTrigger: {
            trigger: ".horizontal-container .panel.two .card:nth-child(4)",
            start: "top center",
            end: "600px top",
            scrub: 1,
            // markers:true,
            toggleActions: "restart pause restart pause"
        }
    });
    tl1.from(".horizontal-container .panel.two .card", {
        y: 400,
        opacity: 0,
        duration: 1.2,
        stagger: 0.6
    });

    let sections = gsap.utils.toArray(".this"),
        container = document.querySelector(".horizontal-container");

    gsap.to(sections, {

        ease: "none",
        scrollTrigger: {
            trigger: container,
            id: "trigger",
            pin: true,
            scrub: 1,
            snap: 1 / (sections.length - 1),
            end: () => "+=" + container.offsetWidth
        }
    });
    ScrollTrigger.matchMedia({

        // desktop
        pinSpacing: false,
    });
});