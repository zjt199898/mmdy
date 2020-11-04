
<template>
  <div class="home">
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img :src="image" />
      </van-swipe-item>
    </van-swipe>
    <ul class="list">
    <li :class="fass?'aa':''" @click="adddy()">电影</li>
    <li @click="adddm()">动漫</li>
    <li @click="adddj()">纪录片</li>
    <li @click="adddx()">游戏</li>
    <li @click="adddz()">综艺</li>
    <li @click="adddw()">网络电影</li>
    </ul>
    <van-card
      v-for="item in list"
      :key="item.albumId"
      price="39.00"
      :desc="item.focus"
      :title="item.title"
      :thumb="item.imageUrl"
    />
  </div>
</template>
<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import axios from "axios";
export default {
  //import引入的组件需要注入到对象中才能使用
  name: "Home",
  components: {},
  data() {
    //这里存放数据
    return {
      fass:true,
      fas: true,
      value1: 0,
      list: [],
      images: [
        "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=136213459,495588707&fm=26&gp=0.jpg",
        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2208300493,2979317856&fm=26&gp=0.jpg",
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603971564880&di=c09d19ad890901ab65e7b778a4e60f76&imgtype=0&src=http%3A%2F%2Fww4.sinaimg.cn%2Fmw690%2F0082jyhXgy1gja8l3n2irj31hc0u07wh.jpg",
        "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1259231595,810850385&fm=15&gp=0.jpg",
      ],
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    adddm() {
      this.fass=false
      axios
        .get(
          "https://pcw-api.iqiyi.com/search/recommend/list?channel_id=4&data_type=1&mode=24&page_id=1&ret_num=30"
        )
        .then((res) => {
          this.list = res.data.data.list;
        });
    },
    adddy() {
      
      axios
        .get(
          "https://pcw-api.iqiyi.com/search/recommend/list?channel_id=1&data_type=1&mode=11&page_id=1&ret_num=30"
        )
        .then((res) => {
          this.list = res.data.data.list;
        });
    },
    adddj(){
      this.fass=false
      axios.get(
          "https://pcw-api.iqiyi.com/search/recommend/list?channel_id=3&data_type=1&mode=24&page_id=1&ret_num=48"
        )
        .then((res) => {
          this.list = res.data.data.list;
        });
    },
    adddx(){
      this.fass=false
      axios.get(
          "https://pcw-api.iqiyi.com/search/recommend/list?channel_id=8&data_type=1&mode=24&page_id=1&ret_num=48"
        )
        .then((res) => {
          this.list = res.data.data.list;
        });
    },
    adddz(){
      this.fass=false
      axios.get(
          "https://pcw-api.iqiyi.com/search/recommend/list?channel_id=6&data_type=1&mode=24&page_id=1&ret_num=48"
        )
        .then((res) => {
          this.list = res.data.data.list;
        });
    },
    adddw(){
      this.fass=false
      axios.get(
          "https://pcw-api.iqiyi.com/search/recommend/list?channel_id=1&data_type=1&mode=24&page_id=1&ret_num=48"
        )
        .then((res) => {
          this.list = res.data.data.list;
        });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.adddy();
    //this.adddm();
    //this.add()
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
     
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style  scoped>
img {
  width: 100%;
  height: 200px;
}
h3 {
  color: brown;
}
.list{
  width: 100%;
  display: flex;
  align-items: center;
}
.list li{
  list-style: none;
  flex: 1;
  font-size: 14px;
  text-align: center;
  height: 20px;
 
}
.list li:hover{
  color: red;
   border-bottom: 2px solid blue;
}
.aa{
  color: red;
   border-bottom: 2px solid blue;
}
</style>
