<template>
<div style="background-color: #D9DADA;">
 <h1 style="color:black">Schedule of the day</h1>
 <div class="card" style="width: 18rem; overflow: hidden;  display: inline-block; height: 10rem;">
  <span style="margin-top: 1rem; margin-right: 15rem;">
    <i class="fa-solid fa-calendar-day" style="height: 6rem; color:#00608d;"></i>
    <div><h5><b style="color:black">Today's appointments </b></h5></div>
    <div style="color:black"> <b>{{nbAppointments()}}</b></div>
  </span>
</div>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<div class="card" style="width: 18rem; overflow: hidden; height:10rem; display: inline-block;">
 <span style="margin-top: 1rem; margin-right: 15rem;">
 <i class="fa-solid fa-calendar" style="height: 6rem; color:#00608d;"></i>
  <div><h5><b style="color:black">Time with no appointment</b> </h5></div>
 <div style="color:black" > <b>{{nbnoAppointments()}}</b></div>
 </span>
</div>

 <div class="card" style="height: 22rem; margin-left: 200px; margin-right: 200px;overflow: auto;">
<div><h4><b style="color:black">Today's appointments & availability</b></h4><hr />
<button @click="toggleModal" style="background-color: #00608d;border: #00608d;border-radius: 5px;height: 32px; color: white;">Add schedule</button><hr /></div>
<div v-if="show"><AddSchedule v-bind:show="show" v-bind:toggleModal="toggleModal"/></div>
<div v-if="showe"><EditSchedule v-bind:showe="showe" v-bind:scheduletoedit="scheduletoedit" v-bind:toggleModalEdit="toggleModalEdit"/></div>
<table class="table table-striped">
  <tbody>
    <tr>
      
      <td>Date</td>
      <td>Availability</td>
     <td>Actions</td>
    </tr>
    
    <tr v-for="schedule in schedules" :key="schedule.id" >
      <td>{{schedule.date}}</td>
      <td>{{schedule.availability}}</td>
     <td>
        <button type="button" @click="getoneSchedule(schedule)" class="btn btn-warning">Update</button>
        &nbsp;
        <button type="button"  @click="deleteSchedule(schedule)" class="btn btn-danger">Delete</button>
      </td>
    </tr>
  
  </tbody>
</table></div>
</div>
</template>
<script>
import AddSchedule from '@/components/Modals/AddSchedule.vue';
import EditSchedule from '@/components/Modals/EditSchedule.vue';
export default {
    data() {
        return {
            show:false,
            showe:false,
            schedules: [],
            scheduletoedit : {},
        };
    },
    methods: {
     
     // Get staff data by id to edit it
async getoneSchedule(schedule){
   var response = await fetch("http://localhost:8000/api/schedules/"+schedule.id);
  this.scheduletoedit = await response.json();
   this.toggleModalEdit();
},
      toggleModal: function(){
  this.show = !this.show;
},
toggleModalEdit: function(){
  this.showe = !this.showe;
},
 nbAppointments(){
  let nbappointments = 0 ;
   for(let i=0; i<this.schedules.length; i++ ){
    if(this.schedules[i].availability==true){
      nbappointments++;
     }
   }
   return nbappointments;
},
nbnoAppointments(){
let nbnoappointments = 0 ;
   for(let i=0; i<this.schedules.length; i++ ){
    if(this.schedules[i].availability==false){
      nbnoappointments++;
     }
   }
   return nbnoappointments;
},
        async getSchedule() {
            var response = await fetch("http://localhost:8000/api/schedules/");
            this.schedules = await response.json();
            /*const data = await response.json();
              console.log(data, data.slice()); // <-- These are the same
              this.patients = data.slice();*/
        },
        async deleteSchedule(schedule){
  var response = await fetch("http://localhost:8000/api/schedules/"+schedule.id, {
    method: 'delete',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(this.schedule)
  });
  this.schedules.push(await response.json());
  window.location.reload(false);
}
        
       
    },
    
    created() {
        this.getSchedule();
       
    },
    components: { AddSchedule, EditSchedule }
}
</script>