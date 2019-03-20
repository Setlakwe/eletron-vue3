
<template>
  <nav class>
    <ul class="list-inline navbar-nav">
      <li class="list-inline-item">
        <router-link to="/">Home</router-link>
      </li>
      <li class="list-inline-item">
        <router-link to="/invoice">Invoice</router-link>
      </li>
      <li class="list-inline-item">
        <router-link to="/configuration">Configuration</router-link>
      </li>
      <li class="list-inline-item">
        <router-link to="/about">About</router-link>
      </li>
    </ul>
  </nav>
</template>


<script>
export default {
  name: "Navbar"
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
