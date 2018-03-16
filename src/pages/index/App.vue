<template>
  <div id="app">
    <header>
      <radioDiv class="banner">
        <div class="placeholder placeholder--yellow"></div>
      </radioDiv>
    </header>
    <div class="goods">
      <radioDiv class="goods__item--11 ">
        <div class="placeholder placeholder--blue"></div>
      </radioDiv>
      <radioDiv class="goods__item--11 ">
        <div class="placeholder placeholder--green"></div>
      </radioDiv>
      <radioDiv class="goods__item--11 ">
        <div class="placeholder placeholder--purple"></div>
      </radioDiv>
      <radioDiv class="goods__item--11 ">
        <div class="placeholder placeholder--red"></div>
      </radioDiv>
    </div>
    <div class="goods">
      <radioDiv class="goods__item--21 ">
        <div class="placeholder placeholder--yellow"></div>
      </radioDiv>
      <radioDiv class="goods__item--22 ">
        <div class="placeholder placeholder--green"></div>
      </radioDiv>

    </div>
    <div class="goods">
      <radioDiv class="goods__item--31 ">
        <div class="placeholder placeholder--purple"></div>
      </radioDiv>
      <radioDiv class="goods__item--31 ">
        <div class="placeholder placeholder--yellow"></div>
      </radioDiv>
      <radioDiv class="goods__item--31 ">
        <div class="placeholder placeholder--red"></div>
      </radioDiv>
    </div>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld'
export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "../../scss/main";
  $space: 6px;
  .banner{
    @include aspect-ratio(750, 1280, 800)
  }

  .goods{
    display: flex;
    flex-wrap: wrap;
    padding: $space;

    &__item{
      &--11{
        margin: $space;
        @include aspect-ratio((750 - 36) / 2 , 1, 1)
      }

      &--22{
        margin: $space;
        @include aspect-ratio((750 - 36) / 3 * 2, 2, 1)
      }

      &--21{
        margin: $space;
        @include aspect-ratio((750 - 36) / 3 * 1, 1, 1)
      }
      &--31{
        margin: $space;
        @include aspect-ratio((750 - 48) / 3, 1, 1)
      }
    }
  }

  .placeholder{
    width: 100%;
    height: 100%;

    &--yellow{
      background-color: yellow;
    }

    &--blue{
      background-color: blue;
    }

    &--red{
      background-color: red;
    }

    &--green{
      background-color: green;
    }

    &--purple{
      background-color: purple;
    }
  }

</style>
