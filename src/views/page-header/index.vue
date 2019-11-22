<template>
  <div>
    <h3>这是一个下拉树的组件使用</h3>
    <el-button size="small"
               @click="initChecked"
               style="margin: 10px;">点击初始化</el-button>
    <tree-select :data="data"
                 :defaultProps="defaultProps"
                 multiple
                 :nodeKey="nodeKey"
                 :checkedKeys="defaultCheckedKeys"
                 @popoverHide="popoverHide"></tree-select>
    <div class="search-web">
      <el-input @keyup.enter.native='search'
                v-model='searchText'
                clearable
                size="mini"
                @clear='clearWord'
                placeholder="请输入搜索的名称">

      </el-input>
      <div class="c-table">
        <el-table :data="tableData"
                  stripe
                  style="width: 100%">
          <el-table-column prop="age"
                           label="年龄"
                           width="180">
          </el-table-column>
          <el-table-column prop="name"
                           label="姓名"
                           width="180">
          </el-table-column>
          <el-table-column prop="food"
                           label="食物">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
 
<script>
import TreeSelect from '@/components/tree-select.vue';
var menus = [
  {
    'menuId': 1,
    'menuName': '系统管理',
    'childrenList': [
      {
        'menuId': 100,
        'menuName': '用户管理',
        'childrenList': [
          {
            'menuId': 1000,
            'menuName': '用户查询'
          },
          {
            'menuId': 1001,
            'menuName': '用户新增'
          },
          {
            'menuId': 1002,
            'menuName': '用户修改'
          },
          {
            'menuId': 1003,
            'menuName': '用户删除'
          }
        ]
      },
      {
        'menuId': 101,
        'menuName': '角色管理',
        'childrenList': [
          {
            'menuId': 1006,
            'menuName': '角色查询'
          },
          {
            'menuId': 1007,
            'menuName': '角色新增'
          },
          {
            'menuId': 1008,
            'menuName': '角色修改'
          },
          {
            'menuId': 1011,
            'menuName': '删除角色'
          }
        ]
      }
    ]
  }
];
export default {
  name: 'home',
  components: { TreeSelect },
  data () {
    return {
      data: menus,
      defaultProps: {
        children: 'childrenList',
        label: 'menuName'
      },
      nodeKey: 'menuId',
      defaultCheckedKeys: [],
      searchText: '',
      ulListData: [
        { name: '张三', age: 10, food: '苹果' },
        { name: '张三丰', age: 30, food: '苹果,桃子' },
        { name: '李四', age: 20, food: '香蕉' },
        { name: '王五', age: 30, food: '葡萄' },
      ],
      tableData: []
    };
  },
  created () {
    this.tableData = this.ulListData
  },
  mounted () {
    // 组建中增加了监听数据变化的，
    // 此处初始化defaultCheckedKeys的值，有效果
    this.defaultCheckedKeys = [1001];
  },
  methods: {
    clearWord () {
      this.tableData = this.ulListData
    },
    search () {
      let searchArr = this.ulListData.filter(element => {
        if (element.name.search(this.searchText) != -1) {
          return element
        }
        if (element.food.search(this.searchText) != -1) {
          return element
        }
      })
      console.log(searchArr)
      this.tableData = []
      this.tableData = searchArr
    },
    // 改变默认选中的节点数据
    initChecked () {
      this.defaultCheckedKeys = [1006, 1007];
    },
    popoverHide (checkedIds, checkedData) {
      console.log(checkedIds);
      console.log(checkedData);
    }
  }
};
</script>
 
 <style lang="stylus" scoped>
 .search-web
   width 80vw
   display flex
   align-items center
   justify-content center
   margin 0 auto
   margin-top 20px
   flex-direction column
   .el-input
     width 20vw
   .c-table
     width 80vw
</style>