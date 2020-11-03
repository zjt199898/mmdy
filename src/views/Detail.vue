<!--  -->
<template>
<div class='deta'>
<div  v-for="item in list"
:key="item._id">
<van-nav-bar
  :title="item.name"
  left-text="返回"
  left-arrow
  @click-left="onClickLeft"
/>
<img :src="item.coverImg" alt="">
<div class="pin">
<span>评分：</span>
<van-rate
  v-model="value"
  :size="25"
  color="#ffd21e"
  void-icon="star"
  void-color="#eee"
/>
</div>
<div class="cent">
<span>{{item.name}}</span>
<van-icon :name="cc" @click="showPopup"  ref="red" :class="fas?'aaa':'bbb'"/>

</div>
<div >&nbsp;&nbsp;&nbsp;{{item.descriptions}}</div>
</div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import axios from "axios"
import { Toast } from 'vant'
export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
  list:[],
  fas:true,
  name:'',
  cc:"star-o",
  id:'',
   value: 3,
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
  showPopup() {
     if(this.fas){
       this.cc="star"
       Toast.success('收藏成功');
     }else{
       this.cc="star-o"
       Toast.success('取消收藏成功');
     }
     this.fas=!this.fas
    },
  dataList(){
    axios.get("http://localhost:3009/api/v1/products/"+this.id).then((res)=>{
      this.list.push(res.data)
      console.log(this.list)
    })
  },
  onClickLeft(){
        window.history.go(-1)
    },
  Colors(){
    console.log(this.$refs.red)
    this.$refs.red.style.color="red"
  }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
  this.id=this.$route.query.id
  console.log(this.id)
  this.dataList()
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
  //this.$refs.red.style.color="red"
},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {
  //this.$refs.red.style.color="red"
}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style  scoped>
img{
  width: 100%;
}
.cent{
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.cent span{
  font-size: 20px;
  font-weight: bold;
  color: crimson;
  margin-left: 15px;
}
.van-icon{
  font-size: 24px;
 /* color: orange; */
  margin-right: 15px;
}
.aaa{
color: orange;
}
.bbb{
  font-weight: bold;
  color: red;
}
div{
  color: green;
}
.van-nav-bar{
    width: 100%;
    position: fixed;
    top: 0;
}
.deta{
  padding-top: 46px;
}
.van-popup{
  font-size: 20px;
  font-weight: bold;
  color: red;
  text-align: center;
  line-height: 200px;
}
.pin{
  width: 100%;
  display: flex;
  align-items: center;
}
.pin span{
  color: crimson;
  font-weight: bold;
}
</style>