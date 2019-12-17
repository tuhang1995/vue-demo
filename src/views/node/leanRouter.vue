<template>
  <div class="register">
    <el-form :model="ruleForm"
             ref="ruleForm"
             label-width="100px"
             class="demo-ruleForm">
      <el-form-item label="姓名"
                    prop="name">
        <el-input v-model="ruleForm.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码"
                    prop="name">
        <el-input v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item label="邮箱"
                    prop="name">
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="submitForm()">立即创建</el-button>
        <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import api from '@/api/map.js'
export default {
  name: '',
  props: [''],
  data () {
    return {
      ruleForm: {
        userName: "",
        password: "",
        email: ""
      }
    };
  },

  components: {},

  computed: {},

  beforeMount () { },

  mounted () { },

  methods: {
    submitForm () {
      let params = {
        userName: this.ruleForm.userName,
        password: this.ruleForm.password,
        email: this.ruleForm.email,
      }
      api.register(params).then((res) => {
        console.log(res)
      })
    },
  },

  watch: {}

}

</script>
<style lang='stylus' scoped>
.register
  padding 20px
  width 40vw
</style>