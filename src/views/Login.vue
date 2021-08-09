<template>
  <div class="login" flat>
      <v-container class="d-flex justify-center">
        <v-layout class="d-flex justify-center mb-2 ruangan">
          <v-card
            class="d-flex flex-wrap justify-start"
            width="700"
            color="transparent"
            flat
          >
            <v-avatar tile size="190px" class="mt-7 mx-auto">
              <v-img max-width="200" src="../assets/img/bin.webp" />
            </v-avatar>
            <v-container class="mt-8 mx-auto">
              <v-avatar tile width="190" class="px-2">
                <v-img width="150" height="auto" src="../assets/img/i-disaster.webp" />
              </v-avatar>
              <h4 style="color: #E6B01C;">Disaster Monitoring, Early Warning<br>& Reporting System</h4>
            </v-container>
          </v-card>
        </v-layout>
      </v-container>
      <v-container class="kolomtxt">
        <v-card class="d-flex flex-column" width="100%" color="transparent" flat>
          <!-- <form @submit.prevent="handleSubmit"> -->
            <v-text-field 
            outlined 
            dark 
            dense 
            full-width 
            required 
            class="mb-4" 
            label="Email" 
            hide-details="auto" 
            v-model="email" 
            prepend-icon="mdi-account" 
            :rules="rules" 
            v-on:click="messagemsg = ''"/>
        
            <v-text-field 
            outlined 
            dark 
            dense 
            full-width 
            class="mb-6" 
            label="password" 
            hide-details="auto" 
            prepend-icon="mdi-lock" 
            v-model="password" 
            required 
            :rules="rulespassword" 
            :type="typetext" 
            :append-icon="icontext" 
            @click:append="(e)=>handleappend(e)" 
            :error-messages="messagemsg.length>0 ? messagemsg : ''"
            v-on:click="messagemsg = ''"/>
            
            <v-btn 
            style="width:100%;" 
            class="mb-2" 
            type="submit" 
            v-on:click="validate" 
            >Submit</v-btn>
            
            <!-- <v-btn 
            style="width:100%;" 
            class="mb-4" 
            v-on:click="dialog=true">Register</v-btn> -->

            <!-- <v-dialog v-model="dialog"  max-width="50%" >
              <v-card>
                  <v-col>
                      <v-text-field label="username" :rules="rulesusernameregister()" hide-details="auto" v-model="usernameregister"/>
                  </v-col>
                  <v-col>
                      <v-text-field label="password" :rules="rulespassword" hide-details="auto" v-model="passwordregister" type="password"/>
                  </v-col>
                  <v-col>
                    <v-text-field label="re-enter password" :rules="rulespasswordregister()" hide-details="auto" v-model="passwordregisterreenter" type="password"/>
                  </v-col>
                  <v-col style="float:center;position:relative">
                    <v-btn v-on:click="register()" style="left:50%; position:relative; top:50%; transform:translate(-50%); width:90%" >
                        Submit
                    </v-btn>
                  </v-col>
              </v-card>
            </v-dialog> -->
            <v-dialog v-model="message" persistent max-width="177px" >
                <v-card>
                    <v-col>
                        {{alertMsg}}
                    </v-col>
                    <v-col style>
                        <v-btn v-on:click="messageclose()" style="margin:auto" width="100%">
                            Close
                        </v-btn>
                    </v-col>
                </v-card>
            </v-dialog>

            <v-dialog v-model="otpDialog" persistent max-width="600px" >
                <v-card>
                  <v-container>
                    <v-card-title>
                      Enter Verification Code
                    </v-card-title>
                    <v-card-text>
                      <v-row dense>
                        <v-col >
                            <p>We have sent a verification code to {{buffLogin.email}}, Please insert the code below</p>
                        </v-col>
                      </v-row>
                      <v-row dense>
                          <v-col
                            cols="12"
                        >
                            <v-text-field
                            v-model="editedToken"
                            label="Verification Code"
                            :error-messages="otpMessage.length>0 ? otpMessage : ''"
                            ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-card-text>
                    <v-card-action>
                      <v-row dense>
                        <v-col >
                            <v-btn  style="margin:auto"  v-on:click="cancelOTP()">
                                Cancel
                            </v-btn>
                        </v-col>
                        <v-col >
                            <v-btn  style="margin:auto" v-on:click="validateOTP()">
                                Submit
                            </v-btn>
                        </v-col>
                      </v-row>
                    </v-card-action>
                    
                  </v-container>
                  
                    
                </v-card>
            </v-dialog>
          <!-- </form> -->

        </v-card>
      </v-container>
  </div>
</template>

<script>
import _ from 'lodash'
import dayjs from 'dayjs'
import axios from 'axios'
const short = require('short-uuid');
const md5 = require('md5');
var utc = require('dayjs/plugin/utc')
dayjs.extend(utc)

export default {
  components: {
  },
  data () {
    return {
      otpDialog:false,
      email : "",
      userName : "",
      password : "",
      usernameregister : "",
      passwordregister : "",
      passwordregisterreenter : "",
      usernameregisterright : false,
      passwordregisterreenterright : false,
      rules : [
          value => !!value || 'Required',
      ],
      rulespassword : [
          value => !!value || 'Required',
      ],
      message:false,
      messagemsg:"",
      alertMsg:"",
      otpMessage:"",
      dialog:false,
      rememberme:"",
      icontext:"mdi-eye",
      typetext:"password",
      oneTimeToken:"",
      editedToken:"",
      buffLogin:{}
    }
  },
  computed: {
  },
  methods: {
    cancelOTP(){
      let vm =this
      vm.otpDialog=false
      vm.oneTimeToken=""
      vm.editedToken=""
      vm.buffLogin={}
    },
    validateOTP(){
      let vm = this
      console.log(vm.editedToken, vm.oneTimeToken);
      if (vm.editedToken===vm.oneTimeToken) {
        localStorage.setItem('token', JSON.stringify(vm.buffLogin.localToken))
        sessionStorage.setItem('auth', 'true')
        sessionStorage.setItem('loggedinas', vm.buffLogin.email)
        // vm.$store.commit('setState', {state:'userRole', data: vm.buffLogin.role })        
        vm.otpDialog=false
        this.$router.push('/home')        
      } else {
        vm.otpMessage = "Verification Code incorrect"
      }
    },
    sendMail(recipient, token, subject){
      let vm = this
      let toSend={
        type:'emailVerif',
        timestamp:dayjs().utc().format('YYYYMMDD HH:mm:ss ZZ'),
        data:{
          recipient:recipient,
          token:token,
          subject:subject,
        }
        
      }
      let filename= short().new()
      const form = new FormData();
      form.append('filename', filename + '.json');
      form.append('file', JSON.stringify(toSend));            
      axios.post("https://api.inplatform.online/disaster/loginVerification/",form)
      .then(response=>{
          if (response.status==201) {
              vm.otpDialog=true
          }                
      })
        
    },
    validate(){
      let vm =this
      if(vm.email != "" && vm.password != ""){
          fetch('https://api.inplatform.online/disaster/user/'+vm.email+'.json').then(response=>{
          if (response.status==200) {
            response.json().then(result=>{
              vm.buffLogin=result
              if (md5(vm.password) == result.password && result.active) {
                let localTokenRaw = localStorage.getItem('token')
                let localTokenParsed = JSON.parse(localTokenRaw)
                
                let tokenSekali=short().new()
                console.log(tokenSekali);
                if (!localTokenParsed) {
                  console.log(localTokenParsed);
                  vm.oneTimeToken=tokenSekali
                  vm.sendMail(result.email, tokenSekali, "Login from New Device")
                  // localStorage.setItem('token', JSON.stringify(result.localToken))
                }
                else if(localTokenParsed && localTokenParsed !== result.localToken){
                  vm.oneTimeToken=tokenSekali
                  vm.sendMail(result.email, tokenSekali, "Login from New Device")
                  // localStorage.setItem('token', JSON.stringify(result.localToken))
                }
                else{
                  
                  sessionStorage.setItem('auth', 'true')
                  sessionStorage.setItem('loggedinas', result.email)
                  // vm.$store.commit('setState', {state:'userRole', data: result.role })
                  this.$router.push('/home')
                }
                // 
              } else {
                this.messagemsg = 'User Or Password Is Incorrect!'
              }
            })
          }
          else{
            this.messagemsg = 'User is Not Yet Registered!'
          }
        })
          // if(localStorage.getItem('userdata') != undefined){
          //     let getdata = localStorage.getItem('userdata')
          //     let getdataparse = JSON.parse(getdata)
              
          //     // console.log(getdataparse)

          //     let filter = _.filter(getdataparse, { 'username' : this.username, 'password' : this.password })

          //     if(filter.length > 0){
          //         sessionStorage.setItem('auth', 'true')
          //         sessionStorage.setItem('loggedinas', this.username)
          //         this.$router.push('/home')
          //     } else {
          //         this.messagemsg = 'User or Password not match'
          //     }
          // } else {
          //     this.messagemsg = 'User or Password not match'
          // } 
      }
    },
    register(){
      if(this.usernameregisterright != false && this.passwordregisterreenterright != false){
          let userdata = {
              username : this.usernameregister,
              password : this.passwordregister
          }
          let data = []

          if(localStorage.getItem('userdata') != undefined){
              let getdata = JSON.parse(localStorage.getItem('userdata'))
              // console.log(getdata,)
              let filter = _.filter(getdata, { 'username' : this.usernameregister })
              // console.log(filter)
              if(filter.length > 0){
                  this.message = true
                  this.messagemsg = "username has already been registered"
              } else {

                  getdata.forEach(e=>{
                      data.push(e)
                  })
                  data.push(userdata)

                  // console.log(data)
                  let setdata = JSON.stringify(data)
                  localStorage.setItem('userdata', setdata)
                  this.dialog = false

              }
          } else {
              data.push(userdata)
              localStorage.setItem('userdata', JSON.stringify(data))
              this.dialog = false
          }
      } else {
          this.message = true
          this.messagemsg = "Please fill the form"
      }
    },
    rulesusernameregister(){
        // const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return [
            value => {
                if(!value ){
                    this.usernameregisterright = true
                    return value == this.usernameregister
                } else {
                    this.usernameregisterright = true
                    return 'Required'
                }
            },
            // value => pattern.test(value) || 'Invalid e-mail.',
            // value => !!value || 'Required',
        ]
    },
    rulespasswordregister(){
        return [
            value => {
                if(value == this.passwordregister){
                    this.passwordregisterreenterright = true
                    return value == this.passwordregister
                } else {
                    this.passwordregisterreenterright = false
                    return 'password didnt match'
                }
            }
        ]
    },
    messageclose(){
        this.message = false
        this.messagemsg = ""
    },
    remembermeget(){
        if(this.username != ""){
            this.rememberme = this.username
        }
    },
    handleappend(){
        if(this.typetext == "password"){
            this.typetext = "text"
            this.icontext = "mdi-eye-off"
        } else if(this.typetext == "text"){
            this.typetext = "password"
            this.icontext = "mdi-eye"
        }
    }
  }
};
</script>

<style scoped>
  .login {
      background-image: url(../assets/img/background/bg-login.webp);
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
      height: 100vh;
      width: 100vw;
  }

  @media screen and (min-width: 960px) {
    .ruangan {
      margin-top: 120px;
    }
  }

  .kolomtxt {
    bottom: 5%;
    position: absolute;
  }

</style>