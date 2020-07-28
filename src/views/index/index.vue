<template>
  <div class="main">
    <div></div>
    <char2></char2>
    <div class="item-3">
      <h4 class="title">用户需求统计</h4>
      <char3></char3>
    </div>
    <div></div>
  </div>
</template>

<script>
import char2 from './components/char2.vue'
import char3 from './components/char3.vue'
export default {
  data() {
    return {}
  },
  mounted() {},
  methods: {},
  components: {
    char2,
    char3,
  },
}
</script>

<style lang="stylus" scoped>
.main
  width 100%
  height 100%
  background #F3F3F3
  display grid
  grid-template-columns repeat(2, calc(50% - 20px)) // 列宽
  // 行 高 grid-template-rows 100px 200px 300px  代表了第一行的高度 第二行和第三行
  grid-template-rows repeat(2, calc(50% - 20px))
  justify-content: center;
  align-content center
  grid-gap 20px 20px // 间距
  grid-auto-flow row dense // 表示"先列后行"，并且尽量填满空格。
  >div
    background #fff
    padding 5px
.title
  height 20px;
  border-left 5px solid #13A193
  display flex
  padding-left 10px
</style>
