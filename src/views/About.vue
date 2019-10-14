<template>
  <div class="about">
    <h1>{{title}}</h1>
  </div>
</template>
<script>
import _ from 'lodash'
export default {
  data () {
    return {
      title: '我是标题',
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
    }
  }
}
</script>
<style lang="stylus" scoped></style>
