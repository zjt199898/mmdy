<template>
  <div class="login">
    <van-form @submit="onSubmit">
      <van-field
        v-model="oldpassword"
        type="password"
        label="原密码"
        placeholder="请输入原始密码"
        :rules="[{ required: true, message: '请填写原密码' }]"
      />
      <van-field
        v-model="newpassword"
        type="password"
        label="新密码"
        placeholder="请再次输入新密码"
        :rules="[{ required: true, message: '请填写新密码' }]"
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
  </div>
</template>

<script>
import { post } from "../untils/request";
import { Toast } from "vant";

export default {
  name: "ChangePass",
  data() {
    return {
      oldpassword: "",
      newpassword: "",
    };
  },
  methods: {
    onSubmit() {
      post("/api/v1/users/change_pwd", {
        oldPassword: this.oldpassword,
        password: this.newpassword,
      }).then((res) => {
        console.log(res, res.password);
        if (res.code == "success") {
          Toast.success(res.massage);
          this.$router.push({ name: "Mine" });
        } else {
          Toast.fail(res.message);
        }
      });
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
