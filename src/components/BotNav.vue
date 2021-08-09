<template>
    <v-bottom-navigation
        :value="value"
        color="teal"
        grow
        fixed
    >   
        <v-btn to="/home">
            <span>Bencana</span>

            <v-icon>mdi-crosshairs-gps</v-icon>
        </v-btn>

        <v-btn to="/statistik">
            <span>Statistik</span>

            <v-icon>mdi-chart-bar</v-icon>
        </v-btn>
        
        <v-btn to="/notifikasi">
        
            <span>Notifikasi</span>
        <v-badge
            :value="jumlah>0"
            color="secondary"
            overlap
            :content="jumlah"
        >
            <v-icon>mdi-bell</v-icon>
        </v-badge>
        
        </v-btn>
        <v-btn to="/about">
            <span>About</span>
                
            <v-icon>mdi-information</v-icon>
        </v-btn>
    </v-bottom-navigation>
</template>

<script>
import _ from 'lodash'

export default {
    name: 'BotNav',
    data: () => ({
        value: 0,
        jumlah:0,
        indexPages:{
            home:0,
            statistik:1,
            notifikasi:2,
            abour:3
        }
    }),
    watch:{
        '$store.state.notification':{
            handler(e){
                this.compileBadgeNum(e)
            },
            deep:true
        }
    },
    methods:{
        compileBadgeNum(e){
            let vm =this
            let rawData = e
            let total =0
            for (let i = 0; i < rawData.length; i++) {
                const item = rawData[i];
                if (!item.seen) {
                    total++
                }
            }
            vm.jumlah=total
        }
    },  
    mounted(){
        let vm = this
        vm.compileBadgeNum(vm.$store.state.notification)
        // eslint-disable-next-line no-unused-vars
        for (const key in vm.indexPages) {
            let path = _.trim(vm.$route.path, '/');
            if (Object.hasOwnProperty.call(vm.indexPages, path)) {
                vm.value = vm.indexPages[path];
                
            }
        }
    }
   
};
</script>

<style scoped>
</style>
