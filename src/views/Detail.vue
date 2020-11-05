<!--  -->
<template>
<div class='deta'  @click.self="dl()">
<div class="po"><img :src="srcImg" alt="">
<span>{{username}}</span>
</div>
<div  v-for="(item,i) in list"
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
<van-divider />
<div class="cent">
<span>{{item.name}}</span>
<van-icon :name="cc" @click="fas?showPopup(item._id,item.name,i):dele(List[i]._id,i)"    :class="fas?'aaa':'bbb'"/>

</div>
<van-divider />
<div class="divider">简介:</div>
<van-divider />
<div class="nr">{{item.descriptions}}</div>
</div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { loadCarts, loadUser } from "../services/carts";
import axios from "axios";
import { Toast } from "vant";
import { detCarts } from "../services/carts";
import { addToCart } from "../services/carts";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      list: [],
      List: [],
      listCook: {},
      fas: true,
      name: "",
      cntent:"",
      Name: "",
      cc: "star-o",
      id: "",
      value: 3,
      srcImg: "",
      username: "",
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    /* 获取用户信息,查看用户有没有登录,如果登录了跳转到个人中心，没有的话跳转到登录页面*/
    dl() {
      if (localStorage.getItem("token")) {
        location.href = "/#/mine";
      } else {
        location.href = "/#/login";
      }
    },
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
    //点击小星星亮，添加购物车
    async showPopup(id, name) {
      //判断用户有没有登录，没有登录跳转到登录页面
      if (!localStorage.getItem("token")) {
        Toast.success("您还没有登录！请登录");
        setTimeout(() => {
          location.href = "/#/login";
        }, 2000);
        return;
      }
      if (this.fas) {
        this.cc = "star";
        Toast.success("收藏成功");
        const res = await addToCart(id, 1);
        console.log(res);
        if (res.code == "success") {
          //存本地，根据电影名存储
          this.listCook[name] = id;
          localStorage.setItem(name, JSON.stringify(this.listCook));
        }
      }
      this.fas = !this.fas;
      //location.reload();
    },
    //获取详情
    dataList() {
      axios
        .get("http://localhost:3009/api/v1/products/" + this.id)
        .then((res) => {
          this.list.push(res.data);
          console.log(this.list);
        });
    },
    onClickLeft() {
      //window.history.go(-1)
      location.href = "/#/list";
    },
    //点击小星星暗淡，删除购物车数据
    async dele(id) {
      const res = await detCarts(id);
      console.log(res);

      this.cc = "star-o";
      Toast.success("取消收藏成功");
      //删除本地数据
      localStorage.removeItem(this.Name);

      this.fas = !this.fas;
    },
    /* 判断用户有没有登录，登录的话，获取购物车数据 */
    async quList() {
      if (localStorage.getItem("token")) {
        const res = await loadCarts();
        this.List = res;
        this.List.reverse();
        console.log(this.List);
      }
      /*  this.List.reverse() */
      //console.log(localStorage.getItem("token"))
      //localStorage.removeItem("token")
    },

    /*   Colors(){
    console.log(this.$refs.red)
    this.$refs.red.style.color="red"
  } */
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.id = this.$route.query.id;
    this.Name = this.$route.query.name;
    console.log(this.id, this.Name);
    console.log(localStorage.getItem(this.Name));
    this.dataList();
    this.quList();
    this.userName();
    //判断本地中是否有此电影的存储，如果有让星星亮起来，没有的话默认为没有收藏标志
    if (localStorage.getItem(this.Name) != null) {
      this.fas = false;
      this.cc = "star";
    }
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
};
</script>
<style  scoped>
img {
  width: 100%;
}
.cent {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.cent span {
  font-size: 20px;
  font-weight: bold;
  color: crimson;
  margin-left: 15px;
}
.van-icon {
  font-size: 24px;
  /* color: orange; */
  margin-right: 15px;
}
.aaa {
  color: orange;
}
.bbb {
  font-weight: bold;
  color: red;
}
.divider{
  font-size: 20px;
  font-weight: bold;
  color: fuchsia;
}
.van-nav-bar {
  width: 100%;
  position: fixed;
  top: 0;
}
.deta {
  padding-top: 46px;
}
.van-popup {
  font-size: 20px;
  font-weight: bold;
  color: red;
  text-align: center;
  line-height: 200px;
}
.pin {
  width: 100%;
  display: flex;
  align-items: center;
}
.pin span {
  color: crimson;
  font-weight: bold;
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
/* .nr span{
  display: block;
  width: 10px;
  height: 10px;
} */

</style>