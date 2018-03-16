<template>
  <div>
    <radioDiv class="test">
      demo
    </radioDiv>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
  @import "../scss/mixins/all";
  .test{
    @include aspect-ratio(750 / 2, 1, 1)
  }
</style>
