import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'semaforo-app';
  init = false;

  colors = [
    { color: 'red', active: false },
    { color: 'orange', active: false },
    { color: 'green', active: false },
  ]
  ngOnInit(): void {

  }
  initSemaforo() {
    if (this.init) {
      this.cicloSemaforo(); // Inicia o ciclo imediatamente
      setInterval(() => {
        this.cicloSemaforo();
      }, 5000); // Ciclo a cada 3 segundos
    } else {
      this.colors.forEach(cor => {
        cor.active = false;
      });
    }
  }

  cicloSemaforo() {
    const activeIndex = this.colors.findIndex(cor => cor.active);
    if (activeIndex === -1) {
      this.active(0); // Inicia com o vermelho
    } else if (this.colors[activeIndex].color === 'red') {
      this.active(2); // Vai para o verde
    } else if (this.colors[activeIndex].color === 'green') {
      this.active(1); // Vai para o laranja
    } else if (this.colors[activeIndex].color === 'orange') {
      this.active(0); // Volta para o vermelho
    }
  }

  active(index: number) {
    this.colors.forEach((cor, i) => {
      cor.active = i === index;
    });
    console.log(this.colors);
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