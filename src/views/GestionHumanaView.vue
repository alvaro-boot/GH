<template>
  <div class="gestion-humana">
    <!-- Header -->
    <div class="header">
      <div class="header-content">
        <h1>Gestión Humana</h1>
        <p>Administración de recursos humanos y personal</p>
      </div>
    </div>

    <!-- Dashboard Grid -->
    <div class="dashboard-container">
      <div class="dashboard-grid">
        <!-- Empleados -->
        <div class="card" @click="navigateTo('/empleados')">
          <div class="card-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="card-content">
            <h3>Empleados</h3>
            <p>Gestiona la información de empleados, contratos y datos personales</p>
            <div class="stat">
              <span class="stat-number">{{ empleadosCount }}</span>
              <span class="stat-label">Empleados activos</span>
            </div>
          </div>
        </div>

        <!-- Nómina -->
        <div class="card" @click="navigateTo('/nomina')">
          <div class="card-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 1V23" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6312 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6312 13.6815 18 14.5717 18 15.5C18 16.4283 17.6312 17.3185 16.9749 17.9749C16.3185 18.6312 15.4283 19 14.5 19H6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="card-content">
            <h3>Nómina</h3>
            <p>Administra salarios, prestaciones y cálculos de nómina</p>
            <div class="stat">
              <span class="stat-number">${{ nominaTotal.toLocaleString() }}</span>
              <span class="stat-label">Total nómina mensual</span>
            </div>
          </div>
        </div>

        <!-- Contrataciones -->
        <div class="card" @click="navigateTo('/contrataciones')">
          <div class="card-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="8.5" cy="7" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M20 8V14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M23 11H17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="card-content">
            <h3>Contrataciones</h3>
            <p>Proceso de selección y contratación de nuevo personal</p>
            <div class="stat">
              <span class="stat-number">{{ contratacionesPendientes }}</span>
              <span class="stat-label">Contrataciones pendientes</span>
            </div>
          </div>
        </div>

        <!-- Evaluaciones -->
        <div class="card" @click="navigateTo('/evaluaciones')">
          <div class="card-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 20V10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 20V4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M6 20V14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="card-content">
            <h3>Evaluaciones</h3>
            <p>Evaluaciones de desempeño y competencias del personal</p>
            <div class="stat">
              <span class="stat-number">{{ evaluacionesPendientes }}</span>
              <span class="stat-label">Evaluaciones pendientes</span>
            </div>
          </div>
        </div>

        <!-- Capacitaciones -->
        <div class="card" @click="navigateTo('/capacitaciones')">
          <div class="card-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 10V6C22 4.89543 21.1046 4 20 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M2 10H22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M7 15H7.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 15H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="card-content">
            <h3>Capacitaciones</h3>
            <p>Programas de capacitación y desarrollo profesional</p>
            <div class="stat">
              <span class="stat-number">{{ capacitacionesActivas }}</span>
              <span class="stat-label">Capacitaciones activas</span>
            </div>
          </div>
        </div>

        <!-- Reportes -->
        <div class="card" @click="navigateTo('/reportes')">
          <div class="card-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 3V21H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M9 9L12 6L16 10L20 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="card-content">
            <h3>Reportes</h3>
            <p>Reportes e indicadores de gestión humana</p>
            <div class="stat">
              <span class="stat-number">{{ reportesDisponibles }}</span>
              <span class="stat-label">Reportes disponibles</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Accesos directos a Tecnología (Inventario y Tickets) -->
    <div class="it-shortcuts">
      <h2>Accesos rápidos a Tecnología</h2>
      <p>Necesitas registrar o consultar equipamiento y tickets.</p>
      <div class="it-actions">
        <button class="it-btn" @click="goToIT('/inventario')">
          <i class="fas fa-boxes"></i>
          Ir a Inventario de TI
        </button>
        <button class="it-btn secondary" @click="goToIT('/tickets')">
          <i class="fas fa-ticket-alt"></i>
          Ir a Tickets de TI
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Datos de ejemplo
const empleadosCount = ref(156)
const nominaTotal = ref(125000000)
const contratacionesPendientes = ref(8)
const evaluacionesPendientes = ref(23)
const capacitacionesActivas = ref(12)
const reportesDisponibles = ref(15)

const navigateTo = (path) => {
  router.push(path)
}

// Navegación hacia el micro de IT desde Gestión Humana
function goToIT(path = '/') {
  // Enviar mensaje al root para que navegue al módulo IT y setee la ruta
  window.parent?.postMessage({ type: 'navigate', module: 'it', path }, '*')
}
</script>

<style scoped>
.gestion-humana {
  min-height: 100vh;
  background: #f8fafc;
  padding: 0;
  margin: 0;
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
}

.header {
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  padding: 60px 0;
  text-align: center;
  color: white;
  position: relative;
  overflow: hidden;
}

.header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/><circle cx="10" cy="60" r="0.5" fill="white" opacity="0.1"/><circle cx="90" cy="40" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  opacity: 0.3;
}

.header-content {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.header h1 {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 16px;
  background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
}

.header p {
  font-size: 1.25rem;
  opacity: 0.9;
  font-weight: 400;
  max-width: 600px;
  margin: 0 auto;
}

.dashboard-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 60px 20px;
}

.it-shortcuts {
  max-width: 1400px;
  margin: 0 auto 60px auto;
  padding: 0 20px;
}

.it-shortcuts h2 {
  font-size: 1.5rem;
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 10px;
}

.it-shortcuts p {
  color: #64748b;
  margin-bottom: 16px;
}

.it-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.it-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: #fff;
  border: none;
  padding: 12px 16px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 700;
  box-shadow: 0 8px 24px rgba(37,99,235,0.25);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.it-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(37,99,235,0.3);
}

.it-btn.secondary {
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  box-shadow: 0 8px 24px rgba(34,197,94,0.25);
}

.it-btn i {
  font-size: 14px;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 32px;
  width: 100%;
}

.card {
  background: white;
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: 1px solid #e2e8f0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.card:hover::before {
  transform: scaleX(1);
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border-color: #cbd5e1;
}

.card-icon {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  transition: all 0.3s ease;
}

.card:hover .card-icon {
  transform: scale(1.1);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
}

.card-icon svg {
  width: 28px;
  height: 28px;
  color: white;
}

.card-content h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 12px;
  letter-spacing: -0.01em;
}

.card-content p {
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 24px;
  font-size: 0.95rem;
}

.stat {
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  border-radius: 16px;
  padding: 20px;
  text-align: center;
  border: 1px solid #e2e8f0;
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 4px;
  letter-spacing: -0.02em;
}

.stat-label {
  font-size: 0.875rem;
  color: #64748b;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

@media (max-width: 768px) {
  .header {
    padding: 40px 0;
  }
  
  .header h1 {
    font-size: 2.5rem;
  }
  
  .header p {
    font-size: 1.125rem;
  }
  
  .dashboard-container {
    padding: 40px 16px;
  }
  
  .dashboard-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  
  .card {
    padding: 24px;
  }
  
  .card-icon {
    width: 56px;
    height: 56px;
  }
  
  .card-icon svg {
    width: 24px;
    height: 24px;
  }
}

@media (max-width: 480px) {
  .header h1 {
    font-size: 2rem;
  }
  
  .dashboard-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .card {
    padding: 20px;
  }
}
</style>
