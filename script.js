document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.querySelector('.game-container');
    const spaceship = document.getElementById('spaceship');
    let spaceshipLeft = 50;
    const spaceshipSpeed = 2;
    const laserSpeed = 4;
    const alienSpeed = 1;
    const aliens = [];
    const lasers = [];

    function moveSpaceship(event) {
        if (event.key === 'ArrowLeft' && spaceshipLeft > 0) {
            spaceshipLeft -= spaceshipSpeed;
        } else if (event.key === 'ArrowRight' && spaceshipLeft < 100) {
            spaceshipLeft += spaceshipSpeed;
        }
        spaceship.style.left = spaceshipLeft + '%';
    }

    function shootLaser() {
        const laser = document.createElement('div');
        laser.classList.add('laser');
        laser.style.left = spaceshipLeft + '%';
        laser.style.bottom = '60px';
        gameContainer.appendChild(laser);
        lasers.push(laser);
    }

    function createAlien() {
        const alien = document.createElement('div');
        alien.classList.add('alien');
        alien.style.left = Math.random() * 760 + 'px';
        alien.style.top = '0px';
        gameContainer.appendChild(alien);
        aliens.push(alien);
    }

    function moveLasers() {
        lasers.forEach(laser => {
            laser.style.bottom = parseInt(laser.style.bottom) + laserSpeed + 'px';
            if (parseInt(laser.style.bottom) > 600) {
                laser.remove();
                lasers.splice(lasers.indexOf(laser), 1);
            }
        });
    }

    function moveAliens() {
        aliens.forEach(alien => {
            alien.style.top = parseInt(alien.style.top) + alienSpeed + 'px';
            if (parseInt(alien.style.top) > 600) {
                alien.remove();
                aliens.splice(aliens.indexOf(alien), 1);
            }
        });
    }

    function checkCollisions() {
        lasers.forEach(laser => {
            aliens.forEach(alien => {
                if (laser.getBoundingClientRect().left < alien.getBoundingClientRect().right &&
                    laser.getBoundingClientRect().right > alien.getBoundingClientRect().left &&
                    laser.getBoundingClientRect().top < alien.getBoundingClientRect().bottom &&
                    laser.getBoundingClientRect().bottom > alien.getBoundingClientRect().top) {
                    laser.remove();
                    alien.remove();
                    lasers.splice(lasers.indexOf(laser), 1);
                    aliens.splice(aliens.indexOf(alien), 1);
                }
            });
        });
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            moveSpaceship(event);
        } else if (event.key === ' ') {
            shootLaser();
        }
    });

    setInterval(() => {
        createAlien();
    }, 2000);

    setInterval(() => {
        moveLasers();
        moveAliens();
        checkCollisions();
    }, 20);
});
