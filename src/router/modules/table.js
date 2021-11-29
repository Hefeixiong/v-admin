import Layout from '@/layout'

const tableRouter = {
  path: '/table',
  component: Layout,
  redirect: 'table/complex-table',
  name: 'Table',
  meta: {
    title: 'Table',
    icon: 'table',
    roles: ['ops']
  },
  children: [
    {
      path: 'dynamic-table',
      component: () => import('@/views/table/dynamic-table/index'),
      name: 'DynamicTable',
      meta: {title: 'Dynamic Table'}
    },
    {
      path: 'drag-table',
      component: () => import('@/views/table/drag-table'),
      name: 'DragTable',
      meta: {title: 'Drag Table',roles: ['ops']}
    },
    {
      path: 'inline-edit-table',
      component: () => import('@/views/table/inline-edit-table'),
      name: 'InlineEditTable',
      meta: {title: 'Inline Edit',roles: ['ops']}
    },
    {
      path: 'complex-table',
      component: () => import('@/views/table/complex-table'),
      name: 'ComplexTable',
      meta: {title: 'Complex Table',roles: ['ops']}
    },
  ]
}

export default tableRouter