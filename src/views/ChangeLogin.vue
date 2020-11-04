<template>
  <div class="login">
    <van-form @submit="onSubmit">
      <van-row gutter="20">
        <van-col span="8"></van-col>
        <div v-if="r">
          <van-image
            width="5rem"
            height="5rem"
            :src="picture"
            @click="loginOut"
          />
        </div>
        <div v-else>
          <van-uploader
            :after-read="afterRead"
            v-model="img"
            :max-count="1"
            multiple
          />
        </div>
        <van-col span="8"></van-col>
      </van-row>
      <van-field
        v-model="nickName"
        name="昵称"
        label="昵称"
        placeholder="昵称"
        :rules="[{ required: true, message: '请填写用昵称', trigger: 'blur' }]"
      />
      <div style="margin: 16px">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          color="#FF0000"
          size="20rem"
          @click="nn"
        >
          修改完成
        </van-button>
      </div>
    </van-form>
    <div class="age">
      <div class="age-right"></div>
    </div>
  </div>
</template>

<script>
import { post } from "../untils/request";
import { get } from "../untils/request";
import axios from "axios";
import { Toast } from "vant";

export default {
  name: "ChangeLogin",
  data() {
    return {
      username: "",
      password: "",
      nickName: "",
      avatar: "",
      img: [],
      picture: "",
      r: true,
    };
  },
  methods: {
    //获取头像和昵称
    nn() {
      get("/api/v1/users/info").then((res) => {
        this.picture = "http://localhost:3009" + res.avatar;
        this.nickName = res.nickName;
      });
    },
    //修改头像
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
    //修改昵称
    onSubmit() {
      post("/api/v1/users/change_info", {
        nickName: this.nickName,
        avatar: this.avatar,
      }).then((res) => {
        console.log(res);
        if (res.code == "success") {
          Toast.success("修改成功");
          this.$router.push({ name: "Mine" });
        } else {
          Toast.fail("请继续修改");
        }
      });
    },
    loginOut() {
      this.r = !this.r;
    },
  },
  created() {
    this.nn();
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
