import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'semaforo-app';

  color: { [key: string]: boolean } = {
    red: false,
    orange: false,
    green: false,
  };

  ngOnInit(): void {
    setTimeout(() => {
      this.cicloSemafaro();
      console.log(this.color)
    }, 2000)
  }

  cicloSemafaro() {
    Object.keys(this.color).forEach((key, index) => {
      if (index === 0) {
        if (!this.color[key]) {
          this.color[key] = true;
        } else {
          this.color['green'] = true;
          this.color['red'] = false;
        }
      }
    })
  }
}
