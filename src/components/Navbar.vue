
<template>
  <nav class>
    <ul class="list-inline navbar-nav" v-for="route in routes">
      <li class="list-inline-item">
        <router-link :to="route.url">{{route.name}}</router-link>
      </li>
    </ul>
  </nav>
</template>


<script>
export default {
  name: "Navbar",
  data() {
    return {
      routes: [
        { name: "Invoice", url: "/invoice" },
        { name: "Configuration", url: "/configuration" }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: #171717;
  padding: 0 15px;
  box-sizing: border-box;
  .navbar-nav {
    flex-direction: row;
  }
}
</style>
