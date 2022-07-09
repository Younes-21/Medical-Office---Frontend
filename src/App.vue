<template>

 <NavBar />
 <SideBar />
 
<div :style="{ 'margin-left': sidebarWidth }">
  <router-view/>
</div>
<div v-if="showstatic">
<DashboardDetails />
<MedicalFileDetails />
<PatientsDetails />
<StaffDetails />
<AppointmentsDetails />
<SchedulesDetails />
<PaymentsDetails />
</div>

<div v-if="showf">
  <FooTer />
</div>
</template>
<script>
import DashboardDetails from './views/DashboardDetails.vue';
import AppointmentsDetails from './views/AppointmentsDetails.vue';
import StaffDetails from './views/Doctorviews/StaffDetails';
import PatientsDetails from './views/PatientsDetails';
import SideBar from '@/components/sidebar/SideBar.vue';
import { sidebarWidth } from '@/components/sidebar/state';
import NavBar from './components/NavBar.vue';
import FooTer from './components/FooTer.vue';

import SchedulesDetails from './views/SchedulesDetails.vue';
import PaymentsDetails from './views/Doctorviews/PaymentsDetails.vue';
import MedicalFileDetails from './views/MedicalFileDetails.vue';
export default{
  setup() {
    return { sidebarWidth }
  },
  data(){
    return{
  showf: false ,
  showstatic: false
}},
components:{ NavBar, FooTer, SideBar, PatientsDetails, StaffDetails, AppointmentsDetails, SchedulesDetails, PaymentsDetails, DashboardDetails, MedicalFileDetails },
 }
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>