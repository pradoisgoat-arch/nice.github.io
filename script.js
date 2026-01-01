document.addEventListener('DOMContentLoaded', () => {
    // --- Heart Elements ---
    const heartContainer = document.querySelector('.heart-container');
    const heartPath = document.getElementById('heartPath');
    const heartMessageDiv = document.querySelector('.message');
    const revealPoopBtn = document.getElementById('revealPoopBtn');

    // --- Poop Elements ---
    const poopContainer = document.querySelector('.poop-container');
    const poopGraphic = document.querySelector('.poop-graphic'); // Group for poop body + face
    const poopBodyPath = document.getElementById('poopBodyPath');
    const poopFaceParts = document.querySelectorAll('.poop-face-part'); // All eye/mouth elements
    const poopMessageDiv = document.querySelector('.poop-message');

    // --- Heart Animation Initialization & Message ---
    // Heart path length is still calculated, though not used for the initial draw animation anymore
    const heartPathLength = heartPath.getTotalLength();
    heartPath.style.setProperty('--heart-path-length', heartPathLength);

    // Adjusted timing constants for message and button to align with new CSS animation-delays
    const messageTextSetDelay = 1000; // Text content set after 1 second
    const buttonEnableDelay = 2000; // Button becomes active after 2 seconds

    const yourCustomHeartMessage = "Happy New Year Aayan Naughty Bobs! ❤️";
    setTimeout(() => {
        heartMessageDiv.textContent = yourCustomHeartMessage;
    }, messageTextSetDelay);

    setTimeout(() => {
        revealPoopBtn.style.opacity = '1';
        revealPoopBtn.style.pointerEvents = 'auto';
    }, buttonEnableDelay);


    // --- Poop Animation Setup (triggered by button click) ---
    revealPoopBtn.addEventListener('click', () => {
        // Fade out heart container, message, and button
        heartContainer.style.opacity = '0';
        heartContainer.style.transform = 'scale(0.8)'; // Shrink slightly as it fades
        heartMessageDiv.style.opacity = '0';
        revealPoopBtn.style.opacity = '0';
        revealPoopBtn.style.pointerEvents = 'none';

        // Wait for heart/button to fade out, then reveal poop
        setTimeout(() => {
            heartContainer.style.display = 'none';
            heartMessageDiv.style.display = 'none';
            revealPoopBtn.style.display = 'none';

            poopContainer.classList.remove('hidden'); // Make poop container visible
            poopContainer.style.opacity = '1';

            // --- Initialize Poop Drawing ---
            const poopBodyPathLength = poopBodyPath.getTotalLength();
            poopBodyPath.style.setProperty('--poop-body-path-length', poopBodyPathLength);

            // Make the poop graphic group visible to start its animations
            poopGraphic.style.opacity = '1';

            // --- Poop Animation Timings ---
            const poopBodyDrawDuration = 2000; // drawPoopBody duration
            const poopBodyDrawDelay = 500; // animation-delay on poopBodyPath
            const poopFacePopDuration = 300; // poopFacePop duration
            const poopFacePopDelayStart = poopBodyDrawDelay + poopBodyDrawDuration - 100; // Eyes start popping before body finishes
            const poopJiggleDelayStart = poopFacePopDelayStart + poopFacePopDuration + (poopFaceParts.length * 50) + 200; // Jiggle starts after all face parts are done

            // Staggered animation for face parts
            poopFaceParts.forEach((part, index) => {
                part.style.animationDelay = `${poopFacePopDelayStart / 1000 + (index * 0.05)}s`; // Staggered delay
            });

            // Start the jiggle animation on the entire poop graphic group
            poopGraphic.style.animation = `poopJiggle 1s infinite alternate ease-in-out ${poopJiggleDelayStart / 1000}s`;

            // --- Poop Message ---
            const yourCustomPoopMessage = "Just kidding! But you're so amazing, you even make poop look cute! Lende 😉💩";
            const poopMessageAppearTime = poopJiggleDelayStart + 500; // Appear shortly after jiggle starts

            setTimeout(() => {
                poopMessageDiv.textContent = yourCustomPoopMessage;
                // Since the animation-delay is set in CSS, we just need to ensure opacity is 1
                // The fadeIn animation is already associated with .poop-message in CSS.
                // We could explicitly set opacity here if it wasn't animated.
            }, poopMessageAppearTime);

        }, 500); // Wait for heart/button to fade out (0.5s transition duration)
    });
});