export default {
    _name: 'SideNav',
    _children: [
       {
        _name: 'sideNavItem',
        name: 'Dashboard',
        to: '/dashboard',
        badge: {
            text: 'NEW'
        }
       },
       {
        _name: 'sideNavDropdrown',
        name: 'Sản Phẩm',
        route: '/product',
        badge: {
            text: 'NEW'
        },
        items: [
            {
                name: 'Toàn bộ sản phẩm',
                to : '/all'
            },
            {
                name: 'Thêm sản phẩm',
                to: '/add'
            },
        ]
       },
       {
        _name: 'sideNavDropdrown',
        name: 'Đơn Hàng',
        route: '/order',
        badge: {
            text: 'NEW'
        },
        items: [
            {
                name: 'Đơn hàng mới',
                to: '/news'
            },
            {
                name: 'Toàn bộ đơn hàng',
                to : '/all'
            },
        ]
       },
       {
        _name: 'sideNavItem',
        name: 'Đặt Bàn',
        route: '/booking',
        badge: {
            text: 'NEW'
        }
       },
       {
        _name: 'sideNavItem',
        name: 'Hộp thư',
        route: '/mailbox',
        badge: {
            text: 'NEW'
        },
       },
       {
        _name: 'sideNavDropdrown',
        name: 'Thông báo ',
        route: '/notify',
        badge: {
            text: 'NEW'
        },
        items: [
            {
                name: 'Tạo thông báo',
                to: '/add'
            },
            {
                name: 'Lịch sử',
                to: '/history'
            }
        ]
       },
       {
        _name: 'sideNavItem',
        name: 'Người dùng',
        to: '/users',
       },

       
    ]
  }