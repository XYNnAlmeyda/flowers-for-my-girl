(function() {
    const numOfFlowers = 4;
    const growGarden = () => {
      const initialFlower = document.querySelector('.sunflwr');
      setInitialFlowerPosition(initialFlower);
  
      function getRandomArbitrary(min, max) {
        return Math.round(Math.random() * (max - min)) + min;
      }
  
      let positions = [];
  
      function getNum(){
        let pos = getRandomArbitrary(0, 100);
        for(let x = 0; x < positions.length; x++){
          if(pos > positions[x] - 3 && pos < positions[x] + 3){
            return false;
          }
        }
        positions.push(pos);
      }
  
      while(positions.length < numOfFlowers){
        getNum();
      }
  
      let more = setInterval(function() {
        let flwr = document.createElement('div');
        let dim = getRandomArbitrary(30, 80);
        let leftPos = positions[0];
        positions.shift();
  
        flwr.classList.add('sunflwr');
        flwr.innerHTML = `<div class="sunflwr__leaf--left"></div>
                          <div class="sunflwr__leaf--right"></div>
                          <div class="sunflwr__stem"></div>
                          <div class="sunflwr__center"></div>
                          <div class="sunflwr__pedal--1"></div>
                          <div class="sunflwr__pedal--2"></div>
                          <div class="sunflwr__pedal--3"></div>
                          <div class="sunflwr__pedal--4"></div>
                          <div class="sunflwr__pedal--5"></div>
                          <div class="sunflwr__pedal--6"></div>
                          <div class="sunflwr__pedal--7"></div>
                          <div class="sunflwr__pedal--8"></div>
                          <div class="sunflwr__pedal--9"></div>
                          <div class="sunflwr__pedal--10"></div>
                          <div class="sunflwr__pedal--11"></div>
                          <div class="sunflwr__pedal--12"></div>`;
        flwr.style.left = `${leftPos}vw`;
        flwr.style.height = `${dim}vmin`;
        flwr.style.width = `${dim}vmin`;
        flwr.style.zIndex = 100 - dim;
        flwr.style.filter = `saturate(${getRandomArbitrary(70, 100)}%) brightness(${getRandomArbitrary(80, 150)}%)`;
        document.querySelector('body').appendChild(flwr);
      }, 150);
  
      setTimeout(function() {
        window.clearInterval(more);
      }, numOfFlowers * 150);
    }
    
    document.body.addEventListener('click', () => {
      growGarden();
    });

    function createSparkle(e) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = e.pageX + 'px';
        sparkle.style.top = e.pageY + 'px';
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 4000);
    }

    document.addEventListener('mousemove', (e) => {
        if (Math.random() < 0.1) {
            createSparkle(e);
        }
    });

    document.addEventListener('DOMContentLoaded', () => {
        const initialFlower = document.querySelector('.sunflwr');
        setInitialFlowerPosition(initialFlower);
    });

    function setInitialFlowerPosition(flower) {
        if (flower) {
            flower.style.position = 'fixed';
            flower.style.bottom = window.innerWidth <= 768 ? '5vh' : '10vh';
            flower.style.left = '50%';
            flower.style.transform = 'translateX(-50%)';
            flower.style.width = window.innerWidth <= 768 ? '30vmin' : '40vmin';
            flower.style.height = window.innerWidth <= 768 ? '30vmin' : '40vmin';
            flower.style.zIndex = '10';
        }
    }

    function createFirefly() {
        const container = document.createElement('div');
        container.className = 'firefly';
        
        container.style.left = `${Math.random() * window.innerWidth}px`;
        container.style.top = `${Math.random() * (window.innerHeight * 0.7)}px`;
        
        document.body.appendChild(container);
        animateFirefly(container);
    }

    function animateFirefly(firefly) {
        let posX = parseFloat(firefly.style.left);
        let posY = parseFloat(firefly.style.top);
        let angle = Math.random() * Math.PI * 2;
        let speed = 0.5 + Math.random() * 0.5;
        let time = Math.random() * 1000;
        
        function updatePosition() {
            time += 0.016;
            
            angle += (Math.random() - 0.5) * 0.1;
            speed = 0.5 + Math.sin(time * 0.5) * 0.3;
            
            posX += Math.cos(angle) * speed;
            posY += Math.sin(angle) * speed;
            
            if (posX < 0) posX = window.innerWidth;
            if (posX > window.innerWidth) posX = 0;
            if (posY < 0) posY = window.innerHeight * 0.7;
            if (posY > window.innerHeight * 0.7) posY = 0;
            
            firefly.style.left = `${posX}px`;
            firefly.style.top = `${posY}px`;
            
            requestAnimationFrame(updatePosition);
        }
        
        updatePosition();
    }

    function updateDayCycle() {
        const manilaTime = new Date().toLocaleString("en-US", {timeZone: "Asia/Manila"});
        const currentTime = new Date(manilaTime);
        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();
        
        const dayPercentage = ((hours * 60 + minutes) / (24 * 60)) * 100;
        document.documentElement.style.setProperty('--day-cycle-progress', `${dayPercentage}%`);
        
        const body = document.body;
        body.classList.remove('dawn', 'morning', 'afternoon', 'sunset', 'night', 'early-dawn', 'late');
        
        const time = hours * 100 + minutes;
        
        if (time >= 500 && time < 700) {
            body.classList.add('dawn');
        }
        else if (time >= 700 && time < 1200) {
            body.classList.add('morning');
        }
        else if (time >= 1200 && time < 1700) {
            body.classList.add('afternoon');
        }
        else if (time >= 1700 && time < 1830) {
            body.classList.add('sunset');
            const sunsetProgress = (time - 1700) / 130;
            document.documentElement.style.setProperty('--sunset-intensity', sunsetProgress.toString());
        }
        else if (time >= 1830 && time < 1900) {
            body.classList.add('sunset', 'late');
        }
        else {
            body.classList.add('night');
        }

        // Handle butterfly/firefly transition at sunset (5:00 PM/1700)
        if (time >= 1700 || time < 500) { // After 5:00 PM or before 5:00 AM
            // Fade out butterflies
            document.querySelectorAll('.butterfly-container').forEach(butterfly => {
                butterfly.style.opacity = '0';
                butterfly.style.transition = 'opacity 2s ease';
            });
            
            if (document.querySelectorAll('.firefly').length < 15) {
                for (let i = 0; i < 15; i++) {
                    createFirefly();
                }
            }
        } else {
            document.querySelectorAll('.firefly').forEach(firefly => {
                firefly.style.opacity = '0';
                firefly.style.transition = 'opacity 2s ease';
                setTimeout(() => firefly.remove(), 2000);
            });
            
            if (document.querySelectorAll('.butterfly-container').length < 6) {
                createButterflies();
            }
        }

        if (time >= 1700 || time < 500) {
            if (!document.querySelector('.night-sky')) {
                createNightSky();
            }
        } else {
            const nightSky = document.querySelector('.night-sky');
            if (nightSky) {
                nightSky.remove();
            }
        }

        const sunMoonElement = document.querySelector('body::before');
        if (sunMoonElement) {
            let verticalPos;
            if (time >= 500 && time < 1200) {
                verticalPos = 60 - ((time - 500) / 700) * 40;
            } else if (time >= 1200 && time < 1700) {
                verticalPos = 20 + ((time - 1200) / 500) * 40;
            } else {
                verticalPos = 20;
            }
            sunMoonElement.style.top = `${verticalPos}vh`;
        }
    }

    setInterval(updateDayCycle, 60000);
    updateDayCycle();

    let lastMinute = new Date().getMinutes();
    setInterval(() => {
        const currentMinute = new Date().getMinutes();
        if (currentMinute !== lastMinute) {
            document.body.classList.add('transitioning');
            setTimeout(() => {
                document.body.classList.remove('transitioning');
            }, 1000);
            lastMinute = currentMinute;
        }
    }, 1000);

    function createNightSky() {
        const nightSky = document.createElement('div');
        nightSky.className = 'night-sky';
        
        const cloudsContainer = document.createElement('div');
        cloudsContainer.className = 'clouds-container';
        nightSky.appendChild(cloudsContainer);
        
        for (let i = 0; i < 200; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 70}%`;
            
            const size = Math.random() * 2;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            
            star.style.animationDelay = `${Math.random() * 3}s`;
            
            nightSky.appendChild(star);
        }
        
        document.body.appendChild(nightSky);
        
        createNightClouds();
        
        setInterval(createShootingStar, 2000);
    }

    function createNightClouds() {
        const cloudsContainer = document.querySelector('.clouds-container');
        if (!cloudsContainer) {
            return;
        }
        
        const layers = [
            { count: 2, scale: [2, 2.5], speed: [0.015, 0.02], opacity: [0.6, 0.7], zIndex: 3 },
            { count: 3, scale: [1.5, 2], speed: [0.01, 0.015], opacity: [0.5, 0.6], zIndex: 2 },
            { count: 2, scale: [1, 1.5], speed: [0.005, 0.01], opacity: [0.4, 0.5], zIndex: 1 }
        ];

        layers.forEach(layer => {
            for (let i = 0; i < layer.count; i++) {
                const cloud = document.createElement('div');
                cloud.className = 'night-cloud';
                
                cloud.style.left = `${Math.random() * 100}%`;
                cloud.style.top = `${Math.random() * 40}%`;
                
                const scale = layer.scale[0] + Math.random() * (layer.scale[1] - layer.scale[0]);
                cloud.style.transform = `scale(${scale})`;
                cloud.style.opacity = layer.opacity[0] + Math.random() * (layer.opacity[1] - layer.opacity[0]);
                cloud.style.zIndex = layer.zIndex;
                
                const particleCount = 6;
                
                for (let j = 0; j < particleCount; j++) {
                    const particle = document.createElement('div');
                    particle.className = 'cloud-particle';
                    
                    const offsetX = (Math.random() - 0.5) * 10;
                    const offsetY = (Math.random() - 0.5) * 5;
                    particle.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
                    
                    cloud.appendChild(particle);
                }
                
                cloudsContainer.appendChild(cloud);
                
                const speed = layer.speed[0] + Math.random() * (layer.speed[1] - layer.speed[0]);
                animateCloud(cloud, speed);
            }
        });
    }

    function animateCloud(cloud, speed) {
        let position = parseFloat(cloud.style.left);
        
        function moveCloud() {
            position += speed;
            if (position > 100) {
                position = -20;
            }
            
            cloud.style.transform = `translate3d(${position}vw, 0, 0)`;
            
            requestAnimationFrame(moveCloud);
        }
        
        moveCloud();
    }

    function createShootingStar() {
        if (!document.body.classList.contains('night')) return;
        
        const shootingStar = document.createElement('div');
        shootingStar.className = 'shooting-star';
        
        shootingStar.style.left = `${Math.random() * 100}%`;
        shootingStar.style.top = `${Math.random() * 30}%`;
        
        const rotation = 30 + Math.random() * 30;
        shootingStar.style.transform = `rotate(${rotation}deg)`;
        
        const duration = 2 + Math.random() * 2;
        shootingStar.style.animationDuration = `${duration}s`;
        shootingStar.style.animationDelay = `${Math.random() * 2}s`;
        
        document.querySelector('.night-sky').appendChild(shootingStar);
        
        setTimeout(() => {
            shootingStar.remove();
        }, duration * 1000);
    }

    const style = document.createElement('style');
    style.textContent = `
        .butterfly-container {
            transition: opacity 2s ease;
        }
        
        body.night .butterfly-container {
            opacity: 0;
            pointer-events: none;
        }
    `;
    document.head.appendChild(style);

    function createButterflies() {
        document.querySelectorAll('.butterfly-container').forEach(butterfly => butterfly.remove());
        
        for (let i = 0; i < 6; i++) {
            const container = document.createElement('div');
            container.className = 'shape-container butterfly-container';
            
            const butterfly = document.createElement('div');
            butterfly.className = 'shape butterfly';
            
            butterfly.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 132 200" width="50">
                    <g class="butterfly__wing">
                        <path d="M75.13 100s59.42 41.22 56.79 82.78c-.77 12.12-6.14 19.32-23.41 16.67C59.79 191.97 55.75 131.44 64 100h11.13Z"></path>
                        <path d="M68.22 100c1.15 19.13-4.22 72.17-29.35 70.47-23.04-1.56-40.43-16.38-38.76-28.04 2.69-18.75 39.33-41.3 47.58-42.43h20.53Z"></path>
                    </g>
                    <g class="butterfly__wing">
                        <path id="bfy-wing-2a" d="M75.13 100s59.42-41.22 56.79-82.78C131.15 5.1 125.78-2.1 108.51.55 59.79 8.03 55.75 68.56 64 100h11.13Z"></path>
                        <path id="bfy-wing-2b" d="M68.22 100C69.37 80.87 64 27.83 38.87 29.53 15.83 31.09-1.56 45.91.11 57.57 2.8 76.32 39.44 98.87 47.69 100h20.53Z"></path>
                    </g>
                    <g class="butterfly__body">
                        <path d="M82.59 102.81a4.806 4.806 0 0 0 3.85 1.92c2.65 0 4.8-2.12 4.8-4.74s-2.15-4.74-4.8-4.74c-1.58 0-2.98.76-3.85 1.92-2.69-1.17-7.01-1.92-11.88-1.92-3.19 0-6.15.33-8.56.88-2.42-.55-5.37-.88-8.56-.88-4.22 0-8.03.57-10.72 1.48-2.69-.91-6.5-1.48-10.72-1.48-8.16 0-14.77 2.12-14.77 4.74s6.61 4.74 14.77 4.74c4.22 0 8.03-.57 10.72-1.48 2.69.91 6.5 1.48 10.72 1.48 3.19 0 6.15-.33 8.56-.88 2.42.55 5.37.88 8.56.88 4.87 0 9.19-.76 11.88-1.92Z"></path>
                        <path d="M89.97 101.73s0-.1.01-.15c.08-.51.56-.85 1.08-.77 12.36 1.97 28.14 10.97 33.05 23.76a.933.933 0 0 1-.55 1.2.94.94 0 0 1-1.21-.54c-4.66-12.14-19.75-20.7-31.59-22.59a.931.931 0 0 1-.79-.91Z"></path>
                        <path d="M89.97 98.27s0 .1.01.15c.08.51.56.85 1.08.77 12.36-1.97 28.14-10.97 33.05-23.76a.933.933 0 0 0-.55-1.2.94.94 0 0 0-1.21.54c-4.66 12.14-19.75 20.7-31.59 22.59-.46.07-.79.47-.79.91Z"></path>
                    </g>
                </svg>
            `;
            
            container.appendChild(butterfly);
            document.body.appendChild(container);
            
            container.style.left = `${(i * 15) + Math.random() * 10}%`;
            container.style.top = `${20 + Math.random() * 60}%`;
            
            const size = 20 + Math.random() * 20;
            container.style.width = `${size}px`;
            container.style.height = `${size}px`;
            
            animateButterfly(container);
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        const currentHour = new Date().getHours();
        if (currentHour >= 5 && currentHour < 17) {
            createButterflies();
        }
    });

    const cloudStyle = document.createElement('style');
    cloudStyle.textContent = `
        .clouds-container {
            position: absolute;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            will-change: transform;
        }
        
        .night-cloud {
            position: absolute;
            width: 200px;
            height: 80px;
            transition: opacity 3s ease;
            will-change: transform;
        }
        
        .cloud-particle {
            position: absolute;
            width: 50px;
            height: 50px;
            background: rgba(180, 180, 180, 0.25);
            border-radius: 50%;
            filter: blur(4px);
            box-shadow: 0 0 20px rgba(180, 180, 180, 0.3);
        }
        
        .cloud-particle:nth-child(1) { left: 10%; top: 40%; }
        .cloud-particle:nth-child(2) { left: 30%; top: 35%; }
        .cloud-particle:nth-child(3) { left: 50%; top: 40%; }
        .cloud-particle:nth-child(4) { left: 70%; top: 35%; }
        .cloud-particle:nth-child(5) { left: 40%; top: 45%; }
        .cloud-particle:nth-child(6) { left: 60%; top: 45%; }

        body.night .night-cloud {
            mix-blend-mode: screen;
            transform: translateZ(0);
        }
    `;
    document.head.appendChild(cloudStyle);

})();