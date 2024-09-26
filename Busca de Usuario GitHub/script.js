const botaoPesquisa = document.querySelector("#buttonSearch");
const inputPesquisa = document.querySelector("#inputSearch");

async function GitDados(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        const dados = await response.json();
        return dados; // Retorna os dados do usuário
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
    }
}

botaoPesquisa.addEventListener('click', async () => {
    const username = inputPesquisa.value; // Captura o valor digitado no input
    const dados = await GitDados(username); // Espera os dados do usuário

    if (dados) {
        criarPerfil(dados); // Chama a função para criar o perfil
    } else {
        console.error("Não foram encontrados usuários para esta pesquisa");
    }
});

function criarPerfil(dados) {
    // Limpa o conteúdo anterior antes de criar novos elementos
    const perfilArea = document.getElementById('perfilContainer');
    perfilArea.innerHTML = ''; // Limpa o conteúdo anterior

    // Criando uma lista para o perfil
    const listaPerfil = document.createElement('ul');

    // Criando os itens da lista
    const elementoNome = document.createElement('li');
    const elementoLogin = document.createElement('li');
    const elementoImg = document.createElement('li');
    const elementoId = document.createElement('li');
    const elementoBio = document.createElement('li');
    const elementoEmail = document.createElement('li');
    const elementoRepositorios = document.createElement('li');
    const elementoSeguidores = document.createElement('li');
    const elementoDataCriacao = document.createElement('li');
    const elementoLink = document.createElement('li');

    // Atribuindo os valores dos dados aos itens da lista
    elementoNome.innerText = dados.name || "Nome não disponível";
    elementoLogin.innerText = `Login: ${dados.login}`;
    elementoImg.innerHTML = `<img src="${dados.avatar_url}" alt="Avatar de ${dados.login}" width="500">`; // Usando innerHTML para incluir a imagem
    elementoId.innerText = `ID: ${dados.id}`;

    // Condicionais para ocultar ou mostrar informações
    elementoBio.innerText = `Bio: ${dados.bio || "Sem bio"}`;
    elementoEmail.innerText = `Email: ${dados.email || "Não disponível"}`;
    
    // Usando toggle para ocultar elementos caso não existam
    elementoBio.classList.toggle('hide', !dados.bio);
    elementoEmail.classList.toggle('hide', !dados.email);

    elementoRepositorios.innerText = `Repositórios: ${dados.public_repos}`;
    elementoSeguidores.innerText = `Seguidores: ${dados.followers}`;
    elementoDataCriacao.innerText = `Data de Criação: ${new Date(dados.created_at).toLocaleDateString()}`;
    elementoLink.innerHTML = `<a href="${dados.html_url}" target="_blank">Perfil no GitHub</a>`; // Usando innerHTML para incluir o link

    // Adicionando os itens à lista
    listaPerfil.appendChild(elementoImg); // Adiciona a imagem como um item da lista
    listaPerfil.appendChild(elementoNome);
    listaPerfil.appendChild(elementoLogin);
    listaPerfil.appendChild(elementoId);
    listaPerfil.appendChild(elementoBio);
    listaPerfil.appendChild(elementoEmail);
    listaPerfil.appendChild(elementoRepositorios);
    listaPerfil.appendChild(elementoSeguidores);
    listaPerfil.appendChild(elementoDataCriacao);
    listaPerfil.appendChild(elementoLink);

    // Adicionando a lista ao DOM
    perfilArea.appendChild(listaPerfil);
}
