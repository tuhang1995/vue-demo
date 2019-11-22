<template>
  <div class="mergeTable"
       v-loading="loading"
       element-loading-text="拼命加载中"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(255, 255, 255, 0.8)">
    <el-table :data="baseData"
              :span-method="baseMethod"
              class="tableArea"
              border
              style="width: 100%">
      <el-table-column prop="indeName"
                       label="指标名称"
                       align="center"
                       width="200" />
      <el-table-column prop="sonIndex"
                       label="子指标">
        <template slot-scope="scope">
          <div slot="reference"
               class="name-wrapper">
            <el-checkbox v-model="scope.row.check"
                         @change="checkChange(scope.row)">
              {{ scope.row.sonIndex}}</el-checkbox>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="patch"
                       label="采集点" />
      <el-table-column prop="sorce"
                       label="分数">
        <template slot-scope="scope">
          <div slot="reference"
               class="name-wrapper">
            <el-popover trigger="click"
                        placement="top">
              <el-input size="mini"
                        @change="sorceChange(scope.row.sorce,'patch')"
                        v-model="scope.row.sorce"></el-input>
              <div slot="reference"
                   class="name-wrapper">
                <span size="medium">{{ scope.row.sorce }}</span>
                <i style='padding-left:10px'
                   class="el-icon-edit"
                   title="编辑"></i>
              </div>
            </el-popover>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import api from '@/api/home'
export default {
  name: 'mergeTable',
  props: [''],
  data () {
    return {
      baseData: [],
      idxNameArr: [],     //指标名称
      idxPos: 0,
      sonIdxArr: [],      //子指标名称数组
      sonIdxPos: [],
      patchArr: [],    //采集点
      patchPos: [],
      loading: true
    };
  },

  components: {},

  computed: {},

  beforeMount () { },

  mounted () {
    this.getTableData()
  },

  methods: {
    //获取表格数据
    getTableData () {
      api.getTable().then((res) => {
        if (res.code == '200') {
          this.loading = false
          this.baseData = res.data
        }
        this.baseMer()
      })
    },
    baseMer () {
      for (var i = 0; i < this.baseData.length; i++) {
        if (i === 0) {
          //第一行必须存在
          this.idxNameArr.push(1);
          this.idxPos = 0;
          //第二行 子指标
          this.sonIdxArr.push(1);
          this.sonIdxPos = 0;
          //第三行 采集点
          this.patchArr.push(1);
          this.patchPos = 0;
        }
        else {
          // 判断当前元素与上一个元素是否相同 this.idxPos是idxNameArr内容的序号
          //指标名称
          if (this.baseData[i].indeName === this.baseData[i - 1].indeName) {
            this.idxNameArr[this.idxPos] += 1;
            this.idxNameArr.push(0);
          } else {
            this.idxNameArr.push(1);
            this.idxPos = i;
          }
          //子指标
          if (this.baseData[i].sonIndex === this.baseData[i - 1].sonIndex && this.baseData[i].indeName === this.baseData[i - 1].indeName) {
            this.sonIdxArr[this.sonIdxPos] += 1;
            this.sonIdxArr.push(0);
          } else {
            this.sonIdxArr.push(1);
            this.sonIdxPos = i;
          }
          //采集点
          if (this.baseData[i].patch === this.baseData[i - 1].patch && this.baseData[i].sonIndex === this.baseData[i - 1].sonIndex && this.baseData[i].indeName === this.baseData[i - 1].indeName) {
            this.patchArr[this.patchPos] += 1;
            this.patchArr.push(0);
          } else {
            this.patchArr.push(1);
            this.patchPos = i;
          }
        }
      }
    },
    checkChange (item) {
      const arr = []
      // this.baseData.filter((element, index) => {
      //   if (element.type == item.type) {
      //     element.check = item.check
      //   }
      // })
      console.log(this.baseData)
    },
    baseMethod ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        //第一列的合并方法  指标名称
        const _row_1 = this.idxNameArr[rowIndex];
        const _col_1 = _row_1 > 0 ? 1 : 0; //如果被合并了_row=0则它这个列需要取消
        return {
          rowspan: _row_1,
          colspan: _col_1
        }
      } else if (columnIndex === 1) {
        //第二列的合并方法  子指标
        const _row_2 = this.sonIdxArr[rowIndex];
        const _col_2 = _row_2 > 0 ? 1 : 0;
        return {
          rowspan: _row_2,
          colspan: _col_2
        }
      } else if (columnIndex === 2) {
        //第三列的合并方法  采集点
        const _row_3 = this.patchArr[rowIndex];
        const _col_3 = _row_3 > 0 ? 1 : 0;
        return {
          rowspan: _row_3,
          colspan: _col_3
        }
      }
    },
    sorceChange () {

    }
  },

  watch: {}

}

</script>
<style lang='stylus' scoped>
.mergeTable
  padding 40px
</style>