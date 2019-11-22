<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/page">page</router-link> |
      <router-link to="/dialog">dialog</router-link> |
      <router-link to="/jinshan">实时视频</router-link> |
      <router-link to="/jinshanMap">金山地图2</router-link>

    </div> -->
    <router-view />
  </div>
</template>
<style lang="stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  width 100vw
  height 100vh
#nav
  padding 30px
  a
    font-weight bold
    color #2c3e50
    &.router-link-exact-active
      color #42b983
</style>
