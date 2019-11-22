<template>
  <div class="main-warp">
    <div class="child-warp jsonServe">
      <div class="table-head">

        <el-row :gutter="20">
          <el-col :span="6">
            <el-input v-model="searchText"
                      clearable
                      placeholder="请输入内容进行搜索"></el-input>

          </el-col>
          <el-col :span="12">
            <el-button type="primary"
                       icon="el-icon-search"
                       @click.native='search'>搜索</el-button>
            <el-button type="success"
                       icon="el-icon-plus"
                       @click.native='showModel'>添加</el-button>
            <el-button type="warning"
                       icon="el-icon-edit"
                       @click.native='editTable'>修改</el-button>
            <el-button type="danger"
                       icon="el-icon-delete"
                       @click.native='showModel'>删除</el-button>

          </el-col>
        </el-row>
      </div>
      <div class="table-con"
           v-loading="loading"
           element-loading-text="拼命加载中"
           element-loading-spinner="el-icon-loading"
           element-loading-background="rgba(255, 255, 255, 0.8)">
        <el-table :data="tableData"
                  stripe
                  @selection-change="handleSelectionChange"
                  style="width: 100%">
          <el-table-column type="selection"
                           width="55">
          </el-table-column>
          <el-table-column prop="activityName"
                           label="活动名称"
                           width="180">
          </el-table-column>
          <el-table-column prop="activityArea"
                           label="活动区域"
                           width="180">
          </el-table-column>
          <el-table-column prop="time"
                           label="活动时间">
          </el-table-column>
          <el-table-column prop="activityPurpose"
                           label="活动目的">
          </el-table-column>

          <el-table-column prop="resources"
                           label="资源">
          </el-table-column>
          <el-table-column prop="content"
                           label="活动形式">
          </el-table-column>
        </el-table>
      </div>

    </div>
    <transition name="slide">
      <animation-demo @close='close'
                      @addTable='addTable'
                      :selectionTable='selectionTable'
                      v-if="modelVis"></animation-demo>
    </transition>
  </div>
</template>

<script>
import animationDemo from './animationDemo'
import api from '@/api/home'
export default {
  name: '',
  props: [''],
  data () {
    return {
      modelVis: false,
      tableData: [],
      searchText: "",
      loading: false,
      selectionTable: []
    };
  },

  components: {
    animationDemo
  },

  computed: {},

  beforeMount () { },

  mounted () {
    this.getTestData()
  },

  methods: {
    handleSelectionChange (selection) {
      console.log(selection)
      this.selectionTable = selection

    },
    search () {
      this.loading = true
      //模糊查询
      let param = {
        q: this.searchText
      }
      api.postTable(param).then((res) => {
        this.loading = false
        this.tableData = res
      })
    },
    //初始化表格数据
    getTestData () {
      api.postTable().then((res) => {
        this.loading = false
        this.tableData = res
      })
    },
    //添加表格数据
    addTable (obj) {
      console.log(obj)
      if (obj.type == '编辑') {

        //一定是编辑
        api.editTable(obj.param).then((res) => {
          // this.getTestData()
          // console.log(res)
          this.getTestData()
        })
      } else {


        obj.param.id = this.tableData.length + 1
        api.addTable(obj.param).then((res) => {
          this.getTestData()
        })
      }
    },
    editTable () {
      if (this.selectionTable.length == 0) {
        this.$message({
          type: "warning",
          message: "选中表格后在进行操作"
        })
        return
      }
      if (this.selectionTable.length > 1) {
        this.$message({
          type: "warning",
          message: "编辑只能选中一条"
        })
        return
      }
      this.modelVis = true
    },
    showModel () {


      this.modelVis = true
    },
    close () {
      this.modelVis = false
    }
  },

  watch: {}

}

</script>
<style lang='stylus' scoped>
.table-head
  display flex
  align-items flex-start
  /deep/.el-row
    width 100%
.jsonServe
  padding 40px
.slide-enter-active, .slide-leave-active
  transition all 0.3s
.slide-enter, .slide-leave-to
  transform translate3d(100%, 0, 0)
</style>