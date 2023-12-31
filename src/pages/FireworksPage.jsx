/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable default-param-last */
/* eslint-disable no-plusplus */
/* eslint-disable no-bitwise */
import React, { useEffect, useRef, useState } from 'react';
import backgroundImage from '../assets/images/newyearbg2.png'; // 이미지의 실제 경로에 맞게 수정해야 합니다.
import joonAudio from '../assets/audio/joon_newyear.mp3';

class Particle {
  static PARTICLE_INITIAL_SPEED = 4.5; // 정적 멤버로 선언

  static GRAVITY = 9.8; // 정적 멤버로 선언

  constructor(
    ctx,
    x = 0,
    y = 0,
    red = ~~(Math.random() * 255),
    green = ~~(Math.random() * 255),
    blue = ~~(Math.random() * 255),
    speed,
    isFixedSpeed,
  ) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.alpha = 0.05;
    this.radius = 1 + Math.random();
    this.angle = Math.random() * 360;
    this.speed = Math.random() * speed + 0.1;
    this.velocityX = Math.cos(this.angle) * this.speed;
    this.velocityY = Math.sin(this.angle) * this.speed;
    this.startTime = new Date().getTime();
    this.duration = Math.random() * 300 + Particle.FIREWORK_LIFESPAN;
    this.currentDuration = 0;
    this.dampening = 30;

    this.colour = this.getColour();

    if (isFixedSpeed) {
      this.speed = speed;
      this.velocityY = Math.sin(this.angle) * this.speed;
      this.velocityX = Math.cos(this.angle) * this.speed;
    }

    this.initialVelocityX = this.velocityX;
    this.initialVelocityY = this.velocityY;
  }

  animate() {
    this.currentDuration = new Date().getTime() - this.startTime;

    if (this.currentDuration <= 200) {
      this.x += this.initialVelocityX * Particle.PARTICLE_INITIAL_SPEED;
      this.y += this.initialVelocityY * Particle.PARTICLE_INITIAL_SPEED;
      this.alpha += 0.01;

      this.colour = this.getColour(240, 240, 240, 0.9);
    } else {
      this.x += this.velocityX;
      this.y += this.velocityY;
      this.colour = this.getColour(
        this.red,
        this.green,
        this.blue,
        0.4 + Math.random() * 0.3,
      );
    }

    this.velocityY += Particle.GRAVITY / 1000;

    // if (this.currentDuration >= this.duration) {
    //   // this.velocityX -= this.velocityX / this.dampening;
    //   // this.velocityY -= this.velocityY / this.dampening;
    //   this.velocityX *= 0.99; // 임의의 값으로 변경
    //   this.velocityY *= 0.99;
    // }

    if (this.currentDuration >= this.duration) {
      // this.velocityX -= this.velocityX / this.dampening;
      // this.velocityY -= this.velocityY / this.dampening;

      const slowdown = 0.99; // 감속도 조절을 위한 값, 0.99는 임의의 값입니다. 원하는 비율로 조정 가능합니다.

      // 감속 적용
      this.velocityX *= slowdown;
      this.velocityY *= slowdown;
    }

    if (this.currentDuration >= this.duration + this.duration / 1.1) {
      this.alpha -= 0.02;
      this.colour = this.getColour();
    } else if (this.alpha < 1) {
      this.alpha += 0.03;
    }
  }

  render() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.fillStyle = this.colour;
    this.ctx.shadowBlur = 8;
    this.ctx.shadowColor = this.getColour(
      this.red + 150,
      this.green + 150,
      this.blue + 150,
      1,
    );
    this.ctx.fill();
  }

  getColour(red, green, blue, alpha) {
    return `rgba(${red || this.red}, ${green || this.green}, ${
      blue || this.blue
    }, ${alpha || this.alpha})`;
  }
}

// Fireworks 컴포넌트
function Fireworks() {
  const [particles, setParticles] = useState([]);
  const [disableAutoFireworks, setDisableAutoFireworks] = useState(false);
  const [resetDisable, setResetDisable] = useState(0);

  const PARTICLES_PER_FIREWORK = 200;
  const FIREWORK_CHANCE = 0.07;
  const BASE_PARTICLE_SPEED = 0.9;

  const canvasRef = useRef(null);
  let ctx;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      ctx = canvas.getContext('2d');
      // 여기서 ctx를 사용하여 그리기 작업을 수행할 수 있음
    }
  }, []);

  const loop = () => {
    if (!disableAutoFireworks && Math.random() < FIREWORK_CHANCE) {
      createFirework();
    }

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    particles.forEach((particle) => {
      particle.animate();
      particle.render();
    });

    requestAnimationFrame(loop);
  };

  function createFirework(
    x = Math.random() * canvasRef.current.width,
    y = Math.random() * canvasRef.current.height,
  ) {
    const speed = Math.random() * 2 + BASE_PARTICLE_SPEED;
    let maxSpeed = speed;

    let red = ~~(Math.random() * 255);
    let green = ~~(Math.random() * 255);
    let blue = ~~(Math.random() * 255);

    red = red < 150 ? red + 150 : red;
    green = green < 150 ? green + 150 : green;
    blue = blue < 150 ? blue + 150 : blue;

    for (let i = 0; i < PARTICLES_PER_FIREWORK; i++) {
      const particle = new Particle(ctx, x, y, red, green, blue, speed);
      particles.push(particle);

      maxSpeed = speed > maxSpeed ? speed : maxSpeed;
    }

    for (let i = 0; i < 40; i++) {
      const particle = new Particle(
        ctx,
        x,
        y,
        red,
        green,
        blue,
        maxSpeed,
        true,
      );
      particles.push(particle);
    }
  }

  useEffect(() => {
    Particle.PARTICLE_INITIAL_SPEED = 4.5;
    Particle.FIREWORK_LIFESPAN = 600;

    ctx = canvasRef.current.getContext('2d');
    const updateCanvasSize = () => {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    };
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, []);

  useEffect(() => {
    loop();
  }, []);

  const handleClick = (e) => {
    createFirework(e.clientX, e.clientY);

    setDisableAutoFireworks(true);
    clearTimeout(resetDisable);
    setResetDisable(
      setTimeout(() => {
        setDisableAutoFireworks(false);
      }, 5000),
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = '/'; // 10초 뒤에 '/'로 이동
    }, 12000); // 12초를 밀리초로 계산

    return () => clearTimeout(timer);
  }, []);

  const myRef = useRef(null);
  const [play, setPlay] = useState(false);
  // 재생
  const handleScreenClick = () => {
    // 오디오 재생
    if (myRef.current && !play) {
      myRef.current.play();
      setPlay(true);

      // 4초 후에 정지
      setTimeout(() => {
        if (myRef.current) {
          myRef.current.pause();
          setPlay(false);
        }
      }, 4000);
    }
  };

  useEffect(() => {
    if (!myRef.current) return;
    if (play) {
      myRef.current.play();
    }
  }, []);

  return (
    <div
      onClick={handleScreenClick}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        position: 'relative',
      }}>
      <audio
        ref={myRef}
        src={joonAudio}
        controls
        loop
        style={{ display: 'none' }}
      />
      <canvas ref={canvasRef} onClick={handleClick} />
    </div>
  );
}

export default Fireworks;
