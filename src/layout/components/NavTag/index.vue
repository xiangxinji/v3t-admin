<template>
  <div class="nav-tag">
    <div class="tagger-container" >
          <div :class="{'tag-item' : true , 'active' : state.currentPath === i.path }" v-for="(i,ind) in tags" :key="i.path" @click="activeTagHandler($event , i )">
            {{ i.name }}
            <span class="close" @click.stop="closeTagHandler(i , ind )" v-if="tags.length > 1 && getCloseState(i.path)">
             <i class="el-icon-close"></i>
            </span>
          </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import {
  createState,
  useNavTag,
} from './utils';

export default defineComponent({
  setup() {
    const route = useRoute();
    const store = useStore();
    const router = useRouter();
    const { state } = createState();
    const tags = computed(() => store.getters.tags);
    return reactive({
      state,
      tags,
      ...useNavTag({
        state, store, router, route, tags,
      }),
    });
  },
});
</script>

<style lang="scss" scoped>
@mixin tag-item ($is-active , $primary-theme , $secondary-theme , $primary-text-color : #fff ) {
  .close{background-color:rgba(0,0,0,0);
        transition:background-color .3s ease-in-out;border-radius: 50%;}
  @if $is-active {
    background-color : $primary-theme;
    color:$secondary-theme;
    border:solid 1px  $primary-theme;
    .close:hover{
      background-color:$secondary-theme;
      color:  $primary-theme;
    }
  } @else {
    user-select:none;
    cursor: pointer;
    min-width:50px;
    text-align: center;
    padding:4px 4px;
    border: 1px solid $secondary-theme;
    display:inline-block;
    border-radius: 2px;
    &:not(:last-child){margin-right:8px;}
    &:hover{
      color:$primary-theme;
      border: 1px solid $primary-theme;
    }
    .close{
      padding:1px;
      display:inline-block;
      line-height:12px;
      box-sizing: border-box;
      text-align: center;

      &:hover{
        background-color: $primary-theme;
        color:$primary-text-color;
      }
    }
  }
}
.nav-tag{
  height: 40px;
  background: #FFFFFF;
  border: 1px solid #E2E2E2;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  font-size:12px;
  color:#716F6F;
  display:flex;
  align-items:center;
  padding:0 10px;
  .tagger-container{
    width:100%;
    white-space:nowrap;
    overflow: hidden;
    position: relative;
    display:flex;
    align-items:center;
    height:100%;
    .scroll-panel{
      width:100%;
      position: absolute;
      left:0;
      top:50%;
      transform: translateY(-50%);
    }
    .tag-item{@include tag-item(false , #2D8CF0 , #716F6F)}
    .tag-item.active{@include tag-item(true , #2D8CF0 , #fff)}
  }
}
</style>
