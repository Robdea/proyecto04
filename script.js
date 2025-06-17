const $ = el => document.querySelector(el);

const main = $("main")
const containerHistory = $(".container-history");

let iconLike = `
    <button>
        <svg  
            fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
            <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
        </svg>
    </button>
`

let iconOpt = `
    <div>
        <svg aria-label="Menú" class="x1lliihq x1n2onr6 x1g9anri" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Menú</title><circle cx="12" cy="12" r="2.75"></circle><circle cx="19.5" cy="12" r="2.75"></circle><circle cx="4.5" cy="12" r="2.75"></circle></svg>
    </div>
`

function createHistory({username, iconUser, contentHistory}, state) {
    const history = document.createElement("section");
    history.classList.add("history-card");

    history.innerHTML = `
    <label class="close-modal"></label>
        <div class="history-content">
            <div class="bttn-preview ${state.currentContent === 0 ? 'hidden' : ''}">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon-left">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
            </div>
        <section class="history-info-user">
            <div>
                <div class="circle-gradian">
                    <img class="user-icon" src="${iconUser}">
                </div>

                <label class="cont-username">${username}</label>
                <div class="cont-opt-history">
                    <button class="container-state-play">
                    </button>
                    ${iconOpt}
                </div>
            </div>
        </section>
        <img  class="history-image" src="${contentHistory[state.currentContent]}"/>        
        <div class="history-comment-bar">
                <div class="cont-opts-comment">
                    <textarea class="" placeholder="Responde a ${username}"></textarea>
                    <div>
                        ${iconLike}
                        <button>
                            <svg fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                            <line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="22" x2="9.218" y1="3" y2="10.083"></line><polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></polygon></svg>
                        </button>
                    </div>                
                </div>
            </div>

            <div class="bttn-next">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon-right">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
            </div>
        </div>
    `

    history.querySelector(".bttn-next").addEventListener("click", () =>{
       if (state.currentContent < contentHistory.length - 1) {
            bars[state.currentContent].querySelector(".level").classList.remove("active");            
            bars[state.currentContent].querySelector(".level").classList.add("completed");
            
            state.currentContent++;
            state.progress = 0;
            imgElement.src = contentHistory[state.currentContent];
            bars[state.currentContent].querySelector(".level").classList.add("active");
        }
    })

    history.querySelector(".bttn-preview").addEventListener("click", () =>{
       if (state.currentContent > -1) {
            bars[state.currentContent].querySelector(".level").classList.remove("completed");
            bars[state.currentContent].querySelector(".level").style.width = "0";            
            bars[state.currentContent].querySelector(".level").classList.remove("active");            
            
            state.currentContent--;
            imgElement.src = contentHistory[state.currentContent];
            bars[state.currentContent].querySelector(".level").classList.remove("completed");
            bars[state.currentContent].querySelector(".level").classList.add("active");
            state.progress = 0;
            bars[state.currentContent].querySelector(".level").style.width = 0;
        }
    })
    const infoUser = history.querySelector(".history-info-user");
    const imgElement = history.querySelector(".history-image")

    const barContainer = progressBar(contentHistory.length);
    infoUser.prepend(barContainer);

    const bars = barContainer.querySelectorAll(".bar-progress");

    let currentLevel = bars[state.currentContent].querySelector(".level");
    currentLevel.classList.add("active");

    let bttnPlay = infoUser.querySelector(".container-state-play");

    function handlerChangeStatePlay() {state.isPaused = !state.isPaused;}

    dimanicBttnPlay(state, bttnPlay, handlerChangeStatePlay)
    tempo(state, contentHistory, imgElement, bars, history)

    return history
}

function progressBar(numberHistory) {
    const progressContainer = document.createElement("div");
    progressContainer.classList.add("bar-progress-container")
    
    for (let i = 0; i < numberHistory; i++) {
        const progress = document.createElement("div");
        progress.classList.add("bar-progress");

        const level = document.createElement("div");
        level.classList.add("level")
        
        progress.appendChild(level);
        progressContainer.appendChild(progress);
    }

    return progressContainer
}

function dimanicBttnPlay(state, bttnPlay, handler){
    const containerSvgPlay = document.createElement("div");
    containerSvgPlay.innerHTML = `
        <svg class="first-state" fill="currentColor" height="16" role="img" viewBox="0 0 48 48" width="16"><title>Pausar</title><path d="M15 1c-3.3 0-6 1.3-6 3v40c0 1.7 2.7 3 6 3s6-1.3 6-3V4c0-1.7-2.7-3-6-3zm18 0c-3.3 0-6 1.3-6 3v40c0 1.7 2.7 3 6 3s6-1.3 6-3V4c0-1.7-2.7-3-6-3z">
        </path></svg>
    `
    bttnPlay.appendChild(containerSvgPlay)

    bttnPlay.addEventListener("click", () =>{
        handler()
        containerSvgPlay.innerHTML = state.isPaused ? 
            ` <svg fill="currentColor" height="16" role="img" viewBox="0 0 48 48" width="16"><title>Pausar</title><path d="M15 1c-3.3 0-6 1.3-6 3v40c0 1.7 2.7 3 6 3s6-1.3 6-3V4c0-1.7-2.7-3-6-3zm18 0c-3.3 0-6 1.3-6 3v40c0 1.7 2.7 3 6 3s6-1.3 6-3V4c0-1.7-2.7-3-6-3z">
            </path></svg>`

        : `<svg fill="currentColor" height="16" role="img" viewBox="0 0 24 24" width="16">
                <path d="M5.888 22.5a3.46 3.46 0 0 1-1.721-.46l-.003-.002a3.451 3.451 0 0 1-1.72-2.982V4.943a3.445 3.445 0 0 1 5.163-2.987l12.226 7.059a3.444 3.444 0 0 1-.001 5.967l-12.22 7.056a3.462 3.462 0 0 1-1.724.462Z">
                </path>
            </svg>`;

        bttnPlay.appendChild(containerSvgPlay)
    })
}

const tempo = (state, contentHistory, imgElement, bars, history) => {
    const duration = 6000; 
    const interval = 100; 
    const increment = (100 / (duration / interval)); 
    
    const timer = setInterval(() => {
           
        const bttnPreview= history.querySelector(".bttn-preview");
        const bttnNext= history.querySelector(".bttn-next");

        conditionalBttn(state, bttnPreview, bttnNext, contentHistory)
        
        if (state.isPaused === true) {
            const currentLevel = bars[state.currentContent].querySelector(".level"); 

            if (currentLevel.classList.contains("active")) {
                state.progress += increment;
                currentLevel.style.width = `${state.progress}%`;
            }

            if (state.progress >= 100) {
                currentLevel.classList.remove("active");
                currentLevel.classList.add("completed");

                state.progress = 0;
                state.currentContent++;

                if (state.currentContent >= contentHistory.length) {
                    clearInterval(timer);
                    document.querySelector("dialog").remove();
                    return;
                }

                imgElement.src = contentHistory[state.currentContent];
                bars[state.currentContent].querySelector(".level").classList.add("active"); // nueva barra activa
            }
            else if (state.change) {
                imgElement.src = contentHistory[state.currentContent];
                state.change = false;
            }
        }
    }, interval);
};

const conditionalBttn =  (state, bttnPreview, bttnNext, contentHistory) =>{    
    if (state.currentContent !== 0) {
        bttnPreview.style.display = "flex";
    } else {
        bttnPreview.style.display = "none";
    }
    if (state.currentContent === contentHistory.length - 1) {
        bttnNext.style.display = "none";
    } else {
        bttnNext.style.display = "flex";
    }
}

const cardPublic = (userInfo) =>{
    const cardPublic = document.createElement("article");
    cardPublic.classList.add("card-public")

    cardPublic.innerHTML = `
        <div class="cont-info-user">
            <div class="circle-gradian">
                <img class="user-icon" src="${userInfo.iconUser}">
            </div>
            <label class="username">${userInfo.username}</label>
            ${iconOpt}
        </div>
        <div class="cont-public">
            <img class="public-content" src="${userInfo.publics[0].contentPublic}">
        </div>
        <div class="cont-opt-public">
            <div>
                ${iconLike}
            </div>
            <div class="data-public">
                <strong>${userInfo.publics[0].likes} Me gusta</strong>
                <span><strong>${userInfo.username}</strong> ${userInfo.publics[0].comment}</span>
            </div>
        </div>
    `
    return cardPublic
}

const renderPublicUsers = (user) =>{
    const container = document.getElementById("users-publics")

    const card = cardPublic(user)
    container.appendChild(card);
}

const showHistoryModal = (user) => {
    const modalHistory = document.createElement("dialog");
    let state = { isPaused: true, progress: 0, currentContent: 0, change:false };

    const history = createHistory(user, state);
    
    modalHistory.appendChild(history);

    main.appendChild(modalHistory);
    modalHistory.showModal();    
    document.querySelector(".close-modal").addEventListener("click", ()=>{
        modalHistory.close()
        modalHistory.remove()
        state.progress = 0;
        state.currentContent = 0;
    })
}

const elementHistory = (user) =>{
    const bttnHistory = document.createElement("li");
    bttnHistory.classList.add("card-history");

    bttnHistory.innerHTML = `
        <div>
            <div class="circle-gradian">
                <img class="user-icon" src="${user.iconUser}">
            </div>
            <p>${user.username}</p>
        </div>
    `

    bttnHistory.addEventListener("click", () =>{
        showHistoryModal(user);
    })
    return bttnHistory;
}

const renderPressableHistory = (user) =>{
    const container = document.querySelector(".contianer-history");
    const bttnHistory = elementHistory(user)
    container.appendChild(bttnHistory) 
}


const david = {
    id: "aff3221",
    username: "david.laid",
    iconUser: "https://i.pinimg.com/736x/2f/ee/a8/2feea8ad5824e6736fc04bc19fa1f71b.jpg",
    contentHistory: [
        "https://cdn.shopify.com/s/files/1/0156/6146/files/ImageResize-Ecom_DavidLaid_Desktopcopy7_7_c089f639-be5d-48a6-943c-d5b5a9215678.jpg?v=1717432651",
        "https://i.pinimg.com/736x/f2/ff/e4/f2ffe4ca8602818a4fd4abf1e3563964.jpg",
        "https://i.pinimg.com/originals/41/dd/9f/41dd9fc0db23f252fc29092f84f1ead2.jpg"
    ],
    publics:[
        {
            comment: "Cargo...",
            contentPublic: "https://imgs.search.brave.com/cWSJRvy81_BQJTn5s33M_S04mtJyPK-k354sD7CiRWs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cGljY2xpY2tpbWcu/Y29tL3lPMEFBT1N3/U0dCbDlpNGwvR3lt/c2hhcmstWC1EYXZp/ZC1MYWlkLUNhcmdv/LVBhbnRzLU1lbnMt/U2l6ZS53ZWJw",
            likes: 30042
        }
    ]
}

const vagabond_fan = {
    id: "aeeef3231",
    username: "vagabond_fan",
    iconUser: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6DFNQikT0fhOHUSB5A07ia55RK7lbr0pHcA&s",
    contentHistory: [
        "https://i.pinimg.com/736x/0b/32/a8/0b32a833ac189ecd391b9fcedd75151a.jpg",
        "https://i.redd.it/utuw08f148451.jpg",
        "https://preview.redd.it/miyamoto-musashi-vagabond-v0-om7j614dd34a1.jpg?width=1080&crop=smart&auto=webp&s=6209c694f6e87db40c51f2468617ec77745caa44",
        "https://ae01.alicdn.com/kf/S039310ed90b04b9a91b8262df771fcf6n/Vintage-Japanese-Anime-Manga-Miyamoto-Musashi-Vagabond-Bushido-Warrior-Art-Poster-Canvas-Painting-Wall-Prints-Picture.jpg"
    
    ],
    publics:[
        {
            comment: "Smile more... The heavens won`t be laughing",
            contentPublic: "https://preview.redd.it/800akfuy10t61.jpg?auto=webp&s=249fca4f16e2c94c415cc55136a64cb3b1120b8a",
            likes: 2042
        }
    ]
}

let users = [david, vagabond_fan];

users.forEach(user => {
    renderPublicUsers(user);
    renderPressableHistory(user)
});

