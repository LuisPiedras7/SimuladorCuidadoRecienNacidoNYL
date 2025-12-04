import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { Auth } from '../services/auth';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActividadesModalComponent } from './actividades-modal.component';

// ----------------------------
// INTERFAZ PARA LAS ACTIVIDADES
// ----------------------------
interface Actividad {
  id: number;
  actividad: string;
  fecha_inicial: string;
  fecha_limite: string;
  completada: number;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonicModule, RouterModule],
})
export class HomePage implements OnInit {
  private API_URL = environment.API_URL;

  // Estado de botones
  actividadesHabilitadas = {
    alimentar: false,
    banar: false,
    dormir: false,
    medicina: false,
    panal: false
  };

  constructor(
    private auth: Auth,
    private router: Router,
    private modalCtrl: ModalController,
    private http: HttpClient
  ) {}

  // Expose login state to the template to enable/disable buttons
  get isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  ngOnInit(): void {
    const curp = this.auth.getCurp();
    console.log('[HomePage] curp=', curp);
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
    } else {
      // Cargar actividades y actualizar botones al iniciar
      this.cargarActividades();
    }
  }

  async cargarActividades() {
    const curp = this.auth.getCurp();
    if (!curp) return;

    const url = `${this.API_URL}/actividades/dia/${curp}`;
    try {
      const res: any = await this.http.get(url).toPromise();
      const actividades: Actividad[] = res?.actividades || [];
      this.actualizarBotonesSegunActividades(actividades);
    } catch (err) {
      console.error('[Home] Error al obtener actividades:', err);
    }
  }

  actualizarBotonesSegunActividades(actividades: Actividad[]) {
    const ahora = new Date();

    actividades.forEach((act: Actividad) => {
      // Convertir strings a Date
      const inicio = new Date(act.fecha_inicial);
      const fin = new Date(act.fecha_limite);

      const habilitada = ahora >= inicio && ahora < fin;

      if (habilitada) {
        switch (act.actividad) {
          case "Alimentar":
            this.actividadesHabilitadas.alimentar = true;
            break;
          case "Bañar":
            this.actividadesHabilitadas.banar = true;
            break;
          case "Dormir":
            this.actividadesHabilitadas.dormir = true;
            break;
          case "Curar":
          case "Medicina":
            this.actividadesHabilitadas.medicina = true;
            break;
          case "Cambiar pañal":
            this.actividadesHabilitadas.panal = true;
            break;
        }
      }
    });
  }

  async openActivities() {
    const curp = this.auth.getCurp();
    if (!curp) {
      alert('No hay CURP registrada. Inicia sesión primero.');
      return;
    }

    const url = `${this.API_URL}/actividades/dia/${curp}`;
    try {
      const raw: string = (await this.http.get(url, { responseType: 'text' }).toPromise()) ?? '';
      const parsed: any = JSON.parse(raw);
      const actividades: Actividad[] = parsed?.actividades || [];

      // Actualizar botones cada vez que se abre el modal
      this.actualizarBotonesSegunActividades(actividades);

      const modal = await this.modalCtrl.create({
        component: ActividadesModalComponent,
        componentProps: { actividades },
      });
      await modal.present();
    } catch (err) {
      console.error('[Home] error fetching activities', err);
      alert('Error al obtener actividades del día. Revisa la consola para más detalles.');
    }
  }

  logout() {
    this.auth.clear();
    this.router.navigate(['/login']);
  }
}
