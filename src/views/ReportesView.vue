<template>
  <div class="reportes-view">
    <div class="header">
      <h1>Reportes e Indicadores</h1>
      <div class="header-actions">
        <select v-model="selectedPeriod" class="period-select">
          <option value="2024-Q1">Q1 2024</option>
          <option value="2024-Q2">Q2 2024</option>
          <option value="2024-Q3">Q3 2024</option>
        </select>
        <button @click="generateReport" class="btn-generate">
          <i class="fas fa-download"></i>
          Generar Reporte
        </button>
      </div>
    </div>

    <div class="indicators-grid">
      <div class="indicator-card">
        <div class="indicator-header">
          <h3>Rotación de Personal</h3>
          <i class="fas fa-exchange-alt"></i>
        </div>
        <div class="indicator-value">
          <span class="value">{{ rotacionPersonal }}%</span>
          <span class="trend positive">↓ 2.3%</span>
        </div>
        <div class="indicator-chart">
          <div class="chart-bar" style="height: 60%"></div>
        </div>
      </div>

      <div class="indicator-card">
        <div class="indicator-header">
          <h3>Satisfacción Laboral</h3>
          <i class="fas fa-smile"></i>
        </div>
        <div class="indicator-value">
          <span class="value">{{ satisfaccionLaboral }}/5</span>
          <span class="trend positive">↑ 0.2</span>
        </div>
        <div class="indicator-chart">
          <div class="chart-bar" style="height: 80%"></div>
        </div>
      </div>

      <div class="indicator-card">
        <div class="indicator-header">
          <h3>Productividad</h3>
          <i class="fas fa-chart-line"></i>
        </div>
        <div class="indicator-value">
          <span class="value">{{ productividad }}%</span>
          <span class="trend positive">↑ 5.1%</span>
        </div>
        <div class="indicator-chart">
          <div class="chart-bar" style="height: 75%"></div>
        </div>
      </div>

      <div class="indicator-card">
        <div class="indicator-header">
          <h3>Capacitación</h3>
          <i class="fas fa-graduation-cap"></i>
        </div>
        <div class="indicator-value">
          <span class="value">{{ empleadosCapacitados }}%</span>
          <span class="trend positive">↑ 8.7%</span>
        </div>
        <div class="indicator-chart">
          <div class="chart-bar" style="height: 70%"></div>
        </div>
      </div>
    </div>

    <div class="reports-section">
      <h2>Reportes Disponibles</h2>
      <div class="reports-grid">
        <div 
          v-for="reporte in reportes" 
          :key="reporte.id"
          class="report-card"
          @click="downloadReport(reporte)"
        >
          <div class="report-icon">
            <i :class="reporte.icono"></i>
          </div>
          <div class="report-info">
            <h3>{{ reporte.titulo }}</h3>
            <p>{{ reporte.descripcion }}</p>
            <span class="report-type">{{ reporte.tipo }}</span>
          </div>
          <div class="report-actions">
            <button class="btn-download">
              <i class="fas fa-download"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="charts-section">
      <h2>Análisis Visual</h2>
      <div class="charts-grid">
        <div class="chart-container">
          <h3>Distribución por Departamentos</h3>
          <div class="pie-chart">
            <div class="pie-slice" style="--percentage: 35; --color: #667eea;">
              <span>IT (35%)</span>
            </div>
            <div class="pie-slice" style="--percentage: 25; --color: #48bb78;">
              <span>HR (25%)</span>
            </div>
            <div class="pie-slice" style="--percentage: 20; --color: #f56565;">
              <span>Finance (20%)</span>
            </div>
            <div class="pie-slice" style="--percentage: 20; --color: #ed8936;">
              <span>Operations (20%)</span>
            </div>
          </div>
        </div>

        <div class="chart-container">
          <h3>Tendencia de Contrataciones</h3>
          <div class="line-chart">
            <div class="chart-line">
              <div class="data-point" style="left: 10%; bottom: 20%;"></div>
              <div class="data-point" style="left: 30%; bottom: 35%;"></div>
              <div class="data-point" style="left: 50%; bottom: 45%;"></div>
              <div class="data-point" style="left: 70%; bottom: 60%;"></div>
              <div class="data-point" style="left: 90%; bottom: 55%;"></div>
            </div>
            <div class="chart-labels">
              <span>Ene</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Abr</span>
              <span>May</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedPeriod = ref('2024-Q1')

// Indicadores
const rotacionPersonal = ref(12.5)
const satisfaccionLaboral = ref(4.2)
const productividad = ref(87.3)
const empleadosCapacitados = ref(78.5)

// Reportes disponibles
const reportes = ref([
  {
    id: 1,
    titulo: 'Reporte de Nómina',
    descripcion: 'Detalle completo de salarios y prestaciones',
    tipo: 'Excel',
    icono: 'fas fa-file-excel'
  },
  {
    id: 2,
    titulo: 'Evaluaciones de Desempeño',
    descripcion: 'Resultados de evaluaciones por período',
    tipo: 'PDF',
    icono: 'fas fa-file-pdf'
  },
  {
    id: 3,
    titulo: 'Indicadores de RRHH',
    descripcion: 'Métricas clave de gestión humana',
    tipo: 'Excel',
    icono: 'fas fa-chart-bar'
  },
  {
    id: 4,
    titulo: 'Capacitaciones Completadas',
    descripcion: 'Listado de empleados capacitados',
    tipo: 'PDF',
    icono: 'fas fa-graduation-cap'
  },
  {
    id: 5,
    titulo: 'Rotación de Personal',
    descripcion: 'Análisis de rotación por departamento',
    tipo: 'Excel',
    icono: 'fas fa-exchange-alt'
  },
  {
    id: 6,
    titulo: 'Satisfacción Laboral',
    descripcion: 'Resultados de encuestas de satisfacción',
    tipo: 'PDF',
    icono: 'fas fa-smile'
  }
])

const generateReport = () => {
  console.log('Generando reporte para:', selectedPeriod.value)
}

const downloadReport = (reporte) => {
  console.log('Descargando reporte:', reporte.titulo)
}
</script>

<style scoped>
.reportes-view {
  padding: 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  color: white;
}

.header h1 {
  font-size: 2.5rem;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 15px;
  align-items: center;
}

.period-select {
  padding: 12px 16px;
  border: none;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
}

.btn-generate {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  padding: 12px 24px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-generate:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.indicators-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.indicator-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(20px);
  transition: all 0.3s ease;
}

.indicator-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.indicator-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.indicator-header h3 {
  color: #2d3748;
  margin: 0;
  font-size: 1.1rem;
}

.indicator-header i {
  color: #667eea;
  font-size: 1.5rem;
}

.indicator-value {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.value {
  font-size: 2rem;
  font-weight: 700;
  color: #2d3748;
}

.trend {
  font-size: 0.9rem;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 12px;
}

.trend.positive {
  background: #d1fae5;
  color: #065f46;
}

.indicator-chart {
  height: 60px;
  background: #f7fafc;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
}

.chart-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
  transition: height 0.3s ease;
}

.reports-section, .charts-section {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(20px);
}

.reports-section h2, .charts-section h2 {
  color: #2d3748;
  margin-bottom: 25px;
  font-size: 1.8rem;
}

.reports-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.report-card {
  background: #f7fafc;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.report-card:hover {
  background: #edf2f7;
  border-color: #667eea;
  transform: translateY(-2px);
}

.report-icon {
  font-size: 2rem;
  color: #667eea;
}

.report-info {
  flex: 1;
}

.report-info h3 {
  color: #2d3748;
  margin: 0 0 8px 0;
  font-size: 1.1rem;
}

.report-info p {
  color: #4a5568;
  margin: 0 0 8px 0;
  font-size: 0.9rem;
}

.report-type {
  background: #667eea;
  color: white;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
}

.btn-download {
  background: #48bb78;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-download:hover {
  background: #38a169;
  transform: translateY(-2px);
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 30px;
}

.chart-container {
  background: #f7fafc;
  border-radius: 12px;
  padding: 25px;
}

.chart-container h3 {
  color: #2d3748;
  margin-bottom: 20px;
  text-align: center;
}

.pie-chart {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}

.pie-slice {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
  border-radius: 8px;
  background: var(--color);
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
}

.line-chart {
  height: 200px;
  position: relative;
  background: #f7fafc;
  border-radius: 8px;
  padding: 20px;
}

.chart-line {
  position: relative;
  height: 100%;
  width: 100%;
}

.data-point {
  position: absolute;
  width: 8px;
  height: 8px;
  background: #667eea;
  border-radius: 50%;
  transform: translate(-50%, 50%);
}

.chart-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  color: #4a5568;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .reportes-view {
    padding: 20px;
  }
  
  .header {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
  
  .header-actions {
    flex-direction: column;
    width: 100%;
  }
  
  .indicators-grid {
    grid-template-columns: 1fr;
  }
  
  .reports-grid {
    grid-template-columns: 1fr;
  }
  
  .charts-grid {
    grid-template-columns: 1fr;
  }
}
</style>
