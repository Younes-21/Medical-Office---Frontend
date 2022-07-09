<template>
<div class="bloc-modale">
    <div class="overlay" v-on:click="toggleModal"></div>
<div  class="modale card">

    <div class="container">
        <div class="text">Add medical file</div>
        <form @submit.prevent="createMfile">
           <div class="form-row">
              <div class="input-data">
                 <input type="text" v-model="mfile.bloodGroup" required>
                 <div class="underline"></div>
                 <label style="left:0px;">Blood group</label>
              </div>
               <div class="input-data">
                 <input type="text" v-model="mfile.height" required>
                 <div class="underline"></div>
                 <label style="left:0px;">Height(cm)</label>
              </div>
               <div class="input-data">
                 <input type="text"  v-model="mfile.weight" required>
                 <div class="underline"></div>
                 <label style="left:0px;">Weight(Kg)</label>
              </div>
           </div>
           <div class="form-row">
             <div class="input-data">
                 <input type="password" v-model="mfile.allergy" required>
                 <div class="underline"></div>
                 <label style="left:0px;">Allergy</label>
              </div>
              <div class="input-data">
                 <input type="text"  v-model="mfile.vaccination" required>
                 <div class="underline"></div>
                 <label style="left:0px;">Vaccination</label>
              </div>
               <div class="input-data">
                 <input type="text" v-model="mfile.healthInsurance" required>
                 <div class="underline"></div>
                 <label style="left:0px;">Health insurance</label>
              </div>
           </div>
             <div class="form-row">
              <div class="input-data">
                 <input name="date" type="date" onfocus="(this.type='date')" onblur="if(!this.value)this.type='text'" v-model="mfile.date">
                 <div class="underline"></div>
                 <label style="left:0px;">Date</label>
              </div>
    <label style="left:0px; color:#0099BE">Patient &nbsp;&nbsp;</label>
                 
       <select v-model="mfile.patient" style="height: 25px;width: 120px;">
       <option v-for="patient in patients" :value="patient.id" :key="patient.id">
       {{patient.firstName}}
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
                         <button type="button" class="btn btn-danger submit-btn" style="border-radius: 8px;margin-left:30%; height: 40px; width: 120px;" @click="toggleModal">Cancel</button>
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
    mfiles: [],
    mfile:{},
    patients : []
  }
},
  methods:{
     async getPatients(){
  var response = await fetch('http://localhost:8000/api/patients/');
  this.patients = await response.json();
         
},
  async createMfile(){
    console.log('submitted');
  var response = await fetch('http://localhost:8000/api/medicalfiles/', {
    method: 'post',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(this.mfile)
  });
  this.mfiles.push(await response.json());
  window.location.reload(false);
},
 },
 created(){
    this.getPatients();
 },
    props:['showaddmfile','toggleModal']
  
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