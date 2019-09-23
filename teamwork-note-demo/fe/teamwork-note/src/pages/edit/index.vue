<template>
  <div>
    <mavon-editor :value="value" @change="changeValue" @save="save" />
    <el-dialog :visible.sync="showGetTitle" title="输入一个文章的标题吧">
      <el-input v-model="airticalTitle" placeholder="请输入内容"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showGetTitle = false">取 消</el-button>
        <el-button type="primary" @click="ok">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import io from "socket.io-client";
export default {
  socket: null,
  data() {
    return {
      value: "",
      updateFlag: false,
      textarea: null,
      airticalTitle: "",
      showGetTitle: false
    };
  },
  mounted() {
    this.socket = io("http://localhost:3000");
    this.socket.on("connect", () => {});
    this.socket.on("changeMessage", res => {
      const start = this.textarea.selectionStart;
      const end = this.textarea.selectionEnd;
      this.updateFlag = false;
      this.value = res;
      this.$nextTick(() => {
        this.textarea.selectionStart = start;
        this.textarea.selectionEnd = end;
      });
    });
    this.textarea = document.getElementsByTagName("textarea")[0];
  },
  methods: {
    changeValue(val) {
      if (!this.updateFlag) {
        this.updateFlag = true;
        return;
      }
      this.socket.emit("changeMessage", val);
    },
    save() {
      this.showGetTitle = true;
    },
    ok() {
      this.showGetTitle = false;
      this.$axios.post("http://localhost:3000/api/airticle", {
        title: this.airticalTitle,
        content: this.value,
      });
    }
  }
};
</script>

<style lang="less">
html,
body,
#app,
#app > div,
.v-note-wrapper {
  height: 100%;
}
</style>