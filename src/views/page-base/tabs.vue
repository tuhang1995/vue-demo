<template>
  <div class="tabs">
    <el-button size="small"
               @click="addTab(editableTabsValue)">
      增加标签页
    </el-button>
    <el-tabs v-model="editableTabsValue"
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

    </el-tabs>
  </div>
</template>

<script>
import tableOne from '@/components/tabsOne'
import tableTwo from '@/components/tabsTwo'
export default {
  name: 'tabs',
  props: [''],
  data () {
    return {
      editableTabs: [{
        title: '对象',
        name: '1',
        content: 'tableOne'
      }],
      editableTabsValue: "1",
      tabIndex: 1
    };
  },

  components: {
    tableOne,
    tableTwo
  },

  computed: {},

  beforeMount () { },

  mounted () { },

  methods: {
    addTab (targetName) {
      let newTabName = ++this.tabIndex + '';
      this.editableTabs.push({
        title: 'New Tab',
        name: newTabName,
        content: 'tableTwo'
      });
      this.editableTabsValue = newTabName;
    },
    removeTab (targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }

      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
    }
  },

  watch: {}

}

</script>
<style lang='stylus' scoped>
.tabs
  padding 20px
</style>