<!--  -->
<template>
<div class='movie'>
<h4>我的收藏</h4>
<van-card
v-for="(item,i) in List"
:key="item._id"
  price="39.00"
  :desc="item.descriptions"
  :title="item.name"
  :thumb="item.coverImg"
>
  <template #tags>
    <van-tag plain type="danger">{{List[i].fas}}</van-tag>
    <van-tag plain type="danger">标签</van-tag>
  </template>
  <template #footer>
  <van-icon :name="List[i].cc" @click="showPopup(item._id,item.name,i)"   :class="List[i].fas?'bbb':'bbb'"/>
    <van-button size="mini" @click="dele(list[i]._id,item.name)">删除</van-button>
  </template>
</van-card>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
//import axios from "axios"
import { loadCarts } from "../services/carts";
import { detCarts } from "../services/carts";
//import { Toast } from 'vant'

export default {
//import引入的组件需要注入到对象中才能使用
name:"Movie",
components: {},
data() {
//这里存放数据
return {
    list:[],
    List:[],
    name:'',
    fas:true,
    cc:"star-o",
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    //没啥用
      showPopup(id,name,i) {
    //console.log(id,name,fase,i)
    console.log(this.List[i].fas,this.List[i].cc)
     if(this.List[i].fas){
       this.List[i].cc="star"
     }else{
       this.List[i].cc="star-o"
     }
      this.List[i].fas=!this.List[i].fas

    },
    //去购物车数据
   async quList(){
       const res = await loadCarts();
       this.list=res
       res.forEach((item)=>{
           item.product.fas=true
           item.product.cc="star"
           this.List.push(item.product)
       })
       this.List.reverse()
       this.list.reverse()
      console.log(this.list,this.List);
  },
  //删除购物车
   async dele(id,name){
       console.log(name)
       localStorage.removeItem(name)
       const res = await detCarts(id);
      console.log(res);
       location.reload()
  }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
    this.quList()
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {
    
}, //生命周期 - 更新之后
beforeDestroy() {

}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style  scoped>
h4{
    width: 100%;
    text-align: center;
    color: red;
}
.aaa{
color: orange;
}
.bbb{
  font-weight: bold;
  color: red;
}
.van-card__footer{
    display: flex;
    align-items: center;
    align-content: flex-end;
    
}
.van-icon{
  font-size: 22px;
 /* color: orange; */
  margin-right: 10px;
  margin-left: 270px;
}
</style>
