// https://blog.rocketseat.com.br/variaveis-ambiente-nodejs/

require('dotenv/config');
const axios = require("axios");
const TotalVoice = require("totalvoice-node");
const client = new TotalVoice(process.env.TOTALVOICE_API_KEY)

console.log("Chave de API: " + process.env.TOTALVOICE_API_KEY);
console.log("Telefone: " + process.env.FELIPERODRIGUES_TELEPHONE);
const servers = [
    {
        name: "Servidor 1",
        url: "http://localhost:4001",
        developer: {
            name: "Felipe Rodrigues",
            telephone: process.env.FELIPERODRIGUES_TELEPHONE

        }
    },
    {
        name: "Servidor 2",
        url: "http://localhost:4002",
        developer: {
            name: "Felipe Rodrigues",
            telephone: process.env.FELIPERODRIGUES_TELEPHONE

        }
    }
];

setInterval(function() {
    console.log("Intervalo 1 seg...")

}, 1000);


setInterval(async function() {
    console.log("Iniciando monitoramento dos servidores");
    for (const server of servers) {
        await axios({
            url: server.url,
            method: "get"
    
        }).then((response) => {
            console.log( `${server.name} está no ar!` );
        }).catch(() => {
            console.log( `${server.name} está fora do ar!` );
            const message = `${server.developer.name} o ${server.name} está fora do ar! por favor, faça algo o mais rápido possível.`;
            const options = {
                velocidade: 2,
                tipo_voz: "br_Vitoria"
            };
            console.log(`O desenvolvedor ${server.developer.name} já foi avisado!`);
            client.tts.enviar(server.developer.telephone, message, options);
        });
    }
    console.log("Finalizando monitoramento dos servidores");
}, 1000 );

