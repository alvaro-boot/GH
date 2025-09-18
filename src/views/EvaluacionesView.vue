<template>
  <div class="evaluaciones-view">
    <div class="header">
      <h1>Evaluaciones de Desempeño</h1>
      <button @click="showAddModal = true" class="btn-add">
        <i class="fas fa-plus"></i>
        Nueva Evaluación
      </button>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-clock"></i>
        </div>
        <div class="stat-content">
          <h3>{{ evaluacionesPendientes }}</h3>
          <p>Pendientes</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-check-circle"></i>
        </div>
        <div class="stat-content">
          <h3>{{ evaluacionesCompletadas }}</h3>
          <p>Completadas</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-star"></i>
        </div>
        <div class="stat-content">
          <h3>{{ promedioEvaluacion }}</h3>
          <p>Promedio General</p>
        </div>
      </div>
    </div>

    <div class="evaluaciones-grid">
      <div 
        v-for="evaluacion in evaluaciones" 
        :key="evaluacion.id"
        class="evaluacion-card"
      >
        <div class="evaluacion-header">
          <div class="employee-info">
            <img :src="evaluacion.avatar" :alt="evaluacion.nombre" class="employee-avatar">
            <div>
              <h3>{{ evaluacion.nombre }}</h3>
              <p>{{ evaluacion.cargo }}</p>
            </div>
          </div>
          <span :class="['status-badge', evaluacion.estado]">
            {{ evaluacion.estado }}
          </span>
        </div>
        
        <div class="evaluacion-details">
          <div class="detail-item">
            <span>Período:</span>
            <span>{{ evaluacion.periodo }}</span>
          </div>
          <div class="detail-item">
            <span>Evaluador:</span>
            <span>{{ evaluacion.evaluador }}</span>
          </div>
          <div class="detail-item">
            <span>Puntuación:</span>
            <span class="score">{{ evaluacion.puntuacion }}/5</span>
          </div>
        </div>

        <div class="evaluacion-actions">
          <button @click="viewEvaluacion(evaluacion)" class="btn-view">
            <i class="fas fa-eye"></i>
            Ver
          </button>
          <button 
            v-if="evaluacion.estado === 'pendiente'"
            @click="completeEvaluacion(evaluacion)" 
            class="btn-complete"
          >
            <i class="fas fa-edit"></i>
            Completar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const showAddModal = ref(false)

// Datos de ejemplo
const evaluaciones = ref([
  {
    id: 1,
    nombre: 'Juan Pérez',
    cargo: 'Desarrollador Senior',
    estado: 'pendiente',
    periodo: 'Q1 2024',
    evaluador: 'María García',
    puntuacion: 0,
    avatar: 'https://via.placeholder.com/60'
  },
  {
    id: 2,
    nombre: 'María García',
    cargo: 'Analista de RRHH',
    estado: 'completada',
    periodo: 'Q1 2024',
    evaluador: 'Carlos López',
    puntuacion: 4.5,
    avatar: 'https://via.placeholder.com/60'
  },
  {
    id: 3,
    nombre: 'Carlos López',
    cargo: 'Contador',
    estado: 'completada',
    periodo: 'Q1 2024',
    evaluador: 'Ana Rodríguez',
    puntuacion: 4.2,
    avatar: 'https://via.placeholder.com/60'
  }
])

const evaluacionesPendientes = computed(() => 
  evaluaciones.value.filter(e => e.estado === 'pendiente').length
)

const evaluacionesCompletadas = computed(() => 
  evaluaciones.value.filter(e => e.estado === 'completada').length
)

const promedioEvaluacion = computed(() => {
  const completadas = evaluaciones.value.filter(e => e.estado === 'completada')
  if (completadas.length === 0) return 0
  const suma = completadas.reduce((total, e) => total + e.puntuacion, 0)
  return (suma / completadas.length).toFixed(1)
})

const viewEvaluacion = (evaluacion) => {
  console.log('Ver evaluación:', evaluacion)
}

const completeEvaluacion = (evaluacion) => {
  console.log('Completar evaluación:', evaluacion)
}
</script>

<style scoped>
.evaluaciones-view {
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

.btn-add {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  padding: 12px 24px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-add:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  padding: 25px;
  display: flex;
  align-items: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(20px);
}

.stat-icon {
  font-size: 2.5rem;
  color: #667eea;
  margin-right: 20px;
}

.stat-content h3 {
  font-size: 2rem;
  color: #2d3748;
  margin: 0 0 5px 0;
}

.stat-content p {
  color: #4a5568;
  margin: 0;
  font-size: 1.1rem;
}

.evaluaciones-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
}

.evaluacion-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(20px);
  transition: all 0.3s ease;
}

.evaluacion-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.evaluacion-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.employee-info {
  display: flex;
  align-items: center;
}

.employee-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 15px;
}

.employee-info h3 {
  color: #2d3748;
  margin: 0 0 5px 0;
  font-size: 1.2rem;
}

.employee-info p {
  color: #4a5568;
  margin: 0;
  font-size: 0.9rem;
}

.status-badge {
  padding: 6px 16px;
  border-radius: 20px;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.8rem;
}

.status-badge.pendiente {
  background: #fef3c7;
  color: #92400e;
}

.status-badge.completada {
  background: #d1fae5;
  color: #065f46;
}

.evaluacion-details {
  margin-bottom: 20px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  padding: 5px 0;
}

.detail-item span:first-child {
  color: #4a5568;
  font-weight: 500;
}

.detail-item span:last-child {
  color: #2d3748;
  font-weight: 600;
}

.score {
  color: #667eea !important;
  font-size: 1.1rem;
}

.evaluacion-actions {
  display: flex;
  gap: 10px;
}

.btn-view, .btn-complete {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-view {
  background: #667eea;
  color: white;
}

.btn-complete {
  background: #48bb78;
  color: white;
}

.btn-view:hover, .btn-complete:hover {
  transform: translateY(-2px);
  opacity: 0.9;
}

@media (max-width: 768px) {
  .evaluaciones-view {
    padding: 20px;
  }
  
  .header {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
  
  .evaluaciones-grid {
    grid-template-columns: 1fr;
  }
  
  .evaluacion-header {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
}
</style>
