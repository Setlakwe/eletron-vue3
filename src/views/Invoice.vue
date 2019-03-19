<template>
  <b-container fluid>
    <b-form>
      <b-col>
        <b-form-group id="nameGroup" label="Nom:" label-for="name" class="form-group row col-2">
          <b-form-input id="name" type="text" required placeholder="Entrez le nom"/>
        </b-form-group>
        <b-form-group id="phoneGroup" label="Télphone:" label-for="phone" class="form-group row">
          <b-form-input id="phone" type="phone" required placeholder="Entrez # de téléphone"/>
        </b-form-group>
        <b-form-group id="emailGroup" label="Courriel:" label-for="email" class="form-group row">
          <b-form-input id="email" type="email" required placeholder="Votre Courriel"/>
        </b-form-group>
        <b-form-group
          id="address1Group"
          label="Adresse:"
          label-for="address1"
          class="form-group row"
        >
          <b-form-input id="address1" type="text" required placeholder="Entrez l'adresse"/>
          <b-form-input id="address2" type="text" required placeholder/>
          <b-form-input id="address3" type="text" required placeholder="Entrez la ville"/>
        </b-form-group>
      </b-col>
    </b-form>
    <b-col>AA</b-col>
  </b-container>
</template>
