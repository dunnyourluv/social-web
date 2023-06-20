import { posts } from "../data/posts"

function usePost() {
    function getPostById(postId: string) {
        return posts.find(post => post.id === postId)
    }

    function getPostsByAuthorId(authorId: string) {
        return posts.filter(post => post.authorId === authorId)
    }

    function getPostsByAuthorIds(authorIds: string[]) {
        return posts.filter(post => authorIds.includes(post.authorId))
    }

    function getAllPosts() {
        return posts
    }

    return {
        getPostById,
        getPostsByAuthorId,
        getPostsByAuthorIds,
        getAllPosts
    }
}

export default usePost