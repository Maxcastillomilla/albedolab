document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    const navLinks = document.querySelectorAll('.right-nav a');
    const navCircles = document.querySelectorAll('.nav-circle');
    const sectionTitle = document.getElementById('section-title');

    navLinks.forEach((link, index) => {
        const targetId = link.getAttribute('href'),
            targetElement = (targetId === '#') ? 'body' : targetId; // Use body for '#' link

        ScrollTrigger.create({
            trigger: targetElement,
            start: 'top center',
            end: 'bottom center',
            toggleActions: 'play reverse play reverse',
            onEnter: () => {
                gsap.to(navCircles[index], {
                    backgroundColor: 'white',
 duration: 0.3
                });
                updateSectionTitle(index);
            },
            onLeave: () => {
                gsap.to(navCircles[index], { backgroundColor: '#333', duration: 0.3 });
            },
            onEnterBack: () => {
                gsap.to(navCircles[index], {
 backgroundColor: 'white',
 duration: 0.3
                });
                updateSectionTitle(index);
            },
            onLeaveBack: () => {
                gsap.to(navCircles[index], { backgroundColor: '#333', duration: 0.3 });
            }
        });
    });

    function updateSectionTitle(index) {
        const titles = ["INICIO", "WHO WE ARE", "WHAT WE DO", "CONTACT", "WORK"];
        if (sectionTitle) {
            sectionTitle.textContent = titles[index];
        }
    }
});