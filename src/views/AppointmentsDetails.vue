<template>
<div style="background-color: #D9DADA;">
<h1 style="color:black;">Appointments</h1>
<div class="card" style="width: 18rem; overflow: hidden;  display: inline-block; height: 6rem;">
  <span style="margin-top: 1rem; margin-right: 15rem;">
    <i class="fa-solid fa-dollar-sign" style="height: 2.40rem; color:#00608d;"></i>
    <div><h5><b style="color:black">Total payed </b></h5></div>
    <div style="color:black" > <b>{{Totalpayed()}} Dhs</b></div>
  </span>
</div>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<div class="card" style="width: 18rem; overflow: hidden; height:6rem; display: inline-block;">
 <span style="margin-top: 1rem; margin-right: 15rem;">
 <i class="fa-solid fa-calendar-day" style="height: 2.4rem; color:#00608d;"></i>
  <div><h5><b style="color:black"> Number of appointments</b> </h5></div>
 <div style="color:black" > <b>{{nbAppointments()}}</b></div>
 </span>
</div>
<br/>

<div class="card" style="width: 18rem; overflow: hidden; display: inline-block; height:6rem;">
   <span style="margin-top: 1rem; margin-right: 15rem;">
 <i  class="fa-solid fa-sack-dollar" style="height: 2.4rem; color:#00608d;"></i>
  <div><h5><b style="color:black">Total unpayed </b></h5></div>
  <div style="color:black" > <b>{{ Totalunpayed()}} Dhs</b></div>
  </span>
</div>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<div class="card" style="width: 18rem; overflow: hidden; display: inline-block; height:6rem;">
   <span style="margin-top: 1rem; margin-right: 15rem;">
<i class="fa-solid fa-coins" style="height: 2.4rem; color:#00608d;"></i>
  <div><h5><b style="color:black">Not totally paid</b></h5></div>
  <div style="color:black" > <b>{{unpayedAppointments()}}</b></div>
  </span>
</div>
 <div class="card" style="height: 22rem; margin-left: 50px; margin-right: 50px;overflow: auto;">
<div><h4><b style="color:black">Appointments list</b></h4><hr />
<button @click="toggleModalAddAppointment" style="background-color: #00608d;border: #00608d;border-radius: 5px;height: 32px; color: white;">Add appointment</button><hr /></div>
<div v-if="showaddappointment"><AddAppointment v-bind:showaddappointment="showaddappointment" v-bind:toggleModalAddAppointment="toggleModalAddAppointment"/></div>
<div v-if="showeditappointment"><EditAppointment v-bind:showeditappointment="showeditappointment" v-bind:appointmenttoedit="appointmenttoedit" v-bind:toggleModalEditAppointment="toggleModalEditAppointment"/></div>
<table class="table">
  
  <tbody>
    
  
    <tr>
      
      <td>Date</td>
      <td>Price</td>
      <td>Payment status</td>
      <td>Reason</td>
      <td>Patient ID</td>
      <td>Actions</td>
    </tr>
    
    <tr v-for="appointment in appointments" :key="appointment.id" >
      <td>{{appointment.date}}</td>
      <td>{{appointment.price}}</td>
      <td>{{appointment.paymentStatus}}</td>
      <td>{{appointment.reason}}</td>
      <td>{{appointment.patient}}</td>
      <td>
        <button type="button" @click="getoneAppointment(appointment)"  class="btn btn-warning">Update</button>
          &nbsp;
          <button type="button"  @click="deleteAppointment(appointment)" class="btn btn-danger">Delete</button>
      </td>
    </tr>
  
  </tbody>
</table>
 </div>
</div>
</template>
<script>
import AddAppointment from '@/components/Modals/AddAppointment.vue'
import EditAppointment from '@/components/Modals/EditAppointment.vue'
export default {
   components : { AddAppointment , EditAppointment},
  data(){
    return {
      appointments : [],
      appointment : {},
      showaddappointment : false,
      showeditappointment : false,
      appointmenttoedit : {},
    }
  },
  methods : {
    //Appointment to edit
    async getoneAppointment(appointment){
   var response = await fetch("http://localhost:8000/api/appointments/"+appointment.id);
  this.appointmenttoedit = await response.json();
   this.toggleModalEditAppointment();
},
    async getAppointment(){
  var response = await fetch('http://localhost:8000/api/appointments/');
  this.appointments = await response.json();
          /*const data = await response.json();  
            console.log(data, data.slice()); // <-- These are the same
            this.patients = data.slice();*/
},
toggleModalAddAppointment: function(){
  this.showaddappointment = !this.showaddappointment;
},
toggleModalEditAppointment: function(){
  this.showeditappointment = !this.showeditappointment;
 
},
async deleteAppointment(appointment){
  var response = await fetch("http://localhost:8000/api/appointments/"+appointment.id, {
    method: 'delete',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(this.appointment)
  });
  this.appointments.push(await response.json());
  window.location.reload(false);
},
 unpayedAppointments(){
let total =0;
 for(let i=0; i<this.appointments.length; i++ ){
  if(this.appointments[i].price-this.appointments[i].totalPaid >0 ){
total++;}
 }
 
 return total;
     },
 Totalpayed(){
let total =0;
 for(let i=0; i<this.appointments.length; i++ ){ 
total=total+this.appointments[i].totalPaid;
}
 return total;
     },
      Totalunpayed(){
let total =0;
 for(let i=0; i<this.appointments.length; i++ ){
  if(this.appointments[i].price-this.appointments[i].totalPaid >0 ){
total=total+(this.appointments[i].price-this.appointments[i].totalPaid);}
 }
 
 return total;
     },
     nbAppointments(){
      
    return   this.appointments.length;
     },
     
 },
  created() {
        this.getAppointment();   
        
    }
}
</script>