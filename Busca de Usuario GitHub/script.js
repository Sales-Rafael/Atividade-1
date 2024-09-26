const botaoPesquisa = document.querySelector("#buttonSearch");
const inputPesquisa = document.querySelector("#inputSearch");
const divSrc = document.getElementById("perfilContainer")

async function GitDados(username) {
    try {
        const response = await fetch('https://api.github.com/');
        const data = await response.json();
        const user = data.user_url;
        const userEspecifico = user.replace('{user}', username)
        const userJson = (await fetch(userEspecifico)).json()
        return userJson
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
    }

}

botaoPesquisa.addEventListener('click', () => {
    const username = inputPesquisa.value; // Captura o valor digitado no input
    divSrc.innerHTML = "";
    GitDados(username).then(dados => {
        if (!dados || dados.message === "Not Found") {
            exibirMensagem("Não foram encontrados usuários para esta pesquisa.");
        } else {
            criarPerfil(dados);
        }
    });
});

function exibirMensagem(mensagem) {
    const elementoMensagem = document.createElement('p');
    elementoMensagem.innerText = mensagem;
    elementoMensagem.classList.add('error')
    divSrc.appendChild(elementoMensagem);
}

function criarPerfil(dados) {
    const nome = dados.name || "Nome não disponível";
    const login = dados.login;
    const img = dados.avatar_url;
    const id = dados.id;
    const bio = dados.bio || "Bio não disponível";
    const email = dados.email || "Email não disponível";
    const rep = dados.public_repos;
    const seguidores = dados.followers;
    const dataCriação = dados.created_at;
    const link = dados.html_url;

    const elementoNome = document.createElement('h1')
    const elementoLogin = document.createElement('p')
    const elementoImg = document.createElement('img')
    const elementoId = document.createElement('p')
    const elementoBio = document.createElement('p')
    const elementoEmail = document.createElement('p')
    const elementoRepertorios = document.createElement('p')
    const elementoSeguidores = document.createElement('p')
    const elementoDataCriação = document.createElement('p')
    const elementolink = document.createElement('a')

    elementoNome.innerText = `Nome: ${nome}`
    elementoLogin.innerText = `Login: ${login}`

    Object.assign(elementoImg, { src: img, alt: `Avatar de ${login}`, width: 500 });
    
    elementoId.innerText = `Id: ${id}`
    elementoBio.innerText = `Bio: ${bio}`
    elementoEmail.innerText =  `Email: ${email}` 
    elementoRepertorios.innerText = `Quantidade de repositorios: ${rep}`;
    elementoSeguidores.innerText = `Quantidade de Seguidores: ${seguidores}`;
    
    elementoDataCriação.innerText = `Data de Criação: ${new Date(dataCriação).toLocaleDateString()}`;

    elementolink.innerText = 'Pagina do GitHub'
    elementolink.href = link
    elementolink.target = '_blank'

    const ul = document.createElement('ul')
    const il = document.createElement('il')

    divSrc.appendChild(ul)
    ul.appendChild(il)
    
    il.appendChild(elementoImg)
    il.appendChild(elementoNome)
    il.appendChild(elementoLogin)
    il.appendChild(elementoId)
    il.appendChild(elementoBio)
    il.appendChild(elementoEmail)
    il.appendChild(elementoRepertorios)
    il.appendChild(elementoSeguidores)
    il.appendChild(elementoDataCriação)
    il.appendChild(elementolink)

}
