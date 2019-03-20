

<template>
  <div id="app">
    <Navbar/>
    <div id="app-body">
      <router-view/>
    </div>
  </div>
</template>
<script>
import Navbar from "@/components/Navbar.vue";
export default {
  name: "electron-app",
  components: {
    Navbar
  },
  computed: {
    today: function() {
      let date = new Date();
      return date.toDateString();
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
#app-body {
  margin-top: 60px;
  font-size: 1rem;
}
</style>

<script>
import Navbar from "@/components/Navbar.vue";
export default {
  name: "electron-app",
  components: {
    Navbar
  },
  computed: {
    today: function() {
      let date = new Date();
      return date.toDateString();
    }
  }
};
</script>
