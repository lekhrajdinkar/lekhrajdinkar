import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-three-animation',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="animation-container">
      <canvas #canvas class="three-canvas"></canvas>
    </div>
  `,
  styles: [`
    .animation-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: -1;
    }
    .three-canvas {
      width: 100%;
      height: 100%;
    }
  `]
})
export class ThreeAnimationComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  
  private animationId?: number;
  private particles: Particle[] = [];

  ngOnInit(): void {
    this.initAnimation();
  }

  ngOnDestroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  private initAnimation(): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d')!;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create particles
    for (let i = 0; i < 50; i++) {
      this.particles.push(new Particle(canvas.width, canvas.height));
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      this.particles.forEach(particle => {
        particle.update(canvas.width, canvas.height);
        particle.draw(ctx);
      });
      
      // Draw connections
      this.drawConnections(ctx);
      
      this.animationId = requestAnimationFrame(animate);
    };
    
    animate();
  }

  private drawConnections(ctx: CanvasRenderingContext2D): void {
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          ctx.strokeStyle = `rgba(37, 99, 235, ${0.2 * (1 - distance / 150)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(this.particles[i].x, this.particles[i].y);
          ctx.lineTo(this.particles[j].x, this.particles[j].y);
          ctx.stroke();
        }
      }
    }
  }
}

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.size = Math.random() * 3 + 1;
  }

  update(canvasWidth: number, canvasHeight: number): void {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > canvasWidth) this.vx *= -1;
    if (this.y < 0 || this.y > canvasHeight) this.vy *= -1;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = 'rgba(37, 99, 235, 0.6)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}