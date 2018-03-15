<!--
    Created by linfengluo@gmail.com on 2018/3/14.
-->
<template>
  <div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'radioDiv'
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}
</style>
