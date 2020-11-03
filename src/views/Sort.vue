<!--  -->
<template>
  <div class="sort">
    <van-grid
      :gutter="15"
      :column-num="1"
      :icon-size="200"
      v-for="(item, i) in list"
      :key="i"
    >
      <h2>{{ item.naem }}</h2>
      <van-grid-item :icon="item.img" text="" @click="aaa(i, item.naem)" />
    </van-grid>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
export default {
  //import引入的组件需要注入到对象中才能使用
  name: "Sort",
  components: {},
  data() {
    //这里存放数据
    return {
      list: [
        {
          naem: "电影",
          img:
            "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1897453758,3842884332&fm=26&gp=0.jpg",
        },
        {
          naem: "动漫",
          img:
            "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2198004300,949998292&fm=26&gp=0.jpg",
        },
        {
          naem: "纪录片",
          img:
            "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=626719016,1065432309&fm=15&gp=0.jpg",
        },
        {
          naem: "游戏",
          img:
            "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3707694452,3738880577&fm=26&gp=0.jpg",
        },
        {
          naem: "综艺",
          img:
            "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=437541361,516553979&fm=26&gp=0.jpg",
        },
        {
          naem: "网络电影",
          img:
            "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1823140405,213658871&fm=26&gp=0.jpg",
        },
      ],
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    aaa(i, name) {
      this.$router.push({
        path: "/list",
        query: { id: i, name: name },
      });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
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
h2 {
  width: 100%;
  text-align: center;
  color: aqua;
}
</style>
