<!--  -->
<template>
  <div class="list" @click.stop="dl()">
    <div class="po">
      <img :src="srcImg" alt="" />
      <span>{{ username }}</span>
    </div>
    <van-nav-bar
      :title="name"
      left-text="返回"
      left-arrow
      @click-left.stop="onClickLeft"
    />

    <div class="ten">
      <input type="text" class="txt" placeholder="请输入电影名" v-model="txt" />
    </div>

    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-card
        v-for="item in flt"
        :key="item._id"
        price="39.00"
        :desc="item.descriptions"
        :title="item.name"
        :thumb="item.coverImg"
        :thumb-link="'/#/detail?id=' + item._id + '&name=' + item.name"
      />
    </van-list>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import axios from "axios";
import { loadUser } from "../services/carts";
export default {
  //import引入的组件需要注入到对象中才能使用
  name: "List",
  components: {},
  data() {
    //这里存放数据
    return {
      index: "",
      name: "",
      txt: "",
      unm: 10,
      list: [],
      srcImg: "",
      username: "",
      loading: false,
      finished: false,
    };
  },
  //监听属性 类似于data概念
  computed: {
    flt() {
      return this.list.filter((item) => item.name.indexOf(this.txt) > -1);
    },
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    /*  aaa(){
    console.log("A")
  }, */
    /* 获取用户信息,查看用户有没有登录,如果登录了跳转到个人中心，没有的话跳转到登录页面*/
    // dl() {
    //   if (localStorage.getItem("token")) {
    //     location.href = "/#/mine";
    //   } else {
    //     location.href = "/#/login";
    //   }
    // },
    /* 获取用户信息 //查看用户有没有登录*/
    async userName() {
      if (localStorage.getItem("token")) {
        const res = await loadUser();
        //console.log(res);
        this.srcImg = "http://localhost:3009" + res.avatar;
        this.username = res.userName;
        //console.log(this.srcImg)
      } else {
        this.srcImg = "../assets/2.jpg";
        this.username = "登录";
      }
    },
    /* 获取数据 */
    wan() {
      axios
        .get(
          "http://localhost:3009/api/v1/products?page=" +
            this.index * 10 +
            "&per=" +
            this.unm
        )
        .then((res) => {
          //console.log(res.data.products)
          this.list = res.data.products;
          //console.log(this.list)
        });
    },
    onClickLeft() {
      window.history.go(-1);
    },
    /* 加载数据 */
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        this.unm += 10;
        this.wan();
        // 加载状态结束
        this.loading = false;
        // 数据全部加载完成
        if (this.list.length >= 90) {
          this.finished = true;
        }
      }, 2000);
    },
    // ha(i) {
    //   axios
    //     .post("http://localhost:3009/api/v1/admin/products", {
    //       quantity: 11,
    //       price: 39,
    //       // "_id": this.list[i].albumId,
    //       name: this.list[i].name,
    //       descriptions: this.list[i].description,
    //       coverImg: this.list[i].imageUrl,
    //       //"createdAt": this.name,
    //       //"updatedAt": this.name,
    //       // "__v": 0
    //     })
    //     .then((res) => {
    //       console.log(res);
    //     });
    // },

    /* for(let i=0,i<lthis.ist.length,i++){
     } */
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.index = this.$route.query.id;
    this.name = this.$route.query.name;
    //console.log(this.index,this.name)
    this.wan();
    this.userName();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {
    //console.log(this.flt)
    //this.list=this.flt
  }, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style  scoped>
.list {
  padding-top: 96px;
}
.top {
  display: flex;
  align-items: center;
}
h3 {
  color: red;
  width: 56%;
}
.van-icon {
  flex: 1;
  font-size: 30px;
}
.van-nav-bar {
  width: 100%;
  position: fixed;
  top: 0;
}
.ten {
  position: fixed;
  top: 46px;
  width: 100%;
  height: 50px;
  z-index: 10;
  background: ghostwhite;
}
.txt {
  border-radius: 20px;
  width: 90%;
  height: 30px;
  padding-left: 10px;
  margin-left: 10px;
  margin-top: 10px;
  z-index: 100;
}
.po {
  display: flex;
  width: 80px;
  align-items: center;
  position: absolute;
  z-index: 100;
  top: 10px;
  right: 0;
}
.po img {
  display: block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.po span {
  color: red;
  font-size: 14px;
  margin-left: 10px;
}
</style>
