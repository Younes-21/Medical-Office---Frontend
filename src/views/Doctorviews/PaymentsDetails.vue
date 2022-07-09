<template>
<div style="background-color: #D9DADA;">
<h1 style="color:black;">Payments</h1>
<div class="card" style="width: 18rem; overflow: hidden;  display: inline-block; height: 6rem;">
  <span style="margin-top: 1rem; margin-right: 15rem;">
    <i class="fa-solid fa-dollar-sign" style="height: 2.40rem; color:#00608d;"></i>
    <div><h5><b style="color:black">Total unpayed </b></h5></div>
    <div style="color:black" > <b>{{Totalunpayed()}} Dhs</b></div>
  </span>
</div>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<div class="card" style="width: 18rem; overflow: hidden; height:6rem; display: inline-block;">
 <span style="margin-top: 1rem; margin-right: 15rem;">
 <i class="fa-solid fa-user" style="height: 2.4rem; color:#00608d;"></i>
  <div><h5><b style="color:black"> How many didn't pay</b> </h5></div>
 <div style="color:black" > <b>{{didntPay()}}</b></div>
 </span>
</div>
<br/>

<div class="card" style="width: 18rem; overflow: hidden; display: inline-block; height:6rem;">
   <span style="margin-top: 1rem; margin-right: 15rem;">
 <i  class="fa-solid fa-sack-dollar" style="height: 2.4rem; color:#00608d;"></i>
  <div><h5><b style="color:black">Highest unpayed amount</b></h5></div>
  <div style="color:black" > <b>{{ highestUnpayed()}} Dhs</b></div>
  </span>
</div>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<div class="card" style="width: 18rem; overflow: hidden; display: inline-block; height:6rem;">
   <span style="margin-top: 1rem; margin-right: 15rem;">
<i class="fa-solid fa-coins" style="height: 2.4rem; color:#00608d;"></i>
  <div><h5><b style="color:black">Lowest unpayed amount</b></h5></div>
  <div style="color:black" > <b>{{lowestUnpayed()}} Dhs</b></div>
  </span>
</div>
<div class="card" style="height: 20rem; margin-left: 25px; margin-right: 25px;overflow: auto;">
<div><h4><b style="color:black">Unpayed appointment</b></h4> </div>
<table class="table table-striped">
  <tbody>  
    <tr>
      <td border="1px"><b>Patient's ID</b></td>
      
      
      <td><b>Date</b></td>
      <td><b>Unpayed</b></td>
      
   </tr>
   
    <tr v-for="appointment in appointments" :key="appointment.id">
   <!-- <template v-for="patient in patients" :key="patient.id">
    <template v-if="appointment.patient==patient.id">-->
      <template v-if="appointment.price-appointment.totalPaid > 0">
      <td>{{appointment.patient}}</td>
      <td>{{appointment.date}}</td>
      <td>{{appointment.price-appointment.totalPaid}}</td>
      </template>
    <!--  </template >
      </template>-->
      </tr>
  <!--    <tr>
        <td>Younes </td>
        <td>Sefiani</td>
        <td>2022-06-26</td>
        <td>300 Dhs</td>
        
    </tr>
     <tr>
        <td>Mohammed </td>
        <td>Abbad</td>
        <td>2021-08-25</td>
        <td>200 Dhs</td>
        
    </tr>
     <tr>
        <td>Latifa </td>
        <td>Jrmon</td>
        <td>2022-02-15</td>
        <td>150 Dhs</td>
        
    </tr>
     <tr>
        <td>Hanane </td>
        <td>Seffar</td>
        <td>2022-01-29</td>
        <td>100 Dhs</td>
        
    </tr>
    <tr>
        <td>Hanane </td>
        <td>Sefrioui</td>
        <td>2022-02-29</td>
        <td>100 Dhs</td>
        
    </tr>
    <tr>
        <td>Hanae </td>
        <td>Larech</td>
        <td>2022-03-2</td>
        <td>100 Dhs</td>
        
    </tr>-->
  
  </tbody>
</table>
</div>
</div>
</template>
<script>


export default {
  
  data(){
    return {
      patients : [],
      appointments : [],
    }
  },
  methods : {
    async getAppointments(){
  var response = await fetch('http://localhost:8000/api/appointments/');
  this.appointments = await response.json();
          /*const data = await response.json();  
            console.log(data, data.slice()); // <-- These are the same
            this.patients = data.slice();*/
},
async getPatients(){
  var response = await fetch('http://localhost:8000/api/patients/');
  this.patients = await response.json();
          /*const data = await response.json();  
            console.log(data, data.slice()); // <-- These are the same
            this.patients = data.slice();*/
},
 Totalunpayed(){
let total =0;
 for(let i=0; i<this.appointments.length; i++ ){
  if(this.appointments[i].price-this.appointments[i].totalPaid >0 ){
total=total+(this.appointments[i].price-this.appointments[i].totalPaid);}
 }
 
 return total;
     },
     didntPay(){
let total =0;
 for(let i=0; i<this.appointments.length; i++ ){
  if(this.appointments[i].price-this.appointments[i].totalPaid >0 ){
total++;}
 }
 
 return total;
     },
      highestUnpayed() {
       let max=0;
      for(let i=0;i<this.appointments.length;i++){  
       if(this.appointments[i].price-this.appointments[i].totalPaid >0){
        
            max = this.appointments[i].price-this.appointments[i].totalPaid;
      }
      }
      let MAX=max;
       for(let i=0;i<this.appointments.length;i++){
          if(this.appointments[i].price- this.appointments[i].totalPaid > MAX ){
            MAX = this.appointments[i].price- this.appointments[i].totalPaid;
          }
      }
       return MAX;
     },
      lowestUnpayed() {
       let min=0;
      for(let i=0;i<this.appointments.length;i++){  
       if(this.appointments[i].price-this.appointments[i].totalPaid >0){
        
            min = this.appointments[i].price-this.appointments[i].totalPaid;
      }
      }
      let MIN=min;
       for(let i=0;i<this.appointments.length;i++){
          if(this.appointments[i].price- this.appointments[i].totalPaid < MIN && this.appointments[i].price- this.appointments[i].totalPaid!=0 ){
            MIN = this.appointments[i].price- this.appointments[i].totalPaid;
          }
      }
       return MIN;
     },

  },
  created() {
        this.getAppointments();   
    }
}
</script>