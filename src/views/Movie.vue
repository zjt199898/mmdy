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
    <van-tag plain type="danger">{{item.fas}}</van-tag>
    <van-tag plain type="danger">标签</van-tag>
  </template>
  <template #footer> 
     <van-checkbox v-model="item.fas">单选</van-checkbox>
     
     <p class="jl"></p>
    <van-button size="mini" @click="dele(list[i]._id,item.name,i)">删除</van-button>
  </template>
</van-card>
<van-submit-bar :price="3050" button-text="提交订单" @submit="onSubmit">
  <van-checkbox v-model="checked">全选</van-checkbox>
</van-submit-bar>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
//import axios from "axios"
import { Dialog } from 'vant'
import { loadCarts } from "../services/carts";
import { detCarts } from "../services/carts";
import { Toast } from 'vant'

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
    show: false,
    checked:true,
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    onSubmit(){

    },
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
    /* 删除数据 */
     dele(id,name,i){
        Dialog.confirm({
        title: '确认删除吗!',
        })
        .then(() => {
           localStorage.removeItem(name)
           const res =  detCarts(id);
          console.log(res);
          this.List.splice(i,1)
          Toast.success('删除成功！');
        })
        .catch(() => {
           
       });
    },
    //去购物车数据
   async quList(){
       const res = await loadCarts();
       this.list=res
       this.list.forEach((item)=>{
           item.fas=true
       })
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
  /*  async dele(id,name,i){
       if (confirm("是否确认删除此项?")){                   
           localStorage.removeItem(name)
           const res = await detCarts(id);
          console.log(res);
          this.List.splice(i,1)
                }
       //location.reload()
  } */
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
    margin-top: 10px;
    display: flex;
    align-items: center;
    align-content: flex-end;
    
}
.van-icon{
  font-size: 22px;
  margin-right: 10px;
  margin-left: 240px;
}
.jl{
    width: 240px;
}
.van-button{
   
    width: 40px;
    color: white;
    background: red;
}
.van-submit-bar__bar{
    width: 90%;
    position: fixed;
    bottom: 50px;
}
.van-button--danger{
    width: 100px;
    height: 30px;
}
/* .van-submit-bar__text{
    width: 100px;
    height: 50px;
} */
</style>
