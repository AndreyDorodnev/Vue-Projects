<template>
  <div id="app">
    <CreditForm></CreditForm>
    <!-- Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a> -->
  </div>
</template>

<script>


export default {
  name: 'app',
  components: {
    CreditForm: () => import('./components/CardForm')
  }
}
</script>

<style lang="scss">
  @import './styles/core';
</style>
