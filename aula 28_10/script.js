
const formulario = document.getElementById("formulario");
const resultado = document.getElementById("resultado");
const nascimento = document.getElementById("nascimento");

// Define a data máxima como hoje.
const hoje = new Date();
const ano = hoje.getFullYear();
const mes = String(hoje.getMonth() + 1).padStart(2, "0");
const dia = String(hoje.getDate()).padStart(2, "0");

nascimento.max = `${ano}-${mes}-${dia}`;

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    // Captura os dados do formulário.
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const dataNascimento = nascimento.value;
    const sexo = document.getElementById("sexo").value;
    const tipoCadastro = document.getElementById("documento").value;
    const estado = document.getElementById("estado").value;
    const confirmado = document.getElementById("confirmacao").checked;

    // Valida o nome.
    if (nome.length < 3) {
        alert("Informe um nome com pelo menos 3 caracteres.");
        return;
    }

    // Valida a data de nascimento.
    if (!dataNascimento || dataNascimento > nascimento.max) {
        alert("Informe uma data de nascimento válida.");
        return;
    }

    // Calcula a idade.
    const data = new Date(`${dataNascimento}T00:00:00`);
    const hojeLocal = new Date();
    hojeLocal.setHours(0, 0, 0, 0);

    let idade = hojeLocal.getFullYear() - data.getFullYear();

    const aindaNaoFezAniversario =
        hojeLocal.getMonth() < data.getMonth() ||
        (hojeLocal.getMonth() === data.getMonth() &&
         hojeLocal.getDate() < data.getDate());

    if (aindaNaoFezAniversario) {
        idade--;
    }

    if (idade < 0 || idade > 120) {
        alert("Confira a data de nascimento informada.");
        return;
    }

    // Verifica se o usuário confirmou os dados.
    if (!confirmado) {
        alert("Confirme as informações antes de continuar.");
        return;
    }

    // Exibe os dados no console do navegador.
    console.log("=== CADASTRO MILITAR ===");
    console.log("Nome:", nome);
    console.log("E-mail:", email);
    console.log("Data de nascimento:", dataNascimento);
    console.log("Sexo:", sexo);
    console.log("Tipo de cadastro:", tipoCadastro);
    console.log("Estado:", estado);
    console.log("Idade:", idade);

    // Também exibe os dados em formato de tabela.
    console.table({
        Nome: nome,
        "E-mail": email,
        "Data de nascimento": dataNascimento,
        Sexo: sexo,
        "Tipo de cadastro": tipoCadastro,
        Estado: estado,
        Idade: idade
    });

    // Cria a mensagem de confirmação na página.
    resultado.replaceChildren();

    const titulo = document.createElement("h3");
    titulo.textContent = "✓ CADASTRO PREENCHIDO";

    const mensagem = document.createElement("p");
    mensagem.textContent =
        `Candidato: ${nome}. Idade: ${idade} anos.`;

    const emailInfo = document.createElement("p");
    emailInfo.textContent = `E-mail: ${email}`;

    const cadastroInfo = document.createElement("p");
    cadastroInfo.textContent = `Tipo de cadastro: ${tipoCadastro}`;

    const estadoInfo = document.createElement("p");
    estadoInfo.textContent = `Estado: ${estado}`;

    const aviso = document.createElement("p");
    aviso.textContent =
        "Esta é uma confirmação local. Nenhum dado foi enviado " +
        "a uma instituição militar.";

    resultado.append(
        titulo,
        mensagem,
        emailInfo,
        cadastroInfo,
        estadoInfo,
        aviso
    );

    resultado.hidden = false;

    resultado.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });
});
