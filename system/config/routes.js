export const routes = [
    {
        path: '/post',
        type: 'GET',
        action: 'blog/post/list'
    },
    {
        path: '/post',
        type: 'POST',
        action: 'blog/post/create'
    },
    {
        path: '/post',
        type: 'PUT',
        action: 'blog/post/update'
    },
    {
        path: '/post/:postId',
        type: 'GET',
        action: 'blog/post/post'
    }
]