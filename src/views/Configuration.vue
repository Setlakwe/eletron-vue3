<template>
  <div class="configuration">
    <b-container>
      <b-row>
        <b-col>
          <h1>Point of sale printer</h1>
          <b-form-select v-model="selected">
            <option :value="printer.name" v-for="printer in printers">{{printer.name}}</option>
          </b-form-select>
        </b-col>
        <b-col>
          <b-list-group>
            <b-list-group-item
              v-for="printer in printers"
              v-bind:class="{
          active: printer.isDefault
        }"
            >{{printer.name}}</b-list-group-item>
          </b-list-group>
        </b-col>
      </b-row>
    </b-container>
    <b-button v-on:click="handlerPrint">Print on {{defaultPrinter.name}}</b-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      receiptPrinter: {},
      defaultPrinter: {},
      printers: [],
      options: [],
      selected: ""
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
      this.options = this.printers.map(function(printer) {
        return { value: printer.name, text: printer.name };
      });
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