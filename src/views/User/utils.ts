import { UserFormData } from '@/types/user';
import { Store } from 'vuex';
import { ModulesType } from '@/store';
import { ElMessage } from 'element-plus';
import { Router, useRouter } from 'vue-router';

export function createLoginSubmit(store:Store<ModulesType>, formData : UserFormData, router : Router) {
  return () => {
    const pedding = store.dispatch('user/login', formData);
    pedding.then(() => {
      ElMessage.success('登录成功');
      router.push({ path: '/' });
    });
  };
}
