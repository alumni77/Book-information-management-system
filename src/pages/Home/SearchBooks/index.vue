<template>
  <div class="search">
    <div>
      <el-input v-model="search" placeholder="请输入您要搜索的书名/作者" :prefix-icon="searchIcon"/>
    </div>
    <div class="dormitoryData">
      <el-table
        :data="tables"
        style="width: 100%"
        max-height="470"
        @sort-change="sort_change"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="图书名称:">
                <span>{{ props.row.bookName }}</span>&nbsp;
                <el-button
                  @click="changeBookName(props.row)"
                  class="modify"
                  type="text"
                  size="mini"
                  icon="el-icon-edit"
                >修改
                </el-button>
              </el-form-item>
              <el-form-item label="图书作者:">
                <span>{{ props.row.author }}</span>&nbsp;
                <el-button
                  @click="changeBookAuthor(props.row)"
                  class="modify"
                  type="text"
                  size="mini"
                  icon="el-icon-edit"
                >修改
                </el-button>
              </el-form-item>
              <el-form-item label="书籍位置:">
                <span>{{ props.row.position }}</span>&nbsp;
                <el-button
                  @click="changeBookPosition(props.row)"
                  class="modify"
                  type="text"
                  size="mini"
                  icon="el-icon-edit"
                >修改
                </el-button>
              </el-form-item>
              <el-form-item label="当前库存:">
                <span>{{ props.row.amount }}</span> &nbsp;
                <el-button
                  @click="changeBookAmount(props.row)"
                  class="modify"
                  type="text"
                  size="mini"
                  icon="el-icon-edit"
                >修改
                </el-button>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="图书名称" prop="bookName">
        </el-table-column>
        <el-table-column label="图书作者" prop="author">
        </el-table-column>
        <el-table-column sortable label="书籍位置" prop="position">
        </el-table-column>
        <el-table-column sortable label="当前库存" prop="amount" sortable="custom">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              plain
              @click="bookReserve(scope.$index,scope.row)"
            >预约
            </el-button>
            <el-popconfirm
              title="确认删除该书籍吗？"
              style="float: right;"
              @confirm="deleteRow(scope.$index,scope.row,'del')"
            >
              <el-button size="mini" type="danger" slot="reference"
              >删除书籍
              </el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'SearchBooks',
  data() {
    return {
      search: '',
      currentDate: null,
      searchIcon: 'el-icon-search',
      bookData: [{
        bookName: '三体1：地球往事',
        author: '刘慈欣',
        position: '01#12A#1-1',
        amount: '32',
      }, {
        bookName: '简·爱',
        author: '夏洛蒂·勃朗特',
        position: '02#01B#2-2',
        amount: '15',
      }, {
        bookName: '平凡的世界',
        author: '路遥',
        position: '03#02B#3-1',
        amount: '89',
      }, {
        bookName: '向北方',
        author: '李红梅、刘仰东',
        position: '03#02B#3-2',
        amount: '12',
      }, {
        bookName: '中国共产党简史',
        author: '人民出版社',
        position: '03#02C#3-1',
        amount: '432',
      }, {
        bookName: '论中国共产党历史',
        author: '中央文献出版社',
        position: '03#02C#3-2',
        amount: '235',
      }, {
        bookName: '觉醒年代',
        author: '龙平平',
        position: '03#02C#3-3',
        amount: '13',
      }, {
        bookName: '靠山',
        author: '铁流',
        position: '03#02C#3-4',
        amount: '34',
      }, {
        bookName: '大医马海德',
        author: '陈敦德',
        position: '03#02C#3-5',
        amount: '32',
      }, {
        bookName: '数字解读中国：中国的发展坐标与发展成就',
        author: '贺耀敏、甄峰',
        position: '03#02C#3-6',
        amount: '77',
      }, {
        bookName: '中国北斗',
        author: '龚盛辉',
        position: '03#02C#3-7',
        amount: '56',
      }, {
        bookName: '王安石传',
        author: '崔铭',
        position: '03#02B#3-3',
        amount: '43',
      }, {
        bookName: '远去的白马',
        author: '朱秀海',
        position: '03#02C#3-8',
        amount: '26',
      }, {
        bookName: '锦绣',
        author: '李铁',
        position: '03#02C#3-9',
        amount: '54',
      }, {
        bookName: '北纬四十度',
        author: '陈福民',
        position: '03#02B#3-4',
        amount: '435',
      }, {
        bookName: '深海探秘：换一个角度看地球',
        author: '张建松',
        position: '03#02B#3-5',
        amount: '54',
      }, {
        bookName: '一个女孩朝前走',
        author: '阮梅',
        position: '03#02B#3-6',
        amount: '33',
      }, {
        bookName: '回望：近代一百年',
        author: '马勇',
        position: '03#02B#3-7',
        amount: '45',
      }, {
        bookName: '伏尔泰文集',
        author: '伏尔泰',
        position: '03#02B#3-8',
        amount: '3',
      }, {
        bookName: '星之继承者',
        author: '詹姆斯·P·霍根',
        position: '03#02B#3-9',
        amount: '54',
      }, {
        bookName: '尖帽子的魔法工坊',
        author: '白滨鸥 ',
        position: '03#02B#3-10',
        amount: '23',
      }, {
        bookName: '清代家族内的罪与刑',
        author: '魏道明',
        position: '03#02F#3-1',
        amount: '65',
      }, {
        bookName: '陀思妥耶夫斯基传',
        author: '安德里亚斯·古斯基',
        position: '01#02F#3-2',
        amount: '42',
      }, {
        bookName: '大唐帝国',
        author: '宫崎市定',
        position: '01#02E#3-6',
        amount: '65',
      }, {
        bookName: '消失的图书馆',
        author: '叶锦鸿',
        position: '01#02D#3-2',
        amount: '24',
      }, {
        bookName: '海边的房间',
        author: '黄丽群',
        position: '01#02B#4-6',
        amount: '23',
      }, {
        bookName: '下沉年代',
        author: '乔治·帕克',
        position: '01#02A#3-9',
        amount: '45',
      }, {
        bookName: '巴黎圣母院',
        author: '维克多·雨果',
        position: '01#12A#1-2',
        amount: '89',
      }],
      sortRule: {prop: null, order: null},

    }
  },
  methods: {
    sort_change(colum) {
      console.log(colum)
      if (colum.order === 'ascending') {
        this.tables = this.tables.sort((a, b) => {
          return a.amount - b.amount;
        })
      } else if (colum.order === 'descending') {
        this.tables = this.tables.sort((a, b) => {
          return b.amount - a.amount
        })
      }
    },
    changeBookName(row) {
      this.$prompt("请输入新书名", "修改书名", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: row.bookName,
      })
        .then(({value}) => {
          row.bookName = value;
          this.$message({
            type: "success",
            message: "书名修改成功",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    changeBookAuthor(row) {
      this.$prompt("请输入作者名", "修改作者名", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: row.author,
      })
        .then(({value}) => {
          row.author = value;
          this.$message({
            type: "success",
            message: "作者名修改成功",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    changeBookPosition(row) {
      this.$prompt("请输入位置", "修改位置", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: row.position,
      })
        .then(({value}) => {
          row.position = value;
          this.$message({
            type: "success",
            message: "位置修改成功",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    changeBookAmount(row) {
      this.$prompt("请输入库存", "修改库存", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: row.amount,
      })
        .then(({value}) => {
          row.amount = value;
          this.$message({
            type: "success",
            message: "库存修改成功",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    deleteRow(index, row, type) {
      if (type === 'del') {
        this.bookData.splice(index, 1);
      }
    },
    bookReserve(index, row) {
      let time = moment().format('YYYY年MM月DD日 HH:mm:ss');
      let bookName = row.bookName;
      let author = row.author;
      const data = {
        date: time,
        bookName: bookName,
        author: author,
      }
      const storedData = localStorage.getItem('myData');
      let dataArray = [];
      if (storedData) {
        dataArray = JSON.parse(storedData);
      }
      const newDate = {
        id: Date.now().toString(),
        value: data
      };
      if (!Array.isArray(dataArray)) {
        dataArray = [dataArray];
      }
      dataArray = dataArray.concat([newDate]);
      localStorage.setItem('myData', JSON.stringify(dataArray));
      this.$message.success('预约成功');
    }
  },
  computed: {
    tables() {
      const search = this.search;
      if (search) {
        return this.bookData.filter(data => {
          return Object.keys(data).some(key => {
            return String(data[key]).toLowerCase().indexOf(search) > -1
          })
        })
      }
      return this.bookData;
    }
  },
}
</script>


<style scoped>
.search {
  width: 900px;
  height: 500px;
  box-shadow: 0 20px 12px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #eee;
  border-radius: 1px 1px 1px;
  padding: 20px;
  margin-left: 400px;
}

.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 75%;
}


</style>


