<template>
  <el-card class="card">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      <!-- 输入框 -->
      <el-row>
        <el-col>
          <el-input
            clearable
            @clear="addAllUser()"
            placeholder="请输入内容"
            v-model="query"
            class="input-with-select"
          >
            <el-button slot="append" icon="el-icon-search" @click="searchUser()"></el-button>
          </el-input>
          <el-button type="success" plain class="btn_l" @click.prevent="addusersbtn()">添加用户</el-button>
        </el-col>
      </el-row>
    </el-breadcrumb>

    <el-table height="400px" :data="tableData" stripe style="width: 100%">
      <el-table-column prop="id" label="#" width="60"></el-table-column>
      <el-table-column prop="username" label="姓名" width="120"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="150"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="180"></el-table-column>
      <el-table-column label="创建日期" width="120">
        <template v-slot="scope">{{scope.row.create_time | fromDate}}</template>
      </el-table-column>
      <el-table-column label="用户状态" width="120">
        <!-- 开关 -->
        <template v-slot="scope">
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <!-- 以为里面的按钮都需要获取ID值，所以要使用template -->
        <template v-slot="scope">
          <el-button
            size="mini"
            plain
            type="primary"
            icon="el-icon-edit"
            circle
            @click="editData(scope.row)"
          ></el-button>
          <el-button size="mini" plain type="success" icon="el-icon-check" circle></el-button>
          <el-button
            size="mini"
            plain
            type="danger"
            icon="el-icon-delete"
            circle
            @click="deleteData(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <!-- handleSizeChange当每页条数改变时
    handleCurrentChange当前页码改变时
    current-page当前页
    total总条数-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="6"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 添加用户信息的对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form :model="formdata">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="formdata.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="formdata.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="formdata.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="formdata.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false" @click.prevent="addusers()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑用户数据 -->
    <el-dialog title="编辑用户" :visible.sync="editDialogFormVisible">
      <el-form :model="formdata">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input disabled v-model="formdata.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="formdata.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="formdata.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="editDialogFormVisible = false"
          @click.prevent="addEditUsers()"
        >确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      userSearch: "",
      tableData: [],
      query: "",
      pagenum: 1,
      pagesize: 6,
      //注意数字不要加引号
      dialogFormVisible: false,
      editDialogFormVisible: false,
      formdata: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      formLabelWidth: "100px",
      total: -1
    };
  },
  created() {
    this.nameList();
  },
  methods: {
    //在编辑框中点击修改按钮，进行编辑提交
    addEditUsers() {
      this.$http
        .put(`users/${this.formdata.id}`,this.formdata)
        .then((res) => {
          // console.log(res);
          const {meta: {msg,status},data} = res.data;
          if (status === 200) {
            this.editDialogFormVisible = false;
            this.nameList();
            this.$message.success(msg)
          }else {
            this.nameList();
            this.$message.warning(msg)
          }
        })
    },
    //点击编辑按钮，显示编辑框
    editData(user) {
      this.editDialogFormVisible = true;
      //渲染得到的数据
      this.$http
        .get(`users/${user.id}`)
        .then(res => {
        console.log(res);
        const {meta:{msg,status},data} = res.data;
        if (status === 200) {
          this.formdata = data;
        }
      });
    },
    //用户信息删除
    deleteData(ID) {
      // console.log(ID);
      this.$confirm("您是否删除次用户", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // this.$message.success("删除成功")
          this.$http
            // 这里使用的是单引号
            .delete(`users/${ID}`)
            .then(res => {
              const {
                data: {
                  meta: { msg, status }
                }
              } = res;
              if (status === 200) {
                this.$message.success(msg);
                //添加成功后重新执行namelist或许user数据，以及让页数回到第一页
                //这里要注意，一定要先让页数回到第一页，然后再执行函数，否则执行完函数再回到第一页数据不会完全渲染出来
                this.pagenum = 1;
                this.nameList();
              } else {
                this.$message.info(msg);
              }
              // console.log(res);
            });
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    //点击输入框里的清空“x”自动触发事件clear
    addAllUser() {
      (this.pagenum = 1), this.nameList();
    },
    //点击搜索按钮，搜索数据
    searchUser() {
      this.nameList();
    },
    //分页功能
    handleSizeChange(val) {
      this.pagesize = val;
      this.nameList();
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      this.nameList();
    },
    //弹出框添加数据
    addusers() {
      this.$http.post("users", this.formdata).then(res => {
        // console.log(res);
        const {
          data: {
            meta: { msg, status }
          }
        } = res;
        if (status === 201) {
          this.$message({
            message: msg,
            type: "success"
          });
          //添加成功后再执行namelist()相当于刷新页面重新给tableData赋值渲染页面
          this.nameList();
        } else {
          this.$message({
            message: msg,
            type: "error"
          });
        }
      });
    },
    //点击添加用户按钮显示弹出窗
    addusersbtn() {
      this.formdata = {};
      this.dialogFormVisible = true;
    },
    //home页面的用户页面面展示
    nameList() {
      //授权token
      const AUTH_TOKEN = localStorage.getItem("token");
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;

      this.$http
        .get(
          `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${
            this.pagesize
          }`
        )
        .then(res => {
          // console.log(res);
          const {
            data: { total, users },
            meta: { status, msg }
          } = res.data;
          if (status === 200) {
            this.tableData = users;
            this.total = total;
          } else {
            this.$message.warning(msg);
          }
        });
    }
  }
};
</script>

<style>
.card {
  height: 100%;
  position: relative;
}
.input-with-select {
  width: 450px;
  margin-top: 22px;
  margin-left: 6px;
}
</style>
