<template>
  <b-list-group>
    <b-list-group-item v-for="printer in printers">{{printer.name}}</b-list-group-item>
  </b-list-group>
</template>

<script>
export default {
  props: ["printers"]
};
</script>
