<template>
  <router-view name="headerBar"></router-view>
  <router-view name="sideMenuBar"></router-view>
  <router-view />
  <router-view name="footerBar"></router-view>
</template>

<script setup>
import { computed, onBeforeMount } from 'vue';
import { storeToRefs } from 'pinia';

import { getLightColor, getDarkColor } from '@/utils/color';
import { whiteTheme, darkTheme } from '@/utils/layout.js';
import { useGlobalStore } from '@/stores/globalStore.js';
import * as storage from '@/utils/storage.js';
import envs from '@envs';

const { get: global } = storeToRefs(useGlobalStore());

const primaryColor = computed({
  get: () => global.value.primary,
  set: param => {
    useGlobalStore().set.primary(param);
  }
});

const isDark = computed(() => {
  return global.value.isDark;
});

const isGray = computed(() => {
  return global.value.isGray;
});

const isWeak = computed(() => {
  return global.value.isWeak;
});

onBeforeMount(() => {
  checkStorage();
  initTheme();
  if (isGray.value) grayTheme();
  if (isWeak.value) weakTheme();
  setPrimaryColor(primaryColor.value);
});

const checkStorage = () => {
  const storageKey = 'boiler-global';
  storage.initStorage(storageKey, useGlobalStore());
};

const initTheme = () => {
  if (isDark.value === false) {
    whiteTheme();
  } else {
    darkTheme();
  }
};

//테마 변경
const changeTheme = () => {
  if (isDark.value) {
    darkTheme();
  } else {
    whiteTheme();
  }

  setPrimaryColor(primaryColor.value);
};

const setPrimaryColor = param => {
  // if (param.length !== 7) return;
  // background.value[0].color = param;
  document.documentElement.style.setProperty('--boiler-primary', param);

  for (let i = 1; i <= 9; i++) {
    const primaryColor = isDark.value
      ? `${getDarkColor(param, i / 10)}`
      : `${getLightColor(param, i / 10)}`;
    document.documentElement.style.setProperty(
      `--boiler-color-primary-light-${i}`,
      primaryColor
    );
  }
};

const grayTheme = () => {
  const body = document.querySelector('body');
  if (isGray.value) {
    body.style.filter = 'grayscale(1)';
    useGlobalStore().set.isWeak(false);
  } else {
    removePropertyFilter(body);
  }
};

const weakTheme = () => {
  const body = document.querySelector('body');
  if (isWeak.value) {
    body.style.filter = 'invert(80%)';
    useGlobalStore().set.isGray(false);
  } else {
    removePropertyFilter(body);
  }
};
</script>

<style lang="scss"></style>
