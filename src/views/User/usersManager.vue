<template>
  <div class="page users-manager">
    <el-input v-model="state.query.name"></el-input>
    <el-table
      :data="state.data"
      style="width: 100%">
      <el-table-column prop="id" label="ID"> </el-table-column>
      <el-table-column prop="username" label="用户名"> </el-table-column>
      <el-table-column prop="nickName" label="名称"> </el-table-column>
      <el-table-column prop="createTime" label="创建时间"> </el-table-column>
      <el-table-column label="操作">
        <el-button type="text" v-permission="['user-edit']">编辑</el-button>
        <el-button type="text">删除</el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { query } from '@/api/user';
import { useLoadTable } from '@/hooks/loaders';
import { useStore } from 'vuex';

type User = {
  id : number
  username : string
  nickName : string
  createTime : string
}
const defaultQuery = {
  name: '',
  deep: {
    name: 123,
  },
};

export default defineComponent({
  setup() {
    const [state] = useLoadTable<User>(query, { defaultQuery, immediate: true });
    const store = useStore();
    console.log(store.state.user.perms);
    return {
      state,
    };
  },
});
</script>
<style lang="scss" scoped>

</style>
