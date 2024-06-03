import { NgClass } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, NgClass
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'semaforo-app';
  init = false;
  intervalId: any;
  timerId: any;
  pedestrianRequest = false;

  colors = [
    { color: 'red', active: false },
    { color: 'yellow', active: false },
    { color: 'green', active: false }
  ];

  times = {
    green: 10000,
    yellow: 3000,
    red: 10000
  };

  currentTimes = {
    green: 10000,
    yellow: 3000,
    red: 10000
  };

  constructor(private cdr: ChangeDetectorRef) { }

  initSemaforo() {
    this.init = true;
    this.pedestrianRequest = false;
    this.cicloSemaforo();
    this.scheduleNextState();
  }

  stop() {
    this.init = false;
    clearTimeout(this.intervalId);
    clearInterval(this.timerId);
    this.colors.forEach(cor => {
      cor.active = false;
    });
    this.resetTimes();
    this.cdr.detectChanges();
  }

  cicloSemaforo() {
    const activeIndex = this.colors.findIndex(cor => cor.active);
    if (activeIndex === -1) {
      this.active(2); // Inicia com o verde
    } else if (this.colors[activeIndex].color === 'red') {
      this.active(2); // Vai para o verde
      this.resetTimes();
    } else if (this.colors[activeIndex].color === 'green') {
      this.active(1); // Vai para o amarelo
    } else if (this.colors[activeIndex].color === 'yellow') {
      this.active(0); // Volta para o vermelho
    }
    this.startTimer();
    this.cdr.detectChanges();
  }

  scheduleNextState() {
    const activeColor = this.colors.find(cor => cor.active);
    if (activeColor) {
      this.intervalId = setTimeout(() => {
        this.cicloSemaforo();
        this.scheduleNextState();
      }, this.currentTimes[activeColor.color as 'green' | 'yellow' | 'red']);
    }
  }

  startTimer() {
    clearInterval(this.timerId); // Limpa qualquer timer anterior
    const activeColor = this.colors.find(cor => cor.active);
    if (activeColor) {
      const colorKey = activeColor.color as 'green' | 'yellow' | 'red';
      this.timerId = setInterval(() => {
        if (this.currentTimes[colorKey] > 0) {
          this.currentTimes[colorKey] -= 1000;
          this.cdr.detectChanges(); // Força a detecção de mudanças
        } else {
          clearInterval(this.timerId);
        }
      }, 1000);
    }
  }

  active(index: number) {
    this.colors.forEach((cor, i) => {
      cor.active = i === index;
    });
  }

  requestPass() {
    if (!this.pedestrianRequest) {
      this.pedestrianRequest = true;
      const activeColor = this.colors.find(cor => cor.active);

      if (activeColor?.color === 'green') {
        this.currentTimes.green = Math.max(0, this.currentTimes.green - 4000);
      } else if (activeColor?.color === 'red') {
        this.currentTimes.red += 4000;
      }
      this.cdr.detectChanges();
    }
  }

  resetTimes() {
    this.currentTimes.green = this.times.green;
    this.currentTimes.yellow = this.times.yellow;
    this.currentTimes.red = this.times.red;
    this.pedestrianRequest = false;
    this.cdr.detectChanges();
  }

  getColorClasses(cor: { color: string, active: boolean }) {
    return {
      'active': cor.active,
      [cor.color]: true
    };
  }

  getIcon(): string {
    return this.init ? 'bi-stop-fill' : 'bi-play-fill';
  }

  getRemainingTime(color: string): string {
    const currentTime = this.currentTimes[color as 'green' | 'yellow' | 'red'];
    const remainingSeconds = Math.floor(currentTime / 1000);
    const formattedTime = remainingSeconds.toString().padStart(2, "0");
    return formattedTime;
  }
}


