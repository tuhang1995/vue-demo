<template>
  <div class="">
    <el-table :data="listData"
              :span-method="objectSpanMethod"
              class="tableArea"
              border
              style="width: 100%">
      <el-table-column prop="type"
                       label="序号"
                       align="center"
                       width="200" />
      <el-table-column prop="sheetType"
                       label="工单类型">
        <template slot-scope="scope">
          <div slot="reference"
               class="name-wrapper">
            <el-checkbox v-model="checkArr[scope.$index].tag"
                         @change="checkChange(scope.row)">
              {{ scope.row.sheetType}}</el-checkbox>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="taskKey"
                       label="taskKey" />

      <el-table-column prop="templateUrl"
                       label="templateUrl" />
      <el-table-column prop="sorce"
                       label="分数">
        <template slot-scope="scope">
          <div slot="reference"
               class="name-wrapper">
            <el-popover trigger="hover"
                        placement="top">
              <el-input size="mini"
                        v-model="checkArr[scope.$index].sorce"></el-input>
              <p style="text-align:right">
                <el-button size="mini">取消</el-button>
                <el-button type="primary"
                           size="mini">确定</el-button>
              </p>
              <div slot="reference"
                   class="name-wrapper">
                <el-tag size="medium">{{ scope.row.sorce }}</el-tag>
                <i class="el-icon-edit"
                   title="编辑"></i>
              </div>
            </el-popover>

          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item"
                      effect="dark"
                      content="修改"
                      placement="top-start">
            <i class="el-icon-edit-outline"
               @click="modify(scope)" />
          </el-tooltip>
          <el-tooltip class="item"
                      effect="dark"
                      content="删除"
                      placement="top-start">
            <i class="el-icon-delete"
               @click="deleteData(scope)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>

export default {
  name: 'myNeedDeal',
  data () {
    return {
      rowList: [],
      spanArr: [],
      position: 0,
      listData: [],
      checkArr: [],
      inputVisible: false,
      scoreArr: []
    }
  },
  created () {
    //this.checkArr = new Array(10).fill(false)


  },
  computed: {

  },
  methods: {
    showInput () {
      this.inputVisible = true;
      this.$nextTick(_ => {
        // this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm () {
      let inputValue = this.inputValue;

      this.inputVisible = false;
      this.inputValue = '';
    },
    resizeData () {
      // this.checkArr = this.listData.filter((item, index) => {
      //   if (item.type != this.listData[index + 1].type) {
      //     return item
      //   }
      // })
      // console.log(this.resizeData)
      //this.checkArr = new Array(10).fill(false)
      let obj = {}
      for (let i = 0; i < this.listData.length; i++) {
        obj.type = this.listData[i].type

        obj.tag = false
        obj.sorce = this.listData[i].sorce
        this.checkArr.push(obj)
        // this.scoreArr.push(this.listData.sorce)
        obj = {}
      }
      console.log(this.checkArr)
    },
    checkChange (item) {
      // console.log(this.checkArr)
      const arr = []
      this.spanArr.filter((item, index) => {

        if (item > 0) {
          arr.push(this.checkArr[index])
          //return 
        }
      })
      console.table(arr)
    },
    queryData () {//查询操作
      this.listData = [
        {
          id: 1,
          type: "shijian",
          sheetType: "事件单",
          taskKey: "shijian_01",
          templateUrl: "/shijian_01",
          sorce: 12
        },
        {
          id: 2,
          type: "shijian",
          sheetType: "事件单",
          taskKey: "shijian_02",
          templateUrl: "/shijian_02",
          sorce: 14
        },
        {
          id: 3,
          type: 1,
          sheetType: "事件单",
          taskKey: "shijian_03",
          templateUrl: "/shijian_04",
          sorce: 18
        },
        {
          id: 4,
          type: 2,
          sheetType: "问题单",
          taskKey: "wenti_01",
          templateUrl: "/wenti_01",
          sorce: 12
        },
        {
          id: 5,
          type: 2,
          sheetType: "问题单",
          taskKey: "wenti_02",
          templateUrl: "/wenti_02",
          sorce: 12
        },
        {
          id: 6,
          type: 2,
          sheetType: "问题单",
          taskKey: "wenti_03",
          templateUrl: "/wenti_03",
          sorce: 12
        },
        {
          id: 6,
          type: 2,
          sheetType: "问题单",
          taskKey: "wenti_03",
          templateUrl: "/wenti_010",
          sorce: 12
        },
        {
          id: 6,
          type: 2,
          sheetType: "问题单",
          taskKey: "wenti_04",
          templateUrl: "/wenti_03",
          sorce: 19
        },
        {
          id: 6,
          type: 3,
          sheetType: "问题单",
          taskKey: "wenti_04",
          templateUrl: "/wenti_03",
          sorce: 12
        },
        {
          id: 6,
          type: 4,
          sheetType: "问题单",
          taskKey: "wenti_04",
          templateUrl: "/wenti_03",
          sorce: 20
        }
      ];
      this.rowspan()
    },
    rowspan () {
      this.listData.forEach((item, index) => {
        if (index === 0) {
          this.spanArr.push(1);
          this.position = 0;
        } else {
          if (this.listData[index].type === this.listData[index - 1].type) {
            this.spanArr[this.position] += 1;
            this.spanArr.push(0);
          } else {
            this.spanArr.push(1);
            this.position = index;
          }
        }
      })
    },
    objectSpanMethod ({ row, column, rowIndex, columnIndex }) {  //表格合并行
      //row当前行  column 当前列  rowIndex 当前行号 columnIndex当前列号
      //this.spanArr为 [3, 0, 0, 3, 0, 0]，比如，第一个元素为3，表示第一行应该向下合并3行（即第一行的rowspan为3）
      //，第二个元素的rowspan为0，就让它“消失”
      if (columnIndex === 0) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        }
      }
      if (columnIndex === 1) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    }
  },
  mounted () {
    this.queryData();
    this.resizeData()
  }
}
</script>
<style >
.el-select {
  margin-right: 15px;
}
.el-input {
  margin-right: 15px;
  width: 200px;
}
.tableArea {
  margin-top: 20px;
  box-shadow: 0 0 8px 0 #aaa;
}
i[class^="el-icon"] {
  margin-right: 5px;
  font-size: 16px;
  cursor: pointer;
}
.modify_table {
  td {
    padding: 10px;
  }
}
.item_title {
  text-align: right;
}
</style>
 