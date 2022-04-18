const apiKey = '2816fe41-4647-4f8f-84b7-733b04bd95b8'
const apiUrlPopular = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1'
const apiUrlSearch = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword='

getMovies(apiUrlPopular)

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

function getColor(data) {
    if (data >= 7) return 'green'
    else if (data < 5) return 'red'
    else return 'orange'
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


// function countPages(data) {

//     const btn = document.querySelector('.btns__pages')

//     data.pagesCount.forEach(num => {
//         const numPage = document.createElement('div')
//         numPage.classList.add('num__page')
//         numPage.innerHTML = `
//             <div class="num__page num__active">${num}</div>
//         `
//         btn.appendChild(numPage)
//     })
// }

// countPages(apiUrlPopular)

// btn.addEventListener('click', e => {

//     const {target} = e
//     const targetClassList = target.classList
//     const allNumPages = [...document.querySelectorAll('.num__page')]
//     const activePageNumber = allNumPages.findIndex(i => i.classList.contains('.num__active'))

//     function setNum(num) {
//         allNumPages[activePageNumber].classList.remove('num__active')
//         allNumPages[activePageNumber + num].classList.add('nam__active')
//     }
//     // console.log(targetClassList)
//     // const apiUrlPages = `${apiUrlPopular}`
// })