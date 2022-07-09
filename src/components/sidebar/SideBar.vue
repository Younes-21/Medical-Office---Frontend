<script>
import SidebarLink from './SidebarLink.vue'
import { collapsed, toggleSidebar, sidebarWidth } from './state'
export default {
  props: {},
  components: { SidebarLink },
  setup() {
    return { collapsed, toggleSidebar, sidebarWidth }
  }
}
</script>

<template>
  <div class="sidebar" :style="{ width: sidebarWidth }">
    <h1>
      <span v-if="collapsed">
        <div>M</div>
        <div>D</div>
      </span>
      <span v-else>My <br/> Doctor</span>
    </h1>

    <SidebarLink to="/dashboarddetails" icon="fas fa-home"><router-link class="nav-link active" :to="{name:'dashboarddetails'}">Dashboard</router-link></SidebarLink>
    <hr />
    <SidebarLink to="/medicalfiles" icon="fas fa-columns"><router-link class="nav-link active" :to="{name:'medicalfiles'}">Medical Files</router-link></SidebarLink>
    <hr />
    <SidebarLink to="/patientsdetails" icon="fas fa-users"><router-link class="nav-link active" :to="{name:'patientsdetails'}">Patients</router-link></SidebarLink>
    <hr />
    <SidebarLink to="/staffdetails" icon="fas fa-people-group"><router-link class="nav-link active" :to="{name:'staffdetails'}">Staff</router-link></SidebarLink>
    <hr />
    <SidebarLink to="/appointmentsdetails" icon="fas fa-calendar-check"><router-link class="nav-link active" :to="{name:'appointmentsdetails'}">Appointments</router-link></SidebarLink>
    <hr />
   <SidebarLink to="/paymentsdetails" icon="fas fa-dollar-sign"><router-link class="nav-link active" :to="{name:'paymentsdetails'}">Payments</router-link></SidebarLink>
    <hr />
    <SidebarLink to="/schedulesdetails" icon="fas fa-calendar-day"><router-link class="nav-link active" :to="{name:'schedulesdetails'}">Schedule</router-link></SidebarLink>

    <span
      class="collapse-icon"
      :class="{ 'rotate-180': collapsed }"
      @click="toggleSidebar"
    >
      <i class="fas fa-angle-double-left" />
    </span>
  </div>
</template>

<style>
:root {
  --sidebar-bg-color: #0099BE;
  --sidebar-item-hover: #00608d;
  --sidebar-item-active: #00283a;
}
</style>

<style scoped>
.sidebar {
  color: white;
  background-color: var(--sidebar-bg-color);
  float: left;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 0.5em;
  transition: 0.3s ease;
  display: flex;
  flex-direction: column;
}
.sidebar h1 {
  height: 2.5em;
}
.collapse-icon {
  position: absolute;
  bottom: 0;
  padding: 0.75em;
  color: rgba(255, 255, 255, 0.7);
  transition: 0.2s linear;
}
.rotate-180 {
  transform: rotate(180deg);
  transition: 0.2s linear;
}
</style>