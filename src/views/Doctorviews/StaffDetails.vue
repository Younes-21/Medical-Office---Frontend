<template>
<div style="background-color: #D9DADA;">
<h1 style="color:black;">My Staff</h1>
<div class="card" style="width: 18rem; overflow: hidden;  display: inline-block; height: 6rem;">
  <span style="margin-top: 1rem; margin-right: 15rem;">
    <i class="fa-solid fa-dollar-sign" style="height: 2.40rem; color:#00608d;"></i>
    <div><h5><b style="color:black">Staff total salary </b></h5></div>
    <div style="color:black" > <b>{{TotalSalary()}}&nbsp;Dhs</b></div>
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
<div class="card" style="width: 18rem; overflow: hidden; display: inline-block; height:6rem;">
   <span style="margin-top: 1rem; margin-right: 15rem;">
 <i  class="fa-solid fa-coins" style="height: 2.4rem; color:#00608d;"></i>
  <div><h5><b style="color:black">Highest salary</b></h5></div>
  <div style="color:black" > <b>{{maxSalary()}} Dhs</b></div>
  </span>
</div>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<div class="card" style="width: 18rem; overflow: hidden; display: inline-block; height:6rem;">
   <span style="margin-top: 1rem; margin-right: 15rem;">
<i class="fa-solid fa-coins" style="height: 2.4rem; color:#00608d;"></i>
  <div><h5><b style="color:black">Lowest salary</b></h5></div>
  <div style="color:black" > <b>{{minSalary()}} Dhs</b></div>
  </span>
</div>
<div class="card" style="height: 20rem; margin-left: 25px; margin-right: 25px;overflow: auto;">
<div><h4><b style="color:black">Staff list</b></h4> 
<button @click="toggleModal" style="background-color: #00608d;border: #00608d;border-radius: 5px;height: 32px; color: white;">Add staff member</button><hr /></div>
<div v-if="show"><AddStaff v-bind:show="show" v-bind:toggleModal="toggleModal"/></div>
<div v-if="showe"><EditStaff v-bind:showe="showe" v-bind:toggleModalEdit="toggleModalEdit" v-bind:stafftoedit="stafftoedit"/></div>

<table class="table table-striped">
  <tbody>  
    <tr>
      <td border="1px"><b>First name</b></td>
      <td><b>Last name</b></td>
      <td><b>CIN</b></td>
      <td><b>Salary</b></td>
      <td><b>Role</b></td>
      <td><b>Action</b></td>
    </tr>
    <tr v-for="staff in staffs" :key="staff.id">
    <template v-if="staff.role!='doctor'">
      <td>{{staff.firstName}}</td>
      <td>{{staff.lastName}}</td>
      <td>{{staff.cin}}</td>
      <td>{{staff.salary}} Dhs</td>
      <td>{{staff.role}}</td>
      <td>
          <button type="button" @click="getoneStaff(staff)"  class="btn btn-warning">Update</button>
          &nbsp;
          <button type="button"  @click="deleteStaff(staff)" class="btn btn-danger">Delete</button>
      </td>
    </template>
    </tr>
  
  </tbody>
</table>
</div>
</div>
</template>
<script>

import EditStaff from '@/components/Modals/EditStaff.vue';
import AddStaff from '@/components/Modals/AddStaff.vue';
export default {
  components : { AddStaff , EditStaff },
  data(){
    return {
      show: false,
      showe: false,
      staffs : [],
      stafftoedit:{},
      
    }
  },
  methods : {
    TotalSalary(){
let totalsalary = 0 ;
   for(let i=0; i<this.staffs.length; i++ ){
    if(this.staffs[i].role != "doctor"){
      totalsalary=totalsalary+this.staffs[i].salary;
     }
   }
   return totalsalary;
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
     maxSalary() {
      
      let max=0;
      for(let i=0;i<this.staffs.length;i++){
          if(this.staffs[i].role!="doctor"){
            max = this.staffs[i].salary
          }
      }
      let MAX=max;
       for(let i=0;i<this.staffs.length;i++){
          if(this.staffs[i].role!="doctor" && this.staffs[i].salary>MAX){
            MAX = this.staffs[i].salary
          }
      }
       return MAX;
     },
      minSalary() {
      //the doctor's salary
      let min=0;
      for(let i=0;i<this.staffs.length;i++){
          if(this.staffs[i].role!="doctor"){
            min = this.staffs[i].salary
          }
      }
       let MIN=min;
       for(let i=0;i<this.staffs.length;i++){
          if(this.staffs[i].role!="doctor" && this.staffs[i].salary<MIN){
            MIN = this.staffs[i].salary
          }
      }
       return MIN;
     },
    async getStaff(){
  var response = await fetch('http://localhost:8000/api/users/');
  this.staffs = await response.json();
          /*const data = await response.json();  
            console.log(data, data.slice()); // <-- These are the same
            this.patients = data.slice();*/

},
// Get staff data by id to edit it
async getoneStaff(staff){
   var response = await fetch("http://localhost:8000/api/users/"+staff.id);
  this.stafftoedit = await response.json();
  console.log(this.stafftoedit); 
 // console.log(this.staffs);
  this.toggleModalEdit();
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
    }
}
</script>