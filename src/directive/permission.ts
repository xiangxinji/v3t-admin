import { Directive } from 'vue';
import store from '@/store';
import settings from '@/utils/settings';

function destroy(element:HTMLElement) {
  if (element.parentNode) (element.parentNode as HTMLElement).removeChild(element);
}
const directive : Directive = {
  mounted(el, binding, vnode) {
    let value :Array<string> = [];
    if (typeof binding.value === 'string') {
      value = binding.value.split(',');
    } else if (Array.isArray(binding.value)) value = binding.value;
    const { perms } = store.state.user;
    if (value.indexOf(settings.maxPermissionKey) > -1) return;
    for (let i = 0; i < value.length; i++) {
      const p = value[i];
      if (perms.indexOf(p) > -1) return;
    }
    destroy(el);
  },
};
export default directive;
