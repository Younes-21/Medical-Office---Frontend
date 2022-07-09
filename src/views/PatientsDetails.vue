<template>
<div style="background-color: #D9DADA;">
<h1 style="color:black;">Patients list</h1>
<div class="card" style="width: 18rem; overflow: hidden;  display: inline-block; height: 10rem;">
  <span style="margin-top: 1rem; margin-right: 15rem;">
    <i class="fa-solid fa-head-side-virus" style="height: 6rem; color:#00608d;"></i>
    <div><h5><b style="color:black">Total patients </b></h5></div>
    <div style="color:black" > <b> {{NbPatients()}}</b></div>
  </span>
</div>

 <div class="card" style="height: 22rem; margin-left: 200px; margin-right: 200px;overflow: auto;">
<div><h4><b style="color:black">Patients list</b></h4><hr />
<button @click="toggleModalAddPatient" style="background-color: #00608d;border: #00608d;border-radius: 5px;height: 32px; color: white;">Add patient</button><hr /></div>
<div v-if="showaddpatient"><AddPatient v-bind:showaddpatient="showaddpatient" v-bind:toggleModalAddPatient="toggleModalAddPatient"/></div>
<div v-if="showeditpatient"><EditPatient v-bind:showeditpatient="showeditpatient" v-bind:patienttoedit="patienttoedit" v-bind:toggleModalEditPatient="toggleModalEditPatient"/></div>
<table class="table">
  <thead class="table-dark">
    ...
  </thead>
  <tbody>
    
   
    <tr>
      <td border="1px">First name</td>
      <td>Last name</td>
      <td>CIN</td>
      <td>phone</td>
      <td>Actions</td>
    </tr>
    <tr v-for="patient in patients" :key="patient.id">
      <td>{{patient.firstName}}</td>
      <td>{{patient.lastName}}</td>
      <td>{{patient.cin}}</td>
      <td>{{patient.phone}}</td>
      <td>
        <button type="button" @click="getonePatient(patient)"  class="btn btn-warning">Update</button>
          &nbsp;
          <button type="button"  @click="deletePatient(patient)" class="btn btn-danger">Delete</button>
      </td>
    </tr>
  
  </tbody>
</table>
</div>
</div>
</template>
<script>
import AddPatient from '@/components/Modals/AddPatient.vue';
import EditPatient from '@/components/Modals/EditPatient.vue';
export default {
  components : { AddPatient , EditPatient },
  data(){
    return {
      showaddpatient : false,
      showeditpatient : false,
      patients : [],
      patient : {},
      patienttoedit :{},
    }
  },
  methods : {
    //Patient to edit
     async getonePatient(patient){
   var response = await fetch("http://localhost:8000/api/patients/"+patient.id);
  this.patienttoedit = await response.json();
   this.toggleModalEditPatient();
},
    async getPatient(){
  var response = await fetch('http://localhost:8000/api/patients/');
  this.patients = await response.json();
         },
async deletePatient(patient){
  var response = await fetch("http://localhost:8000/api/patients/"+patient.id, {
    method: 'delete',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(this.patient)
  });
  this.patients.push(await response.json());
  window.location.reload(false);
},
 
toggleModalAddPatient: function(){
  this.showaddpatient = !this.showaddpatient;
},
toggleModalEditPatient: function(){
  this.showeditpatient = !this.showeditpatient;
 
},
 NbPatients(){
let nbpatients =0;
 for(let i=0; i<this.patients.length; i++ ){
  nbpatients++;
  }
return nbpatients; }
 
     },
  
  created() {
        this.getPatient();   
    }
}
</script>