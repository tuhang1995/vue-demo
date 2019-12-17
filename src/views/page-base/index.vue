<template >
  <div class="main">
    <!-- <div id="myChart"
         :style="{width: '1200px', height: '800px'}"></div> -->
    <!--  -->
    <router-view></router-view>
  </div>
</template>

<script>
import JSON from '@/lib/jinshan.json'
//import '@/lib/shanghai.js'

export default {
  name: '',
  props: [''],
  data () {
    return {

    };
  },

  components: {

  },

  computed: {},

  beforeMount () { },

  mounted () {
    //this.initChar()
  },

  methods: {

    initChar () {
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      //  var uploadedDataURL = "../lib/jinshan.json";
      // myChart.showLoading();
      this.$echarts.registerMap('jinshan', JSON);
      // var uploadedDataURL = "/asset/get/s/data-1482818963027-Hko9SKJrg.json";

      // myChart.showLoading();
      // $.get(uploadedDataURL, function (chinaJson) {
      //  echarts.registerMap('北京', chinaJson);
      //  myChart.hideLoading();
      myChart.setOption({
        // visualMap: {
        //   min: 10,
        //   max: 200,
        //   text: ['High', 'Low'],
        //   realtime: false,
        //   calculable: true,
        //   inRange: {
        //     color: ['#efb15c', ' #ff5d1a', '#479cee']
        //   }
        // },
        dataRange: {
          x: 'left',
          y: 'bottom',
          splitList: [
            { start: 155, end: 205, label: '155- 205', color: '#eb3c5c' },
            { start: 105, end: 155, label: '105 - 155', color: '#ff5d1a' },
            { start: 55, end: 105, label: '55 - 105', color: '#efb15c' },
            { start: 5, end: 55, label: '0 - 55', color: '#479cee' },
            { start: 0, end: 5, label: '0', color: '#072959' },
          ],
          color: '#fff'
        },
        geo: {
          show: true,
          map: 'jinshan',
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false,
            }
          },
          roam: true,
          itemStyle: {
            normal: {
              areaColor: '#031525',
              // borderColor: 'red', //线的颜色
            },
            emphasis: {
              areaColor: '#2B91B7', //鼠标移入颜色
            }
          }
        },
        series: [{
          type: 'map',
          map: 'jinshan',
          selectedMode: 'single',
          // itemStyle: {
          //   normal: {
          //     label: {
          //       show: true,
          //       textStyle: {

          //         color: '#fff'   //静态字体的颜色
          //       }
          //     }
          //   },
          //   emphasis: {
          //     label: {
          //       show: true,

          //     }
          //   }
          // },
          //地图边框颜色
          itemStyle: {

            normal: {
              borderColor: '#cacaca',
              borderWidth: 1,
              label: {
                show: true,
                textStyle: {

                  color: '#fff'   //静态字体的颜色
                }
              }
            },
            emphasis: {
              label: {
                show: true,

              }
            }
          },
          data: [
            { name: '石化街道', value: 0 },
            { name: '漕泾镇', value: 199 },
            { name: '张堰镇', value: 0 },
            { name: '山阳镇', value: 29 },
            { name: '金山卫镇', value: 69 },
            { name: '廊下镇', value: 52 },
            { name: '吕巷镇', value: 160 },
            { name: '枫泾镇', value: 132 },
            { name: '朱泾镇', value: 0 },
            { name: '亭林镇', value: 99 },
            // { name: '金山工业区', value: 39 },
          ]
        }]
      });
      // });
    },

  },

  watch: {}

}

</script>
<style lang='stylus' scoped>
.main
  width 100%
  height 100%
</style>
