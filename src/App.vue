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
// eslint-disable-next-line no-unused-vars
import _ from 'lodash'
import dayjs from "dayjs"
var customParseFormat = require('dayjs/plugin/customParseFormat')
var isSameOrAfter = require('dayjs/plugin/isSameOrAfter')
var isSameOrBefore = require('dayjs/plugin/isSameOrBefore')
var utc = require('dayjs/plugin/utc')
dayjs.extend(utc)
dayjs.extend(customParseFormat)
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)
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
    },
    '$store.state.notification':{
      handler(e){
          console.log(e);
          localStorage.setItem('notification',JSON.stringify(e))
      },
      deep:true
    }
  },
  methods:{
    async compileNotif(){
      let vm =this
      let bufferNew= []
      let bufferOld = []      
      let todayNotif=[]
      let getBufferOld = localStorage.getItem('notification')
      let toFetch=[]
      console.log(getBufferOld);
      if (_.isNull(getBufferOld)) {
        localStorage.setItem('notification',JSON.stringify([]))
      } else {
        bufferOld=JSON.parse(getBufferOld)
      }
      bufferOld=_.remove(bufferOld, function(n) {
      let comparator = dayjs().utc().subtract(3,'days')
      console.log(comparator);
      return dayjs(n.date,'YYYYMMDD').isSameOrAfter(comparator);
      })      
      let dateAwal =dayjs().utc().subtract(3,'days')
      let dateAkhir = dayjs().utc()
      while (dateAwal.isSameOrBefore(dateAkhir)) {
            toFetch.push(dateAwal.format('YYYYMMDD'));
            dateAwal = dateAwal.add(1, 'days');
        }  
      console.log(toFetch);
      for (let i = 0; i < toFetch.length; i++) {
        const date = toFetch[i];
        try {
          let p1 = await fetch('https://api.inplatform.online/disaster/alert/'+date+'/indexAlert.json')
          let p2 = await p1.json()
          todayNotif = p2.data
        } catch (error) {
          console.log(error);
        }
        for (let i = 0; i < todayNotif.length; i++) {
          const item = todayNotif[i];
          bufferNew.push({data:item, seen:false, date:date})                    
        }
      }

      
      if (bufferNew.length>0) {
        if (bufferOld.length>0 ) {
          let final =[]
          for (let i = 0; i < bufferOld.length; i++) {
              const ori = bufferOld[i];
              let refData = ori.data
              let refDate = ori.date
              let flagUniq = true
              for (let i = 0; i < bufferNew.length; i++) {
                  const element = bufferNew[i];
                  let compData = element.data
                  let compDate = element.date
                  // console.log(_.isEqual(compData,refData), _.isEqual(compDate,refDate));
                  if (_.isEqual(compData,refData) && _.isEqual(compDate,refDate)) {
                      // console.log(element);
                      flagUniq=false
                  }        
              }
              if (flagUniq) {
                  final.push(ori)
              }
          }
          let combined = _.union(bufferOld,final)
          vm.$store.commit('setState', {state:'notification', data: combined })
          console.log('combined',combined);
        }
        else{        
          let combined = _.unionBy(bufferOld, bufferNew,  "data")
          vm.$store.commit('setState', {state:'notification', data: combined })
          console.log(combined);
        }
      }
      else{
        vm.$store.commit('setState', {state:'notification', data: bufferOld })
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
    vm.compileNotif()
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
