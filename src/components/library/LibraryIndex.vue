<template>
<!--  外层容器-->
  <el-container>
<!--    顶栏容器-->
<!--    <el-header>-->
<!--    This is the header!-->
<!--    </el-header>-->
<!--    侧边栏容器-->
    <el-aside style="width: 200px;margin-top: 20px">
      <switch></switch>
      <SideMenu></SideMenu>
    </el-aside>
<!--    主要区域容器-->
    <el-main>
      <books class="books-area"></books>
    </el-main>
<!--    底栏容器-->
<!--    <el-footer>-->
<!--      This is the footer!-->
<!--    </el-footer>-->
  </el-container>
</template>

<script>
import Books from './Books'
import SideMenu from './SideMenu'
import NavMenu from '../common/navMenu'
export default {
  name: 'AppLibrary',
  components: {NavMenu, SideMenu, Books}
}
</script>

<style scoped>
.books-area {
  width: 990px;
  margin-left: auto;
  margin-right: auto;
}
</style>
