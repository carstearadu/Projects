window.addEventListener('load', () => {
    const sounds = document.querySelectorAll('.sound');
    const pads = document.querySelectorAll('.pads div');
    const visual = document.querySelector('.visual');
    const colors = ['#003f9e', '#0066ff', '#3d8bff', '#7fb2ff', '#007d81', '#00b5bb', '#02f7ff', '#9ffcff', '#e07000', '#ff8812', '#ffa44a', '#ffcfa0'];

    pads.forEach((pad, index) => {
        pad.addEventListener('click', function() {
            sounds[index].currentTime = 0;
            sounds[index].play()

            createBubbles(index);
        });
    });
    const createBubbles = (index) => {
        const bubble = document.createElement('div');
        visual.appendChild(bubble);
        bubble.style.backgroundColor = colors[index];
        bubble.style.animation = 'jump 1s ease';
        bubble.addEventListener('animationend', function() {
            visual.removeChild(this); 
        })
    };
});