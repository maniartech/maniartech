document.addEventListener('DOMContentLoaded', () => {
    // Banner animation timeline
    const bannerTL = gsap.timeline({
        defaults: { duration: 1, ease: 'power3.out' }
    });

    // Animate motto
    bannerTL.from('.banner-motto', {
        y: 50,
        opacity: 0,
        duration: 0.8
    });

    // Animate title and description with stagger
    bannerTL.from(['.banner-title', '.banner-description'], {
        y: 30,
        opacity: 0,
        stagger: 0.2
    }, '-=0.4');

    // Animate button
    bannerTL.from('.banner-button', {
        x: -30,
        opacity: 0,
        duration: 0.8
    }, '-=0.4');
});
