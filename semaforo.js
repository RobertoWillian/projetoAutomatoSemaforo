//Chama o método que troca o sinal apresentado após o tempo definido.
function alterarSinalTemp() {
    mudarCor();
    //Define o tempo de espera para troca de sinal.
    setTimeout(alterarSinalTemp, 3000); // 3000 milissegundos = 3 segundos
}

// Altera a cor do semáforo através da referência das imagens e atráves do array especificado
const mudarCor = () => {
    //Define os estados possíveis.
    const cores = ['Vermelho', 'Verde', 'Amarelo']
    //Define a cor que ele está no momento atráves do index
    const cor = cores[corIndex]; 
    coresImg[cor]();
    proximaCor();
}

//Muda o index do array das cores
const proximaCor = () => corIndex = corIndex < 2 ? ++corIndex : 0;

//Altera a referência da imagem dependendo do valor da variável coresImg
const coresImg = {
    'Vermelho': () => img.src = './img/vermelho.png',
    'Verde': () => img.src = './img/verde.png',
    'Amarelo': () => img.src = './img/amarelo.png',
}

// Define o index do vetor que altera a cor atual. 
let corIndex = 0;

alterarSinalTemp();

