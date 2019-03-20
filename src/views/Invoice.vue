<template>
  <b-container fluid>
    <h1>Facturation</h1>
    <b-form v-loading>
      <b-form-row>
        <b-col sm="2">
          <b-form-group id="itemQuantityGroup" label="Type de transaction" label-for="type-types">
            <b-form-select required id="type-types" v-model="type" :options="types"/>
          </b-form-group>
        </b-col>
        <b-col sm="3">
          <b-form-group id="itemQuantityGroup" label="Vendeur" label-for="type-seller">
            <b-form-select required id="type-seller" v-model="seller" :options="sellers"/>
          </b-form-group>
        </b-col>
        <b-col sm="2">
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

      <b-form-row>
        <b-col sm="6">
          <b-form-group label>
            <b-form-radio-group v-model="salutation" :options="salutations" name="radioInline"/>
          </b-form-group>
          <b-row class="my-1" v-for="field in form.customer" :key="field.name">
            <b-col sm="3" class="text-sm-center text-md-right">
              <label :for="`type-${field.name}`">
                {{ field.label }}
                <span v-if="field.required">*</span>
              </label>
            </b-col>
            <b-col sm="9">
              <b-form-input
                :v-model="`form.customer.${field.name}`"
                :id="`type-${field.name}`"
                :type="field.type"
                :aria-invalid="field.required"
                :placeholder="field.placeholder"
                :maxlength="field.maxlength || 255"
                :required="field.required"
                :pattern="field.pattern"
              />
            </b-col>
          </b-row>
        </b-col>
      </b-form-row>
      <b-form-row>
        <b-row>
          <b-col sm="12">
            <b-button type="submit">Submit</b-button>
          </b-col>
        </b-row>
      </b-form-row>
    </b-form>
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
      salutation: null,
      salutations: [
        { value: 1, text: "M." },
        { value: 2, text: "Mme.", checked: "checked" },
        { value: 3, text: "Compagnie" }
      ],
      formDisabled: true,
      type: null,
      types: [
        { value: null, text: "Choisir transaction", disabled: true },
        { value: 1, text: "Comptant" },
        { value: 2, text: "Porté au compte" },
        { value: 3, text: "Mise de côté" }
      ],
      seller: null,
      sellers: [
        { value: null, text: "Choisir vendeur", disabled: true },
        { value: 98, text: "Divers" },
        { value: 2, text: "Josée" },
        { value: 3, text: "Cindy" }
      ],
      form: {
        type: null,
        types: {
          options: [
            { value: null, text: "Choisissez une option" },
            { value: 1, text: "Comptant" },
            { value: 2, text: "Porté au compte" },
            { value: 3, text: "Mise de côté" }
          ]
        },
        salesman: 0,
        customer: [
          {
            name: "name",
            type: "text",
            label: "Nom",
            placeholder: "Entrez le nom"
          },
          {
            name: "phone",
            type: "tel",
            label: "Téléphone",
            placeholder: "Entrez le téléphone",
            maxlength: 10
          },
          {
            name: "email",
            type: "email",
            label: "Courriel",
            placeholder: "Entrez le courriel"
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
            pattern: "[A-Za-z][0-9][A-Za-z][0-9][A-Za-z][0-9]"
          }
        ]
      },
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
  validation: {
    customer: {
      name: { required: true, minLength: 4 },
      phone: { required: true, minLength: 4 },
      email: { required: true, minLength: 4 },
      address1: { required: true, minLength: 4 },
      address2: { required: true, minLength: 4 },
      address3: { required: true, minLength: 4 },
      postalCode: { required: true, minLength: 4 }
    }
  }
};
</script>
