export default class ModelBlogPost extends Model {
    addPost(data) {
        this.db.query(`INSERT INTO oc_post SET name='${this.db.escape(data.name)}', title='${this.db.escape(data.title)}', description='${this.db.escape(data.description)}'`)
        const post_id = this.db.getLastId()
        return post_id
    }
    getPost(postId) {
        const query = this.db.query(`SELECT * FROM oc_post WHERE post_id = ${postId} `)
        return query.row
    }
    getPosts() {
        const query = this.db.query(`SELECT * FROM oc_post`)
        return query.rows
    }
}