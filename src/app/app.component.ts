import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, NgClass, FormsModule,
    InputNumberModule, FloatLabelModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'semaforo-app';
  init = false;
  intervalId: any;
  value: number | undefined;

  colors = [
    { color: 'red', active: false },
    { color: 'yellow', active: false },
    { color: 'green', active: false }
  ];

  initSemaforo() {
    this.init = true;
    this.cicloSemaforo();
    this.intervalId = setInterval(() => {
      this.cicloSemaforo();
    }, this.value);
  }

  stop() {
    this.init = false;
    clearInterval(this.intervalId);
    this.colors.forEach(cor => {
      cor.active = false;
    });
  }

  cicloSemaforo() {
    const activeIndex = this.colors.findIndex(cor => cor.active);
    if (activeIndex === -1) {
      this.active(2); // Inicia com o verde
    } else if (this.colors[activeIndex].color === 'red') {
      this.active(2); // Vai para o verde
    } else if (this.colors[activeIndex].color === 'green') {
      this.active(1); // Vai para o amarelo
    } else if (this.colors[activeIndex].color === 'yellow') {
      this.active(0); // vai para o vermelho
    }
  }

  active(index: number) {
    this.colors.forEach((cor, i) => {
      cor.active = i === index;
    });
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
}
