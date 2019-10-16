<template>
  <div class="about">
    <h1>{{title}}</h1>
    <el-button @click="isShow=true">点击打开弹窗</el-button>
    <dia :title="title"
         :isShow="isShow"
         @closeDialog='closeDialog'>
      <el-form ref="form"
               :model="form"
               label-width="80px">
        <el-form-item label="活动名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="form.region"
                     placeholder="请选择活动区域">
            <el-option label="区域一"
                       value="shanghai"></el-option>
            <el-option label="区域二"
                       value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-col :span="11">
            <el-date-picker type="date"
                            placeholder="选择日期"
                            v-model="form.date1"
                            style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line"
                  :span="1">-</el-col>
          <el-col :span="11">
            <el-time-picker type="fixed-time"
                            placeholder="选择时间"
                            v-model="form.date2"
                            style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="即时配送">
          <el-switch v-model="form.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="活动性质">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="美食/餐厅线上活动"
                         name="type"></el-checkbox>
            <el-checkbox label="地推活动"
                         name="type"></el-checkbox>
            <el-checkbox label="线下主题活动"
                         name="type"></el-checkbox>
            <el-checkbox label="单纯品牌曝光"
                         name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="特殊资源">
          <el-radio-group v-model="form.resource">
            <el-radio label="线上品牌商赞助"></el-radio>
            <el-radio label="线下场地免费"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="活动形式">
          <el-input type="textarea"
                    v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="onSubmit">立即创建</el-button>
          <el-button @click="isShow=false">取消</el-button>
        </el-form-item>
      </el-form>
    </dia>
  </div>
</template>
<script>
import dia from "@/components/dialog-h.vue";
import _ from 'lodash'
export default {
  data () {
    return {
      title: '我是标题',
      isShow: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      arrlist: [
        { name: "张三", age: 17 },
        { name: "李四", age: 29 }
      ]
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      _.forEach(this.arrlist, (item, key) => {

        item.id = key

      })
      const arr = _.forEach();
      console.log(arr)
    },
    closeDialog (tag) {
      this.isShow = false
    },
    onSubmit () {
      console.log('submit!');
    }
  },
  components: {
    dia
  }
}
</script>
<style lang="stylus" scoped></style>
