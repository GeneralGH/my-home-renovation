import { ControlPlatformIcon, Edit1Icon, LayersIcon } from 'tdesign-icons-vue';
import Layout from '@/layouts/index.vue';

export default [
  {
    path: '/ready',
    name: 'ready',
    component: Layout,
    redirect: '/ready/index',
    meta: { title: '准备', single: true },
    children: [
      {
        path: '/ready/index',
        name: 'ReadyIndex',
        component: () => import('@/pages/ready/index.vue'),
        meta: { title: '准备' },
      }
    ],
  },
  {
    path: '/waterAndElectricity',
    name: 'waterAndElectricity',
    component: Layout,
    redirect: '/waterAndElectricity/index',
    meta: { title: '水电', single: true },
    children: [
      {
        path: '/waterAndElectricity/index',
        name: 'waterAndElectricityIndex',
        component: () => import('@/pages/waterAndElectricity/index.vue'),
        meta: { title: '水电' },
      }
    ],
  },
  {
    path: '/brickLayer',
    name: 'brickLayer',
    component: Layout,
    redirect: '/brickLayer/index',
    meta: { title: '瓦工', single: true },
    children: [
      {
        path: '/brickLayer/index',
        name: 'brickLayerIndex',
        component: () => import('@/pages/brickLayer/index.vue'),
        meta: { title: '瓦工' },
      }
    ],
  },
  {
    path: '/sealant',
    name: 'sealant',
    component: Layout,
    redirect: '/sealant/index',
    meta: { title: '美缝', single: true },
    children: [
      {
        path: '/sealant/index',
        name: 'sealantIndex',
        component: () => import('@/pages/sealant/index.vue'),
        meta: { title: '美缝' },
      }
    ],
  },
  {
    path: '/woodworking',
    name: 'woodworking',
    component: Layout,
    redirect: '/woodworking/index',
    meta: { title: '木工', single: true },
    children: [
      {
        path: '/woodworking/index',
        name: 'woodworkingIndex',
        component: () => import('@/pages/woodworking/index.vue'),
        meta: { title: '木工' },
      }
    ],
  },
  {
    path: '/oiler',
    name: 'oiler',
    component: Layout,
    redirect: '/oiler/index',
    meta: { title: '油工', single: true },
    children: [
      {
        path: '/oiler/index',
        name: 'oilerIndex',
        component: () => import('@/pages/oiler/index.vue'),
        meta: { title: '油工' },
      }
    ],
  },
  {
    path: '/kAndB',
    name: 'kAndB',
    component: Layout,
    redirect: '/kAndB/index',
    meta: { title: '厨卫', single: true },
    children: [
      {
        path: '/kAndB/index',
        name: 'kAndBIndex',
        component: () => import('@/pages/kAndB/index.vue'),
        meta: { title: '厨卫' },
      }
    ],
  }
];
