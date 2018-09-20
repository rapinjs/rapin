import { isUndefined, size } from 'lodash'
import {Model} from 'system/common'
import {Like} from 'typeorm'

export class ModelBlogPost extends Model {
    addPost(data) {
        const post = this.db.create('Post')
        post.name = data.name
        post.title = data.title
        post.description = data.description

        this.db.save('Post', post)

        return post.id
    }
    editPost(postId, data) {
        const post = this.getPost(postId)

        post.name = data.name
        post.title = data.title
        post.description = data.description
        post.image = data.image

        this.db.save('Post', post)
    }

    getPost(postId) {
        return this.db.findOne('Post', {id: postId})
    }

    getPosts() {
        const cache = this.cache.get('blog_posts')

        let results = []

        if(!cache) {
            results = this.db.find('Post')
            this.cache.set('blog_posts', results)
        } else {
            results = cache
        }

        return results
    }
}