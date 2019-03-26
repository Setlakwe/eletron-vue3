<template>
  <div>
    <b-table :fields="fields" :hover="true" :items="items">
      <template slot="actions" slot-scope="row">
        <b-button
          size="sm"
          @click="deleteRow(row.item, row.index, $event.target)"
          class="mr-1 danger"
        >X</b-button>
        <b-button
          size="sm"
          @click="infoModal(row.item, row.index, $event.target)"
          class="mr-1"
        >infoModal modal</b-button>
      </template>
    </b-table>
    <!-- Info modal -->
    <b-modal id="modalInfo" @hide="resetModal" :title="modalInfo.title" ok-only>
      <pre>{{ modalInfo.content }}</pre>
    </b-modal>
  </div>
</template>
<script>
export default {
  props: ["items", "fields"],
  data() {
    return {
      modalInfo: { title: "", content: "" }
    };
  },
  methods: {
    resetModal() {
      this.modalInfo.title = "";
      this.modalInfo.content = "";
    },
    infoModal(item, index, button) {
      // this.modalInfo.title = `Row index: ${index}`;
      console.log(item);
      let content = JSON.stringify(item, null, 2);
      this.modalInfo.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", "modalInfo", button);
    },
    deleteRow(item, index, button) {
      let idx = this.items.indexOf(item);
      if (idx !== -1) {
        this.items.splice(idx, 1);
      }
    }
  }
};
</script>
