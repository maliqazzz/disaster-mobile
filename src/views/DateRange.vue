<template>
  <v-container>
    <v-list nav class="mt-10" dense>
        <v-list-item-group
            v-model="activeList"
            active-class="secondary--text"
        >
            <template v-for="(type,index) in rangeType">
                <v-list-item v-if="type!=='Custom'" light :key="type" >                  
                    <v-list-item-content>                    
                        <v-list-item-title light class="ml-2 text-left" >
                            <h4 class="subtitle-1 text-wrap">{{type}}</h4>
                        </v-list-item-title>
                        <v-list-item-subtitle class="ml-2 text-left">{{rangeDate(type)}}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item v-else-if="type==='Custom'" light :key="type" @click.stop="modal=true;">                  
                    <v-list-item-content>                    
                        <v-list-item-title light class="ml-2 text-left" >
                            <h4 class="subtitle-1 text-wrap">{{type}}</h4>
                        </v-list-item-title>
                        <v-list-item-subtitle class="ml-2 text-left">{{dateRangeText}}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                
                <v-divider :key="index"></v-divider>
            </template>
        </v-list-item-group>
          
    </v-list>      
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
    >
      {{ snackbarText }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <v-btn block class="mt-10" color="secondary" @click="saveDateRange()">
        SAVE
    </v-btn>
    <v-dialog
        ref="dialog"
        v-model="modal"
        persistent
        width="290px"
    >
    <v-date-picker
        v-model="date"                        
        range
        locale="id-ID"
        color="primary"
        >
        <v-spacer></v-spacer>
        <v-btn
            text
            color="primary"
            @click.stop="modal = false"
        >
            Cancel
        </v-btn>
        <v-btn
            text
            color="primary"
            @click="customDate=date;modal = false;"
        >
            OK
        </v-btn>
        </v-date-picker>
    </v-dialog>
  </v-container>
</template>

<script>
import _ from 'lodash'
import dayjs from "dayjs"
var customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)
export default {
    name: 'DateRange',

    data: () => ({
        snackbar:false,
        timeout:2000,
        snackbarText:'',
        modal:false,
        activeList:[],
        rangeType:['Active Disaster', 'Today', 'Yesterday', 'Last 7 Days', 'This Week', 'Last 30 Days', 'This Month', 'Custom'],
        currentDate:dayjs(),
        date:[],
        customDate:[],
    }),
    computed:{ 
           dateRangeText () {
            var date_sort_asc = function (date1, date2) {
                if (date1 > date2) return 1;
                if (date1 < date2) return -1;
                return 0;
            };
            if (this.customDate.length>0) {
                let date =this.customDate
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
            } else {
                return ''
            }
            
        },
    },
    watch:{
        activeList(e){
            console.log(e);
        }
    },
    methods:{
        saveDateRange(){
            let vm =this
            if (typeof vm.activeList== 'number') {
                let type =vm.rangeType[vm.activeList]
                let curDate = vm.currentDate
                if (type.includes("Active")) {
                    let data = [type]
                    vm.$store.commit('setState', {state:'dateType', data: data }) 
                }
                else if(type.includes("Custom")){
                    let data = [type, vm.customDate]
                    vm.$store.commit('setState', {state:'dateType', data: data }) 
                }
                else{
                    let data = [type, curDate]
                    vm.$store.commit('setState', {state:'dateType', data: data }) 
                }
                vm.$router.push(vm.$store.state.pathBefore)
            } else {
                vm.snackbarText = 'Date range not selected!'  
                vm.snackbar=true  
            }
           
        },
        
        rangeDate(type){
            let vm = this
            switch (type) {
                case 'Active Disaster':
                    return ''
                case 'Today':
                    return dayjs(vm.currentDate).format('dddd, MMM DD')
                case 'Yesterday':
                    return dayjs(vm.currentDate).subtract(1, 'days').format('dddd, MMM DD')
                case 'Last 7 Days':
                    return dayjs(vm.currentDate).subtract(6, 'days').format('MMM DD') +' - '+dayjs(vm.currentDate).format('MMM DD')
                case 'This Week':
                    return dayjs(vm.currentDate).startOf('weeks').format('MMM DD') +' - '+dayjs(vm.currentDate).format('MMM DD')
                case 'Last 30 Days':
                    return dayjs(vm.currentDate).subtract(29, 'days').format('MMM DD') +' - '+dayjs(vm.currentDate).format('MMM DD')
                case 'This Month':
                    return dayjs(vm.currentDate).format('MMMM')                   

                default:
                    return ''
            }
        },
    },
    mounted(){
        let vm = this
        vm.$store.commit('setState', {state:'navBarText', data: "Date Range" })
        vm.activeList = _.indexOf(vm.rangeType,vm.$store.state.dateType[0])
        if (vm.$store.state.dateType[0].includes('Custom')) {
            vm.customDate = vm.$store.state.dateType[1]
        }
    }
}
</script>

<style>

</style>