<template>
  <div class="Remark">
    <div>
      <el-select class="select" v-model="newValue" placeholder="请选择书籍">
        <el-option
          v-for="item in options"
          :key="item.value"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div>
      <el-input
        class="textarea"
        type="textarea"
        :rows="2"
        placeholder="请输入内容"
        v-model="newComment">
      </el-input>
      <el-button type="primary" plain class="button" @click="sendcomment">发表评论</el-button>

    </div>
    <div class="commentText">
      <div v-for="comment in comments" :key="comment.id">
        <div class="bookName">《{{ comment.newValue }}》</div>
        <el-divider></el-divider>
        <div class="comment"> {{ comment.textarea }}</div>
      </div>
    </div>
    <div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Remark',
  data() {
    return {
      options: [{
        value: '三体1：地球往事'
      }, {
        value: '简·爱',
      }, {
        value: '平凡的世界',
      }, {
        value: '向北方',
      }, {
        value: '中国共产党简史',
      }, {
        value: '论中国共产党历史',
      }, {
        value: '觉醒年代',
      }, {
        value: '靠山',
      }, {
        value: '大医马海德',
      }, {
        value: '数字解读中国：中国的发展坐标与发展成就',
      }, {
        value: '中国北斗',
      }, {
        value: '王安石传',
      }, {
        value: '远去的白马',
      }, {
        value: '锦绣',
      }, {
        value: '北纬四十度',
      }, {
        value: '深海探秘：换一个角度看地球',
      }, {
        value: '一个女孩朝前走',
      }, {
        value: '回望：近代一百年',
      }, {
        value: '伏尔泰文集',
      }, {
        value: '星之继承者',
      }, {
        value: '尖帽子的魔法工坊',
      }, {
        value: '清代家族内的罪与刑',
      }, {
        value: '陀思妥耶夫斯基传',
      }, {
        value: '大唐帝国',
      }, {
        value: '消失的图书馆',
      }, {
        value: '海边的房间',
      }, {
        value: '下沉年代',
      }, {
        value: '巴黎圣母院',
      }
      ],
      value: '',
      textarea: '',
      newComment: "",
      comments: [],
      strData: '',
      newValue: '',
    }
  },
  methods: {
    getCommentsFromLocalStorage() {
      const savedComments = localStorage.getItem("comments");
      if (savedComments) {
        this.comments = JSON.parse(savedComments);
      }
    },
    saveCommentsToLocalStorage() {
      localStorage.setItem("comments", JSON.stringify(this.comments));
    },
    sendcomment() {
      if (this.newComment !== "") {
        const comment = {
          id: Date.now(),
          textarea: this.newComment,
          newValue: this.newValue,
        };
        this.comments.push(comment);
        this.newComment = "";
        this.saveCommentsToLocalStorage();
      }
    }
  },
  mounted() {
    this.getCommentsFromLocalStorage();
  }
}

</script>

<style scoped>
.Remark {
  width: 900px;
  height: 700px;
  box-shadow: 0 20px 12px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #eee;
  border-radius: 1px 1px 1px;
  padding: 20px;
  margin-left: 400px;

  .select {
    margin-left: -675px;
  }

  .textarea {
    margin-top: 20px;
  }

  .button {
    margin-top: 20px;
    float: right;
  }

  .commentText {
    margin-top: 70px;
  }

  .bookName {
    position: fixed;
    float: left;
  }

  .comment {
    color: #f56c6c;
  }
}

</style>

