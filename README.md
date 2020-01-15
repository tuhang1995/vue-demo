# vue-demo2

## Project setup

```
npm install
```

### 启动 json-server

```
 json-server --host 192.168.0.54 db.json
 可以不写ip 访问就是本地localhost
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your tests

```
npm run test
```

### 文件目录

```
  page-base   //组件目录
    animationDamo.vue   //模态框动画效果
    index.vue           //主入口
    merge-table.vue     //合并表格 element
    nowVideo.vue        //在线视频播放
  node        //node学习
    leanRouter          //注册用户名和密码
    test.vue            //考试放进去的数据
  char        //echarts图标
    index.vue           //响应式echarts
  map         //地图
    index.vue           //地图的撒点/轨迹/点位跳动/清除撒点/清除轨迹
  layout      //主结构
    index.vue           //文件入口
    main.vue            //路由出口
    navMenu             //菜单组件
    sliderBar           //生成左侧菜单
```

### 项目中用到了 node

```
  需要以管理员身份运行cmd
  启动sql
    net start mysql
  关闭sql
    net stop mysql
  启用node
   cd src/server/
   node  app.js

  偶发性404
    重启sql, 重启node  app.js
```
