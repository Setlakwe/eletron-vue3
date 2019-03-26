<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBuGZRfpSvhhYcn-7dPahKkzhXAVrQUOsM&libraries=places"></script>

<template>
  <b-container fluid>
    <b-form>
      <b-col sm="12">
        <h1>Facturation</h1>
      </b-col>
      <div class="row">
        <div class="col-5">
          <b-form-row>
            <b-col>
              <b-form-group
                id="itemQuantityGroup"
                label="Type de transaction"
                label-for="type-types"
              >
                <b-form-select
                  required
                  id="type-types"
                  v-model="form.transactionType"
                  :options="options.types"
                />
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group id="itemQuantityGroup" label="Vendeur" label-for="type-seller">
                <b-form-select
                  required
                  id="type-seller"
                  v-model="form.seller"
                  :options="options.sellers"
                />
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group id="itemQuantityGroup" label="Nombre d'items" label-for="itemQuantity">
                <b-form-input
                  id="itemQuantity"
                  type="number"
                  v-model="form.itemQuantity"
                  required
                  min="1"
                  step="1"
                />
              </b-form-group>
            </b-col>
          </b-form-row>
          <b-form-group label-cols="2" label="Téléphone" label-for="phone" class="text-right">
            <b-form-input id="phone" v-model="form.phone" type="tel" maxlength="10"/>
          </b-form-group>
          <b-form-row class="text-left">
            <b-col sm="9" offset="2">
              <b-form-group label>
                <b-form-radio-group
                  v-model="form.salutation"
                  :options="options.salutations"
                  name="radioInline"
                />
              </b-form-group>
            </b-col>
          </b-form-row>
          <b-form-group label-cols="2" label="Nom" label-for="customerName" class="text-right">
            <b-form-input id="customerName" v-model="form.customerName" type="text"/>
          </b-form-group>
          <b-form-group label-cols="2" label="Adresse" label-for="address1" class="text-right">
            <b-form-input id="address1" v-model="form.address1" type="text"/>
          </b-form-group>
          <b-form-group label-cols="2" label label-for="address2" class="text-right">
            <b-form-input id="address2" v-model="form.address2" type="text"/>
          </b-form-group>
          <b-form-group label-cols="2" label="Ville" label-for="address3" class="text-right">
            <b-form-input id="address3" v-model="form.address3" type="text"/>
          </b-form-group>
          <b-form-group
            label-cols="2"
            label="Code postal"
            label-for="postalCode"
            class="text-right"
          >
            <b-form-input
              id="postalCode"
              v-model="form.postalCode"
              type="text"
              maxlength="6"
              pattern="[A-z][0-9][A-z][0-9][A-z][0-9]"
            />
          </b-form-group>
          <b-form-group label-cols="2" label="Courriel" label-for="email" class="text-right">
            <b-form-input id="email" v-model="form.email" type="email"/>
          </b-form-group>
        </div>
        <b-col sm="6">
          <b-form-row>
            <b-btn-group>
              <b-btn v-on:click="addItem">Ajouter item</b-btn>
              <b-btn v-on:click="removeItems">Supprimer les items</b-btn>
            </b-btn-group>
          </b-form-row>
          <b-form-row>
            <table v-model="items" class="text-right">
              <tr>
                <td>Items Count:</td>
                <td>{{itemsCount}} / {{numberOfInvoiceItems}}</td>
              </tr>
              <tr>
                <td>Item total:</td>
                <td>{{itemstotal |currency }}</td>
              </tr>
              <tr>
                <td>Taxes:</td>
                <td>{{itemstaxes | currency }}</td>
              </tr>
              <tr>
                <td>Grand total:</td>
                <td>{{grandtotal | currency }}</td>
              </tr>
            </table>
            <div>{{items}}</div>
          </b-form-row>
        </b-col>
        <b-col sm="12">
          <InvoiceItems :items="items"/>
        </b-col>
      </div>
    </b-form>
  </b-container>
</template>
<style lang="scss" scoped>
form {
  padding: 10px;
}
</style>

<script>
import InvoiceItems from "@/components/InvoiceItems.vue";
export default {
  components: {
    InvoiceItems
  },
  mounted() {
    this.addItem();
    this.addItem();
  },
  data() {
    return {
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15],
      sortBy: null,
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      modalInfo: { title: "", content: "" },
      options: {
        salutations: [
          { value: 1, text: "M." },
          { value: 2, text: "Mme." },
          { value: 3, text: "Compagnie" }
        ],
        types: [
          { value: "", text: "Choisissez une option", disabled: true },
          { value: 1, text: "Comptant" },
          { value: 2, text: "Porté au compte" },
          { value: 3, text: "Mise de côté" }
        ],
        sellers: [
          { value: "", text: "Choisir vendeur", disabled: true },
          { value: 98, text: "Divers" },
          { value: 2, text: "Josée" },
          { value: 3, text: "Cindy" }
        ],
        provinces: [
          { value: "QC", text: "Quebec" },
          { value: "ON", text: "Ontario" }
        ]
      },
      form: {
        invoice: "",
        salutation: 2,
        sellerNumber: "",
        transactionType: 1,
        numberOfItem: 1,
        customerName: "",
        phone: "",
        address1: "",
        address2: "",
        address3: "",
        postalcode: "",
        province: "",
        country: "",
        email: "",
        items: ["test", "test", "test", "test"],
        total: 0,
        rebate: 0
      },
      item: {},
      items: [],
      itemHeader: ["Tag", "Spcmd"],
      fieldtypes: [
        "text",
        "password",
        "email",
        "number",
        "url",
        "tel",
        "date",
        `time`,
        "range",
        "color"
      ]
    };
  },
  computed: {
    itemsCount: function() {
      return this.items.length;
    },
    numberOfInvoiceItems: function() {
      if (this.items.length > 0) {
        const count = this.items
          .map(item => parseInt(item.quantity))
          .reduce((total, current) => total + current);

        return isNaN(count) ? 0 : count;
      }
      return 0;
    },
    itemstotal: function() {
      if (this.items.length > 0) {
        const count = this.items
          .map(item => item.netPrice * item.quantity)
          .reduce((total, current) => total + current);
        return isNaN(count) ? 0 : count;
      }
      return 0;
    },
    itemstaxes: function() {
      if (this.items.length > 0) {
        return (
          Math.round(
            this.items
              .map(item => item.netPrice * item.quantity * 0.14975)
              .reduce((total, current) => total + current) * 100
          ) / 100
        );
      }
      return 0;
    },
    grandtotal: function() {
      return this.itemstotal + this.itemstaxes;
    }
  },
  methods: {
    resetModal() {
      this.modalInfo.title = "";
      this.modalInfo.content = "";
    },
    info(item, index, button) {
      // this.modalInfo.title = `Row index: ${index}`;
      let content = JSON.stringify(item, null, 2);
      this.modalInfo.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", "modalInfo", button);
    },
    deleteRow(item) {
      let idx = this.items.indexOf(item);
      if (idx !== -1) {
        this.items.splice(idx, 1);
      }
    },
    greet: function(event) {
      // `this` inside methods point to the Vue instance
      alert("Hello " + this.name + "!");
      // `event` is the native DOM event
      alert(event.target.tagName);
    },
    addItem: function() {
      let item = {
        tagNumber: 53097135,
        specialOrder: "N",
        quantity: 1,
        department: 9,
        vendor: "CHA50",
        style: "2031",
        description: "SG",
        unitPrice: 20.95,
        discountPercentage: 0,
        discountAmount: 0,
        netPrice: 20.95,
        Price: ""
      };
      item.price = item.netPrice * item.quantity * 1.14875;
      this.items.push(item);
    },
    removeItems: function() {
      this.items = [];

      // this.items = [];
    }
  }
};
</script>
