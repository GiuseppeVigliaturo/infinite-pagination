/**Paginazione infinita */

const blog = {
    itemsPerPage :5,
    currentPage :0,
    totalePage : 0,
    blogWrapper : document.getElementById('blog-w'),
    pagePositionWrapper :document.getElementById('page-position-w')
}

let sectionArticle = document.getElementById("blog-w")

//calcolo scroll pagina

window.addEventListener('scroll', (e) =>{
    let scrollHeight, clientHeight, scrollTop;
    ({scrollHeight, clientHeight, scrollTop} = document.documentElement);
    let pagina1 = clientHeight;
    let pagina2 = clientHeight*2;
    let pagina3 = clientHeight*3;
    let pagina4 = clientHeight*4;
    let pagina5 = clientHeight*5;

    if ((scrollTop >= 0) && (scrollTop < pagina1 - 1) && (blog.currentPage < blog.totalePage - 1) ) {
        blog.currentPage = 0;
        showPost();
        setIndicatoreAttivo();
    }

   else if ((scrollTop > pagina1) && (scrollTop < pagina2 - 1) && (blog.currentPage < blog.totalePage - 1) ) {
        blog.currentPage = 1;
        
        setIndicatoreAttivo();
        showPost();
        
    }
    else if ((scrollTop > pagina2) && (scrollTop < pagina3 - 1) && (blog.currentPage < blog.totalePage - 1) ) {
         blog.currentPage = 2;
         
         setIndicatoreAttivo();
         showPost();
    }
    else if ((scrollTop > pagina3) && (scrollTop < pagina4 - 1) && (blog.currentPage < blog.totalePage - 1)) {
         blog.currentPage = 3;
         showPost();
         setIndicatoreAttivo();
         console.log(scrollTop);
    }
    else if ((scrollTop > pagina4) &&(blog.currentPage <= blog.totalePage - 1)) {
        console.log("ultima pagina");
        blog.currentPage = 4;
        showPost();
        setIndicatoreAttivo();
    }


    // let maxScroll = scrollHeight - clientHeight;
    // if ((scrollTop >= maxScroll - 1) && (blog.currentPage < blog.totalePage - 1)) {
    //     blog.currentPage++;
    //     showPost();
    //     setIndicatoreAttivo();
    // }
})

function setIndicatoreAttivo() {
    let indicatori = document.querySelectorAll('span.position');
    let test = Array.from(indicatori)
    
        for (i = 0; i < test.length; i++) {
            test[i].className = test[i].className.replace(" active", " ");
        }
        test[+blog.currentPage].classList.add("active");
    
}

async function initBlog(n1,n2){
    const postData = await fetch('https://jsonplaceholder.typicode.com/posts');
    blog.posts = await postData.json();
    blog.posts.splice(n1,n2);
    blog.totalePage = (Math.ceil(blog.posts.length / blog.itemsPerPage)) + 1;
    initIndicatoriPaginazione();
    showPost(n1);
}


function initIndicatoriPaginazione() {
    for (let i = 0; i < blog.totalePage - 1; i++) {
        let classi = "position";
        i === 0 ? classi += ' active' : '';
        let pagination = document.createElement('span');
        pagination.setAttribute('class', classi);
        pagination.setAttribute('idx', i);
        blog.pagePositionWrapper.appendChild(pagination);
        
    }
}

function showPost(n1) {
    let start = blog.currentPage * blog.itemsPerPage;
    for (let i = start; i < n1; i++) {
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

initBlog(25,75);