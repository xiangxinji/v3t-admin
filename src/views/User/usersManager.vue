<template>
  <div class="page users-manager">
    <el-table
      :row-key="row => row.id"
      :data="state.data"
      style="width: 100%">
      <el-table-column prop="id" label="ID"> </el-table-column>
      <el-table-column prop="username" label="用户名"> </el-table-column>
      <el-table-column prop="nickName" label="名称"> </el-table-column>
      <el-table-column prop="createTime" label="创建时间"> </el-table-column>
      <el-table-column label="操作">
       <template>
         <el-button  v-permission="['user-edit']">编辑</el-button>
         <el-button type="text">删除</el-button>
       </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
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
    const state = reactive({
      data: [
        {
          id: 1, username: '张三', nickName: '李四', creteTime: '2020-1-1',
        },
      ],
    });
    return {
      state,
    };
  },
});
</script>
<style lang="scss" scoped>

</style>
