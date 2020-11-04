<template>
  <div class="login">
    <van-form @submit="onSubmit">
    <van-row gutter="20">
      <van-col span="9"></van-col>
      <van-uploader :after-read="afterRead" v-model="img" :max-count="1" multiple/>
    </van-row >
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
        <van-field
        v-model="nickName"
        name="昵称"
        label="昵称"
        placeholder="昵称"
        :rules="[{ required: true, message: '请填写用昵称' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        v-model="repwd"
        type="password"
        name="确认密码"
        label="确认密码"
        placeholder="请再次输入密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"  color="#FF0000" size="20rem">
          注册
        </van-button>
      </div>
    </van-form>
    <div class="age">
      <div class="age-right">
        <router-link :to="{ name: 'Login' }">已有帐号，我要登录</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { Notify } from "vant";
import axios from 'axios'
import { regApi } from "../untils/auth";
export default {
  name: "Reg",
  data() {
    return {
      username: "",
      password: "",
      repwd: "",
      nickName:"",
      avatar: '',
      img:[]
    };
  },
  methods: {
   afterRead(file) {
        // 此时可以自行将文件上传至服务器
        console.log(file);
        const formData = new FormData()
        formData.append('file', file.file)
      axios
        .post(" http://localhost:3009/api/v1/common/file_upload",formData)
        .then((res) => {
          console.log(res);
          this.avatar = res.data.info;
          this.img = [{url:'http://localhost:3009'+res.data.info, isImage: true}];
        });
      },
    async onSubmit() {
      if (this.password === this.repwd) {
        const result = await regApi({
          userName: this.username,
          password: this.password,
          avatar:this.avatar,
          nickName:this.nickName
        });
        if (result.code === "success") {
          console.log(result.code);
          localStorage.setItem("token", result.token);
          console.log(localStorage.getItem("token"))
          this.$router.push({
            name: "Login",
          });
        } else {
          Notify({
            type: "danger",
            message: "result.message",
          });
        }
        console.log(result);
      } else {
        Notify({
          type: "danger",
          message: "两次输入密码不一致",
        });
      }
    },
  },
};
</script>

<style>
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
