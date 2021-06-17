<template>
  <div class="page users-manager">
    <el-input v-model="s.input"></el-input>
    <el-table
      :data="state.dataSource"
      style="width: 100%"
    >
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
    <pager v-model:data="state.pagination"  @change="crudRefresh"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useQuery } from '@/hooks/data';
import pager from '@/components/pager/default.vue';

export default defineComponent({
  components: {
    pager,
  },
  setup() {
    const [state, handlers] = useQuery({ url: '/user/query' });
    const s = reactive({
      input: 1,
    });
    return {
      state,
      ...handlers,
      s,
    };
  },
});
</script>
<style lang="scss" scoped>

</style>
