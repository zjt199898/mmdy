<!--  -->
<template>
<div id="app">
    <router-view class="content" ref="app" />
    <van-tabbar v-model="active" route :fixed="false">
  <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
  <van-tabbar-item icon="search" to="/sort">分类</van-tabbar-item>
  <van-tabbar-item icon="friends-o"  to="/movie">影库</van-tabbar-item>
  <van-tabbar-item icon="manager-o" to="/mine">我的</van-tabbar-item>
</van-tabbar>
<button class="btn" v-if="fas" @click="sct">回到顶部</button>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
  fas:false,
  active: 0,
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
  /* 获取滚动的距离 */
  handleScroll () {
  var scrollTop = this.$refs.app.$el.scrollTop
  console.log(scrollTop)
  if(scrollTop>1000){
    this.fas=true
  }else{
    this.fas=false
  }
},
sct(){
  /*  if(this.$refs.app.$el.scrollTop>0){
     var int=setTimeout(()=>{
      this.$refs.app.$el.scrollTop-=30
     },30)
   }else{
     clearInterval(int)
   } */
   this.$refs.app.$el.scrollTop=0
}
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）

mounted () {
  window.addEventListener('scroll', this.handleScroll, true)
  //window.addEventListener('scroll', this.sct, true)
},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style >
html,
body,
#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
#app {
  display: flex;
  flex-direction: column;
}
.content {
  flex: 1;
  overflow: auto;
}
.btn{
  position: fixed;
  bottom: 80px;
  right: 0;
}
</style>
