<template>
  <div class="tabs">
    <!--  v-if="editableTabs.length!=0" <el-tabs v-model="editableTabsValue"
             type="border-card"
             @edit="removeTab"
             closable
             style="height: 100%;">
      <el-tab-pane :key="item.name"
                   v-for="(item) in editableTabs"
                   :label="item.title"
                   :name="item.name">
        <tab-component :is=item.content></tab-component>
      </el-tab-pane>
    </el-tabs> -->
    <div id="container">
      <div class="item item-1">
        <span>我是1</span>
      </div>
      <div class="item item-2">2</div>
      <div class="item item-3">3</div>
      <div class="item item-4">4</div>
      <div class="item item-5">5</div>
      <div class="item item-6">6</div>
      <div class="item item-7">7</div>
      <div class="item item-8">8</div>
    </div>
    <el-button @click.native="initAlert">点我</el-button>
  </div>
</template>

<script>
import tableTab from '@/components/tabsOne'
import tabsTwo from '@/components/tabsTwo'
import { tabsMixin } from '@/common/js/mixins'
export default {
  mixins: [tabsMixin],
  name: '',
  props: [''],
  data() {
    return {
      editableTabsValue: this.$global.editableTabsValue,
      editableTabs: this.$global.editableTabs
    }
  },

  components: {
    tableTab,
    tabsTwo
  },

  computed: {},

  beforeMount() {},

  mounted() {
    console.log(this.editableTabs)
    // document.onreadystatechange = this.subSomething;//当页面加载状态改变的时候执行这个方法.
  },

  methods: {
    subSomething() {
      if (document.readyState == 'complete')
        //当页面加载状态
        alert('web加载完毕')
    },
    removeTab(targetName) {
      let tabs = this.editableTabs
      let activeName = this.editableTabsValue
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
            }
          }
        })
      }

      this.editableTabsValue = activeName
      this.editableTabs = tabs.filter(tab => tab.name !== targetName)
    }
  },

  watch: {}
}
</script>
<style lang="stylus" scoped>
// grid-template-columns属性定义每一列的列宽，grid-template-rows属性定义每一行的行高。
// repeat 代表重复几次 接受两个参数，第一个参数是重复的次数（上例是3），第二个参数是所要重复的值。
#container
  display grid
  // 列 宽  grid-template-columns repeat(2, 100px 80px 50px) 第一列包含了3列 分别为100,80,50 repeat 2 代表重复一次
  grid-template-columns repeat(3, calc(33.33% - 20px)) // 列宽
  // 行 高 grid-template-rows 100px 200px 300px  代表了第一行的高度 第二行和第三行
  grid-template-rows repeat(3, 25%)
  height 400px
  grid-gap 20px 20px // 间距
  grid-auto-flow row dense // 表示"先列后行"，并且尽量填满空格。
  place-items center // 单元格内容位置 start/center/end/stretch(拉伸，占满单元格的整个宽度)
  // grid-template-areas 'header header header' 'main main sidebar' 'footer footer footer'
.item
  font-size 2em
  border 1px solid #e5e4e9
  width 100%
  height 100%
.item-1
  background-color #4dc7ec
  grid-column 1 / span 2 // 合并几个格子 开始 1-3 合并2个 grid-column 是 grid-column-start/grid-column-end的缩写 grid-row 原理一样
  grid-row 1 / span 2
.item-2
  background-color #f68f26
  // grid-column-start 1 // 合并几个格子 开始 1-3 合并2个
  // grid-column-end 3 // 结束
.item-3
  background-color #4ba946
  // span 代表左边框距离右边框横跨几个格子
  // grid-column 1 / span 2
.item-4
  background-color #0376c2
  grid-column 3
  grid-row 2 / span 2
  // grid-area footer
.item-5
  background-color #c077af
.item-6
  background-color #f8d29d
.item-7
  background-color #b5a87f
.item-8
  background-color #d0e4a9
</style>
