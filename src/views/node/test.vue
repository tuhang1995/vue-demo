<template>
  <div class="test">
    <h3>面向对象复习</h3>
    <div class="test-con">
      <div class="item"
           v-for="(item, index) in data"
           :key="index">
        <el-tooltip class="item"
                    effect="dark"
                    :content="item.answer"
                    placement="top-start">
          <h4>{{ index + 1 + '.  ' + item.name }}</h4>
        </el-tooltip>
        <ul class="list clearfix"
            v-if="item.typeName == 'chose'">
          <li>
            <el-radio v-model="formArr[index].one"
                      label="1">
              <span>A:{{ item.A }}</span>
            </el-radio>

          </li>
          <li>
            <el-radio v-model="formArr[index].one"
                      label="2">
              <span>B:{{ item.B }}</span>
            </el-radio>
          </li>
          <li>
            <el-radio v-model="formArr[index].one"
                      label="3">
              <span>C:{{ item.C }}</span>
            </el-radio>

          </li>
          <li>
            <el-radio v-model="formArr[index].one"
                      label="4">
              <span><span>D:{{ item.D }}</span></span>
            </el-radio>

          </li>
        </ul>
        <div class="words"
             v-if="item.typeName == 'words'">
          <el-form ref="form"
                   label-width="80px">
            <el-col :span="6">
              <el-form-item label="答案1">
                <el-input v-model="formArr[index].one"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="答案2">
                <el-input v-model="formArr[index].two"></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </div>
        <div class="question words"
             v-if="item.typeName == 'question'">
          <el-form ref="form"
                   label-width="80px">
            <el-col :span="12">
              <el-form-item label="答案:">
                <el-input type="textarea"
                          v-model="formArr[index].one"></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </div>
      </div>
    </div>
    <div class="page">
      <el-pagination background
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page.sync="page.currentPage"
                     :page-size="page.pageSize"
                     layout="total, prev, pager, next"
                     :total="page.pageTotal">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import api from '@/api/test'
export default {
  name: 'test',
  props: [''],

  data () {
    return {
      page: {
        currentPage: 1,
        pageSize: 150,
        pageTotal: 0
      },
      data: [],
      formArr: []
    }
  },

  components: {},

  computed: {},

  beforeMount () { },

  mounted () {
    this.init()
  },

  methods: {
    init () {
      let param = {
        pageSize: this.page.pageSize,
        currentPage: this.page.currentPage
      }
      api.testAll(param).then(res => {
        this.data = res.result.data
        this.page.pageTotal = res.result.count
        let obj = {}
        for (let i = 0; i < this.data.length; i++) {
          obj.one = ''
          obj.two = ''
          this.formArr.push(obj)
          obj = {}
        }
      })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.page.currentPage = val
      this.formArr = []
      this.init()
    }
  },

  watch: {}
}
</script>
<style lang="stylus" scoped>
$listColor = #B03552
.test
  display flex
  padding 10px 20px
  width 100%
  height 100%
  box-sizing border-box
  flex-direction column
  h3
    font-size 22px
  .test-con
    flex 1
    overflow auto
    .item
      display flex
      flex-direction column
      text-align left
      font-size 18px
    .list
      width 100%
      li
        padding 10px 20px
        float left
        text-align left
        span
          color $listColor
          padding-right 10px
      >>>.el-radio__label
        font-size 18px
    .words
      margin-top 15px
      >>>.el-form-item__label
        font-size 18px
        color $listColor
      >>>.el-input__inner
        font-size 18px
  .page
    display flex
    justify-content flex-end
    padding-right 20px
</style>
