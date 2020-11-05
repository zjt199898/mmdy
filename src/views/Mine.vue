<!--  -->
<template>
  <div class="mine">
    <div class="header">
      <van-col span="2"></van-col>
      <van-image round width="4rem" height="4rem" :src="picture" class="" />
      <van-col span="8" offset="2" :style="{ color: '#ffff' }">{{nickName}}</van-col>
    </div>
    <van-cell title="修改个人资料" is-link :to="{ name: 'ChangeLogin' }" />
    <van-cell title="修改个人密码" is-link :to="{ name: 'ChangePass' }" />
    <div class="bottom" style="flex: 1">
      <van-button type="primary" round @click="loginOut" color="linear-gradient(to right, #ff6034, #ee0a24)">退出登录</van-button>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
// import { post } from "../untils/request";
import { get } from "../untils/request";

export default {
  //import引入的组件需要注入到对象中才能使用
  name: "Mine",
  components: {},
  data() {
    //这里存放数据
    return {
      picture: "",
      nickName:''
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    loginOut() {
      console.log(localStorage.getItem("token"));
      this.$router.push({ name: "Login" });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    get("/api/v1/users/info").then((res) => {
      console.log(res);
      this.picture = "http://localhost:3009" + res.avatar;
      this.nickName = res.nickName;
      console.log(this.picture);
    });
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
.mine {
  display: flex;
  flex-direction: column;
}
.header {
  height: 180px;
  display: flex;
  align-items: center;
  background-color: orangered;
}
.bottom {
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
}
</style>
