import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioService } from './services/formulario.service';
import { StepperComponent } from './components/stepper/stepper.component';
import { Paso1SolicitanteComponent } from './components/paso1-solicitante/paso1-solicitante.component';
import { Paso2IngresosComponent } from './components/paso2-ingresos/paso2-ingresos.component';
import { Paso3GastosComponent } from './components/paso3-gastos/paso3-gastos.component';
import { Paso4PatrimonioComponent } from './components/paso4-patrimonio/paso4-patrimonio.component';
import { Paso5PrestamoComponent } from './components/paso5-prestamo/paso5-prestamo.component';
import { Paso6ResultadoComponent } from './components/paso6-resultado/paso6-resultado.component';
import { CsvImportComponent } from './components/csv-import/csv-import.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, StepperComponent, CsvImportComponent,
    Paso1SolicitanteComponent, Paso2IngresosComponent,
    Paso3GastosComponent, Paso4PatrimonioComponent,
    Paso5PrestamoComponent, Paso6ResultadoComponent
  ],
  template: `
    <div class="app-shell">

      <header class="app-header">
        <div class="header-inner">
          <div class="logo">
            <span class="logo-icon">H</span>
            <div>
              <span class="logo-title">SolvenciaHipotecaria</span>
              <span class="logo-sub">Motor de análisis de crédito inmobiliario</span>
            </div>
          </div>
          <div class="header-actions">
            <button class="btn-header" title="Descargar plantilla CSV vacía" (click)="descargarPlantilla()">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="12" y1="13" x2="12" y2="19"/>
                <polyline points="9,16 12,19 15,16"/>
              </svg>
              Plantilla
            </button>
            <button class="btn-header" title="Exportar datos actuales a CSV" (click)="exportarCSV()">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7,10 12,15 17,10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Exportar
            </button>
            <button class="btn-import-toggle"
              [class.active]="showImport"
              (click)="showImport = !showImport">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="12" y1="18" x2="12" y2="12"/>
                <polyline points="9,15 12,12 15,15"/>
              </svg>
              Importar CSV
            </button>
            <span class="version-badge">v2.3</span>
          </div>
        </div>

        @if (showImport) {
          <div class="import-panel">
            <app-csv-import (importado)="onImportado()" />
          </div>
        }
      </header>

      @if (csvCargado() && !showImport) {
        <div class="csv-banner">
          <div class="csv-banner-inner">
            <div class="csv-banner-left">
              <div class="csv-icon-wrap">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round">
                  <circle cx="12" cy="12" r="10"/><polyline points="9,12 12,15 16,9"/>
                </svg>
              </div>
              <div class="csv-banner-text">
                <strong>Datos cargados desde CSV</strong>
                <span>{{ csvCargado()!.nombreArchivo }} — {{ csvCargado()!.camposCargados }} campos importados</span>
              </div>
            </div>
            <div class="csv-banner-actions">
              <button class="csv-btn-edit" (click)="showImport = true">Cambiar archivo</button>
              <button class="csv-btn-dismiss" (click)="descartarCsv()" title="Descartar aviso">✕</button>
            </div>
          </div>
        </div>
      }

      <main class="app-main">
        <app-stepper />
        <div class="paso-container">
          @switch (pasoActual()) {
            @case (1) { <app-paso1-solicitante /> }
            @case (2) { <app-paso2-ingresos /> }
            @case (3) { <app-paso3-gastos /> }
            @case (4) { <app-paso4-patrimonio /> }
            @case (5) { <app-paso5-prestamo /> }
            @case (6) { <app-paso6-resultado /> }
          }
        </div>
      </main>

      <footer class="app-footer">
        <span>Uso interno exclusivo — Análisis orientativo, no vinculante</span>
        <span>Regulado por la Ley 5/2019</span>
      </footer>
    </div>
  `,
  styles: [`
    .app-shell { min-height: 100vh; display: flex; flex-direction: column; background: var(--color-background-tertiary); }
    .app-header { background: var(--color-background-primary); border-bottom: 0.5px solid var(--color-border-tertiary); padding: 0 1.5rem; }
    .header-inner { max-width: 860px; margin: 0 auto; width: 100%; display: flex; align-items: center; justify-content: space-between; height: 56px; }
    .logo { display: flex; align-items: center; gap: 10px; }
    .logo-icon { width: 32px; height: 32px; background: #185FA5; color: #fff; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: 500; }
    .logo-title { font-size: 15px; font-weight: 500; display: block; }
    .logo-sub { font-size: 11px; color: var(--color-text-secondary); display: block; }
    .header-actions { display: flex; align-items: center; gap: 10px; }
    .btn-header { display: flex; align-items: center; gap: 5px; padding: 5px 12px; border-radius: var(--border-radius-md); border: 0.5px solid var(--color-border-secondary); background: transparent; cursor: pointer; font-size: 12px; }
    .btn-import-toggle { display: flex; align-items: center; gap: 6px; padding: 6px 14px; border-radius: var(--border-radius-md); border: 0.5px solid var(--color-border-secondary); cursor: pointer; }
    .btn-import-toggle.active { background: var(--color-background-info); color: var(--color-text-info); }
    .app-main { flex: 1; max-width: 860px; margin: 0 auto; width: 100%; padding: 1.5rem 1rem; }
    .app-footer { text-align: center; padding: 1rem; font-size: 12px; color: var(--color-text-tertiary); border-top: 0.5px solid var(--color-border-tertiary); display: flex; justify-content: space-between; max-width: 860px; margin: 0 auto; width: 100%; }
    .csv-banner { background: #EAF3DE; border-bottom: 1px solid #C0DD97; padding: 10px; }
    .csv-banner-inner { max-width: 860px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
  `]
})
export class AppComponent {
  showImport = false;

  constructor(private form: FormularioService) {}

  pasoActual = this.form.pasoActual;
  csvCargado = this.form.csvCargado;

  onImportado() {
    setTimeout(() => { this.showImport = false; }, 0);
  }

  descartarCsv() { this.form.descartarCsv(); }

  descargarPlantilla() {
    const csv = this.generarPlantillaCSV();
    this.descargarArchivo(csv, 'plantilla_solicitud.csv');
  }

  exportarCSV() {
    const s = this.form.solicitud();
    const csv = this.solicitudACSV(s);
    this.descargarArchivo(csv, `solicitud_${new Date().toISOString().slice(0, 10)}.csv`);
  }

  private descargarArchivo(contenido: string, nombre: string) {
    const blob = new Blob([contenido], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = nombre; a.click();
    URL.revokeObjectURL(url);
  }

  private solicitudACSV(s: any): string {
    const p = s.prestamo; const sol = s.solicitante;
    const t1 = s.titular1; const t2 = s.titular2;
    const h = s.historial; const g = s.gastos; const pat = s.patrimonio;
    const filas = [
      ['campo', 'valor'],
      ['nombre', sol.nombre],
      ['t1_ingresos', t1.ingresosMensuales],
      ['precio_compra', p.precioCompra],
      ['importe_financiar', p.importeFinanciar],
      ['productos_vinculados', (p.productosVinculados || []).join('|')],
    ];
    return filas.map(f => f.join(',')).join('\n');
  }

  private generarPlantillaCSV(): string {
    return `campo,valor
nombre,
fecha_nacimiento,
estado_civil,
regimen_economico,
nacionalidad,es
anios_residencia,
titulares,1
dependientes,0
bebes,0
discapacidad,no
ccaa,
municipio,media
vivienda_actual,alquiler
t1_contrato,indefinido
t1_antiguedad,
t1_sector,
t1_ingresos,
t1_pagas,14
t1_otros_ingresos,0
t2_contrato,sin_ingresos
t2_antiguedad,0
t2_sector,otro
t2_ingresos,0
t2_pagas,14
t2_otros_ingresos,0
cirbe,no
morosos,no
impagos,no
relacion_bancaria,0
g_personal,0
g_tarjetas,0
g_leasing,0
g_pension,0
g_alquiler,0
g_otros,0
g_alimentacion,600
g_suministros,200
g_transporte,150
g_educacion,0
g_seguros,80
g_ocio,200
ahorro,0
inversiones,0
inmuebles,0
vehiculos,0
plan_pension,0
otros_activos,0
d_personal,0
d_tarjetas,0
d_hipoteca,0
d_otros,0
precio_compra,
valor_tasacion,
tipologia,primera
tipo_inmueble,piso
certificado_energetico,C
provincia,
importe_financiar,
plazo_anios,25
tipo_interes,fijo
tae,3.5
diferencial,0.75
carencia_meses,0
productos_vinculados,`;
  }
}