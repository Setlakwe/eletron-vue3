<template>
  <div>
    <b-form @submit="filter">
      <b-col sm="4">
        <b-form-group label-cols="2" label="Fournisseur" label-for="VNDNR" class="text-right">
          <b-form-input id="VNDNR" v-model="form.VNDNR" @keyup="filter" trim/>
        </b-form-group>
      </b-col>
      <b-col sm="4">
        <b-form-group label-cols="2" label="Style" label-for="STYLE" class="text-right">
          <b-form-input id="STYLE" v-model="form.STYLE" @keyup="filter" trim/>
        </b-form-group>
      </b-col>
      <b-col sm="4">
        <b-form-group label-cols="2" label="Couleur" label-for="COLOR" class="text-right">
          <b-form-input id="COLOR" v-model="form.COLOR" @keyup="filter" trim/>
        </b-form-group>
      </b-col>
      <b-col sm="4">
        <b-form-group label-cols="2" label="Bonnet" label-for="CUPSZ" class="text-right">
          <b-form-input id="CUPSZ" v-model="form.CUPSZ" @keyup="filter" trim/>
        </b-form-group>
      </b-col>
      <b-col sm="4">
        <b-form-group label-cols="2" label="GRANDEUR" label-for="SIZEX" class="text-right">
          <b-form-input id="SIZEX" v-model="form.SIZEX" @keyup="filter" trim/>
        </b-form-group>
      </b-col>
      <b-btn type="submit">Rechercher</b-btn>
    </b-form>
    <p class="mt-3">Current Page: {{ currentPage }}</p>
    <p class="mt-3">Total records: {{ rows }}</p>
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination>
    <b-table
      id="my-table"
      :busy.sync="isBusy"
      :fields="fields"
      :hover="true"
      :items="myProvider"
      :per-page="perPage"
      :current-page="currentPage"
    >
      <div slot="table-busy" class="text-center text-danger my-2">
        <b-spinner class="align-middle"></b-spinner>
        <strong>Loading...</strong>
      </div>
    </b-table>
  </div>
</template>
<style lang="scss">
table.b-table[aria-busy="false"] {
  opacity: 1;
}
table.b-table[aria-busy="true"] {
  opacity: 0.6;
}
</style>

<script>
import axios from "axios";
const apiUrl = "http://localhost:3000/api";
export default {
  data() {
    return {
      isBusy: false,
      perPage: 50,
      currentPage: 1,
      items: [],
      rows: 0,
      form: {
        queryString: "",
        VNDNR: "",
        STYLE: "",
        STLDS: "",
        COLOR: "",
        SIZEX: ""
      },
      fields: [
        { BARCD: { label: "Étiquette" } },
        { DPTNO: { label: "Rayson" } },
        { VNDNR: { label: "Fournisseur" } },
        { STYLE: { label: "Style" } },
        { STLDS: { label: "Description" } },
        { COLOR: { label: "Couleur" } },
        { SIZEX: { label: "Grandeur" } },
        { CUPSZ: { label: "Bonnet" } },
        { SUGPC: { label: "Prix Suggéré" } },
        { RTLPC: { label: "Prix de vente" } }
      ]
    };
  },
  computed: {
    rows: async function() {
      let result = await (this.rows = axios
        .get(`${apiUrl}/plumas/count/${this.queryString}`)
        .then(res => res.data[0].no_of_rows));
      return result;
    }
  },
  methods: {
    filter: function(e) {
      e.preventDefault();
      let where = [];
      let qs = "";
      if (this.form.VNDNR) where.push(`(VNDNR,like,~${this.form.VNDNR})`);
      if (this.form.STYLE) where.push(`(STYLE,like,~${this.form.STYLE})`);
      if (this.form.COLOR) where.push(`(COLOR,like,~${this.form.COLOR})`);
      if (this.form.CUPSZ) where.push(`(CUPSZ,like,~${this.form.CUPSZ})`);
      if (this.form.SIZEX) where.push(`(SIZEX,like,~${this.form.SIZEX})`);
      if (where.length) {
        let s = where.join("~and");
        qs += `&_where=(${s})`;
      }
      if (qs !== this.queryString) {
        this.queryString = qs;
        this.$root.$emit("bv::refresh::table", "my-table");
      }
    },
    myProvider: async function(ctx) {
      this.queryString = `?_p=${ctx.currentPage}&_size=${ctx.perPage}`;
      let where = [];
      if (this.form.VNDNR) where.push(`(VNDNR,like,${this.form.VNDNR}~)`);
      if (this.form.STYLE) where.push(`(STYLE,like,${this.form.STYLE}~)`);
      if (this.form.COLOR) where.push(`(COLOR,like,${this.form.COLOR}~)`);
      if (this.form.CUPSZ) where.push(`(CUPSZ,like,${this.form.CUPSZ}~)`);
      if (this.form.SIZEX) where.push(`(SIZEX,like,${this.form.SIZEX}~)`);
      if (where.length) {
        let s = where.join("~and");
        this.queryString += `&_where=(${s})`;
      }
      this.rows = await (this.rows = axios
        .get(`${apiUrl}/plumas/count/${this.queryString}`)
        .then(res => res.data[0].no_of_rows));

      let promise = axios.get(`${apiUrl}/plumas/${this.queryString}`);
      return promise
        .then(res => res.data)
        .then(data => {
          let items = data;
          return items || [];
        });
    },
    getRows: async function() {
      const results = await axios
        .get(`${apiUrl}/plumas/count`)
        .then(res => res.data[0].no_of_rows);
      this.rows = results;
    }
  },
  mounted() {
    // this.getProducts();
  }
};
</script>
