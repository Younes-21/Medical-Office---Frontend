<template>
<div class="bloc-modale">
    <div class="overlay" v-on:click="toggleModalAddAppointment"></div>
<div  class="modale card">

    <div class="container">
        <div class="text">Add Appointment form</div>
        <form @submit.prevent="addAppointment" >
         <div class="form-row">
             
           
            <div class="input-data">
            <input type="text"  v-model="appointment.reason" required>
                 <div class="underline"></div>
                 <label style="left:0px;">Reason</label>
           </div>
             <div class="input-data">
                 <input type="text"  v-model="appointment.price" required>
                 <div class="underline"></div>
                 <label style="left:0px;">Price</label>
              </div>
                <div class="input-data">
                 <input type="text"  v-model="appointment.totalPaid" required>
                 <div class="underline"></div>
                 <label style="left:0px;">Total paid</label>
              </div>
           </div>
            <div class="form-row">
              <div class="input-data">
                 <input type="datetime-local" style="width: 155px;" v-model="appointment.date">
            <div class="underline"></div>
                 <label style="left:0px;">Date</label>
              </div>
              <div class="form-row" style="margin-top:15px;margin-left: 40px;">
                
<label style="margin-top:-3px; color:#0099BE;" >Payment status &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;
</label>
            <input class="form-check-input"  type="checkbox" value="" id="flexCheckDefault" v-model="appointment.paymentStatus">
             
              </div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <div class="input-data" style="margin-right:;">
                 <input type="text"  v-model="appointment.prescription" required>
                 <div class="underline"></div>
                 <label style="left:0px;">Prescription</label>
              </div>
            </div>
            
            <div style="margin-top:-3rem; margin-left:-17rem;">
            
                     <label style="margin-left:25px;  color:#0099BE">&nbsp;&nbsp;&nbsp;&nbsp;Doctor &nbsp;&nbsp;</label>
                        <select v-model="appointment.user">
                        <option v-for="staff in staffs" :value="staff.id" :key="staff.id">
                        <template v-if="staff.role=='doctor'">{{staff.firstName}}
                        </template></option>
                        </select>  
                   
                         <label style="margin-left:100px; color:#0099BE">Patient &nbsp;&nbsp;</label>
                
                        <select v-model="appointment.patient">
                        <option v-for="patient in patients" :value="patient.id" :key="patient.id">
                        {{patient.firstName}} {{patient.lastName}}
                        </option>
                        </select>  
                            </div>
         
           
             
           <div class="form-row submit-btn">
                    <div class="input-data">
                       <div class="inner"></div>
                      <input type="submit" style="margin: 0;width: 120px; position: absolute;top: 50%; left: 110%;
                       right:99%; -ms-transform: translate(-50%, -50%);transform: translate(-50%, -50%);
                        background-color:#0099BE;color: white;border-radius: 8px;" value="submit">     
              <!-- <button type="button" class="btn btn-success submit-btn" style="border-radius: 8px;margin-left:80%; height: 40px; width: 120px;">Submit</button>
-->  
                    </div>
                    <div class="input-data">
                       <div class="inner"></div>
                         <button type="button" class="btn btn-danger submit-btn" style="border-radius: 8px;margin-left:30%; height: 40px; width: 120px;" @click="toggleModalAddAppointment">Cancel</button>
                    </div>
                 </div>
        </form>
         
     </div>
  
</div>
</div>
</template>
<script>
//import axios from 'axios';
export default {
  data(){
  return {
    patients: [],
    staffs : [],
    appointment : {},
    appointments : [],
  }
},
 props:['showaddappointment','toggleModalAddAppointment'],
  methods:{
   async getPatient(){
  var response = await fetch('http://localhost:8000/api/patients/');
  this.patients = await response.json();
          },
 async getStaff(){
  var response = await fetch('http://localhost:8000/api/users/');
  this.staffs = await response.json();
          },
          async addAppointment(){
  var response = await fetch('http://localhost:8000/api/appointments/', {
    method: 'post',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(this.appointment)
  });
  this.appointments.push(await response.json());
  /*console.log(this.schedule);
  console.log(this.schedules);*/
  window.location.reload(false);
},
}
,
   created(){
    this.getPatient();
    this.getStaff();
   } 
  
}
</script>
<style scoped>
/* Modal css*/
.bloc-modale{
    position: fixed;
    top:0;
    bottom:0;
    left:0;
    right:0;
    display: flex;
    justify-content: center;
    align-items: center;
}
.overlay{
    background: rgba(0,0,0,0.5);
    position: fixed;
    top:0;
    bottom:0;
    left:0;
    right:0;
}
.modale{
    background: #f1f1f1;
    color: #333;
    padding: 15px;
    position: fixed;
    top: 10% ;
    left:30%;
}
.btn-modale {
    position: absolute;
    top:10px;
    right:10px;
}
/*Form css*/
*{
  margin: 0;
  padding: 0;
  outline: none;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}
body{
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 40px;
  background: linear-gradient(115deg, #56d8e4 10%);
}
.container{
  max-width: 800px;
  background: #fff;
  width: 800px;
  padding: 25px 40px 10px 40px;
  box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
}
.container .text{
  text-align: center;
  font-size: 35px;
  font-weight: 600;
  background: -webkit-linear-gradient(right, #0099BE, #0099BE, #0099BE, #0099BE);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.container form{
  padding: 15px 0 0 0;
}
.container form .form-row{
  display: flex;
  margin: 32px 0;
}
form .form-row .input-data{
  width: 30%;
  height: 40px;
  margin: 0 20px;
  position: relative;
}
form .form-row .textarea{
  height: 70px;
}
.input-data input,
.textarea textarea{
  display: block;
  width: 70%;
  height: 100%;
  border: none;
  font-size: 17px;
  border-bottom: 2px solid rgba(0,0,0, 0.12);
}
.input-data input:focus ~ label, .textarea textarea:focus ~ label,
.input-data input:valid ~ label, .textarea textarea:valid ~ label{
  transform: translateY(-20px);
  font-size: 14px;
  color: #3498db;
}
.textarea textarea{
  resize: none;
  padding-top: 10px;
}
.input-data label{
  position: absolute;
  pointer-events: none;
  bottom: 10px;
  font-size: 16px;
  transition: all 0.3s ease;
}
.textarea label{
  width: 100%;
  bottom: 40px;
  background: #fff;
}
.input-data .underline{
  position: fixed;
  bottom: 0;
  height: 2px;
  width: 100%;
}
.input-data .underline:before{
  position: absolute;
  content: "";
  height: 2px;
  width: 100%;
  background: #3498db;
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 0.3s ease;
}
.input-data input:focus ~ .underline:before,
.input-data input:valid ~ .underline:before,
.textarea textarea:focus ~ .underline:before,
.textarea textarea:valid ~ .underline:before{
  transform: scale(1);
}

@media (max-width: 700px) {
  .container .text{
    font-size: 30px;
  }
  .container form{
    padding: 10px 0 0 0;
  }
  .container form .form-row{
    display: block;
  }
  form .form-row .input-data{
    margin: 35px 0!important;
  }
}
</style>