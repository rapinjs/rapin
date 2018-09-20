import { Controller, DIR_IMAGE } from 'system/common'
import { GET, POST, PUT, required } from 'system/config/routes'
import * as _ from 'lodash'
import { request } from 'https';

export class ControllerBlogPost extends Controller {
    @POST('/post')
    @required(['name', 'title', 'description', 'image'])
    create(){
        this.load.model('blog/post')
        const postId = this.model_blog_post.addPost(this.request.post)
        const postInfo = this.model_blog_post.getPost(postId)

        this.response.setOutput(postInfo)
    }

    @PUT('/post/:postId')
    @required(['name', 'title', 'description', 'image'])
    update(){
        this.load.model('blog/post')

        this.model_blog_post.editPost(this.request.params.postId, this.request.post)
        const post = this.model_blog_post.getPost(this.request.params.postId)

        this.response.setOutput(post)
    }

    @GET('/post')
    list(){
        this.load.model('blog/post')
        const posts = this.model_blog_post.getPosts()

        this.response.setOutput(posts)
    }
    @GET('/post/:postId')
    post(){

        this.load.language('blog/post')

        this.load.model('blog/post')

        let data = {}


        data['title'] = this.language.get('text_title')

        const post_info = this.model_blog_post.getPost(this.request.params.postId)

        this.response.setOutput(post_info)
    }

    @GET('/post/:postId/image')
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