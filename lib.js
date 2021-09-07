/**Paginazione infinita */

const blog = {
    itemsPerPage :5,
    currentPage :0,
    totalePage : 0,
    blogWrapper : document.getElementById('blog-w'),
    pagePositionWrapper :document.getElementById('page-position-w')
}

async function initBlog(){
    const postData = await fetch('https://jsonplaceholder.typicode.com/posts');
    blog.posts = await postData.json();
    blog.posts.splice(25,75);
    //console.log(blog.posts);
    showPost();
}

function showPost() {
    let start = blog.currentPage * blog.itemsPerPage;
    for (let i = start; i < start + blog.itemsPerPage; i++) {
        let DOM_post = document.createElement('article');
        DOM_post.setAttribute('class','blog-post');
        DOM_post.innerHTML = createPostHTML(blog.posts[i]);
        blog.blogWrapper.appendChild(DOM_post);
    }
}

function createPostHTML({id, title, body}) {
    return `<h3 class="title">${title}</h3>
            <div class="body">${body}</div>
            <div class="info">${id}</div>`
}



initBlog();