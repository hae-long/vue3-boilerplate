import { createWebHistory, createRouter } from 'vue-router';
import HeaderBar from '@/components/layout/HeaderBar.vue';
import SideMenuBar from '@/components/layout/SideMenuBar.vue';
import FooterBar from '@/components/layout/FooterBar.vue';

const env = import.meta.env;
console.log('env: ', env);

//기본 구성
const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: to => {
      return {
        path: '/home'
      };
    },
    section: 'default'
  },
  {
    path: '/home',
    name: 'homePage',
    components: {
      default: () => import('@/views/HomePage.vue'),
      headerBar: HeaderBar,
      sideMenuBar: SideMenuBar,
      footerBar: FooterBar
    },
    props: true,
    meta: { unauthorized: true, title: '메인' }
  }
];

//대메뉴 A
const menuA = [];

routes.push(...menuA);

const router = createRouter({
  history: createWebHistory(),
  routes
});

//라우터가 동작되기 이전
router.beforeEach(async (to, from, next) => {
  //라우터 미선언 url 접속시 Home으로 리다이렉션
  const isValidRoute = routes.some(route => route.path === to.path);
  if (!isValidRoute) {
    console.warn('비정상 url 접근');
    return next('/');
  }

  //정상 처리
  return next();
});

//라우터가 동작 된 이후
router.afterEach(to => {
  setBrowserTitle(to);
});

const setBrowserTitle = to => {
  const documentTitle = to.meta.title
    ? `${env.VITE_APP_TITLE}: ${to.meta.title}`
    : env.VITE_APP_TITLE;
  document.title = documentTitle;
};

export default router;
