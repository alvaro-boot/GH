<template>
  <div class="empleados-view">
    <div class="header">
      <h1>Gestión de Empleados</h1>
      <button @click="showAddModal = true" class="btn-add">
        <i class="fas fa-plus"></i>
        Nuevo Empleado
      </button>
    </div>

    <div class="filters">
      <input 
        v-model="searchTerm" 
        type="text" 
        placeholder="Buscar empleados..."
        class="search-input"
      >
      <select v-model="selectedDepartment" class="filter-select">
        <option value="">Todos los departamentos</option>
        <option value="IT">Tecnología</option>
        <option value="HR">Recursos Humanos</option>
        <option value="Finance">Finanzas</option>
        <option value="Operations">Operaciones</option>
      </select>
    </div>

    <div class="employees-grid">
      <div 
        v-for="empleado in filteredEmpleados" 
        :key="empleado.id"
        class="employee-card"
      >
        <div class="employee-avatar">
          <img :src="empleado.avatar" :alt="empleado.nombre" />
        </div>
        <div class="employee-info">
          <h3>{{ empleado.nombre }}</h3>
          <p class="position">{{ empleado.cargo }}</p>
          <p class="department">{{ empleado.departamento }}</p>
          <p class="email">{{ empleado.email }}</p>
        </div>
        <div class="employee-actions">
          <button @click="editEmployee(empleado)" class="btn-edit">
            <i class="fas fa-edit"></i>
          </button>
          <button @click="viewEmployee(empleado)" class="btn-view">
            <i class="fas fa-eye"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Modal para agregar/editar empleado -->
    <div v-if="showAddModal" class="modal-overlay" @click="showAddModal = false">
      <div class="modal-content" @click.stop>
        <h2>{{ editingEmployee ? 'Editar Empleado' : 'Nuevo Empleado' }}</h2>
        <form @submit.prevent="saveEmployee">
          <div class="form-group">
            <label>Nombre Completo</label>
            <input v-model="form.nombre" type="text" required />
          </div>
          <div class="form-group">
            <label>Email</label>
            <input v-model="form.email" type="email" required />
          </div>
          <div class="form-group">
            <label>Cargo</label>
            <input v-model="form.cargo" type="text" required />
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
          <div class="form-actions">
            <button type="button" @click="showAddModal = false" class="btn-cancel">
              Cancelar
            </button>
            <button type="submit" class="btn-save">
              {{ editingEmployee ? 'Actualizar' : 'Guardar' }}
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
const selectedDepartment = ref('')
const showAddModal = ref(false)
const editingEmployee = ref(null)

const form = ref({
  nombre: '',
  email: '',
  cargo: '',
  departamento: ''
})

// Datos de ejemplo
const empleados = ref([
  {
    id: 1,
    nombre: 'Juan Pérez',
    email: 'juan.perez@cootravir.com',
    cargo: 'Desarrollador Senior',
    departamento: 'IT',
    avatar: 'https://via.placeholder.com/80'
  },
  {
    id: 2,
    nombre: 'María García',
    email: 'maria.garcia@cootravir.com',
    cargo: 'Analista de RRHH',
    departamento: 'HR',
    avatar: 'https://via.placeholder.com/80'
  },
  {
    id: 3,
    nombre: 'Carlos López',
    email: 'carlos.lopez@cootravir.com',
    cargo: 'Contador',
    departamento: 'Finance',
    avatar: 'https://via.placeholder.com/80'
  }
])

const filteredEmpleados = computed(() => {
  return empleados.value.filter(empleado => {
    const matchesSearch = empleado.nombre.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
                         empleado.email.toLowerCase().includes(searchTerm.value.toLowerCase())
    const matchesDepartment = !selectedDepartment.value || empleado.departamento === selectedDepartment.value
    return matchesSearch && matchesDepartment
  })
})

const editEmployee = (empleado) => {
  editingEmployee.value = empleado
  form.value = { ...empleado }
  showAddModal.value = true
}

const viewEmployee = (empleado) => {
  // Implementar vista de detalle
  console.log('Ver empleado:', empleado)
}

const saveEmployee = () => {
  if (editingEmployee.value) {
    // Actualizar empleado existente
    const index = empleados.value.findIndex(e => e.id === editingEmployee.value.id)
    empleados.value[index] = { ...form.value, id: editingEmployee.value.id }
  } else {
    // Agregar nuevo empleado
    const newEmployee = {
      ...form.value,
      id: empleados.value.length + 1,
      avatar: 'https://via.placeholder.com/80'
    }
    empleados.value.push(newEmployee)
  }
  
  showAddModal.value = false
  editingEmployee.value = null
  form.value = { nombre: '', email: '', cargo: '', departamento: '' }
}
</script>

<style scoped>
.empleados-view {
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

.employees-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.employee-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(20px);
  transition: all 0.3s ease;
}

.employee-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.employee-avatar {
  text-align: center;
  margin-bottom: 20px;
}

.employee-avatar img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

.employee-info h3 {
  color: #2d3748;
  margin-bottom: 8px;
  font-size: 1.3rem;
}

.employee-info p {
  margin: 5px 0;
  color: #4a5568;
}

.position {
  font-weight: 600;
  color: #667eea !important;
}

.employee-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.btn-edit, .btn-view {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.btn-edit {
  background: #667eea;
  color: white;
}

.btn-view {
  background: #48bb78;
  color: white;
}

.btn-edit:hover, .btn-view:hover {
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
  .empleados-view {
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
  
  .employees-grid {
    grid-template-columns: 1fr;
  }
}
</style>
