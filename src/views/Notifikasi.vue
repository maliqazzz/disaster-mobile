<template>
  <v-container>
    
    <v-list nav class='mt-14 mb-10' >
        <v-list-item-group
            v-model="activeList"
            active-class="secondary--text"
            multiple
        >
            <template v-for="(kejadian,index) in disasterData">                

                <v-list-item light :key="index" @click.stop="selectDisaster(kejadian)">
                  <v-list-item-icon >
                    <v-img :src="iconKategori[kejadian.Kategori]" width="40px" class="float-left"/>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-subtitle class="ml-2 text-left"><span class="highlightbencana">{{capitalizeString(kejadian.Kategori)}}</span></v-list-item-subtitle>
                    <v-list-item-title light class="ml-2 text-left" >
                      <h4 class="subtitle-1 text-wrap">{{capitalizeString(kejadian.Kabupaten)}} - {{capitalizeString(kejadian.Provinsi)}}</h4>
                    </v-list-item-title>
                    <v-list-item-subtitle class="ml-2 text-left">Reported: {{capitalizeString(kejadian["Tanggal"])}}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
            </template>
        </v-list-item-group>
          
    </v-list> 
  </v-container>
</template>

<script>
  //import icon
  import abrasi from '@/assets/icon/66.png' 
  import banjir from '@/assets/icon/33.png' 
  import vulcano from '@/assets/icon/22.png'
  import puting from '@/assets/icon/11.png'
  import firedFores from '@/assets/icon/44.png'
  import gempa from '@/assets/icon/55.png'
  import kekeringan from '@/assets/icon/77.png'
  import longsor from '@/assets/icon/88.png' 

  import _ from 'lodash'
  import dayjs from "dayjs"
  var customParseFormat = require('dayjs/plugin/customParseFormat')
  var isSameOrBefore = require('dayjs/plugin/isSameOrBefore')
  dayjs.extend(customParseFormat)
  dayjs.extend(isSameOrBefore)
  export default {
    name: 'Notifikasi',
    data: () => ({
      disasterData:[],
      activeList:[],
      iconKategori:{
          "GELOMBANG PASANG / ABRASI":abrasi,
          "BANJIR":banjir,
          "LETUSAN GUNUNG BERAPI":vulcano,
          "PUTING BELIUNG":puting,
          "KEBAKARAN HUTAN DAN LAHAN":firedFores,
          "GEMPA BUMI":gempa,
          "KEKERINGAN":kekeringan,
          "TANAH LONGSOR":longsor,
      },
    }),
    watch:{
      '$store.state.notification':{
        handler(e){
          let vm = this
          console.log(e);
          vm.compileDataNotif()    
        },
        deep:true
      }
    },
    methods:{
      selectDisaster(kejadian){
        let vm = this
        let data=[kejadian.Kategori, kejadian.Provinsi, kejadian.Kabupaten, kejadian.Tanggal]
        let refData = vm.$store.state.notification
        for (let i = 0; i < refData.length; i++) {
          const item = refData[i];
          console.log(_.isEqual(item.data, data));
          if (_.isEqual(item.data, data)) {
            refData[i].seen = true
          }          
        }
        vm.$store.commit('setState', {state:'notification', data: refData })
        console.log(refData);
      },
      capitalizeString:function (e){
        return _.startCase(_.toLower(e))
      },
      compileDataNotif(){
        let vm =this
        let rawData = vm.$store.state.notification
        let buffer=[]
        let indexAktif=[]
        for (let i = 0; i < rawData.length; i++) {
          const item = rawData[i];
          buffer.push({
            Kategori:item.data[0],
            Provinsi:item.data[1],
            Kabupaten:item.data[2],
            Tanggal:item.data[3],
            Seen:item.seen
          })
        }
        for (let i = 0; i < buffer.length; i++) {
          const item = buffer[i];
          if (!item.Seen) {
            indexAktif.push(i)
          }              
        }
        console.log(buffer, indexAktif);
        vm.activeList=indexAktif
        vm.disasterData=buffer
      }
    },
    mounted(){
      let vm = this
      vm.$store.commit('setState', {state:'navBarText', data: "Notifikasi"}) 
      vm.compileDataNotif()
    }
  }
</script>
<style>
/*  */
</style>