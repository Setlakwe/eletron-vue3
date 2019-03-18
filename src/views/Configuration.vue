<template>
  <div class="configuration">
    <h1>Printer</h1>
    <b-button v-on:click="handlerPrint">Print on {{defaultPrinter.name}}</b-button>
    <b-list-group>
      <b-list-group-item
        v-for="printer in printers"
        v-bind:class="{
          active: printer.isDefault
        }"
      >{{printer.name}}</b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      receiptPrinter: {},
      defaultPrinter: {},
      printers: []
    };
  },
  beforeDestroy() {},
  computed: {},
  mounted() {
    if (localStorage.receptPrinter)
      this.receiptPrinter = localStorage.receptPrinter;

    let win = this.initPrintWindow();
    let printers = win.webContents.getPrinters();

    if (printers) {
      this.defaultPrinter = printers.filter(function(p) {
        return p.isDefault;
      })[0];
      this.printers = printers;
    }

    win.close();
  },
  methods: {
    initPrintWindow: function() {
      // Creating new print window
      const { BrowserWindow } = require("electron").remote;
      let win = new BrowserWindow({
        "auto-hide-menu-bar": true,
        show: false
      });
      win.on("closed", function() {
        win = null;
      });
      return win;
    },
    handlerPrint: function() {
      let win = this.initPrintWindow();
      win.loadURL("http://google.com");
      win.webContents.on("did-finish-load", () => {
        let options = { silent: true, deviceName: this.defaultPrinter.name };
        win.webContents.print(options, function() {
          win.close();
        });
      });
    }
  }
};
</script>
