<template>
  <!-- tion(done)，done 用于关闭 Dialog	—	—
center	是否对头部和底部采用居中布局	boolean	—	false
¶ Slot
name	说明
—	Dialog 的内容
title	Dialog 标题区的内容
footer	Dialog 按钮操作区的内容
¶ Events
事件名称	说明	回调参数
open	Dialog 打开的回调	—
close	Dialog 关闭的回调	—
closed	Dialog 关闭动画结束时的回调	—
:height="height"
  -->
  <el-dialog :modal="true"
             :modal-append-to-body="true"
             :title="title"
             :visible.sync="isShow"
             :width="width"
             :close-on-click-modal="false"
             :show-close="true"
             :before-close='beforeClose'
             :close-on-press-escape="true"
             :custom-class='dialog'
             center>
    <slot></slot>

    <!-- <slot name="footer"></slot> -->
    <!--<div class="divauto">
  <el-button type="success" size="mini" @click="showDio" round>Table</el-button>
  <el-button type="success" size="mini" @click="showDio" round>Table</el-button>
</div>-->

  </el-dialog>

</template>
<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: '标题'
    },
    width: {
      type: String,
      default: "25%"
    },
    height: {
      type: String,
      default: "1000px"
    },
    dialog: {
      type: String,
      default: 'dClass'
    }
  },
  data () {
    return {
    }
  },
  methods: {
    beforeClose () {
      this.$emit('closeDialog', false)
    }
  },
  components: {
  }

}
</script>
<style scoped>
.divauto {
  margin: 10px auto 0 auto;
}
</style>