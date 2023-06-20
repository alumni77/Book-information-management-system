<template>
  <div class="introduce">
    <el-descriptions class="margin-top" title="用户信息" :column="2">
      <el-descriptions-item label="你好">{{ strData }}！</el-descriptions-item>
      <el-descriptions-item label="用户信息">阅读者</el-descriptions-item>
    </el-descriptions>
    <h3>本图书信息管理中心有四个功能：</h3>
    <div class="text">
      <p> “查询图书”：对图书进行搜索、排序查询，对图书的相关信息进行修改以及预约和删除图书</p>
      <p>“预约记录”：对图书的预约信息进行修改，可以取消预约以及进一步确认借阅图书</p>
      <p> “交流社区”：可以选择相关图书发表评论</p>
      <p> “退出账号”：登出</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Introduce',
  data() {
    return {
      strData: ''
    }
  },
  mounted() {
    const data = localStorage.getItem('username');
    if (data) {
      this.strData = data;
    }
  }
}

</script>

<style>
.introduce {

  width: 900px;
  height: 450px;
  box-shadow: 0 20px 12px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #eee;
  border-radius: 1px 1px 1px;
  padding: 20px;
  margin-left: 400px;

  .text {
    text-align: justify;
    text-justify: inter-ideograph;
  }

}
</style>
