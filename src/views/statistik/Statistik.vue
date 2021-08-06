<template>
  <v-container fluid class="statistik">

    <v-btn block style="justify-content: flex-start" class="mt-12" to="/daterange">
        <v-icon left>
          mdi-calendar
        </v-icon>
        {{dateText}}
    </v-btn>
    
    <!-- <v-dialog
      ref="dialog"
      v-model="modal"
      :return-value.sync="date"
      persistent
      width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-card class="px-3 mx-0 mb-3" width="390">
          <v-text-field
            v-model="date"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
            class="mt-10"
          ></v-text-field>
        </v-card>
      </template>
      <v-date-picker
        v-model="date"
        scrollable
      >
        <v-spacer></v-spacer>
        <v-btn
          text
          color="primary"
          @click="modal = false"
        >
          Cancel
        </v-btn>
        <v-btn
          text
          color="primary"
          @click="$refs.dialog.save(date)"
        >
          OK
        </v-btn>
      </v-date-picker>
    </v-dialog> -->

    <v-card class="mx-0 mb-3 mt-5" width="390">
      <div class="d-flex flex-row">
        <v-col class="d-flex flex-column">
          <span class="subtitle-2">Bencana</span>
          <span class="text-h5">{{rawDataBencana.length}}</span>
        </v-col>
        <v-col class="d-flex flex-column">
          <span class="subtitle-2">Provinsi</span>
          <span class="text-h5">{{basicInfo.prov}}</span>
        </v-col>
        <v-col class="d-flex flex-column">
          <span class="subtitle-2">Kabupaten</span>
          <span class="text-h5">{{basicInfo.kab}}</span>
        </v-col>
      </div>
      <apexcharts width="350px" height="300px" type="line" :options="chartOptions" :series="series"></apexcharts>
    </v-card>

    <kategori-ben v-bind:rawDataBencana="rawDataBencana" class="mx-0 mb-3"/>
    
    <provinsi v-bind:rawDataBencana="rawDataBencana" class="mx-0 mb-3"/>

    <kabupaten v-bind:rawDataBencana="rawDataBencana" class="mx-0 mb-15"/>
    
  </v-container>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import KategoriBen from './KategoriBen.vue'
import Provinsi from './Provinsi.vue'
import Kabupaten from './Kabupaten.vue'

// eslint-disable-next-line no-unused-vars
import _ from 'lodash'
import dayjs from "dayjs"
var customParseFormat = require('dayjs/plugin/customParseFormat')
var isSameOrBefore = require('dayjs/plugin/isSameOrBefore')
dayjs.extend(customParseFormat)
dayjs.extend(isSameOrBefore)

  export default {
    name: 'Statistik',
    components: {
        apexcharts: VueApexCharts,
        KategoriBen,
        Provinsi,
        Kabupaten
    },
    data: () => ({
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      modal: false,
      loading:true,
      dateText:'',
      rawDataBencana:{},
      basicInfo:{},
      chartOptions: {
        noData: {  
                text: 'No Data',  
                align: 'center',  
                verticalAlign: 'middle',  
                offsetX: 0,  
                offsetY: 0,  
                style: {  
                    color: "#000000",  
                    fontSize: '14px',  
                    fontFamily: "Helvetica"  
                }  
            },
        chart: {
          id: 'basic-bar'
        },
        xaxis: {
          type:'datetime',
          tickPlacement: 'on',
                labels:{
                    trim:true
                }
        }
      },
      series: [],
    }),
    watch:{
      // eslint-disable-next-line no-unused-vars
      rawDataBencana(e){
        let vm =this
        let data = JSON.parse(JSON.stringify(e))
        vm.compileBasicInfo(data)
        vm.compileChartData(data)
      }
    },
    methods:{
      compileChartData(data){
        let vm = this
        let bufferCompiled={}
        let totalFinal=[]
        let sorted= data.sort(function(a,b){
          return dayjs(b.Tanggal,'DD-MMM-YYYY').toDate() - dayjs(a.Tanggal,'DD-MMM-YYYY').toDate() ;
        });
        console.log(sorted);
        for (let i = 0; i < sorted.length; i++) {
          const item = data[i];
          let Tanggal=dayjs(item['Tanggal'],'DD-MMM-YYYY').toDate()
          // let Kategori=item['Kategori']
          // let Provinsi=item['Provinsi']
          // let Kabupaten=item['Kabupaten']

          if (Object.hasOwnProperty.call(bufferCompiled, Tanggal)) {
            bufferCompiled[Tanggal]++
          } else {
            bufferCompiled[Tanggal]=1
          }          
        }
        for (const date in bufferCompiled) {
            totalFinal.push({x:date, y:bufferCompiled[date]})
        }
        let buffFinal=[{name:"Total",type:'line',data:totalFinal}]
        console.log(buffFinal);
        vm.series=buffFinal
      },
      compileBasicInfo(data){
        let vm = this
        let buffProv=[]
        let buffKab=[]
        for (let i = 0; i < data.length; i++) {
          const item = data[i];
          // let Tanggal=item['Tanggal']
          // let Kategori=item['Kategori']
          let Provinsi=item['Provinsi']
          let Kabupaten=item['Kabupaten']
          buffProv=_.union(buffProv,[Provinsi]) 
          buffKab=_.union(buffKab,[Kabupaten])       
        }
        vm.basicInfo={
          prov:buffProv.length,
          kab: buffKab.length
        }
      },
      compileDateRange(dateRange){
        console.log(dateRange);
        let dateAwal= dayjs(dateRange[0])
        let dateAkhir= dayjs(dateRange[1])
        let range=[]
        while (dateAwal.isSameOrBefore(dateAkhir)) {
            range.push(dateAwal.format('YYYY-MM-DD'));
            dateAwal = dateAwal.add(1, 'days');
        }         
        
        console.log(range);
        return range
      },
      async compileActiveData(){
        let vm = this
        let buffer=[]
        vm.loading= true
        try {
          let p1 = await fetch('https://api.inplatform.online/disaster/data/indexBencanaAktif.json')
          let p2 = await p1.json()
          
            console.log(p2);
          for (let i = 0; i < p2.data.length; i++) {
            const item = p2.data[i];
            let date = item[3]
            let kategori = item[0]
            let prov = item[1]
            let kab = item[2]
            let bencana= {
              'Tanggal':date,
              'Kategori': kategori,
              'Provinsi':prov,
              'Kabupaten':kab
            }
            buffer.push(bencana)                     
          }
        } catch (error) {
          console.error(error);
        }        
          vm.rawDataBencana = buffer
          console.log(buffer);
      },
      async compileCustomData(dateRange){
        let vm = this
        let buffer=[]
        let bufferCompiled={}
        for (let i = dateRange.length-1; i >=0; i--) {
          const date = dateRange[i];
          let year = dayjs(date, 'YYYY-MM-DD').format('YYYY');
          let month =dayjs(date, 'YYYY-MM-DD').format('MM');
          let day =dayjs(date, 'YYYY-MM-DD').format('DD');
          try {
              let p1 = await fetch('https://api.inplatform.online/disaster/data/'+year+'/'+month+'/'+day+'/indexBencana.json');
              let p2 = await p1.json();
              if (Object.hasOwnProperty.call(bufferCompiled, date)) {
                  let refData = bufferCompiled[date]
                  bufferCompiled[date] = _.union(refData,p2)
              } else {
                  bufferCompiled[date]=p2
              }             
          }
          catch (e) {
          // console.log(e.message);
          continue;
          }
        }
        for (const date in bufferCompiled) {
          bufferCompiled[date].forEach(item => {
            let kategori =_.upperCase(_.words(item,/[^-]+/g)[0])
            let prov = _.upperCase(_.words(item,/[^-]+/g)[1])
            let kab = _.upperCase(_.words(item,/[^-]+/g)[2])
            let bencana= {
              'Tanggal':dayjs(date,'YYYY-MM-DD').format('DD MMM YYYY'),
              'Kategori': kategori,
              'Provinsi':prov,
              'Kabupaten':kab
            }
            buffer.push(bencana)
          });
        }
        vm.rawDataBencana = buffer   
      },
      dateRangeText (date) {
          var date_sort_asc = function (date1, date2) {
              if (date1 > date2) return 1;
              if (date1 < date2) return -1;
              return 0;
          };
          let sorted=date.sort(date_sort_asc)
          let formated=[]
          sorted.forEach(item => {
              formated.push(dayjs(item,'YYYY-MM-DD').format('D MMM YYYY'))
          });
          if (formated.length>1) {
              return formated.join(' - ');
          }
          else{
              return formated[0]+' - '+ formated[0]
          }
      },
    },
    mounted(){
      let vm = this
      vm.$store.commit('setState', {state:'navBarText', data: "Statistik" })
      if (vm.$store.state.dateType[0].includes('Active')) {        
        vm.dateText=vm.$store.state.dateType[0]
        vm.compileActiveData()
      } else {
        let date =[]
        let curDate = vm.$store.state.dateType[1]
        if (vm.$store.state.dateType[0].includes('Custom')) {
          vm.dateText=vm.$store.state.dateType[0]+' ('+vm.dateRangeText(curDate)+')'
        } else {              
          vm.dateText=vm.$store.state.dateType[0]
        }
        switch (vm.$store.state.dateType[0]) {
          case 'Today':
              date= [dayjs(curDate).format('YYYY-MM-DD')]
              break
          case 'Yesterday':
              date= [dayjs(curDate).subtract(1, 'days').format('YYYY-MM-DD')]
              break
          case 'Last 7 Days':                  
              date= vm.compileDateRange([dayjs(curDate).subtract(6, 'days'),dayjs(curDate)])
              break
          case 'This Week':            
              date= vm.compileDateRange([dayjs(curDate).startOf('weeks'),dayjs(curDate)])
              break
          case 'Last 30 Days':
              date= vm.compileDateRange([dayjs(curDate).subtract(29, 'days'),dayjs(curDate)])
              break
          case 'This Month':
              date= vm.compileDateRange([dayjs(curDate).startOf('month'),dayjs(curDate)] )
              break
          case 'Custom':              
              date = vm.compileDateRange([curDate[0],curDate[1]])
              break            
          default:
              break;
        }
        vm.compileCustomData(date)
      }
    }
  }
</script>
<style>
.statistik {
  background-color: #eee;
  height: 100%;
  width: 100%;
}
.pick-tgl{
  background-color: #fff;
}
</style>