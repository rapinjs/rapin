export default class ModelBlogPost extends Model {
    addPost(data) {
        this.db.query(`INSERT INTO oc_post SET name='${this.db.escape(data.name)}', title='${this.db.escape(data.title)}', description='${this.db.escape(data.description)}'`)
        const post_id = this.db.getLastId()
        return post_id
    }
    editPost(postId, data) {
        this.db.query(`UPDATE oc_post SET name='${this.db.escape(data.name)}', title='${this.db.escape(data.title)}', description='${this.db.escape(data.description)}', image='${this.db.escape(data.image)}' WHERE post_id='${postId}'`)
    }
    getPost(postId) {
        const query = this.db.query(`SELECT * FROM oc_post WHERE post_id = ${postId} `)
        return query.row
    }
    getPosts() {

        const cache = this.cache.get('blog_posts')

        let results = []

        if(!cache) {
            const query = this.db.query(`SELECT * FROM oc_post`)
            results = query.rows
            this.cache.set('blog_posts', results)
        } else {
            results = cache
        }

        return results

    }
}