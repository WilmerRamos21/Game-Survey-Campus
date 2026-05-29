import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// Removimos IonTitle porque ya no se usa en el HTML
import { 
  IonContent, 
  IonHeader, 
  IonToolbar, 
  IonCard, 
  IonCardContent,
  IonButtons,
  IonBackButton
} from '@ionic/angular/standalone';

import { BaseChartDirective } from 'ng2-charts';

// Corregido el typo de ChartI a ChartOptions y Chart
import {
  Chart,
  ChartConfiguration,
  ChartOptions,
  ChartType,
  PieController,
  ArcElement,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';

import { EncuestasService } from 'src/app/services/encuesta.service';

Chart.register(
  PieController,
  ArcElement,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonCard,
    IonCardContent,
    IonButtons,
    IonBackButton,
    BaseChartDirective
  ]
})
export class DashboardPage implements OnInit {

  totalEncuestas = 0;

  // 1. SOLUCIÓN: Agregamos la propiedad chartOptions que faltaba en la clase
  chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#cbd5e1', // Color gris claro de tu paleta para las leyendas
          font: { family: 'system-ui', size: 12 }
        }
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#cbd5e1' }
      },
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#cbd5e1' }
      }
    }
  };

  // GRAFICO GENEROS
  pieChartType: ChartType = 'pie';
  pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: [],
    datasets: [{ 
      data: [],
      // Colores neón/vivos que contrastan excelente con tu fondo oscuro
      backgroundColor: ['#3b82f6', '#4ade80', '#f43f5e', '#a855f7', '#eab308'],
      borderWidth: 0
    }]
  };

  // GRAFICO PLATAFORMAS
  barChartType: ChartType = 'bar';
  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [{ 
      data: [], 
      label: 'Cantidad',
      backgroundColor: '#3b82f6', // Azul para hacer juego con el login-btn
      borderRadius: 8 
    }]
  };

  constructor(
    private encuestaService: EncuestasService,
    private router: Router 
  ) {}

  regresar() {
    this.router.navigate(['/encuestas']);
  }

  async ngOnInit(){
    const encuestas = await this.encuestaService.listar();
    this.totalEncuestas = encuestas.length;

    // =====================
    // GENEROS
    // =====================
    const generos: any = {};
    encuestas.forEach(e => {
      generos[e.genero_favorito] = (generos[e.genero_favorito] || 0) + 1;
    });

    this.pieChartData.labels = Object.keys(generos);
    this.pieChartData.datasets[0].data = Object.values(generos);

    // =====================
    // PLATAFORMAS
    // =====================
    const plataformas: any = {};
    encuestas.forEach(e => {
      plataformas[e.plataforma] = (plataformas[e.plataforma] || 0) + 1;
    });

    this.barChartData.labels = Object.keys(plataformas);
    this.barChartData.datasets[0].data = Object.values(plataformas);
  }
}