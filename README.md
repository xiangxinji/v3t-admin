# v3t-admin
一个 Vue3 + Typescript 的后台管理模板

### APP Settings 
现在目前 src/settings 中只包含几个配置, 可以自己扩展
如下
```javascript
module.exports = {
  // 应用名称
  appTitle : 'V3T manager',
  // 路由白名单
  routerWhiteList : [] ,
  // token 存储的 key
  storageTokenKey : 'v3t-admin-token',
  // 页面默认缓存
  pageDefaultCache : false ,
  // 页面默认允许被关闭
  pageDefaultAllowClose : true
}
```
至于为什么使用module.exports 来进行导出,是因为在 APP 进行构建的时候需要读取我们的 appTitle 来设置到 html-webpack-plugin 上 

但是 ts 环境也就导致不能使用这一份文件

**如何在ts中使用 settings**

在 utils/settings.ts 中引入了这个文件,并且申明了类型为 Setting 类型, 你需要自己向上扩展字段,并且在 Settings 类型中进行申明


### MockServer 

在应用中有一个 mock 目录, 目前所有的接口都是使用的 mock 数据, 如果想添加mock 模块,  请添加至 /mock/services 目录中


### Types 

在根目录中有一个 types 的目录, index.d.ts 中请申明全局类型, 另外分模块的类型请定义在 types/xxx.ts 中并 export 


### ElementPlus 

本应用采用了 ElementPlus 来进行基础组件使用, 并且进行了按需加载 , 如果发现一个 el 组件不能进行使用, 请进 components/lazy.use.ts 中去注册它 

### 这也是一个极其简单的一个项目模板

从 0 - 1 只需要定义路由,页面和样式了. 

### 需要完善 

一些样式文件的变量 , tagsview 的其他功能逻辑 
