<template>
  <b-input-group>
    <b-col sm="3" class="text-sm-center text-md-right">
      <label :for="`type-${name}`">
        {{ label }}
        <span v-if="required">*</span>
      </label>
    </b-col>
    <b-col sm="9" class>
      <b-form-input
        :id="`type-${name}`"
        :type="type"
        :aria-invalid="required"
        :placeholder="placeholder"
        :maxlength="maxlength || 255"
      />
    </b-col>
  </b-input-group>
</template>
<script>
export default {
  name: "form-field",
  props: ["name", "label", "type", "required", "placeholder", "maxlength"]
};
</script>