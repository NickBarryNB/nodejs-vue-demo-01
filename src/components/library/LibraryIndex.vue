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
<!--      SideMenu 组件在 LibraryIndex 组件中作为一个 子组件 存在   用 ref 属性设置了一个引用名。-->
<!--      这样，我们就可以通过 _this.refs.sideMenu 来引用侧面导航栏的实例，并获取它的 data 了-->
<!--      @indexSelect="listByCategory"，这个东西为 listByCategory() 方法设置了触发事件
           为了触发这个事件，在子组件，也即 SideMenu 里有handleSelect方法-->
      <SideMenu @indexSelect="listByCategory" ref="sideMenu"></SideMenu>
    </el-aside>
<!--    主要区域容器-->
    <el-main>
      <books class="books-area" ref="booksArea"></books>
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
// import NavMenu from '../common/navMenu'

export default {
  name: 'AppLibrary',
  components: {SideMenu, Books},
  methods: {
    // 分类显示
    // 实现逻辑是，点击左侧导航栏，向后端发送一个带有参数的 get 请求，
    // 在接受到后端返回的成功代码后把 data 里的数据替换为后端返回的数据
    listByCategory () {
      var _this = this
      var cid = this.$refs.sideMenu.cid
      var url = 'categories/' + cid + '/books'
      this.$axios.get(url).then(resp => {
        if (resp && resp.status === 200) {
          _this.$refs.booksArea.books = resp.data
          _this.$refs.booksArea.currentPage = 1
        }
      })
    }
  }
}
</script>

<style scoped>
.books-area {
  width: 990px;
  margin-left: auto;
  margin-right: auto;
}
</style>
