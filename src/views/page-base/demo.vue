<template>
  <div class="main">
    <div id="myChart" :style="{ width: '600px', height: '400px' }"></div>
  </div>
</template>

<script>
import JSON from '@/lib/songjiang.json'
//import '@/lib/shanghai.js'

export default {
  name: '',
  props: [''],
  data() {
    return {}
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {
    // this.initChar()
    this.char()
  },

  methods: {
    demo() {
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      this.$echarts.registerMap('songjiang', JSON)

      var geoCoordMap = {
        叶榭: [121.30142211914061, 30.935801658201385],
        九亭: [121.31858825683592, 31.11761871756099],
        九里亭: [121.31378173828125, 31.150532207596775],
        车墩镇: [121.27738952636719, 30.981141277396976],
        方松街道: [121.20597839355467, 31.038226771949258],
        泖港镇: [121.15447998046875, 30.9393353886492],
        佘山镇: [121.1743927001953, 31.090574094954192],
        石湖荡镇: [121.13937377929688, 31.018809770791552],
        泗泾镇: [121.26640319824219, 31.124672569676118],
        新浜镇: [121.06040954589844, 30.927555779179652],
        新桥镇: [121.32545471191406, 31.079401242700747],
        永丰街道: [121.21559143066406, 30.98585065275817],
        岳阳街道: [121.22451782226561, 31.01174806181128],
        中山街道: [121.26434326171875, 31.030578122807324],
        洞泾镇: [121.24923706054688, 31.083517709507184],
      }
      var data = [
        { name: '九里亭', value: 1 },
        { name: '九亭', value: 199 },
        { name: '车墩镇', value: 0 },
        { name: '方松街道', value: 29 },
        { name: '泖港镇', value: 69 },
        { name: '佘山镇', value: 52 },
        { name: '石湖荡镇', value: 160 },
        { name: '泗泾镇', value: 132 },
        { name: '新浜镇', value: 1 },
        { name: '新桥镇', value: 99 },
        { name: '叶榭镇', value: 39 },
        { name: '永丰街道', value: 59 },
        { name: '岳阳街道', value: 39 },
        { name: '中山街道', value: 29 },
        { name: '洞泾镇', value: 129 },
      ]

      var convertData = function(data) {
        var res = []
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name]
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value),
            })
          }
        }
        return res
      }
      let option = {
        backgroundColor: '#020933',

        tooltip: {
          trigger: 'item',
          formatter: function(params) {
            //   if(typeof(params.value)[2] == "undefined"){
            //   	return params.name + ' : ' + params.value;
            //   }else{
            //   	return params.name + ' : ' + params.value[2];
            //   }
          },
        },
        legend: {
          orient: 'vertical',
          y: 'bottom',
          x: 'right',
          data: ['pm2.5'],
          textStyle: {
            color: '#fff',
          },
        },
        visualMap: {
          show: false,
          min: 0,
          max: 500,
          left: 'left',
          top: 'bottom',
          text: ['高', '低'], // 文本，默认为数值文本
          calculable: true,
          seriesIndex: [1],
          inRange: {
            // color: ['#3B5077', '#031525'] // 蓝黑
            // color: ['#ffc0cb', '#800080'] // 红紫
            // color: ['#3C3B3F', '#605C3C'] // 黑绿
            //color: ['#0f0c29', '#302b63', '#24243e'] // 黑紫黑
            //color: ['#23074d', '#cc5333'] // 紫红
            // color: ['#00467F', '#A5CC82'] // 蓝绿
            // color: ['#1488CC', '#2B32B2'] // 浅蓝
            // color: ['#00467F', '#A5CC82'] // 蓝绿
            // color: ['#00467F', '#A5CC82'] // 蓝绿
            // color: ['#00467F', '#A5CC82'] // 蓝绿
            // color: ['#00467F', '#A5CC82'] // 蓝绿
          },
        },
        // toolbox: {
        //     show: true,
        //     orient: 'vertical',
        //     left: 'right',
        //     top: 'center',
        //     feature: {
        //             dataView: {readOnly: false},
        //             restore: {},
        //             saveAsImage: {}
        //             }
        // },
        geo: {
          show: true,
          map: 'songjiang',
          label: {
            normal: {
              show: false,
            },
            emphasis: {
              show: false,
            },
          },
          roam: true,
          itemStyle: {
            normal: {
              areaColor: 'transparent',
              borderColor: '#3fdaff',
              borderWidth: 2,
              shadowColor: 'rgba(63, 218, 255, 0.5)',
              shadowBlur: 30,
            },
            emphasis: {
              areaColor: '#2B91B7',
            },
          },
        },
        series: [
          {
            name: 'light',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: convertData(data),
            symbolSize: function(val) {
              return val[2] / 10
            },
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: true,
              },
              emphasis: {
                show: true,
              },
            },
            itemStyle: {
              normal: {
                color: '#F4E925',
              },
            },
          },
          {
            type: 'map',
            map: 'songjiang',
            geoIndex: 0,
            aspectScale: 0.75, //长宽比
            showLegendSymbol: false, // 存在legend时显示
            label: {
              normal: {
                show: false,
              },
              emphasis: {
                show: false,
                textStyle: {
                  color: '#fff',
                },
              },
            },
            roam: true,
            itemStyle: {
              normal: {
                areaColor: '#031525',
                borderColor: '#FFFFFF',
              },
              emphasis: {
                areaColor: '#2B91B7',
              },
            },
            animation: false,
            data: data,
          },
          {
            name: 'Top 5',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: convertData(
              data
                .sort(function(a, b) {
                  return b.value - a.value
                })
                .slice(0, 5)
            ),
            symbolSize: function(val) {
              return val[2] / 10
            },
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke',
            },
            hoverAnimation: true,
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: true,
              },
            },
            itemStyle: {
              normal: {
                color: '#F4E925',
                shadowBlur: 10,
                shadowColor: '#05C3F9',
              },
            },
            zlevel: 1,
          },
        ],
      }

      myChart.setOption(option)
    },
    char() {
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      this.$echarts.registerMap('songjiang', JSON)

      var geoCoordMap = {
        叶榭: [121.30142211914061, 30.935801658201385],
        九亭: [121.31858825683592, 31.11761871756099],
        九里亭: [121.31378173828125, 31.150532207596775],
        车墩镇: [121.27738952636719, 30.981141277396976],
        方松街道: [121.20597839355467, 31.038226771949258],
        泖港镇: [121.15447998046875, 30.9393353886492],
        佘山镇: [121.1743927001953, 31.090574094954192],
        石湖荡镇: [121.13937377929688, 31.018809770791552],
        泗泾镇: [121.26640319824219, 31.124672569676118],
        新浜镇: [121.06040954589844, 30.927555779179652],
        新桥镇: [121.32545471191406, 31.079401242700747],
        永丰街道: [121.21559143066406, 30.98585065275817],
        岳阳街道: [121.22451782226561, 31.01174806181128],
        中山街道: [121.26434326171875, 31.030578122807324],
        洞泾镇: [121.24923706054688, 31.083517709507184],
      }
      var data = [
        { name: '九里亭', value: 10 },
        { name: '九亭', value: 199 },
        { name: '车墩镇', value: 0 },
        { name: '方松街道', value: 29 },
        { name: '泖港镇', value: 69 },
        { name: '佘山镇', value: 52 },
        { name: '石湖荡镇', value: 160 },
        { name: '泗泾镇', value: 132 },
        { name: '新浜镇', value: 1 },
        { name: '新桥镇', value: 99 },
        { name: '叶榭镇', value: 39 },
        { name: '永丰街道', value: 59 },
        { name: '岳阳街道', value: 39 },
        { name: '中山街道', value: 29 },
        { name: '洞泾镇', value: 129 },
      ]

      var max = 480,
        min = 9 // todo
      var maxSize4Pin = 100,
        minSize4Pin = 20

      var convertData = function(data) {
        var res = []
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name]
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value),
            })
          }
        }
        return res
      }

      let option = {
        tooltip: {
          trigger: 'item',
          formatter: function(params) {
            if (typeof params.value[2] == 'undefined') {
              return params.name + ' : ' + params.value
            } else {
              return params.name + ' : ' + params.value[2]
            }
          },
        },

        visualMap: {
          show: false,
          min: 0,
          max: 500,
          left: 'left',
          top: 'bottom',
          text: ['高', '低'], // 文本，默认为数值文本
          calculable: true,
          seriesIndex: [1],
          inRange: {
            // color: ['#3B5077', '#031525'] // 蓝黑
            // color: ['#ffc0cb', '#800080'] // 红紫
            // color: ['#3C3B3F', '#605C3C'] // 黑绿
            color: ['#0f0c29', '#302b63', '#24243e'], // 黑紫黑
            // color: ['#23074d', '#cc5333'] // 紫红
            // color: ['#00467F', '#A5CC82'] // 蓝绿
            // color: ['#1488CC', '#2B32B2'] // 浅蓝
            // color: ['#00467F', '#A5CC82'] // 蓝绿
            // color: ['#00467F', '#A5CC82'] // 蓝绿
            // color: ['#00467F', '#A5CC82'] // 蓝绿
            // color: ['#00467F', '#A5CC82'] // 蓝绿
          },
        },
        // toolbox: {
        //     show: true,
        //     orient: 'vertical',
        //     left: 'right',
        //     top: 'center',
        //     feature: {
        //             dataView: {readOnly: false},
        //             restore: {},
        //             saveAsImage: {}
        //             }
        // },
        geo: {
          show: true,
          map: 'songjiang',
          label: {
            normal: {
              show: false,
            },
            emphasis: {
              show: false,
            },
          },
          roam: true,
          itemStyle: {
            normal: {
              areaColor: '#031525',
              borderColor: '#3B5077',
            },
            emphasis: {
              areaColor: '#2B91B7',
            },
          },
        },
        series: [
          {
            name: 'credit_pm2.5',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: convertData(data),
            symbolSize: function(val) {
              return val[2] / 10
            },
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: true,
              },
              emphasis: {
                show: true,
              },
            },
            itemStyle: {
              normal: {
                color: '#05C3F9',
              },
            },
          },
          {
            type: 'map',
            map: 'songjiang',
            geoIndex: 0,
            aspectScale: 0.75, //长宽比
            showLegendSymbol: false, // 存在legend时显示
            label: {
              normal: {
                show: false,
              },
              emphasis: {
                show: false,
                textStyle: {
                  color: '#fff',
                },
              },
            },
            roam: true,
            itemStyle: {
              normal: {
                areaColor: '#031525',
                borderColor: '#3B5077',
              },
              emphasis: {
                areaColor: '#2B91B7',
              },
            },
            animation: false,
            data: data,
          },
          {
            name: '点',
            type: 'scatter',
            coordinateSystem: 'geo',
            symbol: 'pin',
            symbolSize: function(val) {
              var a = (maxSize4Pin - minSize4Pin) / (max - min)
              var b = minSize4Pin - a * min
              b = maxSize4Pin - a * max
              return a * val[2] + b
            },
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: '#fff',
                  fontSize: 9,
                },
              },
            },
            itemStyle: {
              normal: {
                color: '#F62157', //标志颜色
              },
            },
            zlevel: 6,
            data: convertData(data),
          },
          {
            name: 'Top 5',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: convertData(
              data
                .sort(function(a, b) {
                  return b.value - a.value
                })
                .slice(0, 5)
            ),
            symbolSize: function(val) {
              return val[2] / 10
            },
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke',
            },
            hoverAnimation: true,
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: true,
              },
            },
            itemStyle: {
              normal: {
                color: '#05C3F9',
                shadowBlur: 10,
                shadowColor: '#05C3F9',
              },
            },
            zlevel: 1,
          },
        ],
      }
      myChart.setOption(option)
    },
    initChar() {
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      //  var uploadedDataURL = "../lib/jinshan.json";
      // myChart.showLoading();
      this.$echarts.registerMap('songjiang', JSON)
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

        geo: {
          show: true,
          map: 'songjiang',
          label: {
            normal: {
              show: false,
            },
            emphasis: {
              show: false,
            },
          },
          roam: true,
          itemStyle: {
            normal: {
              areaColor: '#031525',
              // borderColor: 'red', //线的颜色
            },
            emphasis: {
              areaColor: '#2B91B7', //鼠标移入颜色
            },
          },
        },
        series: [
          {
            type: 'map',
            map: 'songjiang',
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
                    color: '#fff', //静态字体的颜色
                  },
                },
              },
              emphasis: {
                label: {
                  show: true,
                },
              },
            },
            data: [
              { name: '九里亭', value: 0 },
              { name: '九亭', value: 199 },
              { name: '车墩镇', value: 0 },
              { name: '方松街道', value: 29 },
              { name: '泖港镇', value: 69 },
              { name: '佘山镇', value: 52 },
              { name: '石湖荡镇', value: 160 },
              { name: '泗泾镇', value: 132 },
              { name: '新浜镇', value: 0 },
              { name: '新桥镇', value: 99 },
              { name: '叶榭镇', value: 39 },
              { name: '永丰街道', value: 59 },
              { name: '岳阳街道', value: 39 },
              { name: '中山街道', value: 29 },
              { name: '洞泾镇', value: 129 },
            ],
          },
        ],
      })
      // });
    },
  },

  watch: {},
}
</script>
<style lang="stylus" scoped>
.main
  width 100%
  height 100%
</style>
