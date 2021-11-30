import Layout from '@/layout'

const tableRouter = {
  path: '/table',
  component: Layout,
  redirect: 'table/complex-table',
  name: 'Table',
  meta: {
    title: 'Table',
    icon: 'table',
    roles: ['admin']
  },
  children: [
    {
      path: 'dynamic-table',
      component: () => import('@/views/table/dynamic-table/index'),
      name: 'DynamicTable',
      meta: {title: 'Dynamic Table',roles: ['admin']}
    },
    {
      path: 'drag-table',
      component: () => import('@/views/table/drag-table'),
      name: 'DragTable',
      meta: {title: 'Drag Table',roles: ['admin']}
    },
    {
      path: 'inline-edit-table',
      component: () => import('@/views/table/inline-edit-table'),
      name: 'InlineEditTable',
      meta: {title: 'Inline Edit',roles: ['admin']}
    },
    {
      path: 'complex-table',
      component: () => import('@/views/table/complex-table'),
      name: 'ComplexTable',
      meta: {title: 'Complex Table',roles: ['admin']}
    },
  ]
}

export default tableRouter
