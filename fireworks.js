window.onload = function() {
    const canvas = document.getElementById('fireworks');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    let fireworks = [];

    class Particle {
        constructor(x, y, color, velocityX, velocityY) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.velocityX = velocityX;
            this.velocityY = velocityY;
            this.alpha = 1;
            this.friction = 0.99;
        }

        draw() {
            ctx.globalAlpha = this.alpha;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 2, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        update() {
            this.velocityX *= this.friction;
            this.velocityY *= this.friction;
            this.x += this.velocityX;
            this.y += this.velocityY;
            this.alpha -= 0.01;
        }
    }

    class Firework {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.velocity = { x: 0, y: Math.random() * -2.5 - 0.5 };
            this.particles = [];
            this.lifespan = 180;
            this.hasExploded = false;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, 3, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        explode() {
            const numParticles = 100;
            for (let i = 0; i < numParticles; i++) {
                const angle = i / numParticles * Math.PI * 2;
                const xVel = Math.cos(angle) * (Math.random() * 5 + 2);
                const yVel = Math.sin(angle) * (Math.random() * 5 + 2);
                this.particles.push(new Particle(this.x, this.y, this.color, xVel, yVel));
            }
        }

        update() {
            this.lifespan--;
            if (this.lifespan <= 0 && !this.hasExploded) {
                this.explode();
                this.hasExploded = true;
            } else if (this.lifespan > 0) {
                this.y += this.velocity.y;
            }

            this.particles = this.particles.filter(p => p.alpha > 0);
            for (let i = 0; i < this.particles.length; i++) {
                this.particles[i].update();
                this.particles[i].draw();
            }
        }
    }

    const box = document.getElementById('box');
    box.addEventListener('click', () => {
        box.style.display = 'none';

        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        createFireworks(centerX, centerY);
        createFloatingCards(centerX, centerY);

        setTimeout(() => {
            const slideShow = document.getElementById('slide-show');
            let currentIndex = 0;
            const images = slideShow.querySelectorAll('img');
            images.forEach(img => img.style.opacity = '0');
            images[currentIndex].style.opacity = '1';
            images[currentIndex].style.visibility = 'visible'; // ทำให้แสดงภาพแรกทันที

            let angle = 0; 
            const radius = 200; 
            const numImages = images.length;

            function getCircularPosition(angle) {
                const centerX = window.innerWidth / 2;
                const centerY = window.innerHeight / 2;

                const x = centerX + radius * Math.cos(angle);
                const y = centerY + radius * Math.sin(angle);
                return { x, y };
            }

            setInterval(() => {
                const position = getCircularPosition(angle);

                images[currentIndex].style.opacity = '0';
                images[currentIndex].style.visibility = 'hidden'; // ซ่อนภาพก่อนหน้า

                currentIndex = (currentIndex + 1) % numImages;
                images[currentIndex].style.opacity = '1';
                images[currentIndex].style.visibility = 'visible'; // แสดงภาพใหม่

                angle += Math.PI / 6;
            }, 5000); 
        }, 10000); 
    });

    function createFloatingCards(startX, startY) {
        const numCards = 10;
        for (let i = 0; i < numCards; i++) {
            const card = document.createElement('div');
            card.classList.add('card');
            card.style.left = `${startX}px`;
            card.style.top = `${startY}px`;
            card.innerText = `🎉`;
            document.getElementById('card-container').appendChild(card);

            const angle = Math.random() * 360;
            const distance = Math.random() * 300 + 100;
            const duration = Math.random() * 2 + 3;

            setTimeout(() => {
                card.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) rotate(${Math.random() * 360}deg)`;
                card.style.opacity = '0';
            }, 0);
        }
    }

    function createFireworks(x, y) {
        for (let i = 0; i < 100; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 5 + 2;
            const color = `hsl(${Math.random() * 360}, 100%, 50%)`;

            particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size: Math.random() * 3 + 1,
                life: 100,
                color: color,
            });
        }
    }

    function animate() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let i = fireworks.length - 1; i >= 0; i--) {
            fireworks[i].update();
            fireworks[i].draw();

            if (fireworks[i].lifespan <= 0 && fireworks[i].particles.length === 0) {
                fireworks.splice(i, 1);
            }
        }

        if (Math.random() < 0.015) {
            const x = Math.random() * canvas.width;
            const color = `hsl(${Math.random() * 360}, 50%, 50%)`;
            fireworks.push(new Firework(x, canvas.height, color));
        }

        particles.forEach((particle, index) => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life -= 1;

            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();

            if (particle.life <= 0) {
                particles.splice(index, 1);
            }
        });

        requestAnimationFrame(animate);
    }

    animate();
};
