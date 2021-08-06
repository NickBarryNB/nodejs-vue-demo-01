<template>
  <div>
    <el-row style="height: 840px;">
      <search-bar @onSearch="searchResult" ref="searchBar"></search-bar>
<!--      v-for 指令，之后可以使用动态渲染，这里我们用《三体》的内容作为一个默认值，先查看效果-->
<!--      el-tooltip Element 提供的组件，用于展示鼠标悬停时的提示信息-->
      <el-tooltip effect="dark" placement="right"
                  v-for="item in books.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                  :key="item.id">
<!--        slot 插槽，及把标签中的内容插到父组件指定的地方，这里我们插入了 el-tooltip 的 content 中-->
        <p slot="content" style="font-size: 14px;margin-bottom: 6px;">{{item.title}}</p>
        <p slot="content" style="font-size: 13px;margin-bottom: 6px">
          <span>{{item.author}}</span> /
          <span>{{item.date}}</span> /
          <span>{{item.press}}</span>
        </p>
        <p slot="content" style="width: 300px" class="abstract">{{item.abs}}</p>
        <el-card style="width: 135px;margin-bottom: 20px;height: 233px;float: left;margin-right: 15px" class="book"
                 bodyStyle="padding:10px" shadow="hover">
<!--          添加了一个点击事件，并传递了书籍的参数-->
          <div class="cover" @click="editBook(item)">
<!--封面图像标签中，我们使用了 :src="item.cover" 这种写法，: 其实是 v-bind: 的缩写，用于绑定把标签的属性与 data 中的值绑定起来-->
            <img :src="item.cover" alt="封面">
          </div>
          <div class="info">
            <div class="title">
              <a href="">{{item.title}}</a>
            </div>
<!--            一个图标元素的点击事件-->
            <i class="el-icon-delete" @click="deleteBook(item.id)"></i>
          </div>
          <div class="author">{{item.author}}</div>
        </el-card>
      </el-tooltip>
      <edit-form @onSubmit="loadBooks()" ref="edit"></edit-form>
    </el-row>
    <el-row>
<!--      分页使用 el-pagination 组件，目前只是样式-->
      <el-pagination
        @current-change="handleCurrentChangee"
        :current-page="currentPage"
        :page-size="pagesize"
        :total="books.length">
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
import EditForm from './EditForm'
import SearchBar from './SearchBar'
export default {
  name: 'Books',
  components: {EditForm, SearchBar},
  data () {
    return {
      books: [],
      currentPage: 1,
      pagesize: 17
    }
  },
  // Vue 的 钩子函数
  // mounted 即 “已挂载”
  // 所谓挂载，就是我们写的 Vue 代码被转换为 HTML 并替换相应的 DOM 这个过程，这个过程完事儿的时候，就会执行 mounted 里面的代码
  mounted: function () {
    this.loadBooks()
  },
  methods: {
    // 利用 axios 发送了一个 get 请求，在接受到后端返回的成功代码后把 data 里的数据替换为后端返回的数据。
    // 利用 data 和 template 里相应元素的双向绑定，实现页面的动态渲染
    loadBooks () {
      var _this = this
      this.$axios.get('/books').then(resp => {
        if (resp && resp.status === 200) {
          _this.books = resp.data
        }
      })
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
      console.log(this.currentPage)
    },
    searchResult () {
      var _this = this
      this.$axios
        .get('/search?keywords=' + this.$refs.searchBar.keywords, {
        }).then(resp => {
          if (resp && resp.status === 200) {
            _this.books = resp.data
          }
        })
    },
    // 删除书籍
    // 这里需要注意的一个是确认对话框的使用，一个是 post 请求的构造方式，
    // post 不能像 get 请求那样直接把参数写在 url 里，而需要以键值对的方式传递
    deleteBook (id) {
      this.$confirm('此操作将永久删除该书籍，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios
          .post('/delete', {id: id}).then(resp => {
            if (resp && resp.status === 200) {
              this.loadBooks()
            }
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
      // alert(id)
    },
    // 这个方法即负责弹出修改表单并渲染数据
    editBook (item) {
      this.$refs.edit.dialogFormVisible = true
      this.$refs.edit.form = {
        id: item.id,
        cover: item.cover,
        title: item.title,
        author: item.author,
        date: item.date,
        press: item.press,
        abs: item.abs,
        category: {
          id: item.category.id.toString(),
          name: item.category.name
        }
      }
    }
  }
}
</script>

<style scoped>
.cover {
  width: 115px;
  height: 172px;
  margin-bottom: 7px;
  overflow: hidden;
  cursor: pointer;
}

img {
  width: 115px;
  height: 172px;
  /*margin: 0 auto;*/
}

.title {
  font-size: 14px;
  text-align: left;
}

.author {
  color: #333;
  width: 102px;
  font-size: 13px;
  margin-bottom: 6px;
  text-align: left;
}

.abstract {
  display: block;
  line-height: 17px;
}

.el-icon-delete {
  cursor: pointer;
  float: right;
}

.switch {
  display: flex;
  position: absolute;
  left: 780px;
  top: 25px;
}

a {
  text-decoration: none;
}

a:link, a:visited, a:focus {
  color: #3377aa;
}
</style>
