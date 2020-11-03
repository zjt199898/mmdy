
<template>
  <div class="home">
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img :src="image" />
      </van-swipe-item>
    </van-swipe>
    <h3>最新</h3>
    <h2>{{ option1.value }}</h2>
    <van-dropdown-menu>
      <van-dropdown-item v-model="value1" :options="option1" @change="aaa" />
    </van-dropdown-menu>
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
      fas: true,
      value1: 0,
      option1: [
        { text: "电影", value: 0 },
        { text: "动漫", value: 1 },
      ],
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
    aaa() {
      this.fas = !this.fas;
      location.reload();
    },
    add() {
      if (this.fas) {
        this.adddm();
      } else {
        this.adddy();
      }
    },
    adddm() {
      axios
        .get(
          "https://pcw-api.iqiyi.com/search/recommend/list?channel_id=4&data_type=1&mode=24&page_id=1&ret_num=10"
        )
        .then((res) => {
          console.log(res.data.data.list);
          this.list = res.data.data.list;
          console.log(this.fas);
        });
    },
    adddy() {
      axios
        .get(
          "https://pcw-api.iqiyi.com/search/recommend/list?channel_id=1&data_type=1&mode=11&page_id=1&ret_num=10"
        )
        .then((res) => {
          console.log(res.data.data.list);
          this.list = res.data.data.list;
          console.log(this.fas);
        });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.adddy();
    this.adddm();
    //this.add()
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
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
</style>
