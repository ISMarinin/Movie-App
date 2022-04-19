const apiKey = '2816fe41-4647-4f8f-84b7-733b04bd95b8'
const apiUrlPopular = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page='
const apiUrlSearch = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword='

async function getMovies(url) {
    const resp = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': apiKey
        }
    })
    const respData = await resp.json()
    showMovies(respData)
}

function showMovies(data) {
    const moviesEl = document.querySelector('.movies')

    document.querySelector('.movies').innerHTML = ''

    data.films.forEach(movie => {
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')
        movieEl.innerHTML = `
            <div class="movie">
                <div class="movie__cover-inner">
                    <img src="${movie.posterUrlPreview}" class="movie__cover" alt="${movie.nameRu}">
                    <div class="movie__cover-darkened"></div>
                </div>
                <div class="movie__info">
                    <div class="movie__title">${movie.nameRu}</div>
                    <div class="movie__category">${movie.genres.map(genre => ` ${genre.genre}`)}</div>
                    ${
                    movie.rating &&
                    `
                    <div class="movie__average movie__average-${getColor(movie.rating)}">${movie.rating}</div>
                    `
                    }
                </div>
            </div>
        `
        moviesEl.appendChild(movieEl)
    })
}

async function getPages(url) {
    const resp = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': apiKey
        }
    })
    const respData = await resp.json()
    countPages(respData)
}

function countPages(data) {

    const btn = document.querySelector('.btns__pages')

    for(let i = 1; i <= data.pagesCount; ++i) {
        const numPage = document.createElement('div')
        numPage.classList.add('num__page') 
        numPage.innerHTML = `
            <div class="num__page">${i}</div>
        `
        btn.appendChild(numPage)
    }
}

function getColor(data) {
    if (data >= 7) return 'green'
    else if (data < 5) return 'red'
    else return 'orange'
}


const form = document.querySelector('form')
const search = document.querySelector('.header__search')

form.addEventListener('submit', err => {
    err.preventDefault()

    const apiSearchUrl = `${apiUrlSearch}${search.value}`
    if (search.value) {
        getMovies(apiSearchUrl)
    }

    search.value = ''
})

getMovies(apiUrlPopular)
getPages(apiUrlPopular)

const page = document.querySelector('.btns__pages')
const num = document.querySelector('.num__page')

page.addEventListener('click', e => {
    e.preventDefault()
    const { target } = e;
    const apiPageUrl = `${apiUrlPopular}${target.innerHTML}`

    if(target.innerHTML) {
        getMovies(apiPageUrl)
        window.scrollBy(0, -2000)
        target.classList.add('num__active')
        // console.log(target.innerHTML)
    }
    // target.classList.remove('num-active')
    
})
