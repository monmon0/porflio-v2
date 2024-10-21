$(function() {

    $(window).on('load', function () {
        stickyElHandler();
    });


    gsap.config({ trialWarn: false });
    console.clear();
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    let smoother = ScrollSmoother.create({ 
        smooth: 2,
        smoothTouch: 0.1, // Enable smooth scrolling on mobile devices
        effects: true // Optional: Enable effects if required
        });

    let masks;

    ScrollTrigger.create({
        trigger: "#smooth-content", // Change trigger to .line instead of .line span
        start: "top bottom",
        end: "bottom bottom",
        refreshPriority: -1,
        scrub: 1 // Adjust this value to control animation speed (higher value for slower animation)
    });


    // Sticky Elements
    const stickyEls = document.querySelectorAll('.sticky-statement');
    const stickyEls2 = document.querySelectorAll('.sticky-statement2');
    const stickyEls3 = document.querySelectorAll('.sticky-statement3');

    function stickyElHandler() {
        if (window.innerWidth > 1200) {
            stickyEls.forEach((panel, i) => {
                gsap.to(panel, {
                    y: () => panel.offsetHeight < window.innerHeight ? 0 : -(panel.offsetHeight - window.innerHeight),
                    ease: "none",
                    scrollTrigger: {
                        trigger: panel,
                        start: () => panel.offsetHeight < window.innerHeight ? "top 10%" : "bottom bottom",
                        end: () => panel.offsetHeight < window.innerHeight ? "bottom 90%" : "bottom bottom",
                        scrub: true,
                        pin: true,
                        pinSpacing: false,
                        invalidateOnRefresh: true
                    }
                });
            });
            stickyEls2.forEach((panel, i) => {
                gsap.to(panel, {
                    y: () => panel.offsetHeight < window.innerHeight ? 0 : -(panel.offsetHeight - window.innerHeight),
                    ease: "none",
                    scrollTrigger: {
                        trigger: panel,
                        start: () => panel.offsetHeight < window.innerHeight ? "top 10%" : "bottom bottom",
                        end: () => panel.offsetHeight < window.innerHeight ? "bottom 90%" : "bottom bottom",
                        scrub: true,
                        pin: true,
                        pinSpacing: false,
                        invalidateOnRefresh: true
                    }
                });
            });
            stickyEls3.forEach((panel, i) => {
                gsap.to(panel, {
                    y: () => panel.offsetHeight < window.innerHeight ? 0 : -(panel.offsetHeight - window.innerHeight),
                    ease: "none",
                    scrollTrigger: {
                        trigger: panel,
                        start: () => panel.offsetHeight < window.innerHeight ? "top 10%" : "bottom bottom",
                        end: () => panel.offsetHeight < window.innerHeight ? "bottom 90%" : "bottom bottom",
                        scrub: true,
                        pin: true,
                        pinSpacing: false,
                        invalidateOnRefresh: true
                    }
                });
            });
        
            stickyEls.forEach(element => {
                ScrollTrigger.create({
                    trigger: element,
                    pin: true,
                    start: "top top+=50",
                    end: "+=800",
                    markers: false
                });
            });
            stickyEls2.forEach(element => {
                ScrollTrigger.create({
                    trigger: element,
                    pin: true,
                    start: "top top+=0",
                    end: "+=870",
                    markers: false
                });
            });
            stickyEls3.forEach(element => {
                ScrollTrigger.create({
                    trigger: element,
                    pin: true,
                    start: "top top+=0",
                    end: "+=1100",
                    markers: false
                });
            });
        }
    }

    window.addEventListener('resize', () => {
        ScrollTrigger.refresh(); // Refresh on resize to fix potential issues
    });
    window.addEventListener('load', () => {
        console.log("Page fully loaded, initializing smoother");
        ScrollTrigger.refresh(); // Refresh again when page is fully loaded
    });
    window.addEventListener('resize', stickyElHandler);


    /* ===== Transform ===== */
    function ShowcaseOverlapping() {
        gsap.utils.toArray('.about-sec').forEach((pinnedSection) => {
            
            const transformTextsAnim = pinnedSection.querySelectorAll('.sticky-statement2');
            
            function setImagesProperties() {								
                gsap.set(transformTextsAnim, { height: window.innerHeight});	
            }
            
            setImagesProperties();
            
            window.addEventListener('resize', setImagesProperties);	
        
            transformTextsAnim.forEach((transformTextAnim, i, arr) => {
                    const durationMultiplier = arr.length - i - 1;
                    
                    
                    ScrollTrigger.create({
                        trigger: transformTextAnim,
                        start: function() {
                            const centerPin = (window.innerHeight - transformTextAnim.offsetHeight) / 2;
                            return "top +=" + centerPin;
                        },
                        end: function() {
                            const durationHeight = transformTextAnim.offsetHeight * durationMultiplier + (transformTextAnim.offsetHeight - transformTextAnim.offsetHeight)/2;
                            return "+=" + durationHeight;
                        },
                        pin: true,
                        pinSpacing: false,
                        scrub: true,
                    });
                    
                    const animationProperties = {
                        y: 500,
                        scale: 0.65,
                        opacity: 0,
                        zIndex: 0,
                        duration: 0.05,
                        ease: 0.05,
                        // ease: Linear.easeNone
                    };
                    
                    // animationProperties.filter = "blur(10px)";
                    
                    ScrollTrigger.create({
                        trigger: transformTextAnim,
                        start: function() {
                            const centerPin = (window.innerHeight - transformTextAnim.offsetHeight) / 2;
                            console.log('center pin' , centerPin);
                            return "top top";
                        },
                        end: function() {
                            const durationHeight = transformTextAnim.offsetHeight + (transformTextAnim.offsetHeight - transformTextAnim.offsetHeight) / 2;
                            return "+=" + durationHeight;
                        },
                        scrub: true,
                        animation: gsap.to(transformTextAnim, animationProperties),
                    });

            });
        
        });
        
    }
    ShowcaseOverlapping();
    /* ===== Transform ===== */


    const allDivs = document.querySelectorAll('#smooth-content > div');
    if ($(".scaleDown").length) {
        allDivs.forEach(div => {
            gsap.fromTo(
                ".scaleDown", // Target element
                { scale: 1.3 }, // From: Start scale (1 means normal size)
                {
                    scale: 1, // To: End scale (2 means zoomed in)
                    ease: "none", // Animation ease (change as needed)
                    scrollTrigger: {
                        trigger: div, // Trigger element
                        // start: "top top", // Trigger animation at the top of .full-image-sec
                        // end: "bottom top", // End animation at the top of .full-image-sec
                        scrub: true, // Smooth scrubbing effect
                        markers: false // Show ScrollTrigger markers (for debugging)
                    },
                    start: "top top", // Trigger at the top of .full-image-sec
                    end: "bottom top", // End trigger at the top of .full-image-sec
                }
            );
        });
    }
    // gsap.to(".scaleDown", {
    //     scale: 2, 
    //     scrollTrigger: {
    //         trigger: ".full-image-sec",
    //         // pin: ".container",
    //         scrub: true
    //     },
    //     start: "top top", // Trigger at the top of .full-image-sec
    //     end: "bottom top", // End trigger at the top of .full-image-sec
    //     scrub: true,
    // })
    
});