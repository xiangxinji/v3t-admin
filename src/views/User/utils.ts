import { UserFormData } from '@/types/user';
import { ElMessage } from 'element-plus';
import { Router } from 'vue-router';
import { AppStore } from '@/store';

export function createLoginSubmit(store: AppStore, formData : UserFormData, router : Router) {
  return () => {
    const pedding = store.dispatch('user/login', formData);
    pedding.then(() => {
      ElMessage.success('登录成功');
      router.push({ path: '/' });
    });
  };
}
