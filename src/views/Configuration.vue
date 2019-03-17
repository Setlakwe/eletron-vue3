<template>
  <div class="configuration">!
    <b-button v-on:click="getPrinters()">Show printers</b-button>
    <div>{{printerList}}</div>
  </div>
</template>

<script>
import { ipcRenderer } from "electron";
let myval;
export default {
  mounted() {
    ipcRenderer.send("request:system-printers");
  },
  data() {
    return {
      currentPrinter: {},
      printerList: []
    };
  },
  methods: {
    init() {
      ipcRenderer.on("receive:system-printers", function(e, data) {
        this.printerList = data.printers;
      });
    },
    getPrinters() {
      console.log(Date.now(), this.printerList);
    }
  }
};
</script>
