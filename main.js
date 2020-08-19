const inputLyric = document.getElementById('inputLyric');
const searchBtn = document.getElementById('searchBtn');

//Event Listeners
searchBtn.addEventListener('click', function(){
    const searchTerm = inputLyric.value.trim();
    if(!searchTerm){
        alert('Please type in a search term');
    }
    else{
        //Search song or artist
        fetch(`${'https://api.lyrics.ovh'}/suggest/${searchTerm}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            const searchLyrics = document.getElementById('searchLyrics');
            searchLyrics.innerHTML = '';
            for (let i = 0; i < 10; i++) {
                const element = data.data[i];
                const title = element.title;
                const artist = element.artist.name;
                const image = element.artist.picture_small;

                searchLyrics.innerHTML += 
                `<div class="single-result row align-items-center my-3 p-3">
                    <div class="col-md-8">
                        <h3 class="lyrics-name" id="title">${title}</h3>
                        <p class="author lead">Album by <span id="artistName">${artist}</span></p> 
                    </div>

                    <div class="col-md-1">
                        <img src="${image}" alt="">
                    </div>

                    <div class="col-md-3 text-md-right text-center">
                        <button  onclick="getArtistTitle('${artist}','${title}')" class="btn btn-success">Get Lyrics</button>
                    </div>
            </div>`;
            }

        })
    }
})
function getArtistTitle(artist,title){
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
    .then(res => res.json())
    .then(song => showLyrics(song,title));
}

function showLyrics(song,title){
    if(song.lyrics == undefined){
        document.getElementById('displayLyrics').innerText = "there have no lyrics";
    }else{
        document.getElementById('displayLyrics').innerText = song.lyrics;
    }
    document.getElementById('songTitle').innerText = title;
}
