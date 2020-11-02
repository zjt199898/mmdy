<template>
  <div class="login">
    <van-form @submit="onSubmit">
      <van-row gutter="20">
        <van-col span="9"></van-col>
        <van-uploader
          :after-read="afterRead"
          v-model="img"
          :max-count="1"
          multiple
        />
      </van-row>
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请修改用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请修改密码' }]"
      />
      <div style="margin: 16px">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          color="#FF0000"
          size="20rem"
        >
          修改完成
        </van-button>
      </div>
    </van-form>
    <div class="age">
      <div class="age-right">

      </div>
    </div>
  </div>
</template>

<script>
import { Notify } from "vant";
import axios from "axios";
import { regApi } from "../untils/auth";
export default {
  name: "ChangeLogin",
  data() {
    return {
      username: "",
      password: "",
      avatar: "",
      img: [],
    };
  },
  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
      const formData = new FormData();
      formData.append("file", file.file);
      axios
        .post(" http://localhost:3009/api/v1/common/file_upload", formData)
        .then((res) => {
          console.log(res);
          this.avatar = res.data.info;
          this.img = [
            { url: "http://localhost:3009" + res.data.info, isImage: true },
          ];
        });
    },
    async onSubmit() {
      const result = await regApi({
        userName: this.username,
        password: this.password,
        avatar: this.avatar,
      });
      if (result.code === "success") {
        console.log(result.code);
        localStorage.setItem("token", result.token);
        this.$router.push({
          name: "Mine",
        });
      } else {
        Notify({
          type: "danger",
          message: "result.message",
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
