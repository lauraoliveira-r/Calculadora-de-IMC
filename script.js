// Função para calcular o IMC e cadastrar o usuário
function cadastrarUsuario() {
    const nome = document.getElementById("nome").value;
    const dataDeMonitoramento = new Date(document.getElementById("dataDeMonitoramento").value);
    const peso = parseFloat(document.getElementById("peso").value);
    const altura = parseFloat(document.getElementById("altura").value);
    const resultadoDiv = document.getElementById("resultado");

    // Validação das entradas
    if (!nome || isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
        resultadoDiv.innerHTML = "Por favor, insira valores válidos.";
        return; // Sai da função se as entradas não forem válidas
    }

    // Calcula o IMC
    const imc = peso / (altura * altura);
    let categoria;

    // Define a categoria com base no valor do IMC
    if (imc < 18.5) {
        categoria = "Abaixo do peso";
    } else if (imc < 24.9) {
        categoria = "Peso normal";
    } else if (imc < 29.9) {
        categoria = "Sobrepeso";
    } else {
        categoria = "Obesidade";
    }

    // Formata a data como dia/mês/ano
    const dia = String(dataDeMonitoramento.getDate()).padStart(2, '0');
    const mes = String(dataDeMonitoramento.getMonth() + 1).padStart(2, '0'); // Meses começam do zero
    const ano = dataDeMonitoramento.getFullYear();
    const dataFormatada = `${dia}/${mes}/${ano}`;

    // Cria um objeto do usuário
    const usuario = {
        nome: nome,
        dataDeMonitoramento: dataFormatada,
        peso: peso,
        altura: altura,
        imc: imc.toFixed(2), // Armazena o IMC com duas casas decimais
        categoria: categoria
    };

    // Salva o usuário no localStorage
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    // Exibe a confirmação do cadastro
    resultadoDiv.innerHTML = `Usuário ${nome} cadastrado com IMC de ${usuario.imc} (${usuario.categoria}) em ${usuario.dataDeMonitoramento}.`;

    // Limpa os campos de entrada
    document.getElementById("nome").value = "";
    document.getElementById("dataDeMonitoramento").value = "";
    document.getElementById("peso").value = "";
    document.getElementById("altura").value = "";

    // Atualiza a lista de usuários exibida
    exibirUsuarios();
}

// Função para exibir os usuários cadastrados
function exibirUsuarios() {
    const listaUsuariosDiv = document.getElementById("listaUsuarios");
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || []; // Obtém a lista de usuários do localStorage
    listaUsuariosDiv.innerHTML = ""; // Limpa a lista antes de exibir

    // Verifica se há usuários cadastrados
    if (usuarios.length === 0) {
        listaUsuariosDiv.innerHTML = "<p>Nenhum usuário cadastrado.</p>";
        return; // Sai da função se não houver usuários
    }

    // Exibe cada usuário na lista com um botão para excluir
    usuarios.forEach((usuario, index) => {
        listaUsuariosDiv.innerHTML += `<p><strong>${usuario.nome}</strong> - Data de Monitoramento: ${usuario.dataDeMonitoramento}, Peso: ${usuario.peso}kg, Altura: ${usuario.altura}m, IMC: ${usuario.imc} (${usuario.categoria}) <button onclick="excluirUsuario(${index})">Excluir</button></p>`;
    });
}

// Função para excluir um usuário específico
function excluirUsuario(index) {
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.splice(index, 1); // Remove o usuário do array
    localStorage.setItem("usuarios", JSON.stringify(usuarios)); // Atualiza o localStorage
    exibirUsuarios(); // Atualiza a exibição da lista
}

// Função para limpar os campos e resultados
function limparCampos() {
    document.getElementById("nome").value = "";
    document.getElementById("dataDeMonitoramento").value = "";
    document.getElementById("peso").value = "";
    document.getElementById("altura").value = "";
    document.getElementById("resultado").innerHTML = ""; // Limpa a mensagem de resultado
    document.getElementById("listaUsuarios").innerHTML = ""; // Limpa a lista de usuários
}

// Exibe a lista de usuários ao carregar a página
document.addEventListener("DOMContentLoaded", exibirUsuarios);
