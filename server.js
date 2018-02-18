const express = require('express')
const nossoHumildeServidor = express()

// Define em que porta o servidor irá rodar... 8080, 3000, 3030...
const portaServidor = 3030

nossoHumildeServidor.use(express.json())
// Definindo o array de objetos que será retornado
const livros = [
	{ titulo: "All-American Murder", autor: "James Patterson, Alex Abramovich & Mike Harvkey"},
	{ titulo: "The Immortalists", autor: "Chloe Benjamin"},
	{ titulo: "Merlin's Tour of the Universe", autor: "Neil de Grasse Tyson"}
]

nossoHumildeServidor.get('/livros', (requisicao, resposta) => {
    resposta.send(livros)
})

nossoHumildeServidor.post('/livros', (requisicao, resposta) => {
    try{
        requisicao.body.forEach((livro) => {
            livros.push({
                titulo : livro.titulo,
                autor : livro.autor,
            });
        });
        resposta.json({
            status:"200",
            mensagem:"Livros adicionados com sucesso!"
        })
    }
    catch(err){
        resposta.json({
            status:"200",
            mensagem:`Ocorreu um erro ao adicionar os livros: ${err}`
        })
    }
})

// Adiciona identação nas respostas
nossoHumildeServidor.set('json spaces', 1);

// Roda o servidor na porta definida
nossoHumildeServidor.listen(portaServidor)

