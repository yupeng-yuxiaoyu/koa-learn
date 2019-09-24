<template>
  <div>
    <ul class="airticle-list" v-if="list.length > 0">
      <li class="list-item" v-for="(item, index) in list" :key="index">
        <div class="title">{{item.title}}</div>
        <div class="content">{{item.content}}</div>
        <el-button type="primary" icon="el-icon-edit" circle></el-button>
        <el-button type="success" icon="el-icon-view" circle></el-button>
        <el-button type="danger" icon="el-icon-delete" circle></el-button>
      </li>
      <el-button type="primary" @click="createAirticle">创建文章</el-button>
    </ul>
    <el-button type="primary" v-else @click="createAirticle">还没有文章，点击创建</el-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list: [],
      }
    },
    mounted () {
      this.$axios.get('http://localhost:3000/api/airticleList').then(res => {
        console.log(res);
        this.list = res.data.data.airticle_list;
      });
    },
    methods: {
      createAirticle() {
        this.$router.push('/edit');
      }
    },
  }
</script>

<style lang="scss" scoped>
ul, li {
  list-style: none;
}
</style>