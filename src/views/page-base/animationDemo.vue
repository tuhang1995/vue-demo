<template>
  <div class="animationModel">
    <div class="form-head">
      <h3>{{ title }}</h3>
    </div>
    <el-divider></el-divider>
    <div class="form-con">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="活动名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="form.area" placeholder="请选择活动区域">
            <el-option
              v-for="item in areaOptions"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-col :span="24">
            <el-date-picker
              type="datetime"
              :picker-options="pickerOptions"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期"
              v-model="form.time"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
          <!-- <el-col class="line"
                  :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker placeholder="选择时间"
                            value-format="HH:mm:ss"
                            v-model="form.date2"
                            style="width: 100%;"></el-time-picker>
          </el-col> -->
        </el-form-item>
        <!-- <el-form-item label="即时配送">
          <el-switch v-model="form.delivery"></el-switch>
        </el-form-item> -->
        <!-- <el-form-item label="活动性质">
          <el-checkbox-group v-model="form.activityPurpose">
            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
            <el-checkbox label="地推活动" name="type"></el-checkbox>
            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item> -->
        <el-form-item label="特殊资源">
          <el-radio-group v-model="form.resources">
            <el-radio label="线上品牌商赞助"></el-radio>
            <el-radio label="线下场地免费"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="活动形式">
          <el-input type="textarea" v-model="form.content"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确定</el-button>
          <el-button @click.native="back">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import api from '@/api/home'
export default {
  name: '',
  props: {
    selectionTable: {
      default: () => [],
      type: Array,
    },
    title: {
      default: '',
      type: String,
    },
  },
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            },
          },
          {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            },
          },
          {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            },
          },
        ],
      },
      form: {
        name: '',
        area: '',
        time: '',
        purpose: [],
        resources: '',
        content: '',
      },
      areaOptions: [
        {
          key: 'shanghai',
          value: '上海',
        },
        {
          key: 'beijing',
          value: '北京',
        },
        {
          key: 'wuhan',
          value: '武汉',
        },
        {
          key: 'chengdu',
          value: '成都',
        },
        {
          key: 'suzhou',
          value: '苏州',
        },
        {
          key: 'hangzhou',
          value: '杭州',
        },
        {
          key: 'nanjing',
          value: '南京',
        },
      ],
    }
  },

  components: {},

  computed: {},

  beforeMount() {},
  created() {
    if (Object.keys(this.selectionTable).length != 0) {
      this.form.name = this.selectionTable.name
      this.form.area = this.selectionTable.area
      this.form.time = this.selectionTable.time
      this.form.purpose.push(this.selectionTable.purpose)
      this.form.resources = this.selectionTable.resources
      this.form.content = this.selectionTable.content
    }
  },
  mounted() {},

  methods: {
    back() {
      this.$emit('close', false)
    },
    onSubmit() {
      //首先关闭当前增加页面
      // this.$emit('close', false)
      let type = '',
        id = ''
      //说明是编辑
      if (Object.keys(this.selectionTable).length != 0) {
        type = '编辑'
        id = this.selectionTable[0].id
      } else {
        type = '新增'
        id = ''
      }
      let obj = {
        type: type,
        param: {
          name: this.form.name,
          area: this.form.area,
          time: this.form.time,
          purpose: this.form.purpose[0],
          resources: this.form.resources,
          content: this.form.content,
          id: id,
        },
      }
      this.$emit('addTable', obj)
    },
  },

  watch: {},
}
</script>
<style lang="stylus" scoped>
.form-head
  font-size 22px
  text-align left
  padding-left 40px
  padding-top 20px
.form-con
  width 460px
  padding 40px
  /deep/.el-select .el-input
    width 380px
  >>>.el-form-item__content
    text-align left
  >>>.el-col-2
    text-align center
</style>
