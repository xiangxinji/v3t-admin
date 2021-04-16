# v3t-admin
一个 Vue3 + Typescript 的后台管理模板

### APP Settings 
现在目前 src/settings 中只包含几个配置, 可以自己扩展

至于为什么使用module.exports 来进行导出,是因为在 APP 进行构建的时候需要读取我们的 appTitle 来设置到 html-webpack-plugin 上 

但是 ts 环境也就导致不能使用这一份文件

**如何在ts中使用 settings**

在 utils/settings.ts 中引入了这个文件,并且申明了类型为 Setting 类型, 你需要自己向上扩展字段,并且在 Settings 类型中进行申明



### MockServer 

在应用中有一个 mock 目录, 目前所有的接口都是使用的 mock 数据, 如果想添加mock 模块,  请添加至 /mock/services 目录中


### RouterConfig

因为路由和菜单的配置是从接口获取的,这里使用了 Mock 数据在 /mock/services/system.ts 的 build 方法中,但是如果你如果定义routerConfig你需要了解一些关于RouterConfig的规范
1. 过滤外链配置添加至 vue-router 
2. keep-alive 逻辑依赖于组件本身的 name 和 配置中的 name 字段 
3. 如果你想定义外链链接目录(子菜单全部都是外链), 请在外链链接目录的 conf 中给增加 meta 为 : outLink (这也是为了防止这个目录会被添加进去vue-router)
4. 如果是混合的关系请正常编写
5. 如果父元素是目录,并且子元素只有一个, 那么配置会以子元素来覆盖父元素,否则就是父元素的部分配置如(icon , title , outLink)
6. 如果在5的条件上,如果父元素是 autoLink = true, children 将会被重置

### Types
在根目录中有一个 types 的目录, index.d.ts 中请申明全局类型, 另外分模块的类型请定义在 types/xxx.ts 中并 export 


### ElementPlus 

本应用采用了 ElementPlus 来进行基础组件使用, 并且进行了按需加载 , 如果发现一个 el 组件不能进行使用, 请进 components/lazy.use.ts 中去注册它 

### 这也是一个极其简单的一个项目模板

从 0 - 1 只需要定义路由,页面和样式了. 

### 需要完善 

一些样式文件的变量 , tagsview 的其他功能逻辑 
