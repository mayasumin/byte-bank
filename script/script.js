import imprimeCotacao from "./imprimeCotacao.js";

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
  imprimeCotacao('dólar', valor);
  adicionarDados(graficoParaDolar, tempo, valor);
})