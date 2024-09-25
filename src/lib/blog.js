import axios from "./axios";

export async function getBlogs() {
    const response = await axios.get('/api/blogs')
        .then(response => response)
        .catch(error => error.response)

    return response ? response : []
}

export async function getBlogById(id) {
    const response = await axios.get(`/api/blogs/${id}`)
        .then(response => response)
        .catch(error => error.response)

    return response ? response : {}
}