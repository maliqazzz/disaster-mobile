<template>
<div id="v-app">
  <v-app>
    <Nav v-if="!['Login'].includes($route.name)" />
    <router-view :key="$route.path"/>
    <BotNav v-if="!['Login'].includes($route.name)" />
  </v-app>
</div>
</template>

<script>
import Nav from './components/Nav'
import BotNav from './components/BotNav'
export default {
  components: {
    Nav,
    BotNav
  },

  data: () => ({
    //
  }),
  watch:{
    '$route.path':{
      handler(after,before){
        let vm = this
        vm.$store.commit('setState', {state:'pathBefore', data: before})
        console.log(before, after);
      }
    }
  },
  mounted(){
    let vm = this
    fetch('https://api.inplatform.online/disaster/license/license.json').then(response=>{
      if (response.status==200) {
        response.json().then(result=>{
          let datanya = {
            'key':"",
            'expiredBy':""
          }
          datanya['key']=result['key']
          datanya['expiredBy']=result['expiredBy']
          vm.$store.commit('setState', {state:'licenseKey', data: datanya })
        })
      }
    })
  }
};
</script>
<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
