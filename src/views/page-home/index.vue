<template>
  <div>
    <dia :title="tittle"
         :isShow="isShow"
         :width="width"
         :height="height"
         @closeDialog='closeDialog'
         :dialogClass='dClass'>

      <el-row :gutter="24">
        <el-col :span="12">
          <span>客户姓名: </span>
          <el-input></el-input>
        </el-col>
        <el-col :span="12">
          <span>客户姓名: </span>
          <el-input></el-input>
        </el-col>

      </el-row>

      <el-row :gutter="24">
        <el-col :span="12">
          <span>客户姓名: </span>
          <el-input></el-input>
        </el-col>

        <el-col :span="12">
          <span>客户姓名: </span>
          <el-input></el-input>
        </el-col>

      </el-row>

      <el-button type="success"
                 size="mini">close</el-button>
      <el-button type="success"
                 size="mini">save</el-button>

    </dia>
    <el-button type="success"
               @click="showDio">Table</el-button>

  </div>
</template>
 
<script>
import dia from "@/components/dialog-h.vue";
export default {
  name: "Mytest",
  data () {
    return {
      tittle: "Test",
      isShow: false,
      width: "60%",
      height: "1000px",
      dClass: 'dialogCenter'
    }
  },
  methods: {
    showDio () {
      this.isShow = true;
      //this.isShow = !this.isShow;
    },
    closeDialog (tag) {
      this.isShow = false
    }
  },
  components: { dia, }
}
</script>
 
<style scoped>
</style>