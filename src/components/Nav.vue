<template>
<v-container id="nav">
  <v-app-bar
    app
    color="primary"
    dark
    dense
    class="justify-center"
  >
  <v-row dense style="justify-content: center; ">
    <v-col cols="2">
      <v-btn
        tile
        small
        color="transparent"
        elevation="0"
        @click="changePage()"
        v-if="!['Home'].includes($route.name)"
      >
        <v-icon>
          mdi-arrow-left
        </v-icon>
      </v-btn>
    </v-col>
    <v-col style="justify-content: center; ">
      <div class="align-center">
        {{navText}}
      </div>
    </v-col>
    <v-col cols="2">
      <v-btn
        tile
        small
        color="transparent"
        elevation="0"
        to="/notifsetting"
        v-if="$route.name.includes('Notifikasi')"
      >
        <v-icon>
          mdi-cogs
        </v-icon>
      </v-btn>
    </v-col>
  </v-row>
    
    
  </v-app-bar>
</v-container> 
</template>

<script>

export default {
  name: 'Nav',

  data: () => ({
    navText:""
  }),
  watch:{
    '$store.state.navBarText':{
      handler(e){
        let vm = this
        vm.navText=e
      }
    },
  },
  methods:{
    changePage(){
      let vm = this
      vm.$router.push(vm.$store.state.pathBefore)
    }
  },
  mounted(){
    let vm = this
    vm.navText=vm.$store.state.navBarText
  }
};
</script>

<style scoped>
  #nav {
    position: absolute;
    top: 0%;
    z-index: 17;
  }
</style>
