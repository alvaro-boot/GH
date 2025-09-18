<template>
  <div class="contrataciones-view">
    <div class="header">
      <h1>Gestión de Contrataciones</h1>
      <button @click="showAddModal = true" class="btn-add">
        <i class="fas fa-plus"></i>
        Nueva Contratación
      </button>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-user-plus"></i>
        </div>
        <div class="stat-content">
          <h3>{{ contratacionesPendientes }}</h3>
          <p>Pendientes</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-check-circle"></i>
        </div>
        <div class="stat-content">
          <h3>{{ contratacionesAprobadas }}</h3>
          <p>Aprobadas</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-times-circle"></i>
        </div>
        <div class="stat-content">
          <h3>{{ contratacionesRechazadas }}</h3>
          <p>Rechazadas</p>
        </div>
      </div>
    </div>

    <div class="filters">
      <select v-model="selectedStatus" class="filter-select">
        <option value="">Todos los estados</option>
        <option value="pendiente">Pendiente</option>
        <option value="aprobada">Aprobada</option>
        <option value="rechazada">Rechazada</option>
      </select>
      <input 
        v-model="searchTerm" 
        type="text" 
        placeholder="Buscar candidatos..."
        class="search-input"
      >
    </div>

    <div class="contrataciones-grid">
      <div 
        v-for="contratacion in filteredContrataciones" 
        :key="contratacion.id"
        class="contratacion-card"
      >
        <div class="candidate-info">
          <div class="candidate-avatar">
            <img :src="contratacion.avatar" :alt="contratacion.nombre" />
          </div>
          <div class="candidate-details">
            <h3>{{ contratacion.nombre }}</h3>
            <p class="position">{{ contratacion.posicion }}</p>
            <p class="department">{{ contratacion.departamento }}</p>
            <p class="experience">{{ contratacion.experiencia }} años de experiencia</p>
          </div>
        </div>
        
        <div class="contratacion-status">
          <span :class="['status-badge', contratacion.estado]">
            {{ contratacion.estado }}
          </span>
          <p class="fecha">{{ contratacion.fechaAplicacion }}</p>
        </div>

        <div class="contratacion-actions">
          <button @click="viewCandidate(contratacion)" class="btn-view">
            <i class="fas fa-eye"></i>
            Ver
          </button>
          <button 
            v-if="contratacion.estado === 'pendiente'"
            @click="approveCandidate(contratacion)" 
            class="btn-approve"
          >
            <i class="fas fa-check"></i>
            Aprobar
          </button>
          <button 
            v-if="contratacion.estado === 'pendiente'"
            @click="rejectCandidate(contratacion)" 
            class="btn-reject"
          >
            <i class="fas fa-times"></i>
            Rechazar
          </button>
        </div>
      </div>
    </div>

    <!-- Modal para nueva contratación -->
    <div v-if="showAddModal" class="modal-overlay" @click="showAddModal = false">
      <div class="modal-content" @click.stop>
        <h2>Nueva Contratación</h2>
        <form @submit.prevent="addContratacion">
          <div class="form-group">
            <label>Nombre del Candidato</label>
            <input v-model="form.nombre" type="text" required />
          </div>
          <div class="form-group">
            <label>Email</label>
            <input v-model="form.email" type="email" required />
          </div>
          <div class="form-group">
            <label>Posición</label>
            <input v-model="form.posicion" type="text" required />
          </div>
          <div class="form-group">
            <label>Departamento</label>
            <select v-model="form.departamento" required>
              <option value="IT">Tecnología</option>
              <option value="HR">Recursos Humanos</option>
              <option value="Finance">Finanzas</option>
              <option value="Operations">Operaciones</option>
            </select>
          </div>
          <div class="form-group">
            <label>Años de Experiencia</label>
            <input v-model="form.experiencia" type="number" min="0" required />
          </div>
          <div class="form-actions">
            <button type="button" @click="showAddModal = false" class="btn-cancel">
              Cancelar
            </button>
            <button type="submit" class="btn-save">
              Agregar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchTerm = ref('')
const selectedStatus = ref('')
const showAddModal = ref(false)

const form = ref({
  nombre: '',
  email: '',
  posicion: '',
  departamento: '',
  experiencia: 0
})

// Datos de ejemplo
const contrataciones = ref([
  {
    id: 1,
    nombre: 'Ana Rodríguez',
    email: 'ana.rodriguez@email.com',
    posicion: 'Desarrollador Frontend',
    departamento: 'IT',
    experiencia: 3,
    estado: 'pendiente',
    fechaAplicacion: '2024-03-10',
    avatar: 'https://via.placeholder.com/80'
  },
  {
    id: 2,
    nombre: 'Luis Martínez',
    email: 'luis.martinez@email.com',
    posicion: 'Analista Financiero',
    departamento: 'Finance',
    experiencia: 5,
    estado: 'aprobada',
    fechaAplicacion: '2024-03-08',
    avatar: 'https://via.placeholder.com/80'
  },
  {
    id: 3,
    nombre: 'Carmen Silva',
    email: 'carmen.silva@email.com',
    posicion: 'Especialista en RRHH',
    departamento: 'HR',
    experiencia: 4,
    estado: 'rechazada',
    fechaAplicacion: '2024-03-05',
    avatar: 'https://via.placeholder.com/80'
  }
])

const contratacionesPendientes = computed(() => 
  contrataciones.value.filter(c => c.estado === 'pendiente').length
)

const contratacionesAprobadas = computed(() => 
  contrataciones.value.filter(c => c.estado === 'aprobada').length
)

const contratacionesRechazadas = computed(() => 
  contrataciones.value.filter(c => c.estado === 'rechazada').length
)

const filteredContrataciones = computed(() => {
  return contrataciones.value.filter(contratacion => {
    const matchesSearch = contratacion.nombre.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
                         contratacion.posicion.toLowerCase().includes(searchTerm.value.toLowerCase())
    const matchesStatus = !selectedStatus.value || contratacion.estado === selectedStatus.value
    return matchesSearch && matchesStatus
  })
})

const viewCandidate = (candidate) => {
  console.log('Ver candidato:', candidate)
}

const approveCandidate = (candidate) => {
  candidate.estado = 'aprobada'
  console.log('Candidato aprobado:', candidate)
}

const rejectCandidate = (candidate) => {
  candidate.estado = 'rechazada'
  console.log('Candidato rechazado:', candidate)
}

const addContratacion = () => {
  const newContratacion = {
    ...form.value,
    id: contrataciones.value.length + 1,
    estado: 'pendiente',
    fechaAplicacion: new Date().toISOString().split('T')[0],
    avatar: 'https://via.placeholder.com/80'
  }
  contrataciones.value.push(newContratacion)
  
  showAddModal.value = false
  form.value = { nombre: '', email: '', posicion: '', departamento: '', experiencia: 0 }
}
</script>

<style scoped>
.contrataciones-view {
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

.filters {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
}

.search-input, .filter-select {
  padding: 12px 16px;
  border: none;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
}

.search-input {
  flex: 1;
  max-width: 400px;
}

.contrataciones-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 20px;
}

.contratacion-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(20px);
  transition: all 0.3s ease;
}

.contratacion-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.candidate-info {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.candidate-avatar {
  margin-right: 20px;
}

.candidate-avatar img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

.candidate-details h3 {
  color: #2d3748;
  margin-bottom: 8px;
  font-size: 1.3rem;
}

.candidate-details p {
  margin: 5px 0;
  color: #4a5568;
}

.position {
  font-weight: 600;
  color: #667eea !important;
}

.contratacion-status {
  margin-bottom: 20px;
  text-align: center;
}

.status-badge {
  display: inline-block;
  padding: 6px 16px;
  border-radius: 20px;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.9rem;
}

.status-badge.pendiente {
  background: #fef3c7;
  color: #92400e;
}

.status-badge.aprobada {
  background: #d1fae5;
  color: #065f46;
}

.status-badge.rechazada {
  background: #fee2e2;
  color: #991b1b;
}

.fecha {
  color: #718096;
  font-size: 0.9rem;
  margin-top: 8px;
}

.contratacion-actions {
  display: flex;
  gap: 10px;
}

.btn-view, .btn-approve, .btn-reject {
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

.btn-approve {
  background: #48bb78;
  color: white;
}

.btn-reject {
  background: #f56565;
  color: white;
}

.btn-view:hover, .btn-approve:hover, .btn-reject:hover {
  transform: translateY(-2px);
  opacity: 0.9;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 20px;
  padding: 30px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-content h2 {
  margin-bottom: 25px;
  color: #2d3748;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #4a5568;
  font-weight: 600;
}

.form-group input, .form-group select {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-group input:focus, .form-group select:focus {
  outline: none;
  border-color: #667eea;
}

.form-actions {
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  margin-top: 30px;
}

.btn-cancel, .btn-save {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-cancel {
  background: #e2e8f0;
  color: #4a5568;
}

.btn-save {
  background: #667eea;
  color: white;
}

.btn-cancel:hover, .btn-save:hover {
  transform: translateY(-2px);
  opacity: 0.9;
}

@media (max-width: 768px) {
  .contrataciones-view {
    padding: 20px;
  }
  
  .header {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
  
  .filters {
    flex-direction: column;
  }
  
  .contrataciones-grid {
    grid-template-columns: 1fr;
  }
  
  .candidate-info {
    flex-direction: column;
    text-align: center;
  }
  
  .candidate-avatar {
    margin-right: 0;
    margin-bottom: 15px;
  }
}
</style>
