<template>
  <div>
<!--    子页面（组件）显示的地方-->
    <nav-menu></nav-menu>
    <router-view/>
<!--    <nav-menu></nav-menu>-->
  </div>
</template>

<script>
import navMenu from './common/navMenu'
export default {
  name: 'Home',
  components: {navMenu}
}
</script>

<style scoped>

</style>
