<template>
  <div class="main-warp">
    <div class="child-warp jsonServe">
      <div class="table-head">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-input
              v-model="searchText"
              clearable
              @keyup.enter.native="searchData"
              placeholder="请输入内容进行搜索"
            ></el-input>
          </el-col>
          <el-col :span="12">
            <el-button
              type="primary"
              icon="el-icon-search"
              @click.native="searchData"
              >搜索</el-button
            >
            <el-button
              type="success"
              icon="el-icon-plus"
              @click.native="showModel"
              >添加</el-button
            >
            <el-button
              type="warning"
              icon="el-icon-edit"
              @click.native="editTable"
              >修改</el-button
            >
          </el-col>
        </el-row>
      </div>
      <div
        class="table-con"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 0.8)"
      >
        <el-table
          :data="tableData"
          stripe
          @selection-change="handleSelectionChange"
          style="width: 100%"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="activityName" label="活动名称">
          </el-table-column>
          <el-table-column prop="activityArea" label="活动区域">
          </el-table-column>
          <el-table-column prop="time" label="活动时间"> </el-table-column>
          <el-table-column prop="activityPurpose" label="活动目的">
          </el-table-column>

          <el-table-column prop="resources" label="资源"> </el-table-column>
          <el-table-column prop="content" label="活动形式"> </el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button
                size="small"
                type="danger"
                @click.native="deleteTable(scope.row)"
                >删除</el-button
              >
              <el-button
                type="warning"
                size="small"
                @click="editTable(scope.row)"
                >编辑</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <transition name="slide">
      <animation-demo
        @close="close"
        @addTable="addTable"
        :title="title"
        :selectionTable="selectionTable"
        v-if="modelVis"
      ></animation-demo>
    </transition>
  </div>
</template>

<script>
import animationDemo from './animationDemo'
import api from '@/api/map'
export default {
  name: '',
  props: [''],
  data() {
    return {
      modelVis: false,
      tableData: [],
      searchText: '',
      loading: false,
      selectionTable: [],
      title: '添加'
    }
  },

  components: {
    animationDemo
  },

  computed: {},

  beforeMount() {},

  mounted() {
    this.getTestData()
  },

  methods: {
    deleteTable() {
      if (this.selectionTable.length == 0) {
        this.$message({
          type: 'warning',
          message: '选中表格后在进行操作'
        })
        return
      }
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          api.deletTable(this.selectionTable[0]).then(res => {
            this.loading = true
            this.getTestData()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    handleSelectionChange(selection) {
      this.selectionTable = selection
    },
    searchData() {
      //this.loading = true
      //模糊查询
      /* //json-server请求 
      let param = {
        q: this.searchText
      }
      
      api.postTable(param).then((res) => {
        this.loading = false
        this.tableData = res
      })*/

      //node请求数据库
      let param = {
        val: this.searchText
      }
      api.searchData(param).then(res => {
        console.log(res)
      })
    },
    //初始化表格数据
    getTestData() {
      api.getData().then(res => {
        console.log(res)
        this.loading = false
        this.tableData = res.result.data
      })
    },
    //添加表格数据
    addTable(obj) {
      if (obj.type == '编辑') {
        //一定是编辑
        api.editTable(obj.param).then(res => {
          // this.getTestData()
          // console.log(res)
          //
        })
      } else {
        //使用json-server进行的添加
        /*obj.param.id = Math.floor(Math.random() * (100 - 1 + 1)) + 1
        api.addTable(obj.param).then((res) => {
          this.getTestData()
        })*/

        //使用node进行的添加 (对数据库进行操作)
        api.addUser(obj.param).then(res => {
          console.log(res)
          if (res.status == 0) {
            this.$message({
              type: 'success',
              message: res.msg
            })
            this.modelVis = false
            this.getTestData()
          } else {
            this.$message({
              type: 'warning',
              message: res.msg
            })
            this.modelVis = true
          }
        })
      }
    },
    editTable(item) {
      // if (this.selectionTable.length == 0) {
      //   this.$message({
      //     type: 'warning',
      //     message: '选中表格后在进行操作'
      //   })
      //   return
      // }
      console.log(item)
      this.selectionTable = item
      this.title = '编辑'
      this.modelVis = true
    },
    //添加
    showModel() {
      this.modelVis = true
      this.title = '添加'
    },
    close() {
      this.modelVis = false
    }
  },

  watch: {}
}
</script>
<style lang="stylus" scoped>
.table-head
  display flex
  align-items flex-start
  /deep/.el-row
    width 100%
.jsonServe
  margin 40px
.slide-enter-active, .slide-leave-active
  transition all 0.3s
.slide-enter, .slide-leave-to
  transform translate3d(100%, 0, 0)
.table-con
  width 95%
</style>
