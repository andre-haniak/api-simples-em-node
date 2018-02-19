// Configuração do MySQL
var mysql = require('mysql')
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : '',
  password : '',
  database : 'db_livros'
})

const express = require('express')
const nossoHumildeServidor = express()

// Define em que porta o servidor irá rodar... 8080, 3000, 3030...
const portaServidor = 3030

// Parser para JSON. Necessário para requisições de header Content/Type application/json
nossoHumildeServidor.use(express.json())

nossoHumildeServidor.get('/livros', (requisicao, resposta) => {
    try{
        const query =  "SELECT * FROM tb_livros";
        connection.query(query, function (error, results) {
            if (error) throw error;
            resposta.json({
                status:"200",
                mensagem:results
            })
          });
    }
    catch(err){
        resposta.json({
            status:"200",
            mensagem:`Ocorreu um erro ao buscar os livros: ${err}`
        })
    }
})

nossoHumildeServidor.get('/livrosAutor', (requisicao, resposta) => {
    try{
        nomeAutor = `%${requisicao.query.nomeAutor}%`;
        const query =  "SELECT * FROM tb_livros WHERE autor LIKE ?";
        connection.query(query, [nomeAutor], function (error, results) {
            if (error) throw error;
            resposta.json({
                status:"200",
                mensagem:results
            })
          });
    }
    catch(err){
        resposta.json({
            status:"200",
            mensagem:`Ocorreu um erro ao buscar os livros: ${err}`
        })
    }
})

nossoHumildeServidor.post('/livros', (requisicao, resposta) => {
    try{
        let valoresParaInserir = [];
        requisicao.body.forEach((livro) => {
           valoresParaInserir.push([
               livro.titulo,
               livro.autor
           ])
        });
        const query =  "INSERT INTO tb_livros (titulo, autor) VALUES ?";
        connection.query(query,[valoresParaInserir], function (error, results) {
            if (error) throw error;
            resposta.json({
                status:"200",
                mensagem:"Livros adicionados com sucesso!"
            })
          });
    }
    catch(err){
        resposta.json({
            status:"200",
            mensagem:`Ocorreu um erro ao adicionar os livros: ${err}`
        })
    }
})

// Adiciona identação nas respostas de formato JSON
nossoHumildeServidor.set('json spaces', 1)

// Roda o servidor na porta definida
nossoHumildeServidor.listen(portaServidor)

