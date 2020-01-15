<template>
  <div class="register">
    <el-form
      :model="ruleForm"
      ref="ruleForm"
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="姓名" prop="userName">
        <el-input v-model="ruleForm.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item label="请选择身份" prop="identity">
        <el-select v-model="ruleForm.identity" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >立即创建</el-button
        >
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
  data() {
    return {
      ruleForm: {
        userName: '',
        password: '',
        email: '',
        identity: 'normal'
      },
      options: [
        { value: 'admin', label: '管理员' },
        { value: 'normal', label: '普通用户' }
      ],
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
        identity: [
          { required: true, message: '请选择用户身份', trigger: 'change' }
        ]
      }
    }
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = {
            userName: this.ruleForm.userName,
            password: this.ruleForm.password,
            email: this.ruleForm.email,
            identity: this.ruleForm.identity
          }
          api.register(params).then(res => {
            console.log(res)
            this.$message({
              showClose: true,
              message: res.msg,
              type: 'success'
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },

  watch: {}
}
</script>
<style lang="stylus" scoped>
.register
  padding 20px
  width 40vw
>>>.el-select
  width 100%
</style>
