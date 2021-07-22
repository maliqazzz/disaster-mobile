<template>
<v-container id="nav">
  <v-app-bar
    app
    color="primary"
    dark
    dense
    class="justify-center"
  >
    <!-- <div class="d-flex align-center" style="position: absolute; left: 35%">
      12 Bencana aktif
    </div> -->
    <v-btn
      tile
      small
      color="transparent"
      elevation="0"
      to="/home"
      v-if="!['/home'].includes($route.name)"
    >
      <v-icon>
        mdi-arrow-left
      </v-icon>
    </v-btn>
  </v-app-bar>
</v-container> 
</template>

<script>

export default {
  name: 'Nav',

  data: () => ({
    //
  }),
};
</script>

<style scoped>
  #nav {
    position: absolute;
    top: 0%;
    z-index: 17;
  }
</style>
