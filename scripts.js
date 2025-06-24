const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("image-upload");

uploadBtn.addEventListener("click", () => {
    inputUpload.click();
})

function lerConteudoArquivo(arquivo) {
    return new Promise((resolve, reject) => {
        const leitor = new FileReader();
        leitor.onload = () => {
            resolve({
                url: leitor.result, nome: arquivo.name
            })
        }
        leitor.onerror = () => {
            reject(`Erro na leitura do arquivo ${arquivo.name}`)
        }

        leitor.readAsDataURL(arquivo)
    })
}

const imagemPrincipal = document.querySelector(".main-imagem");
const nomeImagem = document.querySelector(".container-imagem-nome p");


inputUpload.addEventListener("change", async (evento) => {
    const arquivo = evento.target.files[0];

    if (arquivo) {
        try {
            const conteudoArquivo = await lerConteudoArquivo(arquivo);
            imagemPrincipal.src = conteudoArquivo.url;
            nomeImagem.textContent = conteudoArquivo.nome;
        } catch (erro) {
            console.error("Erro na leitura do arquivo");
        }
    }
})

const inputTags = document.getElementById("input-tags");
const listaTags = document.getElementById("lista-tags");
let cont = 1

listaTags.addEventListener("click", (evento) => {
    evento.preventDefault();
    if (evento.target.classList.contains("remove-tag")) {
        const removeTag = evento.target.parentElement;
        listaTags.removeChild(removeTag);
    }
})

const tagsDisponiveis = [
    "Front-end",
    "Programação",
    "Data-Science",
    "Full-Stack",
    "HTML",
    "CSS",
    "JavaScript"
];

async function verificaTagsDisponiveis(tagTexto) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(tagsDisponiveis.includes(tagTexto));
        }, 1000)
    })

}

inputTags.addEventListener("keypress", async (evento) => {
    if (evento.key === "Enter") {
        evento.preventDefault();
        const tagText = inputTags.value.trim();
        if (tagText !== "") {
            try {
                const tagExiste = await verificaTagsDisponiveis(tagText);
                if (tagExiste) {

                    const novaTag = document.createElement("li");

                    novaTag.classList.add("item-tag")
                    novaTag.innerHTML = `<p>${tagText}</p><img src="./img/close-black.svg" class="remove-tag">`;

                    listaTags.appendChild(novaTag);
                    inputTags.value = "";
                    cont++;
                } else {
                    alert("Tag não foi encontrada.")
                }
            } catch (error) {
                console.error("Erro ao verificar existencia da tag.")
                alert("Erro ao verificar existencia da tag. Verifique o console.")
            }
        }
    }
})

async function publicarProjeto(nomeProjeto, descProjeto, tagsProjeto) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const deuCerto = Math.random() > 0.5;

            if (deuCerto) {
                resolve("Projeto publicado com sucesso");
            } else {
                reject("Erro ao publicar o projeto");
            }
        }, 2000)
    })
}

const botaoPublicar = document.querySelector(".botao-publicar");

botaoPublicar.addEventListener("click", async (evento) => {
    evento.preventDefault();

    const nomeProjeto = document.getElementById("nome").value;
    const descProjeto = document.getElementById("descricao").value;
    const tagsProjeto = Array.from(listaTags
        .querySelectorAll("p"))
        .map((tag) => tag.textContent);

    try {
        const mensagem = await publicarProjeto(nomeProjeto, descProjeto, tagsProjeto);
        console.log(mensagem);
        alert(mensagem);
    } catch (error) {
        console.error(error);
        alert(error);
    }
})

const botaoDescartar = document.querySelector(".botao-descartar");

botaoDescartar.addEventListener("click", (evento) => {
    evento.preventDefault();
    
    const formulario = document.querySelector("form");
    formulario.reset();

    imagemPrincipal.src = "./img/imagem1.png";
    nomeImagem.textContent = "imagem_projeto.png"

    listaTags.innerHTML = "";
})