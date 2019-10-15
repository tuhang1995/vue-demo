<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h4>该项目是前端开发模板。文件可根据项目的要求或个人习惯进行增加</h4>
    <ul>
      <li>1. common文件夹下封装了axios方法， 如果你有更好的封装方法，可用自己的</li>
      <li>2. api文件是接口文件，统一管理</li>
      <li>3. asstes 静态资源</li>
      <li>4. components 全局公用组件</li>
      <li>5. filters 过滤器</li>
      <li>6. lib 外部引用的插件存放及修改文件</li>
      <li>7. common 通用的一些文件 包括 css、js</li>
      <li>8. views 视图目录</li>

    </ul>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
h3
  margin 40px 0 0
ul
  list-style-type none
  padding 0
  display flex
  flex-direction column
  align-items center
  width 32vw
  margin 0 auto
li
  display flex
  align-items left
  width 100%
  margin 10px
a
  color #42b983
</style>
