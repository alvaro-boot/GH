<template>
  <div class="nomina-view">
    <div class="header">
      <h1>Gestión de Nómina</h1>
      <div class="header-actions">
        <select v-model="selectedPeriod" class="period-select">
          <option value="2024-01">Enero 2024</option>
          <option value="2024-02">Febrero 2024</option>
          <option value="2024-03">Marzo 2024</option>
        </select>
        <button @click="generateNomina" class="btn-generate">
          <i class="fas fa-calculator"></i>
          Generar Nómina
        </button>
      </div>
    </div>

    <div class="nomina-summary">
      <div class="summary-card">
        <div class="summary-icon">
          <i class="fas fa-users"></i>
        </div>
        <div class="summary-content">
          <h3>{{ totalEmpleados }}</h3>
          <p>Empleados</p>
        </div>
      </div>
      <div class="summary-card">
        <div class="summary-icon">
          <i class="fas fa-dollar-sign"></i>
        </div>
        <div class="summary-content">
          <h3>${{ totalNomina.toLocaleString() }}</h3>
          <p>Total Nómina</p>
        </div>
      </div>
      <div class="summary-card">
        <div class="summary-icon">
          <i class="fas fa-percentage"></i>
        </div>
        <div class="summary-content">
          <h3>{{ promedioSalario.toLocaleString() }}</h3>
          <p>Promedio Salario</p>
        </div>
      </div>
    </div>

    <div class="nomina-table-container">
      <div class="table-header">
        <h2>Detalle de Nómina</h2>
        <div class="table-actions">
          <input 
            v-model="searchTerm" 
            type="text" 
            placeholder="Buscar empleado..."
            class="search-input"
          >
          <button @click="goToTickets" class="btn-tickets">
            <i class="fas fa-ticket-alt"></i>
            Tickets TI
          </button>
          <button @click="exportNomina" class="btn-export">
            <i class="fas fa-download"></i>
            Exportar
          </button>
        </div>
      </div>

      <div class="table-wrapper">
        <table class="nomina-table">
          <thead>
            <tr>
              <th>Empleado</th>
              <th>Cargo</th>
              <th>Salario Base</th>
              <th>Horas Extra</th>
              <th>Bonificaciones</th>
              <th>Descuentos</th>
              <th>Neto a Pagar</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filteredNomina" :key="item.id">
              <td>
                <div class="employee-cell">
                  <img :src="item.avatar" :alt="item.nombre" class="employee-avatar">
                  <div>
                    <div class="employee-name">{{ item.nombre }}</div>
                    <div class="employee-id">ID: {{ item.id }}</div>
                  </div>
                </div>
              </td>
              <td>{{ item.cargo }}</td>
              <td>${{ item.salarioBase.toLocaleString() }}</td>
              <td>${{ item.horasExtra.toLocaleString() }}</td>
              <td>${{ item.bonificaciones.toLocaleString() }}</td>
              <td>${{ item.descuentos.toLocaleString() }}</td>
              <td class="neto-pagar">${{ item.netoPagar.toLocaleString() }}</td>
              <td>
                <button @click="viewDetails(item)" class="btn-details">
                  <i class="fas fa-eye"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal de detalles -->
    <div v-if="showDetailsModal" class="modal-overlay" @click="showDetailsModal = false">
      <div class="modal-content" @click.stop>
        <h2>Detalle de Nómina - {{ selectedEmployee?.nombre }}</h2>
        <div v-if="selectedEmployee" class="nomina-details">
          <div class="detail-section">
            <h3>Ingresos</h3>
            <div class="detail-item">
              <span>Salario Base:</span>
              <span>${{ selectedEmployee.salarioBase.toLocaleString() }}</span>
            </div>
            <div class="detail-item">
              <span>Horas Extra:</span>
              <span>${{ selectedEmployee.horasExtra.toLocaleString() }}</span>
            </div>
            <div class="detail-item">
              <span>Bonificaciones:</span>
              <span>${{ selectedEmployee.bonificaciones.toLocaleString() }}</span>
            </div>
            <div class="detail-item total">
              <span>Total Ingresos:</span>
              <span>${{ (selectedEmployee.salarioBase + selectedEmployee.horasExtra + selectedEmployee.bonificaciones).toLocaleString() }}</span>
            </div>
          </div>

          <div class="detail-section">
            <h3>Descuentos</h3>
            <div class="detail-item">
              <span>Salud:</span>
              <span>${{ (selectedEmployee.salarioBase * 0.04).toLocaleString() }}</span>
            </div>
            <div class="detail-item">
              <span>Pensión:</span>
              <span>${{ (selectedEmployee.salarioBase * 0.04).toLocaleString() }}</span>
            </div>
            <div class="detail-item">
              <span>Otros Descuentos:</span>
              <span>${{ selectedEmployee.descuentos.toLocaleString() }}</span>
            </div>
            <div class="detail-item total">
              <span>Total Descuentos:</span>
              <span>${{ (selectedEmployee.salarioBase * 0.08 + selectedEmployee.descuentos).toLocaleString() }}</span>
            </div>
          </div>

          <div class="detail-section final">
            <div class="detail-item final-total">
              <span>Neto a Pagar:</span>
              <span>${{ selectedEmployee.netoPagar.toLocaleString() }}</span>
            </div>
          </div>
        </div>
        <div class="modal-actions">
          <button @click="showDetailsModal = false" class="btn-close">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedPeriod = ref('2024-03')
const searchTerm = ref('')
const showDetailsModal = ref(false)
const selectedEmployee = ref(null)

// Datos de ejemplo
const nominaData = ref([
  {
    id: 1,
    nombre: 'Juan Pérez',
    cargo: 'Desarrollador Senior',
    salarioBase: 4500000,
    horasExtra: 200000,
    bonificaciones: 300000,
    descuentos: 150000,
    netoPagar: 4850000,
    avatar: 'https://via.placeholder.com/40'
  },
  {
    id: 2,
    nombre: 'María García',
    cargo: 'Analista de RRHH',
    salarioBase: 3800000,
    horasExtra: 100000,
    bonificaciones: 200000,
    descuentos: 100000,
    netoPagar: 4000000,
    avatar: 'https://via.placeholder.com/40'
  },
  {
    id: 3,
    nombre: 'Carlos López',
    cargo: 'Contador',
    salarioBase: 4200000,
    horasExtra: 150000,
    bonificaciones: 250000,
    descuentos: 120000,
    netoPagar: 4480000,
    avatar: 'https://via.placeholder.com/40'
  }
])

const totalEmpleados = computed(() => nominaData.value.length)

const totalNomina = computed(() => {
  return nominaData.value.reduce((total, item) => total + item.netoPagar, 0)
})

const promedioSalario = computed(() => {
  return Math.round(totalNomina.value / totalEmpleados.value)
})

const filteredNomina = computed(() => {
  return nominaData.value.filter(item => 
    item.nombre.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})

const generateNomina = () => {
  // Implementar generación de nómina
  console.log('Generando nómina para:', selectedPeriod.value)
}

const exportNomina = () => {
  // Implementar exportación
  console.log('Exportando nómina')
}

const viewDetails = (employee) => {
  selectedEmployee.value = employee
  showDetailsModal.value = true
}

// Navegación hacia el micro de IT desde Nómina
const goToTickets = () => {
  // Enviar mensaje al root para que navegue al módulo IT y setee la ruta de tickets
  window.parent?.postMessage({ type: 'navigate', module: 'it', path: '/tickets' }, '*')
}
</script>

<style scoped>
.nomina-view {
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

.nomina-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.summary-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  padding: 25px;
  display: flex;
  align-items: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(20px);
}

.summary-icon {
  font-size: 2.5rem;
  color: #667eea;
  margin-right: 20px;
}

.summary-content h3 {
  font-size: 2rem;
  color: #2d3748;
  margin: 0 0 5px 0;
}

.summary-content p {
  color: #4a5568;
  margin: 0;
  font-size: 1.1rem;
}

.nomina-table-container {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(20px);
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.table-header h2 {
  color: #2d3748;
  margin: 0;
}

.table-actions {
  display: flex;
  gap: 15px;
  align-items: center;
}

.search-input {
  padding: 10px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  width: 250px;
}

.search-input:focus {
  outline: none;
  border-color: #667eea;
}

.btn-tickets {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(217, 119, 6, 0.2);
}

.btn-tickets:hover {
  background: linear-gradient(135deg, #d97706 0%, #b45309 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(217, 119, 6, 0.3);
}

.btn-export {
  background: #48bb78;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-export:hover {
  background: #38a169;
  transform: translateY(-2px);
}

.table-wrapper {
  overflow-x: auto;
}

.nomina-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.nomina-table th,
.nomina-table td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}

.nomina-table th {
  background: #f7fafc;
  color: #2d3748;
  font-weight: 600;
  position: sticky;
  top: 0;
}

.employee-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.employee-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.employee-name {
  font-weight: 600;
  color: #2d3748;
}

.employee-id {
  font-size: 0.9rem;
  color: #718096;
}

.neto-pagar {
  font-weight: 700;
  color: #48bb78;
  font-size: 1.1rem;
}

.btn-details {
  background: #667eea;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-details:hover {
  background: #5a67d8;
  transform: translateY(-2px);
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
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-content h2 {
  margin-bottom: 25px;
  color: #2d3748;
}

.nomina-details {
  margin-bottom: 25px;
}

.detail-section {
  margin-bottom: 25px;
  padding: 20px;
  background: #f7fafc;
  border-radius: 12px;
}

.detail-section h3 {
  color: #2d3748;
  margin-bottom: 15px;
  font-size: 1.2rem;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 8px 0;
}

.detail-item.total {
  border-top: 2px solid #e2e8f0;
  margin-top: 10px;
  padding-top: 15px;
  font-weight: 600;
}

.detail-section.final {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.final-total {
  font-size: 1.3rem;
  font-weight: 700;
}

.modal-actions {
  text-align: right;
}

.btn-close {
  background: #e2e8f0;
  color: #4a5568;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-close:hover {
  background: #cbd5e0;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .nomina-view {
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
  
  .table-header {
    flex-direction: column;
    gap: 15px;
    align-items: stretch;
  }
  
  .table-actions {
    flex-direction: column;
  }
  
  .search-input {
    width: 100%;
  }
  
  .nomina-summary {
    grid-template-columns: 1fr;
  }
}
</style>
