<template>
  <header class="header">
    <div class="head-bar">
      <div>
        <span @click="showTabs"> <i class="el-icon-s-fold"></i></span>
        <el-input v-model="model" size="mini" placeholder="请输入搜索内容">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>
      <div @click="exit">
        <span>退出</span>
        <i class="el-icon-switch-button"></i>
      </div>
    </div>
    <div class="Breadcrumb">
      <el-page-header @back="goBack" :content="title"> </el-page-header>
    </div>
  </header>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: '',
  props: [''],
  data() {
    return {
      admin: '123',
      circleUrl: require('@/assets/avatar.jpg'),
      model: '',
      title: '首页',
    }
  },

  components: {},

  computed: {
    tabsItem() {
      return this.$global.tabsItem
    },
    userData() {
      return this.$global.userData
    },
  },

  beforeMount() {},

  mounted() {},

  methods: {
    //标签页隐藏
    showTabs() {
      this.$global.isCollapse = !this.$global.isCollapse
    },
    ...mapMutations(['deleToken']),
    goBack() {
      let item = {
        name: '首页',
      }
      this.$global.tabsItem = item
      this.$router.push('/home')
    },
    exit() {
      this.$confirm('确定退出系统吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.deleToken()
          sessionStorage.setItem('userName', '')
          this.$router.push('/login')
        })
        .catch(() => {})
    },
  },
  watch: {
    tabsItem(newVal) {
      this.title = newVal.name
    },
  },
}
</script>
<style lang="stylus" scoped>
.header
  height 16vh
  text-align left
  display flex
  background-color #F3F3F3
  align-items center
  color #666
  flex-direction column
  >div
    width calc(100% - 30px)
    padding 0 15px
  .Breadcrumb
    height 7vh
    background #fff
    display flex
    flex-direction colum
    align-items center
  .head-bar
    display flex;
    height 7vh
    justify-content: space-between;
    div
      display flex
      cursor pointer
      align-items center
      width 15vw
      span
        margin-right 10px
       h3
        font-size 20px
</style>
