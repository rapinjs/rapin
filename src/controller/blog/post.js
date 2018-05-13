import _ from 'lodash'
export default class ControllerBlogPost extends Controller {
    create(){
        this.load.model('blog/post')
        const post_id = this.model_blog_post.addPost({
            name: 'name - new',
            title: 'title - new',
            description: 'description - new'
        })
        const post_info = this.model_blog_post.getPost(post_id)

        this.response.setOutput(post_info)
    }
    update(){
        this.response.setOutput(this.request.post? this.request.post : 'Hello World')
    }
    list(){
        this.load.model('blog/post')
        const posts = this.model_blog_post.getPosts()

        this.response.setOutput(posts)
    }
    post(){

        this.load.language('blog/post')

        this.load.model('blog/post')

        let data = {}


        data['title'] = this.language.get('text_title')

        const post_info = this.model_blog_post.getPost(this.request.params.postId)

        data['model'] = post_info

        if(this.request.post) {
            data['post'] = this.request.post
        }
        if(this.request.get) {
            data['get'] = this.request.get
        }
        if(this.request.params) {
            data['params'] = this.request.params
        }

        this.response.setOutput(data)
    }
    image(){
        if(!_.isUndefined(this.request.files.file)) {
            this.load.model('blog/post')

            let post_info = this.model_blog_post.getPost(this.request.params.postId)

            post_info.image ='/posts/'+Math.random().toString(36).substring(2, 15)+'.jpg'

            this.request.files.file.mv(DIR_IMAGE + post_info.image , function(err) {
                console.log(err)
            });

            this.response.setOutput(post_info)
        } else {
            this.response.setOutput({status: 404, message: 'Missing file'})
        }
    }
}