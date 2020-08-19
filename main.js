const inputLyric = document.getElementById('inputLyric');
    const searchBtn = document.getElementById('searchBtn');

    const apiURL = 'https://api.lyrics.ovh';

    //Event Listeners
    searchBtn.addEventListener('click', function(){
        const searchTerm = inputLyric.value.trim();
        if(!searchTerm){
            alert('Please type in a search term');
        }
        else{
            //Search song or artist
            fetch(`${apiURL}/suggest/${searchTerm}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                const searchLyrics = document.getElementById('searchLyrics');
                searchLyrics.innerHTML = '';
                for (let i = 0; i < 10; i++) {
                    const element = data.data[i];
                    const title = element.title;
                    const artist = element.artist.name;

                    searchLyrics.innerHTML += 
                `<div id="searchLyrics" class="d-flex justify-content-center">
                    <div class="">
                    <p class="author lead"><strong>${title}</strong> Album by <span>${artist}</span> <button class="btn btn-success">Get Lyrics</button></p>
                    </div>
                </div>`
                }

            })
        }
    })