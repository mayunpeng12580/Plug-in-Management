const router = [
    {
        key: '/index',
        title: '工作台',
        icon: 'home',
    },
    {
        key: '/index/user',
        icon: 'laptop',
        title: '用户管理',
        child: [
            {
                key: '/index/user/index',
                title: '用户列表',
            },
            {
                key: '/index/user/add',
                title: '添加用户'
            }
        ]
    },
    {
        key:'/index/department',
        title: '部门管理',
        icon: 'bars',
        child: [
            {
                key: '/index/department/index',
                title: '部门列表'
            },
            {
                key: '/index/department/add',
                title: '添加部门'
            }
        ]
    },
    {
        key:'/index/entry',
        title: '职位管理',
        icon: 'edit',
        child: [
            {
                key: '/index/entry/index',
                title: '职位列表'
            },
            {
                key: '/index/entry/add',
                title: '添加职位'
            }
        ]
    },
    {
        key:'/index/about',
        title: '请假',
        icon: 'info-circle-o',
    },
]

export default router