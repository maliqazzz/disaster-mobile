<template>
  <div class="login" flat>
      <v-container>
        <v-layout class="d-flex flex-wrap mb-2 justify-xl-space-around ruangan">
          <v-card
            class="d-flex flex-wrap justify-start"
            width="700"
            color="transparent"
            flat
          >
            <v-avatar tile size="190px" class="mt-7 mx-auto">
              <v-img max-width="200" src="../assets/img/bin.webp" />
            </v-avatar>
            <v-container class="mt-8 mx-auto">
              <v-avatar tile width="190" class="px-2">
                <v-img width="150" height="auto" src="../assets/img/i-disaster.webp" />
              </v-avatar>
              <h4 style="color: #E6B01C;">Disaster Monitoring, Early Warning<br>& Reporting System</h4>
            </v-container>
          </v-card>
        </v-layout>
      </v-container>
      <v-container class="kolomtxt">
        <v-card class="d-flex flex-column" width="100%" color="transparent" flat>
          <v-text-field outlined dark dense full-width class="mb-4" label="username" hide-details="auto" v-model="username" prepend-icon="mdi-account"/>
      
          <v-text-field outlined dark dense full-width class="mb-6" label="password" type="password" hide-details="auto" prepend-icon="mdi-lock"/>
          
          <router-link to="/home">
            <v-btn style="width:100%;">Enter</v-btn>
          </router-link>
        </v-card>
      </v-container>
  </div>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
    
  }
};
</script>

<style scoped>
  .login {
      background-image: url(../assets/img/background/bg-login.webp);
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
      height: 100vh;
      width: 100vw;
  }

  @media screen and (min-width: 960px) {
    .ruangan {
      margin-top: 120px;
    }
  }

  .kolomtxt {
    bottom: 5%;
    position: absolute;
  }


</style>