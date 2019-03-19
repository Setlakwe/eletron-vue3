<template>
  <b-container fluid>
    <h1>Facturation</h1>
    <!-- <b-form> -->
    <b-form-row>
      <b-col sm="6">
        <b-row class="my-1" v-for="field in customer.fields" :key="field.name">
          <b-col sm="3" class="text-right">
            <label :for="`type-${field.name}`">
              {{ field.label }}
              <span v-if="field.required">*</span>
            </label>
          </b-col>
          <b-col sm="9">
            <b-form-input
              :id="`type-${field.name}`"
              :type="field.type"
              :aria-invalid="field.required"
              :placeholder="field.placeholder"
              :maxlength="field.maxlength || 255"
            />
          </b-col>
        </b-row>
      </b-col>
      <b-col sm="6">
        <b-row class="my-1" v-for="field in customer.fields" :key="field.name">
          <b-col sm="3" class="text-right">
            <label :for="`type-${field.name}`">
              {{ field.label }}
              <span v-if="field.required">*</span>
            </label>
          </b-col>
          <b-col sm="9">
            <form>
              <b-form-input
                :id="`type-${field.name}`"
                :type="field.type"
                :aria-invalid="field.required"
                :placeholder="field.placeholder"
                :maxlength="field.maxlength || 255"
                pattern="`${field.pattern}`"
              />
              <input type="submit" value=">>">
            </form>
          </b-col>
        </b-row>
      </b-col>
    </b-form-row>
    <!-- </b-form> -->
    <b-row class="my-1" v-for="type in types" :key="type">
      <b-col sm="3">
        <label :for="`type-${type}`">Type {{ type }}:</label>
      </b-col>
      <b-col sm="9">
        <b-form-input :id="`type-${type}`" :type="type"/>
      </b-col>
    </b-row>
  </b-container>
</template>
<style lang="scss" scoped>
form {
  padding: 10px;
}
</style>

<script>
export default {
  data() {
    return {
      customer: {
        fields: [
          {
            name: "name",
            type: "text",
            label: "Nom",
            placeholder: "Entrez le nom",
            required: true
          },
          {
            name: "phone",
            type: "text",
            label: "Téléphone",
            placeholder: "Entrez le téléphone",
            maxlength: 10
          },
          {
            name: "address1",
            type: "text",
            label: "Adresse",
            placeholder: "Entrez l'adresse"
          },
          {
            name: "address2",
            type: "text",
            label: "",
            placeholder: "App."
          },
          {
            name: "address3",
            type: "text",
            label: "Ville",
            placeholder: "Entrez la ville"
          },
          {
            name: "postalCode",
            type: "postalcode",
            label: "Code postal",
            placeholder: "Entrez le code postal",
            maxlength: 6,
            pattern: "[A-Za-z][0-9][A-Za-z] [0-9][A-Za-z][0-9]"
          }
        ]
      },
      types: [
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
  }
};
</script>
