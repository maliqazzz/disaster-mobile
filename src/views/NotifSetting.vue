<template>
  <v-container>
      <v-list nav class='mt-14 ' >
      <v-list-item >
        <v-list-item-action>
          <v-checkbox
            :input-value="emailNotif"
            @change="emailNotif = !emailNotif; updateEmailSub()"
            color="primary"
          ></v-checkbox>
        </v-list-item-action>

        <v-list-item-content>
          <v-list-item-title class="ml-2 text-left">Email Notifications</v-list-item-title>
          <v-list-item-subtitle class="ml-2 text-left">Allow notifications</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'
export default {
    name: 'NotifSetting',
    data: () => ({
      emailNotif: false,
    
    }),
    methods:{
        
      checkEmailSub(){
        let vm =this
        let curEmail = sessionStorage.getItem('loggedinas')
        fetch('https://api.inplatform.online/disaster/alert/indexEmailRecipient.json').then(res=>{
          console.log(res.status);
          if (res.status===200) {
            res.json().then(result=>{
              console.log(result);
              if (result.includes(curEmail)) {
                vm.emailNotif=true
              }
            })
          }
        })      
      },
      updateEmailSub(){
        let vm =this
        let flagActive=vm.emailNotif
        console.log('update');
        fetch('https://api.inplatform.online/disaster/alert/indexEmailRecipient.json').then(res=>{
          if (res.status===200) {
            let curEmail = sessionStorage.getItem('loggedinas')
            res.json().then(result=>{
              if (flagActive) {
                let dataToSend= _.union(result,[curEmail],_.isEqual);
                const form = new FormData();
                form.append('filename', 'indexEmailRecipient.json');
                form.append('file', JSON.stringify(dataToSend));
                axios.post('https://api.inplatform.online/disaster/alert/', form).then(res=>{
                  if (res.status==201) {
                      console.log('Sent: ','indexEmailRecipient.json');                               
                  } 
                  else{
                      console.log('Error Sent: ','indexEmailRecipient.json'); 
                  }
                })
              }
              else{
                let dataToSend= _.remove(result,function (n) {
                    return n!==curEmail
                })
                const form = new FormData();
                form.append('filename', 'indexEmailRecipient.json');
                form.append('file', JSON.stringify(dataToSend));
                axios.post('https://api.inplatform.online/disaster/alert/', form).then(res=>{
                  if (res.status==201) {
                      console.log('Sent: ','indexEmailRecipient.json');                       
                  } 
                  else{
                      console.log('Error Sent: ','indexEmailRecipient.json'); 
                  }
                })
              }
            })
            
          }
          else if(res.status===404){
            let curEmail = sessionStorage.getItem('loggedinas')
            console.log(typeof curEmail);
            if (flagActive) {
              let dataToSend= [curEmail];
              const form = new FormData();
              form.append('filename', 'indexEmailRecipient.json');
              form.append('file', JSON.stringify(dataToSend));
              axios.post('https://api.inplatform.online/disaster/alert/', form).then(res=>{
                if (res.status==201) {
                    console.log('Sent: ','indexEmailRecipient.json');                     
                } 
                else{
                    console.log('Error Sent: ','indexEmailRecipient.json'); 
                }
              })
            }          
          }
        })
      },
    },
    mounted(){
      let vm = this        
      vm.$store.commit('setState', {state:'navBarText', data: "Setting Notifikasi"}) 
      vm.checkEmailSub()
    }
}
</script>

<style>

</style>