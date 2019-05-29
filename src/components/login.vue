<template>
  <div class="log_bgc">
    <div class="log_box">
      <el-form>
        <p class="log_name">用户登陆</p>
        <label for="用户名" class="lab_f">用户名称</label>
        <el-input v-model="formData.username" class="box_b" placeholder="请输入用户名"></el-input>
        <label for="密码" class="lab_f">密码</label>
        <el-input v-model="formData.password" show-password placeholder="请输入密码"></el-input>
        <el-button type="primary" class="btn_w" @click.prevent="userLog()">登陆</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        username: "",
        password: ""
      }
    };
  },
  mounted() {
    // console.log(this.$http)
  },
  methods: {
    userLog() {
      this.$http.post(`login`, this.formData).then(res => {
        //结构赋值
        // console.log(res);
        const {data: {meta: { msg, status },data}} = res;
        if (status === 200) {
          //保存登陆成功后用户数据的唯一标识   后端接口返回的的数据data里面就有这个token
          localStorage.setItem("token", data.token);
          
          //登陆成功后页面的提示信息
          // console.log(token)
          this.$message({
            message: msg,
            type: "success"
          });
          this.$router.push({
            name: "home"
          });
        } else {
          this.$message({
            message: msg,
            type: "error"
          });
        }
      });
    }
  }
};
</script>

<style>
.log_bgc {
  background-color: #324154;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.log_box {
  width: 500px;
  height: 400px;
  border: 1px solid white;
  background-color: #fff;
  margin-top: 110px;
  padding: 30px;
  border-radius: 20px;
  margin-bottom: 54px;
}
.log_name {
  font-size: 26px;
  font-weight: bold;
  font-family: "宋体";
  margin-bottom: 36px;
}
.lab_f {
  font-size: 18px;
  display: block;
  margin-bottom: 28px;
}
.box_b {
  margin-bottom: 40px;
}
.btn_w {
  width: 100%;
  margin-top: 40px;
  font-size: 20px;
}
</style>
