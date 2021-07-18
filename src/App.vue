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
export default {
  components: {
    Nav,
    BotNav
  },

  data: () => ({
    //
  }),
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
