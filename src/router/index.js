import { createRouter, createWebHashHistory } from 'vue-router'
import GestionHumanaView from '../views/GestionHumanaView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'gestion-humana',
      component: GestionHumanaView,
    },
    {
      path: '/empleados',
      name: 'empleados',
      component: () => import('../views/EmpleadosView.vue'),
    },
    {
      path: '/nomina',
      name: 'nomina',
      component: () => import('../views/NominaView.vue'),
    },
    {
      path: '/contrataciones',
      name: 'contrataciones',
      component: () => import('../views/ContratacionesView.vue'),
    },
    {
      path: '/evaluaciones',
      name: 'evaluaciones',
      component: () => import('../views/EvaluacionesView.vue'),
    },
    {
      path: '/capacitaciones',
      name: 'capacitaciones',
      component: () => import('../views/CapacitacionesView.vue'),
    },
    {
      path: '/reportes',
      name: 'reportes',
      component: () => import('../views/ReportesView.vue'),
    },
  ],
})

export default router
