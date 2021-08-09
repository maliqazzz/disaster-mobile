<template>
  <v-container class="about" fluid style="" fill-height>
      <v-row class=" justify-center mt-10 mb-2" style="justify-content: center; ">
          <v-col>
          </v-col>
          <v-col class="align-center  justify-center">
                <v-img class="mx-auto" :src="iconBin" width="200" />
          </v-col>
          <v-col>
          </v-col>          
      </v-row>
      <v-row class="align-center justify-center" style="justify-content: center; margin-top: -20vh;" dense>
          <v-col>
          </v-col>
          <v-col  class="align-center justify-center" style="justify-content: center;">
            <v-img class="mx-auto" :src="iconDisaster" width="200" />
          </v-col>
          <v-col>
          </v-col>          
      </v-row>
      <v-row style="justify-content: center; margin-top: -30vh;">
          <h4 class="justify-center" style="color: #E6B01C;">Disaster Monitoring, Early Warning<br>& Reporting System</h4>
      </v-row>
      <v-row style="justify-content: center; margin-top: -30vh;">
        <v-card max-width="90%">
            <v-card-text>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title light class="ml-2 text-middle" >
                        <h4 class="subtitle-1 text-wrap">License Key : {{licenseKey.key}}</h4>
                        </v-list-item-title>
                        <v-list-item-subtitle class="ml-2 text-middle">Expired : {{licenseKey.expiredBy}}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-card-text>
        </v-card>
      </v-row>
      
  </v-container>
</template>

<script>
import iconBin from '../assets/img/bin.webp'
import iconDisaster from '../assets/img/i-disaster.webp'
export default {
    name: 'About',

    data: () => ({
        info:{},
        iconBin:iconBin,
        iconDisaster:iconDisaster,
        licenseKey:{}
    }),
    methods:{
    },
    watch:{
        '$store.state.licenseKey':{
            handler(e){
                let vm =this
                vm.licenseKey = e
            }
        }
    },
    mounted(){
        
        let vm = this
        vm.$store.commit('setState', {state:'navBarText', data: "About" })
        vm.licenseKey=vm.$store.state.licenseKey
    }
}
</script>

<style>
.about {
      background-image: url(../assets/img/background/bg-login.webp);
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
      height: 100vh;
      width: 100vw;
  }
</style>