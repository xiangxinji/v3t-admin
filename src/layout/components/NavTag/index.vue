<template>
  <div class="nav-tag">
    <div class="tagger-container" ref="scrollRef">
          <div :class="{'tag-item' : true , 'active' : state.currentIndex === i}" v-for="i in 40" :key="i" @click="handleActiveTag($event , i )">
            系统管理 + {{ i }}
            <span class="close" @click="handleCloseTag">
             <i class="el-icon-close"></i>
            </span>
          </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { createActiveFunc, createState, createCloseFunc } from './utils';

export default defineComponent({
  setup() {
    const { state, scrollRef } = createState();
    return {
      state,
      handleActiveTag: createActiveFunc(scrollRef, state),
      handleCloseTag: createCloseFunc(),
      scrollRef,
    };
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
