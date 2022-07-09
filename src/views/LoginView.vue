<template>
    <div class="">
        <h2 class="text-center">Login</h2>
        <div class="" style="margin-left: 275px; width:1200px;">
        <div class="container ml-16">
            <div class="row ml-16">
                <div class="col-md-5 ml-16">
                    <div class="card-body ml-16 mt-3 rounded bg-white p-2 border border-secondary">
                        <div class="text-center">

                            <!-- <i style="color: #005b78" class="fas fa-user-alt fa-6x"></i> -->
                            <i style="color: #005b78" class="fas fa-user-circle fa-8x"></i>
                        </div>
                        <div class=" mt-10">
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1">Email&nbsp;</span>
                                <input type="email" class="form-control" placeholder="Email" aria-label="Username" aria-describedby="basic-addon1" v-model="email"  >
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1">Password &nbsp;</span>
                                <input type="password" class="form-control" placeholder="Password" aria-label="Username" aria-describedby="basic-addon1" v-model="password" >
                            </div>
                            <div class="d-flex flex-row-reverse" style="text-align: center;">
                                <a class="btnCancel" >Cancel</a>
                                <a class="btnSave" @click="LoginButton()" >Login</a>
                            </div>
                            <!-- {{isConnect}} -->
                            <div class="alert alert-danger text-center" v-if="error" role="alert">
                                <span >
                                    Email Or Password is not correct !!
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>
<script>
export default {
  data(){
  return {
    email:"",
    password:"",
    staffs : [],
    connected : false,
    error:false,
  }},
  methods : {
async getStaff(){
  var response = await fetch('http://localhost:8000/api/users/');
  this.staffs = await response.json();
          },
          LoginButton(){
            for(let i=0;i<this.staffs.length;i++){
              if(this.staffs[i].email == this.email && this.staffs[i].password == this.password){
                this.connected = true;
                localStorage.setItem('role', this.staffs[i].role)
                
                window.location.href = '/dashboarddetails'
              }
              else{
                this.error=true;
              }
            }
          }
  },
  created(){
    this.getStaff();
  }
  }
</script>
<style>
.btnSave{
    text-decoration: none;
    color: black;
    border: none;
    padding: 2px 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    transition-duration: 0.4s;
    cursor: pointer;
    border-radius: 10%;
}
.btnSave:hover{
    background-color: #005B78;
    color: white;
}
.btnCancel{
    text-decoration: none;
    color: black;
    border: none;
    padding: 2px 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    transition-duration: 0.4s;
    cursor: pointer;
    border-radius: 8%;
}
.btnCancel:hover{
    background-color: #808080;
    color: white;
}
</style>