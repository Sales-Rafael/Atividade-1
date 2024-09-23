// Obtendo referências aos elementos do DOM
const botaoPesquiasr = document.getElementById('searchBtn'); // Botão de busca
const inputPesquisa = document.getElementById('username'); // Campo de entrada para o nome de usuário
const userList = document.getElementById('userList'); // Lista onde os resultados serão exibidos

// Definindo uma função assíncrona para buscar usuários do GitHub
async function buscarUsuarios(username) {
    // Construindo a URL da API do GitHub com o nome de usuário
    const apiUrl = `https://api.github.com/search/users?q=${username}`;

    try {
        // Fazendo a chamada à API e aguardando a resposta
        const response = await fetch(apiUrl);
        
        // Verificando se a resposta foi bem-sucedida (status 200)
        if (!response.ok) {
            throw new Error('Erro na resposta da API'); // Lançando um erro se a resposta não for ok
        }
        
        // Convertendo a resposta para JSON
        const data = await response.json();
        const users = data.items; // Acessando a lista de usuários retornados

        // Limpando a lista anterior de resultados
        userList.innerHTML = '';

        // Verificando se há usuários encontrados
        if (users && users.length > 0) {
            // Para cada usuário encontrado, cria um novo item de lista
            users.forEach(user => {
                const li = document.createElement('li'); // Criando um novo elemento de lista
                li.textContent = user.login; // Definindo o nome do usuário como o texto do item
                userList.appendChild(li); // Adicionando o item à lista
            });
        } else {
            // Se nenhum usuário for encontrado, exibe uma mensagem
            const message = document.createElement('li'); // Criando um novo item de lista para a mensagem
            message.textContent = 'Não foram encontrados usuários para esta pesquisa.'; // Definindo o texto da mensagem
            userList.appendChild(message); // Adicionando a mensagem à lista
        }
    } catch (error) {
        // Capturando e lidando com erros que possam ocorrer durante a chamada à API
        console.error('Erro:', error); // Exibindo o erro no console
        // Você pode adicionar lógica para mostrar uma mensagem ao usuário, se desejar
    }
}

// Adicionando o evento de clique ao botão de busca
botaoPesquiasr.addEventListener('click', () => {
    const username = inputPesquisa.value; // Obtendo o valor do campo de entrada
    buscarUsuarios(username); // Chamando a função de busca com o nome de usuário
});
