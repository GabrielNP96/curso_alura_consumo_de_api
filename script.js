const containerVideos = document.querySelector('.videos__container');

async function buscarEMostarVideos(){
    try {
        const busca = await fetch('http://localhost:3000/videos');
        const videos = await busca.json();

            videos.forEach((video)=>{
                if(video.categoria == '') {
                    throw new Error('Vídeo não tem categoria');
                }
                containerVideos.innerHTML += `
                <li class='videos__item'>
                    <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
                    <div class="descricao-video">
                                <img class="img-canal" src = "${video.imagem}" alt="Logo do Canal">
                                <h3 class="titulo-video">${video.titulo}</h3>
                                <p class="titulo-canal">${video.descricao}</p>
                    </div>
                </li>
                    `;
            })
    } catch(error) {
        containerVideos.innerHTML = `<p> Houve um erro ao carregar os vídeos: ${error}</p>`
    }
}

buscarEMostarVideos();

const barraDepesquisa = document.querySelector('.pesquisar__input');
barraDepesquisa.addEventListener("input", filtrarPesquisa);

function filtrarPesquisa() {
    const videos = document.querySelectorAll('.videos__item');

    if(barraDepesquisa !='') {
        for(let video of videos) {
            let titulo = document.querySelector('.titulo-video').textContent.toLocaleLowerCase();
            let valorFilto = barraDepesquisa.value.toLocaleLowerCase();

            if(!titulo.includes(valorFilto)) {
                video.style.display = 'none';
            } else {
                video.style.dsplay = 'block';
            }
        }
    } else {
        video.style.dsplay = 'block';
    }
}