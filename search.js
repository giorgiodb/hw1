const empty = './immagini/empty.png';
const fill = './immagini/full.png' ; 

const p_empty = './immagini/p_empty.png';
const p_fill = './immagini/p_fill.png';

function jsonSpotify(json) {
    const container = document.getElementById('view');
    container.innerHTML = '';
    container.classList.remove('hidden');
    container.classList.add('new');
    console.log('JSON ricevuto');
    console.log(json);

    if(json.tracks.items.length >=  20){
        json.tracks.items.length = 18;
    }

    for (const track in json.tracks.items) {
        const all = document.createElement('div');
        all.dataset.id = json.tracks.items[track].id;
        all.classList.add('all');

        const card = document.createElement('div');
        card.classList.add('track');

        const img = document.createElement('img');
        img.src = json.tracks.items[track].album.images[0].url;

        const info = document.createElement('div');
        info.classList.add('info');

        const title = document.createElement('div');
        title.classList.add('title');
        title.textContent = json.tracks.items[track].name;

        const author = document.createElement('div');
        author.classList.add('author');
        author.textContent = json.tracks.items[track].artists[0].name;

        const l = json.tracks.items[track].external_urls.spotify;
        const testo = 'Go to spotify';
        const link = document.createElement('a');
        link.href = l;
        link.textContent = testo;
        link.classList.add('link');

        const content = document.createElement('div');
        content.classList.add('content');
        const love = document.createElement('div');
        love.classList.add('love_pref');
        const pref = document.createElement('div');
        pref.classList.add('love_pref');
        const heart = document.createElement('img');
        heart.classList.add('change_h');
        heart.src = empty;
        const heart1 = document.createElement('img');
        heart1.classList.add('hidden');
        heart1.src = fill;
        const plus = document.createElement('img');
        plus.classList.add('change_p');
        plus.src = p_fill;
        const plus1 = document.createElement('img');
        plus1.classList.add('hidden');
        plus1.src = p_empty;

        heart.addEventListener('click', onheart);

        plus.addEventListener('click', onplus);

        all.appendChild(card);
        all.appendChild(info);
        all.appendChild(link);
        all.appendChild(content);
        content.appendChild(love);
        content.appendChild(pref);
        love.appendChild(heart);
        love.appendChild(heart1);
        pref.appendChild(plus);
        pref.appendChild(plus1);
        card.appendChild(img);
        info.appendChild(title);
        info.appendChild(author);
        container.appendChild(all);
    }
}

function search(event)
{
    event.preventDefault();

    const element = document.querySelector('#text').value;
    const text = encodeURIComponent(element);
	console.log('Ricerca per : ' + text);
  
    fetch("searchContent.php?q=" + text).then(onResponse).then(jsonSpotify);
}

function onResponse(response)
{
    console.log(response);
    return response.json();
}

const elem = document.querySelector('.element');
elem.addEventListener('submit', search);

//---------

function onFocus()
{
  const text = document.getElementById('text');
  text.value = '';
}
const text = document.querySelector("input")
text.addEventListener("focus", onFocus);

//----------


//--------CAMBIO CUORE
function onheart(event){
    const img = event.currentTarget;
    const div = img.parentNode;
    const img1 = div.querySelector('.hidden');
    
    img.classList.add('hidden');
    img1.classList.remove('hidden');
    img1.classList.add('change_h1');

    const music = img1.parentNode.parentNode.parentNode;
    const mit = document.querySelector('.nome').textContent;
    const img_track = music.querySelector('.track img').src;
    const title_track = music.querySelector('.title').textContent;
    const author_track = music.querySelector('.author').textContent;
    const link_track = music.querySelector('a').href;
    fetch("add_pref.php?id=" + encodeURIComponent(music.dataset.id) + "&user=" + encodeURIComponent(mit) + "&img_track=" + encodeURIComponent(img_track) + "&title_track=" + encodeURIComponent(title_track) + "&author_track=" + encodeURIComponent(author_track) + "&link_track=" + encodeURIComponent(link_track)).then(onResponse)
}

//--------CAMBIO PLUS
function onplus(event){
    const img = event.currentTarget;
    const div = img.parentNode;
    const img1 = div.querySelector('.hidden');
    
    img.classList.add('hidden');
    img1.classList.remove('hidden');
    img1.classList.add('change_p1');

    const music = img1.parentNode.parentNode.parentNode;
    const mit = document.querySelector('.nome').textContent;
    const img_track = music.querySelector('.track img').src;
    const title_track = music.querySelector('.title').textContent;
    const author_track = music.querySelector('.author').textContent;
    const link_track = music.querySelector('a').href;
    fetch("add_play.php?id=" + encodeURIComponent(music.dataset.id) + "&user=" + encodeURIComponent(mit) + "&img_track=" + encodeURIComponent(img_track) + "&title_track=" + encodeURIComponent(title_track) + "&author_track=" + encodeURIComponent(author_track) + "&link_track=" + encodeURIComponent(link_track)).then(onResponse)
}




