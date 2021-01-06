$(function () {
    gsap.registerPlugin(ScrollTrigger);

    let sections = gsap.utils.toArray(".tea");
    if ($(window).width() > 1500) {
        gsap.to(sections, {
            xPercent: -81 * (sections.length - 1),
            ease: "none",
            scrollTrigger: {
                trigger: ".tea_place",
                pin: true,
                scrub: 1,
                snap: 1 / (sections.length - 1),
                // base vertical scrolling on how wide the container is so it feels more natural.
                end: () => "+=" + document.querySelector(".tea_place").offsetWidth
            }
        });
    } else if ($(window).width() > 1000) {
        gsap.to(sections, {
            xPercent: -82.5 * (sections.length - 1),
            ease: "none",
            scrollTrigger: {
                trigger: ".tea_place",
                pin: true,
                scrub: 1,
                snap: 1 / (sections.length - 1),
                // base vertical scrolling on how wide the container is so it feels more natural.
                end: () => "+=" + document.querySelector(".tea_place").offsetWidth
            }
        });
    } else if ($(window).width() > 700) {

        gsap.to(sections, {
            xPercent: -85 * (sections.length - 1),
            ease: "none",
            scrollTrigger: {
                trigger: ".tea_place",
                pin: true,
                scrub: 1,
                snap: 1 / (sections.length - 1),
                // base vertical scrolling on how wide the container is so it feels more natural.
                end: () => "+=" + document.querySelector(".tea_place").offsetWidth
            }
        });

    } else if ($(window).width() > 300) {

        gsap.to(sections, {
            xPercent: -97 * (sections.length - 1),
            ease: "none",
            scrollTrigger: {
                trigger: ".tea_place",
                pin: true,
                scrub: 1,
                snap: 1 / (sections.length - 1),
                // base vertical scrolling on how wide the container is so it feels more natural.
                end: () => "+=" + document.querySelector(".tea_place").offsetWidth
            }
        });
    }
});