<template>
  <div class="pager">
    <el-pagination
      background
      layout=" prev, pager, next, sizes"
      @current-change="changeCurrent"
      @size-change="changeSize"
      v-model:current-page="pagination.current"
      :total="pagination.total"
      :page-sizes="pagination.sizes"
    >
    </el-pagination>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { debounce } from '@/utils/functions';

export default defineComponent({
  props: {
    data: { type: Object, required: true },
  },
  setup(props, { emit }) {
    const pagination = ref(props.data);
    const emitChange = debounce(() => emit('change'));
    const changeCurrent = (v : number) => {
      pagination.value.current = v;
      emitChange();
    };
    const changeSize = (v:number) => {
      pagination.value.size = v;
      emitChange();
    };
    watch(() => pagination.value, (v) => {
      emit('update:data', v);
    }, { deep: true });
    return {
      pagination,
      changeCurrent,
      changeSize,
    };
  },
});
</script>
<style lang="scss" scoped>
.pager{
  padding:10px 0;
  display:flex;
  flex-direction: row-reverse;
}
</style>
