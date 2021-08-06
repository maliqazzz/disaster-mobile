<template>
  <v-container>
    <!-- <template> -->
      <v-btn block style="justify-content: flex-start" class="mt-12" to="/daterange">
        <v-icon left>
          mdi-calendar
        </v-icon>
        {{dateText}}
      </v-btn>
      <v-container fluid>
        <v-row class="mt-20" style="justify-content: center; position: absolute;top: 50%;left: 45%;">
          <v-progress-circular
            :size="70"
            :width="7"
            color="secondary"
            indeterminate
            v-if="loading"
          ></v-progress-circular>
        </v-row>
        <v-row style="justify-content: center; ">
          <span class="mt-20" v-if="disasterData.length===0">
            {{infoText}}
          </span>
        </v-row>
      </v-container>    
      
      <v-list nav class='mb-10' >
        <v-list-item-group
            v-model="activeList"
            active-class="secondary--text"
        >
            <template v-for="(kejadian,index) in disasterData">
                

                <v-list-item light :key="kejadian"  @click.stop="selectDisaster(kejadian)">
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


                <v-divider :key="index"></v-divider>
            </template>
        </v-list-item-group>
          
    </v-list>      
    <!-- </template> -->
    
    <!-- <v-dialog
      ref="dialog"
      v-model="modal"
      :return-value.sync="date"
      persistent
      width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="date"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
          class="mt-10"
        ></v-text-field>
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
    <!-- <v-list nav>
      <v-list-item-group
        v-model="activeList"
        active-class="secondary--text"
      >
        <template >
          <v-list-item light link to="/informasi">
            <v-list-item-icon>
              <v-img src="@/assets/icon/88.png" width="40px" class="float-left"/>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-subtitle class="ml-2 text-left"><span class="highlightbencana">Tanah Longsor</span></v-list-item-subtitle>
              <v-list-item-title light class="ml-2 text-left" @click="clickLiveMap()" >
                <h4 class="subtitle-1">Kota Semarang - Jawa Tengah</h4>
              </v-list-item-title>
              <v-list-item-subtitle class="ml-2 text-left">Reported: 8 hours ago</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item light link to="/informasi">
            <v-list-item-icon>
              <v-img src="@/assets/icon/33.png" width="40px" class="float-left"/>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-subtitle class="ml-2 text-left"><span class="highlightbencana">Banjir</span></v-list-item-subtitle>
              <v-list-item-title light class="ml-2 text-left" @click="clickLiveMap()" >
                <h4 class="subtitle-1">DKI Jakarta</h4>
              </v-list-item-title>
              <v-list-item-subtitle class="ml-2 text-left">Reported: 2 hours ago</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item light link to="/informasi" >
              <v-list-item-icon>
              <v-img src="@/assets/icon/44.png" width="40px" class="float-left"/>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-subtitle class="ml-2 text-left"><span class="highlightbencana">Kebakaran Hutan</span></v-list-item-subtitle>
              <v-list-item-title light class="ml-2 text-left" @click="clickLiveMap()" >
                <h4 class="subtitle-1">Jambi</h4>
              </v-list-item-title>
              <v-list-item-subtitle class="ml-2 text-left">Reported: 5 hours ago</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item light link to="/informasi">
            <v-list-item-icon>
              <v-img src="@/assets/icon/55.png" width="40px" class="float-left"/>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-subtitle class="ml-2 text-left"><span class="highlightbencana">Gempa Bumi</span></v-list-item-subtitle>
              <v-list-item-title light class="ml-2 text-left" @click="clickLiveMap()" >
                <h4 class="subtitle-1">Palu - Sulawesi Tengah</h4>
              </v-list-item-title>
              <v-list-item-subtitle class="ml-2 text-left">Reported: 4 hours ago</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item light link to="/informasi">
            <v-list-item-icon>
              <v-img src="@/assets/icon/66.png" width="40px" class="float-left"/>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-subtitle class="ml-2 text-left"><span class="highlightbencana">Abrasion</span></v-list-item-subtitle>
              <v-list-item-title light class="ml-2 text-left" @click="clickLiveMap()" >
                <h4 class="subtitle-1">DKI Jakarta</h4>
              </v-list-item-title>
              <v-list-item-subtitle class="ml-2 text-left">Reported: 2 hours ago</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item light link to="/informasi">
            <v-list-item-icon>
              <v-img src="@/assets/icon/77.png" width="40px" class="float-left"/>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-subtitle class="ml-2 text-left"><span class="highlightbencana">Kekeringan</span></v-list-item-subtitle>
              <v-list-item-title light class="ml-2 text-left" @click="clickLiveMap()" >
                <h4 class="subtitle-1">Palimanan</h4>
              </v-list-item-title>
              <v-list-item-subtitle class="ml-2 text-left">Reported: 7 hours ago</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

            <v-list-item light link to="/informasi" >
              <v-list-item-icon>
                <v-img src="@/assets/icon/22.png" width="40px" class="float-left"/>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-subtitle class="ml-2 text-left"><span class="highlightbencana">Vulcanic Eruption</span></v-list-item-subtitle>
                <v-list-item-title light class="ml-2 text-left" @click="clickLiveMap()" >
                  <h4 class="subtitle-1">Lumajang - Jawa Timur</h4>
                </v-list-item-title>
                <v-list-item-subtitle class="ml-2 text-left">Reported: 4 hours ago</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item light link class="mb-10" to="/informasi">
              <v-list-item-icon>
                <v-img src="@/assets/icon/11.png" width="40px" class="float-left"/>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-subtitle class="ml-2 text-left"><span class="highlightbencana">Puting Beliung</span></v-list-item-subtitle>
                <v-list-item-title light class="ml-2 text-left"  >
                  <h4 class="subtitle-1 ">Kota Pontianak - Kalimantan Barat</h4>
                </v-list-item-title>
                <v-list-item-subtitle class="ml-2 text-left">Reported: 8 hours ago</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

        </template>
      </v-list-item-group>
    </v-list> -->
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
    name: 'Home',

    data: () => ({
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      modal: false,
      loading:false,
      dateText:'',
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
    computed:{
      infoText(){
        let vm = this
        if (vm.disasterData.length===0 && vm.loading) {
          return 'Compiling Data...'
        }
        else if(vm.disasterData.length===0 && !vm.loading){
          return 'No Data'
        }
        else{
          return ''
        }
      },
    },
    watch:{
    },
    methods:{
      selectDisaster(selected){
        console.log(selected);
        let vm = this
        vm.$store.commit('setState', {state:'selectedDisaster', data: selected }) 
        vm.$router.push('/informasi')
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
      capitalizeString:function (e){
        return _.startCase(_.toLower(e))
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
            let bencana= {
              'Tanggal':item[3],
              'Kategori': item[0],
              'Provinsi':item[1],
              'Kabupaten':item[2]
            }
            buffer.push(bencana)            
          }
        } catch (error) {
          console.error(error);
        }
        
          vm.disasterData = buffer
          vm.loading= false
          console.log(buffer);
      },
      async compileCustomData(dateRange){
        let vm = this
        vm.loading= true
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
        vm.disasterData = buffer
        vm.loading= false        
      }
    },
    mounted(){
        let vm = this
        vm.$store.commit('setState', {state:'navBarText', data: "Daftar Bencana" }) 
        if (vm.$store.state.dateType[0].includes('Active')) {
          
          vm.dateText=vm.$store.state.dateType[0]
          vm.compileActiveData()
        } else {
          let date =[]
          let curDate = vm.$store.state.dateType[1]
          console.log(curDate);
          if (vm.$store.state.dateType[0].includes('Custom')) {
            console.log(vm.$store.state.dateType[0]+' ('+vm.dateRangeText(curDate)+')');
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
              
          console.log([dayjs(curDate).startOf('weeks'),dayjs(curDate)]);
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
/*  */
</style>