let buttonPref = document.querySelector('.search p#pref');
let buttonPlay = document.querySelector('.search p#play');
let content = document.querySelector('#view-pref');
let content1 = document.querySelector('#view-play');
content.classList.add('hidden');
content1.classList.add('hidden');
let x = content;
let y = content1;

const cross = './immagini/delete.png'
//-----PREF
function showpref(){
    if(buttonPref){
        y.classList.add('hidden');
        y.classList.remove('new1');
        x.classList.remove('hidden');
        x.classList.add('new');
    }
}

fetch('pref.php').then(onResponse).then(createDivMusicPref);

function createDivMusicPref(json){
    console.log(json);
    const library = document.getElementById('view-pref');
    const user = document.querySelector('.nome').textContent;
    
    for(const i of json){
        if(user == i.user){
            const div = document.createElement('div')
            div.dataset.id = i.id_canzone;
            div.classList.add('case');

            const button = document.createElement('a');
            button.href = i.track_link;
            const img_track = document.createElement('img');
            img_track.classList.add('img_track');
            img_track.src = i.track_img;

            const title_track = document.createElement('p');
            title_track.classList.add('title_track');
            title_track.textContent = i.track_title;

            const author_track = document.createElement('p');
            author_track.classList.add('author_track');
            author_track.textContent = i.track_author;

            const button_d = document.createElement('a');
            button_d.addEventListener('click', remove_pref);
            const img_delete = document.createElement('img');
            img_delete.src = cross;
            img_delete.classList.add('img_delete');

            div.appendChild(button);
            button.appendChild(img_track);
            div.appendChild(title_track);
            div.appendChild(author_track);
            button_d.appendChild(img_delete);
            div.appendChild(button_d);
            library.appendChild(div);
        }
    }
}

//-----PLAY
function showplay(){
        if(buttonPlay){
        x.classList.add('hidden');
        x.classList.remove('new');
        y.classList.remove('hidden')
        y.classList.add('new1');
    }
}

fetch('play.php').then(onResponse).then(createDivMusicPlay);

function createDivMusicPlay(json){
    console.log(json);
    const library = document.getElementById('view-play');
    const user = document.querySelector('.nome').textContent;
    
    for(const i of json){
        if(user == i.user){
            const div = document.createElement('div')
            div.dataset.id = i.id_canzone;
            div.classList.add('case');

            const button = document.createElement('a');
            button.href = i.track_link;
            const img_track = document.createElement('img');
            img_track.classList.add('img_track');
            img_track.src = i.track_img;

            const title_track = document.createElement('p');
            title_track.classList.add('title_track');
            title_track.textContent = i.track_title;

            const author_track = document.createElement('p');
            author_track.classList.add('author_track');
            author_track.textContent = i.track_author;

            const button_d = document.createElement('a');
            button_d.addEventListener('click', remove_play);
            const img_delete = document.createElement('img');
            img_delete.src = cross;
            img_delete.classList.add('img_delete');

            div.appendChild(button);
            button.appendChild(img_track);
            div.appendChild(title_track);
            div.appendChild(author_track);
            button_d.appendChild(img_delete);
            div.appendChild(button_d);
            library.appendChild(div);
        }
    }
}

buttonPref.addEventListener('click', showpref);
buttonPlay.addEventListener('click', showplay);

function remove_pref(event){
    const article = event.currentTarget.closest('.case')
    article.remove();
    fetch("remove_pref.php?q="+encodeURIComponent(article.dataset.id))
}

function remove_play(event){
    const article = event.currentTarget.closest('.case')
    article.remove();
    fetch("remove_play.php?q="+encodeURIComponent(article.dataset.id))
}


//------APRI-MODALE
let button = document.querySelector('.post a');
function open_modal(event){
    button = event.currentTarget;

    if(button){
        const modal = document.getElementById('modal-view');
        modal.classList.remove('hidden');
        modal.classList.add('no_scroll');
    }
}
button.addEventListener('click', open_modal);



//-------CHIUDI_MODALE
function close_modal(){
    const modal = document.getElementById('modal-view');
    modal.classList.add('hidden');
}
const buttonClose = document.getElementById('close_modal')
buttonClose.addEventListener('click', close_modal);
buttonClose.addEventListener('click', d_elete);



//--------SVUOTA TEXTAREA
function d_elete(){
    document.getElementById('messaggio').value = '';
}



//--------FUNZIONE
function onResponse(response) {
    console.log(response);
    return response.json(); 
}

fetch("fetch_post.php").then(onResponse).then(createPost);

function createPost(json){
    console.log(json);
    const feed = document.getElementById('posts');
    
    for(const i of json){
        const article = document.createElement('div');
        article.classList.add("bacheca");
        article.dataset.id = i.id

        const u_section = UpperSection(i.foto, i.username)
        const m_section = MiddleSection(i.content)
        const l_section = LowerSection(i.nlikes, i.ok, i.username);

        article.appendChild(u_section)
        article.appendChild(m_section)
        article.appendChild(l_section)
        feed.appendChild(article);
    }
}

function UpperSection(foto, name){
    const upper = document.createElement("div");
    upper.classList.add("u_section")

    const img = document.createElement('img');
    img.classList.add('img_u_section')
    img.src = foto;

    const p = document.createElement("p")
    p.classList.add('p_u_section')
    p.textContent = '@'+ name;

    upper.appendChild(img);
    upper.append(p);

    return upper; 
}

function MiddleSection(argument){
    const middle = document.createElement("div")
    middle.classList.add("m_section")

    const comment = document.createElement("p")
    comment.classList.add('text');
    comment.textContent = argument

    middle.appendChild(comment);

    return middle;
}

function LowerSection(nlikes, ok, username){
    const lower = document.createElement("div")
    lower.classList.add("l_section")

    const div1 = document.createElement("div")
    const div2 = document.createElement("div")

    //like
    const like_button = document.createElement("button")
    like_button.classList.add("button")
    like_button.classList.add("like")
    const img_h = document.createElement('img');
    img_h.classList.add('heart');
    img_h.src = './immagini/empty.png';
    if(ok) {
        like_button.classList.add("like_button_selected")
    } else {
        like_button.classList.remove("like_button_selected")
    }
    const num_like = document.createElement("p")
    num_like.classList.add('number');
    num_like.textContent = nlikes;
    like_button.appendChild(img_h);
    like_button.appendChild(num_like)
    
    div1.appendChild(like_button)

    //delete
    const mit = document.querySelector('.nome').textContent;
    if(mit == username){
        const delete_button = document.createElement("button")
        delete_button.classList.add("button")
        delete_button.classList.add("delete")
        delete_button.addEventListener("click", Remove)
        
        const img_d = document.createElement('img');
        img_d.classList.add('heart');
        img_d.src = './immagini/cestino.png';
        delete_button.appendChild(img_d);
        div2.appendChild(delete_button);
    }

    lower.appendChild(div1);
    lower.appendChild(div2);

    return lower;
}


function likes(event){
    const like_button = event.currentTarget
    const article = like_button.closest('.bacheca');
    const mitt = document.querySelector('.nome').textContent;

    if(!like_button.classList.contains("like_button_selected")) {
        like_button.classList.add("like_button_selected")
        const nlikes = like_button.querySelector("p");
        nlikes.textContent = parseInt(nlikes.textContent) + 1;
        fetch("add_like.php?id=" + encodeURIComponent(article.dataset.id) + '&user='+ encodeURIComponent(mitt)).then(onResponse)      
    } else {
        like_button.classList.remove("like_button_selected")
        const nlikes = like_button.querySelector("p");
        nlikes.textContent = parseInt(nlikes.textContent) - 1;
        fetch("remove_like.php?id=" + encodeURIComponent(article.dataset.id) + '&user='+ encodeURIComponent(mitt)).then(onResponse)
    }
}

function Remove(event){
    const article = event.currentTarget.closest('.bacheca')
    article.remove();
    fetch("removePost.php?q="+encodeURIComponent(article.dataset.id));
}
