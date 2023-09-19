import selecionaCotacao from "./imprimeCotacao.js";

const graficoDolar = document.getElementById('graficoDolar');

const graficoParaDolar = new Chart(graficoDolar, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Dólar',
        data: [],
        borderWidth: 1
      }]
    }
});

function geraHorario() {
  let data = new Date();
  let horario = data.getHours() + ':' + data.getMinutes() + ':' + data.getSeconds();
  return horario;
}

function adicionarDados(grafico, horario, valores) {
  grafico.data.labels.push(horario);
  grafico.data.datasets.forEach((dataset) => {
    dataset.data.push(valores)
  });
  grafico.update();
}

let workerDolar = new Worker('./script/workers/workerDolar.js');
workerDolar.postMessage('usd');

workerDolar.addEventListener('message', (event) => {
  let tempo = geraHorario();
  let valor = event.data.ask;
  selecionaCotacao('dolar', valor);
  adicionarDados(graficoParaDolar, tempo, valor);
})

const graficoIene = document.getElementById('graficoIene');

const graficoParaIene = new Chart(graficoIene, {
  type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Iene',
        data: [],
        borderWidth: 1
      }]
    }
})

let workerIene = new Worker('./script/workers/workerIene.js');
workerIene.postMessage('iene');

workerIene.addEventListener('message', (event) => {
  let tempo = geraHorario();
  let valor = event.data.ask;
  selecionaCotacao('iene', valor);
  adicionarDados(graficoParaIene, tempo, valor);
})

const graficoLibra = document.getElementById('graficoLibra');

const graficoParaLibra = new Chart(graficoLibra, {
  type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Libra',
        data: [],
        borderWidth: 1
      }]
    }
})

let workerLibra = new Worker('./script/workers/workerLibraEst.js');
workerLibra.postMessage('libra');

workerLibra.addEventListener('message', (event) => {
  let tempo = geraHorario();
  let valor = event.data.ask;
  selecionaCotacao('libra', valor);
  adicionarDados(graficoParaLibra, tempo, valor);
})