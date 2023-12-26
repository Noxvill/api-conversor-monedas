// Declaración de variables

let currencyOption = document.getElementById("selectvalue");
const sectioncurrency = document.getElementById("selectvalue");
const sectionvaluefinal = document.getElementById("points");
const apiURL = "https://mindicador.cl/api";

// Fetch para conectar con la api

async function getCurrency() {
  try {
    const res = await fetch(apiURL);
    const currency = await res.json();

    return currency;
  } catch (e) {
    alert(e.message);
  }
}

// Renderizador de las divisas

async function renderCurrency() {
  console.log("dentro de rendercurrency");
  const currencies = await getCurrency();
  let template = "";

  Object.keys(currencies)
    .slice(3)
    .forEach((key) => {
      const currency = currencies[key];
      console.log(currency.nombre);

      // alert(currency.nombre)
      template += `
        <div class="selectvalue">
        <option value="${currency.codigo}">${currency.nombre}</option>
        </div>
      `;
    });

  sectioncurrency.innerHTML = template;
}

renderCurrency();

// Fetch para buscar por id en la api
var sel;
async function getCurrencyByid() {
  sel = currencyOption.value;
  console.log("Valor seleccionado:", sel);
  try {
    const res = await fetch(`https://mindicador.cl/api/${sel}`);
    const currencyid = await res.json();
    return currencyid;
  } catch (e) {
    alert(e.message);
  }
}

// listener para boton
const btn = document.getElementById("btnconvert");
btn.addEventListener("click", renderFinalValue);
var currencyValor = 0;

// Función para calcular el valor final

async function renderFinalValue() {
  // obtengo el valor de la caja de texto principal

  const inputvalor = document.getElementById("inputclp").value;

  // pregunto si la caja de texto está vacía
  if (inputvalor == "") {
    alert("debe ingresar un valor a convertir");
  } else {
    // Espero la respuesta con valores desde la consulta a api por id
    const currencies = await getCurrencyByid();
    // Obtengo el atributo valor desde la serie
    const valor = currencies.serie[0].valor;

    // Lo voy a imprimir solo para seguimiento de mi código
    console.log("El valor de hoy es:" + valor);

    // Lo voy a imprimir solo para seguimiento de mi código
    console.log("el valor del input es " + inputvalor);

    // Calculo la cnversión
    let valorfinal = inputvalor * valor;

    console.log("el valor final es: " + valorfinal);

    // imprimo en el dom el resultado
    document.getElementById("points").innerHTML =
      "Resultado: " + "$" + valorfinal;
      renderGrafica()
  }
}
// Función para nutrir gráfico



async function getAndCreateDataToChart() {
    // var sel;
    // sel = currencyOption.value;
    const res = await
    fetch(apiURL);
    const monedas = await res.json();
    const labels = monedas.map((moneda) => {
    return moneda.Fecha;
    });
    const data = monedas.map((moneda) => {
    const Valor = moneda.serie.split(" ")[0];
    return Number(Valor);
    });
    const datasets = [
    {
    label: "Moneda",
    borderColor: "rgb(255, 99, 132)",
    data
    }
    ];
    return { labels, datasets };
    }

    async function renderGrafica() {
        const data = await getAndCreateDataToChart();
        const config = {
        type: "line",
        data
        };
        const myChart = document.getElementById("myChart");
        myChart.style.backgroundColor = "white";
        new Chart(myChart, config);
        }
        renderGrafica();