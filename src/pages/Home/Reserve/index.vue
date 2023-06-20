<template>
  <div class="Reserve">
    <div class="table">
      <el-table
        :data="reserve"
        style="width: 100%"
        ref="table"
        max-height="470">
        <el-table-column width="40"></el-table-column>
        <el-table-column prop="date" label="预约日期"></el-table-column>
        <el-table-column prop="bookName" label="书籍名称"></el-table-column>
        <el-table-column prop="author" label="图书作者"></el-table-column>

        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-popconfirm
              title="确认取消该预约吗？"
              style="margin-right:10px"
              v-if="scope.row.status !== '已借阅'"
              @confirm="deleteRow(scope.$index,scope.row,'del')"
            >
              <el-button v-if="scope.row.status !== '已借阅'" size="mini" type="warning" plain slot="reference">取消预约</el-button>
            </el-popconfirm>
            <el-popconfirm
              v-if="scope.row.status !== '已借阅'"
              title="确认借阅该书籍吗？"
              @confirm="borrowBook(scope.row)"
            >
              <el-button size="mini" type="primary" plain slot="reference">确认借书</el-button>
            </el-popconfirm>
            <el-button
              v-if="scope.row.status === '已借阅'"
              size="mini"
              disabled
              style="margin-left: 40px"
            >已借阅</el-button>

          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>

</template>

<script>

export default {
  name: 'Reserve',
  data() {
    return {
      reserve: []
    }
  },
  methods:{
    deleteRow(index, row, action) {
      if (action === 'del') {
        this.reserve.splice(index, 1);
        row.status = '';
      } else {
        console.log('confirm borrow');
      }
      localStorage.setItem('myData', JSON.stringify(this.reserve));
    },
    borrowBook(row) {
      row.status = '已借阅';
      row.cancelBtnShow = false;
      localStorage.setItem('myData', JSON.stringify(this.reserve));
    }
  },
  created() {
    const storedData = localStorage.getItem('myData');
    if (storedData) {
      const dataArray = JSON.parse(storedData);
      for (let i = 0; i < dataArray.length; i++) {
        const valueObj = dataArray[i].value;
        const date = valueObj.date;
        const bookName = valueObj.bookName;
        const author = valueObj.author;

        const newData = {
          date: date,
          bookName: bookName,
          author: author,
          status: '待借阅',
          cancelBtnShow: true
        };
        this.reserve.push(newData);
        this.$nextTick(() => {
          this.$refs.table.doLayout();
        })
      }
    }
  }

} </script>


<style scoped>
.Reserve {

  width: 900px;
  height: 450px;
  box-shadow: 0 20px 12px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #eee;
  border-radius: 1px 1px 1px;
  padding: 20px;
  margin-left: 400px;
}
</style>
