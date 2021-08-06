<template>
  <v-container class="mt-12 mb-14">
        <v-row no-gutters style="flex-wrap: nowrap;">
            <v-col cols="2" class="flex-grow-0 flex-shrink-0">
                <v-list-item-avatar>
                <v-img :src="iconKategori[dataBencana.Kategori]" width="60px"/>
                </v-list-item-avatar>
            </v-col>
            <v-col cols="10" class="flex-grow-1 flex-shrink-0">
                <v-list-item-subtitle class="mx-2 text-left"><span class="highlightbencana">{{capitalizeString(dataBencana.Kategori)}}</span></v-list-item-subtitle>
                <v-list-item-title light class="mx-2 text-left text-wrap"  >
                    <h4 class="subtitle-1 text-wrap">{{capitalizeString(dataBencana.Kabupaten)}} - {{capitalizeString(dataBencana.Provinsi)}}</h4>
                </v-list-item-title>
                <v-list-item-subtitle class="mx-2 text-left">Reported: {{capitalizeString(dataBencana["Tanggal_Kejadian"])}}</v-list-item-subtitle>
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-container class="ma-0 text-left">
            <p><span>Lokasi : </span><span>{{dataBencana.Lokasi}}</span></p>
            <p><span>Waktu/Tanggal : {{capitalizeString(dataBencana["Tanggal_Kejadian"])}}</span><span></span></p>
            <p><span>Kronologis : </span><span>{{dataBencana.Kronologi}}</span></p>
            <p><span>Penyebab : </span><span>{{dataBencana.Penyebab}}</span></p>
            <p><span>Korban Meninggal : </span><span>{{dataBencana['Meninggal']}}</span></p>
            <p><span>Korban Terluka : </span><span>{{dataBencana['Terluka']}}</span></p>
            <p><span>Korban Hilang : </span><span>{{dataBencana['Hilang']}}</span></p>
            <p><span>Rumah Rusak: </span><span>{{dataBencana['Rumah Rusak']}}</span></p>
            <p><span>Fasum Rusak: </span><span>{{dataBencana['Fasum Rusak']}}</span></p>





        </v-container>
        <!-- <v-img
            height="auto"
            width="370"
            class="ma-2"
            src="@/assets/img/bencana/longsor.webp"/> -->
        
        
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
  dayjs.extend(customParseFormat)

  export default {
    name: 'Informasi',

    data: () => ({
      dataBencana:{},
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
    methods:{
      capitalizeString:function (e){
        return _.startCase(_.toLower(e))
      },
      async compileData(){
        let vm = this
        let param = vm.$store.state.selectedDisaster
        let date = param.Tanggal
        let year = dayjs(date, 'DD-MMM-YYYY').format('YYYY');
        let month =dayjs(date, 'DD-MMM-YYYY').format('MM');
        let day =dayjs(date, 'DD-MMM-YYYY').format('DD');
        let prov= _.snakeCase(param.Provinsi)
        let kab = _.snakeCase(param.Kabupaten)
        let kategori = _.snakeCase(param.Kategori)
        let filename= kategori+'-'+prov+'-'+kab+'.json'

          console.log(filename);
        try {
          let p1 =await fetch('https://api.inplatform.online/disaster/data/'+year+'/'+month+'/'+day+'/'+filename)
          let p2 = await p1.json()
          let refData =p2.data
          let tanggal = date
          let buffDetail={
            Tanggal_Kejadian:tanggal,
            Kategori:refData.kategori,
            Lokasi: refData.lokasi.detailLokasi,
            Provinsi: refData.lokasi.provinsi,
            Kabupaten: refData.lokasi.kabupaten,
            Kronologi: refData.detail.kronologis,
            Penyebab: refData.detail.penyebab
          }
          for (const dampak in p2.data.dampak) {
            let namaDampak = _.startCase(dampak)
            let jumlahDampak=p2.data.dampak[dampak]
            if (Object.hasOwnProperty.call(buffDetail, namaDampak)) {
                buffDetail[namaDampak] +=jumlahDampak
            } else {
                buffDetail[namaDampak]=jumlahDampak
            } 
          }
          vm.dataBencana = buffDetail
          console.log(buffDetail);
        } catch (error) {
          console.error(error);
        }
      }
    },
    mounted(){
      let vm = this      
      vm.$store.commit('setState', {state:'navBarText', data: "Informasi Bencana" }) 
      vm.compileData()
    }
  }
</script>
<style>
.dialog-pantauan{
    right:10%;
    top:15%;
    /* height: fit-content; */
    width: 500px;
    position:fixed;
  }
</style>