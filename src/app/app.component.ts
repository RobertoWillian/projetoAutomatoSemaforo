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
  intervalId: any; // Armazenar a referência do intervalo

  colors = [
    { color: 'red', active: false },
    { color: 'orange', active: false },
    { color: 'green', active: false }
  ];

  cars = [
    { moving: false },
    { moving: false }
  ];

  ngOnInit(): void { }

  initSemaforo() {
    this.init = true;
    this.cicloSemaforo(); // Inicia o ciclo imediatamente
    this.intervalId = setInterval(() => {
      this.cicloSemaforo();
    }, 5000); // Ciclo a cada 5 segundos
  }

  stop() {
    console.log("stop");
    this.init = false;
    clearInterval(this.intervalId); // Limpa o intervalo
    this.colors.forEach(cor => {
      cor.active = false;
    });
    this.cars.forEach(car => car.moving = false); // Parar os carros
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
    this.updateCarsStatus();
  }

  active(index: number) {
    this.colors.forEach((cor, i) => {
      cor.active = i === index;
    });
    console.log(this.colors);
  }

  updateCarsStatus() {
    const activeIndex = this.colors.findIndex(cor => cor.active);
    if (this.colors[activeIndex].color === 'green') {
      this.cars.forEach(car => car.moving = true);
    } else {
      this.cars.forEach(car => car.moving = false);
    }
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