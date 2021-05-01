<template>
  <div class="page users-manager">
    <el-table
      :data="[]"
      style="width: 100%">
      <el-table-column prop="id" label="ID"> </el-table-column>
      <el-table-column prop="username" label="用户名"> </el-table-column>
      <el-table-column prop="nickName" label="名称"> </el-table-column>
      <el-table-column prop="createTime" label="创建时间"> </el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button v-permission="['admin','add']" :key="scope.id">编辑</el-button>
          <el-button >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

const query = {
  username: '',
  phone: '',
};
export default defineComponent({
  components: {
  },
  setup() {
    return {
    };
  },
});
</script>
<style lang="scss" scoped>

</style>
