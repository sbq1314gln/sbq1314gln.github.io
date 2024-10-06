document.addEventListener('DOMContentLoaded', function() {
    // 平滑滚动效果
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 为卡片和社交媒体图标添加延迟动画
    const cards = document.querySelectorAll('.card');
    const socialItems = document.querySelectorAll('.social-item');

    function addDelayedAnimation(elements) {
        elements.forEach((el, index) => {
            el.style.animationDelay = `${index * 0.2}s`;
        });
    }

    addDelayedAnimation(cards);
    addDelayedAnimation(socialItems);

    // 添加滚动时的渐入效果
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function handleScroll() {
        const elements = document.querySelectorAll('.card, .social-item');
        elements.forEach(el => {
            if (isElementInViewport(el)) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 初始检查

    // 添加点击名字跳转到QQ空间的功能
    const myName = document.getElementById('myName');
    myName.addEventListener('click', function() {
        window.location.href = 'https://user.qzone.qq.com/2053540371'; // 替换为您的QQ空间链接
    });

    // 添加鼠标悬停效果
    myName.style.cursor = 'pointer';
    myName.title = '点击访问我的QQ空间';

    // 添加点击QQ图标跳转到QQ空间的功能
    const qqIcon = document.querySelector('.qq-icon');
    qqIcon.addEventListener('click', function() {
        window.location.href = 'https://user.qzone.qq.com/2053540371';
    });

    // 为QQ图标添加鼠标悬停效果
    qqIcon.style.cursor = 'pointer';
    qqIcon.title = '点击访问我的QQ空间';

    // 图片轮播功能
    const images = document.querySelectorAll('.image-carousel img');
    let currentIndex = 0;

    function showNextImage() {
        if (images.length === 0) {
            console.error('No images found in the carousel');
            return;
        }
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
    }

    if (images.length > 0) {
        setInterval(showNextImage, 2000); // 每2秒切换一次图片
    } else {
        console.error('No images found in the carousel');
    }

    // 添加图片加载错误处理
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.error('Failed to load image:', this.src);
            this.src = 'placeholder.jpg'; // 替换为一个占位图片
        });
    });

    // 粒子拖尾效果
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 2 + 0.1; // 减小粒子大小
            this.speedX = Math.random() * 1 - 0.5; // 减小速度
            this.speedY = Math.random() * 1 - 0.5;
            this.color = this.getStarColor(); // 使用新的颜色函数
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.size > 0.1) this.size -= 0.01; // 减缓粒子消失速度
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }

        getStarColor() {
            const colors = [
                'rgba(255, 255, 255, 0.8)', // 白色
                'rgba(173, 216, 230, 0.8)', // 淡蓝色
                'rgba(255, 223, 186, 0.8)', // 淡黄色
                'rgba(255, 192, 203, 0.8)'  // 淡粉色
            ];
            return colors[Math.floor(Math.random() * colors.length)];
        }
    }

    function createParticles(e) {
        const xPos = e.x;
        const yPos = e.y;
        for (let i = 0; i < 10; i++) { // 增加粒子数量
            particles.push(new Particle(xPos, yPos));
        }
    }

    function handleParticles() {
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            if (particles[i].size <= 0.1) {
                particles.splice(i, 1);
                i--;
            }
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        handleParticles();
        requestAnimationFrame(animateParticles);
    }

    window.addEventListener('mousemove', createParticles);
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    animateParticles();
});