<template>
  <div class="capacitaciones-view">
    <div class="header">
      <h1>Capacitaciones y Desarrollo</h1>
      <button @click="showAddModal = true" class="btn-add">
        <i class="fas fa-plus"></i>
        Nueva Capacitación
      </button>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-play-circle"></i>
        </div>
        <div class="stat-content">
          <h3>{{ capacitacionesActivas }}</h3>
          <p>Activas</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-graduation-cap"></i>
        </div>
        <div class="stat-content">
          <h3>{{ empleadosCapacitados }}</h3>
          <p>Empleados Capacitados</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-certificate"></i>
        </div>
        <div class="stat-content">
          <h3>{{ certificacionesEmitidas }}</h3>
          <p>Certificaciones</p>
        </div>
      </div>
    </div>

    <div class="capacitaciones-grid">
      <div 
        v-for="capacitacion in capacitaciones" 
        :key="capacitacion.id"
        class="capacitacion-card"
      >
        <div class="capacitacion-header">
          <div class="capacitacion-info">
            <h3>{{ capacitacion.titulo }}</h3>
            <p class="instructor">{{ capacitacion.instructor }}</p>
            <p class="duracion">{{ capacitacion.duracion }} horas</p>
          </div>
          <span :class="['status-badge', capacitacion.estado]">
            {{ capacitacion.estado }}
          </span>
        </div>
        
        <div class="capacitacion-details">
          <p class="descripcion">{{ capacitacion.descripcion }}</p>
          <div class="participantes">
            <span class="participantes-count">{{ capacitacion.participantes }} participantes</span>
            <div class="progress-bar">
              <div 
                class="progress-fill" 
                :style="{ width: capacitacion.progreso + '%' }"
              ></div>
            </div>
            <span class="progreso-text">{{ capacitacion.progreso }}% completado</span>
          </div>
        </div>

        <div class="capacitacion-actions">
          <button @click="viewCapacitacion(capacitacion)" class="btn-view">
            <i class="fas fa-eye"></i>
            Ver
          </button>
          <button @click="editCapacitacion(capacitacion)" class="btn-edit">
            <i class="fas fa-edit"></i>
            Editar
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
const capacitaciones = ref([
  {
    id: 1,
    titulo: 'Vue.js Avanzado',
    instructor: 'Juan Pérez',
    duracion: 40,
    estado: 'activa',
    descripcion: 'Curso avanzado de Vue.js 3 con Composition API y mejores prácticas',
    participantes: 15,
    progreso: 75
  },
  {
    id: 2,
    titulo: 'Gestión de Proyectos Ágiles',
    instructor: 'María García',
    duracion: 24,
    estado: 'completada',
    descripcion: 'Metodologías ágiles y herramientas de gestión de proyectos',
    participantes: 20,
    progreso: 100
  },
  {
    id: 3,
    titulo: 'Liderazgo y Comunicación',
    instructor: 'Carlos López',
    duracion: 16,
    estado: 'programada',
    descripcion: 'Desarrollo de habilidades de liderazgo y comunicación efectiva',
    participantes: 12,
    progreso: 0
  }
])

const capacitacionesActivas = computed(() => 
  capacitaciones.value.filter(c => c.estado === 'activa').length
)

const empleadosCapacitados = computed(() => 
  capacitaciones.value.reduce((total, c) => total + c.participantes, 0)
)

const certificacionesEmitidas = computed(() => 
  capacitaciones.value.filter(c => c.estado === 'completada').length
)

const viewCapacitacion = (capacitacion) => {
  console.log('Ver capacitación:', capacitacion)
}

const editCapacitacion = (capacitacion) => {
  console.log('Editar capacitación:', capacitacion)
}
</script>

<style scoped>
.capacitaciones-view {
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

.capacitaciones-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 20px;
}

.capacitacion-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(20px);
  transition: all 0.3s ease;
}

.capacitacion-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.capacitacion-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}

.capacitacion-info h3 {
  color: #2d3748;
  margin: 0 0 8px 0;
  font-size: 1.3rem;
}

.capacitacion-info p {
  margin: 4px 0;
  color: #4a5568;
  font-size: 0.9rem;
}

.instructor {
  font-weight: 600;
  color: #667eea !important;
}

.status-badge {
  padding: 6px 16px;
  border-radius: 20px;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.8rem;
}

.status-badge.activa {
  background: #dbeafe;
  color: #1e40af;
}

.status-badge.completada {
  background: #d1fae5;
  color: #065f46;
}

.status-badge.programada {
  background: #fef3c7;
  color: #92400e;
}

.capacitacion-details {
  margin-bottom: 20px;
}

.descripcion {
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 15px;
}

.participantes {
  display: flex;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
}

.participantes-count {
  color: #2d3748;
  font-weight: 600;
  font-size: 0.9rem;
}

.progress-bar {
  flex: 1;
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
  min-width: 100px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transition: width 0.3s ease;
}

.progreso-text {
  color: #667eea;
  font-weight: 600;
  font-size: 0.9rem;
}

.capacitacion-actions {
  display: flex;
  gap: 10px;
}

.btn-view, .btn-edit {
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

.btn-edit {
  background: #48bb78;
  color: white;
}

.btn-view:hover, .btn-edit:hover {
  transform: translateY(-2px);
  opacity: 0.9;
}

@media (max-width: 768px) {
  .capacitaciones-view {
    padding: 20px;
  }
  
  .header {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
  
  .capacitaciones-grid {
    grid-template-columns: 1fr;
  }
  
  .capacitacion-header {
    flex-direction: column;
    gap: 15px;
    align-items: stretch;
  }
  
  .participantes {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }
}
</style>
