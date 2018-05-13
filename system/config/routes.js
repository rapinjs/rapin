export const routes = [
    {
        path: '/post',
        type: 'GET',
        contentType: 'json',
        action: 'blog/post/list'
    },
    {
        path: '/post',
        type: 'POST',
        contentType: 'json',
        action: 'blog/post/create'
    },
    {
        path: '/post',
        type: 'PUT',
        contentType: 'json',
        action: 'blog/post/update'
    },
    {
        path: '/post/:postId',
        type: 'GET',
        contentType: 'json',
        action: 'blog/post/post'
    },
    {
        path: '/post/:postId/image',
        type: 'POST',
        contentType: 'file',
        action: 'blog/post/image'
    },
    {
        path: '/home',
        type: 'GET',
        action: 'common/home/index'
    }
]