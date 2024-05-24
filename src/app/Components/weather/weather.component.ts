import { AfterViewInit, Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { WeatherService } from '../../Service/weather.service';
import { ActivatedRoute } from '@angular/router';
import { Period } from '../../interfaces/weather';


@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent implements AfterViewInit {
  locationId: string | null = null;

  constructor(
    private route: ActivatedRoute, // ActivatedRoute se utiliza para obtener el parámetro 'id' de la URL
    private weatherService: WeatherService // WeatherService se utiliza para obtener los datos del pronóstico del clima
  ) { }

  ngAfterViewInit() {
    Chart.register(...registerables);
    const ctx = document.getElementById('weatherChart');

    if (ctx instanceof HTMLCanvasElement) {
      // Suscripción al cambio de parámetros en la URL
      this.route.paramMap.subscribe(params => {
        // Obtiene el ID de la ubicación desde la URL
        this.locationId = params.get('id');
        console.log(this.locationId);
        if (this.locationId) {
          // Obtiene los datos del pronóstico del clima del servicio WeatherService
          this.weatherService.getData(this.locationId).subscribe((data) => {
            console.log('Datos del pronóstico:', data); // Aquí colocamos el console.log para verificar los datos
            const periods: Period[] = data.properties.periods;
            const labels = periods.map(period => period.name);
            const values = periods.map(period => period.temperature);
            // Renderiza el gráfico del pronóstico del clima utilizando Chart.js
            const myChart = new Chart(ctx, {
              type: 'line',
              data: {
                labels: labels,
                datasets: [{
                  label: 'Temperature',
                  data: values,
                  fill: false,
                  borderColor: '#0d6efd',
                  tension: 0.1
                }]
              }
            });
          });
        } else {
          console.error("No se encontró el parámetro 'id' en la URL.");
        }
      });
    } else {
      console.error("No se encontró el elemento con el ID 'weatherChart'.");
    }
  }
}
