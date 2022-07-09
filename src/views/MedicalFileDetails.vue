<template>
<div style="background-color: #D9DADA;">
<h1 style="color:black;">Medical files</h1>
<div class="card" style="width: 18rem; overflow: hidden;  display: inline-block; height: 10rem;">
  <span style="margin-top: 1rem; margin-right: 15rem;">
    <i class="fa-solid fa-book-medical" style="height: 6rem; color:#00608d;"></i>
    <div><h5><b style="color:black">Total medical files </b></h5></div>
    <div style="color:black" > <b> {{NbMfiles()}}</b></div>
  </span>
</div>

 <div class="card" style="height: 22rem; margin-left: 25px; margin-right: 25px;overflow: auto;">
<div><h4><b style="color:black">Medical files</b></h4><hr />
<button @click="toggleModal" style="background-color: #00608d;border: #00608d;border-radius: 5px;height: 32px; color: white;">Add medical file</button><hr /></div>
<div v-if="showaddmfile"><AddMfile v-bind:showaddmfile="showaddmfile" v-bind:toggleModal="toggleModal"/></div>
<div v-if="showeditmfile"><EditMfile v-bind:showeditmfile="showeditmfile" v-bind:mfiletoedit="mfiletoedit" v-bind:toggleModalEdit="toggleModalEdit"/></div>
<table class="table">
  <thead class="table-dark">
    ...
  </thead>
  <tbody>
    
   
    <tr>
      <td border="1px">Patient ID</td>
      <td>Date</td>
      <td>Blood group</td>
      <td>Height</td>
      <td>Weight</td>
      <td>Allergy</td>
      <td>Vaccination</td>
      <td>Health insurance</td>
      <td>Actions</td>
    </tr>
    <tr v-for="mfile in mfiles" :key="mfile.id">
      <td>{{mfile.patient}}</td>
      <td>{{mfile.date}}</td>
      <td>{{mfile.bloodGroup}}</td>
      <td>{{mfile.height}}</td>
      <td>{{mfile.weight}}</td>
      <td>{{mfile.allergy}}</td>
      <td>{{mfile.vaccination}}</td>
      <td>{{mfile.healthInsurance}}</td>

<td>
        <button type="button"  @click="getoneMfile(mfile)" class="btn btn-warning">Update</button>
          &nbsp;
          <button type="button"  @click="deleteMedicalFile(mfile)" class="btn btn-danger">Delete</button>
      </td>
    </tr>
  
  </tbody>
</table>
</div>
</div>
</template>
<script>
import AddMfile from '@/components/Modals/AddMfile.vue';
import EditMfile from '@/components/Modals/EditMfile.vue';
export default {
  components : { AddMfile , EditMfile },
  data(){
    return {
      showaddmfile : false,
      showeditmfile : false,
      mfiles : [],
      mfile : {},
      mfiletoedit: {},
    }
  },
  methods : {
    //Mfile to edit
    async getoneMfile(mfile){
   var response = await fetch("http://localhost:8000/api/medicalfiles/"+mfile.id);
  this.mfiletoedit = await response.json();
   this.toggleModalEdit();
},
    async getMedicalFiles(){
  var response = await fetch('http://localhost:8000/api/medicalfiles/');
  this.mfiles = await response.json();
         
},
async deleteMedicalFile(mfile){
  var response = await fetch("http://localhost:8000/api/medicalfiles/"+mfile.id, {
    method: 'delete',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(this.mfile)
  });
  this.mfiles.push(await response.json());
  window.location.reload(false);
},
 
toggleModal: function(){
  this.showaddmfile = !this.showaddmfile;
},
toggleModalEdit: function(){
  this.showeditmfile = !this.showeditmfile;
 
},
 NbMfiles(){
 return this.mfiles.length; 
     },
  },
  created() {
        this.getMedicalFiles();   
    }
}
</script>