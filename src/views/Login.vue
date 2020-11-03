<template>
  <div class="login">
    <div class="img">
      <van-image round width="6rem" height="6rem" :src="picture" />
    </div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit" color="#FF0000" size="20rem">
          登录
        </van-button>
      </div>
    </van-form>
    <div class="age">
      <div class="age-left">
        <router-link></router-link>
      </div>
      <div class="age-right">
        <router-link :to="{ name: 'Reg' }">免费注册</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { get } from "../untils/request";
import { Notify } from "vant";
import { loginApi } from "../untils/auth";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      picture: "",
    };
  },
  methods: {
    async onSubmit() {
      // console.log("submit", values);
      const result = await loginApi({
        userName: this.username,
        password: this.password,
      });
      console.log(result);
      if (result.code === "success") {
        console.log(result.code);
        localStorage.getItem("token", result.token);
        this.$router.push({
          name: "Mine",
        });
      } else {
        Notify({
          type: "danger",
          message: "密码错误",
        });
      }
    },
  },
  created() {
    get("/api/v1/users/info").then((res) => {
      console.log(res);
      this.picture = "http://localhost:3009" + res.avatar;
      localStorage.setItem("userName",JSON.stringify(res.userName));
      localStorage.setItem("avatar",JSON.stringify(res.avatar));
    });
  },
};
</script>

<style scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.age {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
</style>