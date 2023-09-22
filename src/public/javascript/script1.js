window.addEventListener('scroll', function () {
    var fireworkSection = document.getElementById('firework-section');

    // Create the firework container div
    var fireworkEffect1 = document.createElement('div');
    fireworkEffect1.classList.add('firework');
    fireworkEffect1.id = 'firework1';

    var fireworkEffect2 = document.createElement('div');
    fireworkEffect2.classList.add('firework');
    fireworkEffect2.id = 'firework2';

    var fireworkEffect3 = document.createElement('div');
    fireworkEffect3.classList.add('firework');
    fireworkEffect3.id = 'firework3';
    // Create 12 explosion divs
    for (var i = 1; i <= 12; i++) {
        var explosionDiv = document.createElement('div');
        explosionDiv.classList.add('explosion');
        fireworkEffect1.appendChild(explosionDiv);
    }

    for (var i = 1; i <= 12; i++) {
        var explosionDiv = document.createElement('div');
        explosionDiv.classList.add('explosion');
        fireworkEffect2.appendChild(explosionDiv);
    }

    for (var i = 1; i <= 12; i++) {
        var explosionDiv = document.createElement('div');
        explosionDiv.classList.add('explosion');
        fireworkEffect3.appendChild(explosionDiv);
    }

    // Append the firework container to the document body

    var rect = fireworkSection.getBoundingClientRect();

    if (rect.top <= window.innerHeight && !fireworkSection.classList.contains('firework-triggered')) {
        fireworkSection.classList.add('firework-triggered');
        setTimeout(function () {
            fireworkSection.appendChild(fireworkEffect1);
            fireworkSection.appendChild(fireworkEffect2);
            fireworkSection.appendChild(fireworkEffect3);
        }, 1000);
        setTimeout(function () {
            fireworkEffect1.remove();
            fireworkEffect2.remove();
            fireworkEffect3.remove();
        }, 9000);
    }
});
