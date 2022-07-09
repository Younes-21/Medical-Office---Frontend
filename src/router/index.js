import { createRouter, createWebHistory } from 'vue-router'
import AdminPage from '../views/AdminPage.vue'
import MedicalFileDetails from '../views/MedicalFileDetails.vue'
import PatientsDetails from '../views/PatientsDetails.vue'
import StaffDetails from '../views/Doctorviews/StaffDetails.vue'
import AppointmentsDetails from '../views/AppointmentsDetails.vue'
import SchedulesDetails from '../views/SchedulesDetails.vue'
import PaymentsDetails from '../views/Doctorviews/PaymentsDetails.vue'
import DashboardDetails from '../views/DashboardDetails.vue'
import LoginView from '../views/LoginView.vue'

const routes = [
  {
    path:'/',
    name:'login',
    component: LoginView
  },
  {path:'/dashboarddetails',
  name:'dashboarddetails',
  component: DashboardDetails

  },
  {
    path:'/paymentsdetails',
    name:'paymentsdetails',
    component: PaymentsDetails
  },
  {
path:'/schedulesdetails',
name:'schedulesdetails',
component:SchedulesDetails
  },
  {
path:'/appointmentsdetails',
name:'appointmentsdetails',
component:AppointmentsDetails
  },
  {
    path:'/satffdetails',
    name:'staffdetails',
    component:StaffDetails
  },
  {
path:'/apage',
name:'apage',
component:AdminPage
  },
  {
    path:'/patientsdetails',
    name:'patientsdetails',
    component:PatientsDetails
  },
  {
    path:'/medicalfiles',
    name:'medicalfiles',
    component:MedicalFileDetails,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
