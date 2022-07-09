<template>
<div style="background-color: #D9DADA;">
<h1 style="color:black;">Dashboard</h1>
<div class="card" style="width: 18rem; overflow: hidden; height:6rem; display: inline-block;">
 <span style="margin-top: 1rem; margin-right: 15rem;">
 <i class="fa-solid fa-calendar-day" style="height: 2.4rem; color:#00608d;"></i>
  <div><h5><b style="color:black"> Number of appointments</b> </h5></div>
 <div style="color:black" > <b>{{NbAppoitments()}}</b></div>
 </span>
</div>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<div class="card" style="width: 18rem; overflow: hidden; height:6rem; display: inline-block;">
 <span style="margin-top: 1rem; margin-right: 15rem;">
 <i class="fa-solid fa-user-group" style="height: 2.4rem; color:#00608d;"></i>
  <div><h5><b style="color:black">Staff members</b> </h5></div>
 <div style="color:black" > <b>{{NbStaffMembers()}}</b></div>
 </span>
</div>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<div class="card" style="width: 18rem; overflow: hidden; height:6rem; display: inline-block;">
  <span style="margin-top: 1rem; margin-right: 15rem;">
 <i class="fa-solid fa-user-nurse" style="height: 2.4rem; color:#00608d;"></i>
  <div><h5><b style="color:black">Number of assistants</b></h5></div>
  <div style="color:black" > <b> {{NbAssistants()}}</b></div>
  </span>
</div>

<div class="card" style="width: 18rem; overflow: hidden; display: inline-block; height:6rem;">
  <span style="margin-top: 1rem; margin-right: 15rem;">
 <i class="fa-solid fa-phone" style="height: 2.4rem; color:#00608d;"></i>
  <div><h5><b style="color:black">Number of secretary</b></h5></div>
  <div style="color:black" > <b>{{NbSecretary()}}</b></div>
  </span>
</div>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<div class="card" style="width: 18rem; overflow: hidden;  display: inline-block; height: 6rem;">
  <span style="margin-top: 1rem; margin-right: 15rem;">
    <i class="fa-solid fa-head-side-virus" style="height: 2.4rem; color:#00608d;"></i>
    <div><h5><b style="color:black">Total patients </b></h5></div>
    <div style="color:black" > <b> {{NbPatients()}}</b></div>
  </span>
</div>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<div class="card" style="width: 18rem; overflow: hidden; display: inline-block; height:6rem;">
   <span style="margin-top: 1rem; margin-right: 15rem;">
<i class="fa-solid fa-coins" style="height: 2.4rem; color:#00608d;"></i>
  <div><h5><b style="color:black">Unpayed appointments</b></h5></div>
  <div style="color:black" > <b>{{ didntPay()}} Dhs</b></div>
  </span>
</div>
<div class="card" style="height: 20rem; margin-left: 25px; margin-right: 550px;overflow: auto;">
<div><h4><b style="color:black">Staff list</b></h4> </div>


<table class="table table-striped">
  <tbody>  
    <tr>
      <td border="1px"><b>First name</b></td>
      <td><b>Last name</b></td>
      <td><b>Role</b></td>
      
    </tr>
    <tr v-for="staff in staffs" :key="staff.id">
    <template v-if="staff.role!='doctor'">
      <td>{{staff.firstName}}</td>
      <td>{{staff.lastName}}</td>
      <td>{{staff.role}}</td>
     
    </template>
    </tr>
  
  </tbody>
</table>
</div>
<div class="card" style="height: 20rem;margin-top: -320px; margin-left: 550px; margin-right: 25px;overflow: auto;">
<div><h4><b style="color:black">Staff list</b></h4> </div>


<table class="table table-striped">
  <tbody>  
    <tr>
      <td border="1px"><b>Patient ID</b></td>
      <td><b>Payment status</b></td>
      <td><b>Date</b></td>
      
    </tr>
    <tr v-for="appointment in appointments" :key="appointment.id">
    
      <td>{{appointment.user}}</td>
      <td>{{appointment.paymentStatus}}</td>
      <td>{{appointment.date}}</td>
     
    
    </tr>
  
  </tbody>
</table>
</div>
</div>
</template>
<script>


export default {
  
  data(){
    return {
      show: false,
      showe: false,
      staffs : [],
      stafftoedit:{},
      appointments : [],
      patients : [],
    }
  },
  methods : {
     NbPatients(){
 return this.patients.length;
  },
    NbAppoitments(){
return this.appointments.length;
     },
     NbStaffMembers(){
let nbmembers =0;
 for(let i=0; i<this.staffs.length; i++ ){
  if(this.staffs[i].role != "doctor"){
  nbmembers++;}
 }
 return nbmembers;
     },
      NbAssistants(){
let nbassistants =0;
 for(let i=0; i<this.staffs.length; i++ ){
  if(this.staffs[i].role == "assistant"){
  nbassistants++;}
 }
 return nbassistants;
     },
      NbSecretary(){
let nbsecretary =0;
 for(let i=0; i<this.staffs.length; i++ ){
  if(this.staffs[i].role == "secretary"){
  nbsecretary++;}
 }
 return nbsecretary;
     },
    //unpayed appointments
       didntPay(){
let total =0;
 for(let i=0; i<this.appointments.length; i++ ){
  if(this.appointments[i].price-this.appointments[i].totalPaid >0 ){
total++;}
 }
 
 return total;
     },
    async getStaff(){
  var response = await fetch('http://localhost:8000/api/users/');
  this.staffs = await response.json();
          
},
 async getAppointments(){
  var response = await fetch('http://localhost:8000/api/appointments/');
  this.appointments = await response.json();
          
},
async getPatients(){
  var response = await fetch('http://localhost:8000/api/patients/');
  this.patients = await response.json();
          
},
async deleteStaff(staff){
  var response = await fetch("http://localhost:8000/api/users/"+staff.id, {
    method: 'delete',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(this.staff)
  });
  this.staffs.push(await response.json());
  window.location.reload(false);
},
toggleModal: function(){
  this.show = !this.show;
},
toggleModalEdit: function(){
  this.showe = !this.showe;
 
}
  },
  created() {
        this.getStaff();
        this.getAppointments();
        this.getPatients();   
    }
}
</script>