<template>
  <div class="login" flat>
      <v-container>
        <v-layout class="d-flex flex-wrap mb-2 justify-xl-space-around ruangan">
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
            <v-text-field outlined dark dense full-width required class="mb-4" label="username" hide-details="auto" v-model="username" prepend-icon="mdi-account" :rules="rules" v-on:click="messagemsg = ''"/>
        
            <v-text-field outlined dark dense full-width class="mb-6" label="password" hide-details="auto" prepend-icon="mdi-lock" v-model="password" required :rules="rulespassword" :type="typetext" :append-icon="icontext" @click:append="(e)=>handleappend(e)" :error-messages="messagemsg == 'User or Password not match' ? 'User or Password not match' : ''" v-on:click="messagemsg = ''"/>
            
            <v-btn style="width:100%;" class="mb-2" type="submit" v-on:click="validate" :disabled="username == '' || password == '' ? true : false">Submit</v-btn>
            
            <v-btn style="width:100%;" class="mb-4" v-on:click="dialog=true">Register</v-btn>

            <v-dialog v-model="dialog"  max-width="50%" >
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
            </v-dialog>
            <v-dialog v-model="message" persistent max-width="177px" >
                <v-card>
                    <v-col>
                        {{messagemsg}}
                    </v-col>
                    <v-col style>
                        <v-btn v-on:click="messageclose()" style="margin:auto" width="100%">
                            Close
                        </v-btn>
                    </v-col>
                </v-card>
            </v-dialog>
          <!-- </form> -->

        </v-card>
      </v-container>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  components: {
  },
  data () {
    return {
      username : "",
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
      dialog:false,
      rememberme:"",
      icontext:"mdi-eye",
      typetext:"password"
    }
  },
  computed: {
  },
  methods: {
    
    validate(){
      if(this.username != "" && this.password != ""){
          if(localStorage.getItem('userdata') != undefined){
              let getdata = localStorage.getItem('userdata')
              let getdataparse = JSON.parse(getdata)
              
              // console.log(getdataparse)

              let filter = _.filter(getdataparse, { 'username' : this.username, 'password' : this.password })

              if(filter.length > 0){
                  sessionStorage.setItem('auth', 'true')
                  sessionStorage.setItem('loggedinas', this.username)
                  this.$router.push('/home')
              } else {
                  this.messagemsg = 'User or Password not match'
              }
          } else {
              this.messagemsg = 'User or Password not match'
          } 
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