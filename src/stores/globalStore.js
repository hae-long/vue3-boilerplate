import { defineStore } from 'pinia';
import { computed, reactive } from 'vue';
import * as storage from '@/utils/storage.js';

//Composition API
export const useGlobalStore = defineStore('boiler-global', () => {
  const state = reactive({
    primary: '#FF8282', //#00B88C, #FF7B00
    isDark: false,
    isGray: false,
    isWeak: false
  });

  const get = computed(() => state);

  const storageKey = 'boiler-global';
  const set = {
    primary: function (param) {
      state.primary = param;
      storage.setStorage(storageKey, 'primary', param);
    },
    isDark: function (param) {
      state.isDark = param;
      storage.setStorage(storageKey, 'isDark', param);
    },
    isGray: function (param) {
      state.isGray = param;
      storage.setStorage(storageKey, 'isGray', param);
    },
    isWeak: function (param) {
      state.isWeak = param;
      storage.setStorage(storageKey, 'isWeak', param);
    }
  };

  return {
    state,
    get,
    set
  };
});
