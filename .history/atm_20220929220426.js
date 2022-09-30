let atmConfigs;
class AtmConfig {
  constructor(config) {
    if (!atmConfigs) {
      atmConfigs = this;
      this.config = config;
    } else {
      return atmConfigs;
    }
  }
  change(config) {
    this.config = config;
    return this.config;
  }
  getMaxValue() {
    let value = 0;
    for (let m in this.config) {
      value += this.config[m] * m;
    }
    return value;
  }
  getBilletes() {
    let value = "";
    for (let m in this.config) {
      value += value === "" ? m : ", " + m;
    }
    return value;
  }
}
const atm = new AtmConfig({
  1000: 10,
  500: 10,
  200: 10,
  100: 10,
  50: 10,
});

let isEdit = false;

const messagesDiv = document.getElementById("messages");

function getMoney() {
  const solicitedMoney = document.getElementById("quantity");
  messagesDiv.innerHTML = `
  <div class="bg-info text-light w-75 mx-auto text-center p-3">
    <h3 class="mb-3">Cargando:</h3>
    <p>
      Espere un momento por favor.
    </p>
  </div>
  `;
  setTimeout(() => {
    if (solicitedMoney.value) {
      if (solicitedMoney.value % 50 === 0) {
        if (solicitedMoney.value <= atm.getMaxValue()) {
          let value = solicitedMoney.value;
          let rows = "";
          let orderATM = [];
          for (let m in atm.config) {
            console.log(typeof m);
            orderATM.push(parseInt(m));
          }
          orderATM.sort((a, b) => {
            return b - a;
          });
          for (let m of orderATM) {
            let b = parseInt(value / m);
            if (b > 10) {
              b = 10;
            }
            value = value - b * m;
            rows += `
            <tr>
              <th scope="row">${m}</th>
              <td>${b}</td>
            </tr>
            `;
          }
          messagesDiv.innerHTML = `
          <div class="bg-success text-light w-75 mx-auto text-center p-3">
            <h3 class="mb-3">Operación exitosa:</h3>
            <p>
              Se le está entregando $${solicitedMoney.value}.
            </p>
            <table class="table text-light">
              <thead>
                <tr>
                  <th scope="col">Billete</th>
                  <th scope="col">Cantidad</th>
                </tr>
              </thead>
              <tbody>
                ${rows}
              </tbody>
            </table>
          </div>
          `;
        } else {
          messagesDiv.innerHTML = `
          <div class="bg-danger text-light w-75 mx-auto text-center p-3">
            <h3 class="mb-3">Error:</h3>
            <p>
              Lo sentimos, por el momento el cajero no cuenta con la cantidad que usted necesita, inténtenlo más tarde.
            </p>
          </div>
          `;
        }
      } else {
        messagesDiv.innerHTML = `
        <div class="bg-danger text-light w-75 mx-auto text-center p-3">
          <h3 class="mb-3">Error:</h3>
          <p>
            Favor de escribir un valor que sea múltiplo de 50.
          </p>
        </div>
        `;
      }
    } else {
      messagesDiv.innerHTML = `
      <div class="bg-danger text-light w-75 mx-auto text-center p-3">
        <h3 class="mb-3">Error:</h3>
        <p>
          Es necesario escribir un valor.
        </p>
      </div>
      `;
    }
  }, 500);
}

function getRdy2Config() {
  const configDiv = document.getElementById("config-atm");
  let rows = "";
  let orderATM = [];
  for (let m in atm.config) {
    orderATM.push(parseInt(m));
  }
  orderATM.sort((a, b) => {
    return b - a;
  });
  for (let m of orderATM) {
    rows += `
    <tr>
      <th scope="row">${m}</th>
      <td id="config-atm-B${m}">${atm.config[m]}</td>
    </tr>
    `;
  }
  configDiv.innerHTML = `
  <h2 class="text-center my-3">Configuración de cajero</h2>
  <ul
    class="list-group list-group-flush d-block mx-auto w-75 text-center my-3"
  >
    <li class="list-group-item">Billetes: <span id="billetes"></span></li>
    <li class="list-group-item">
      Máxima cantidad de dinero: <span id="max-value"></span>
    </li>
  </ul>
  <table class="table mx-auto w-75 text-center my-3">
    <thead>
      <tr>
        <th scope="col">Billetes</th>
        <th scope="col">Cantidad</th>
      </tr>
    </thead>
    <tbody>
      ${rows}
    </tbody>
  </table>
  <div id="config-edit-btn">
    <button
      class="btn btn-info d-block my-3 mx-auto"
      onclick="editConfigBtn()"
    >
      Editar configuración
    </button>
  </div>
  `;
  let billetesDiv = document.getElementById("billetes");
  let maxValue = document.getElementById("max-value");

  billetesDiv.innerHTML = `${atm.getBilletes()}`;
  maxValue.innerHTML = `${atm.getMaxValue()}`;
}

function editConfigBtn() {
  let editBTNDiv = document.getElementById("config-edit-btn");
  if (isEdit === false) {
    isEdit === true;
    if (editBTNDiv && editBTNDiv.innerHTML) {
      editBTNDiv.innerHTML = `
      <button
        class="btn btn-info d-block my-3 mx-auto"
        onclick="editConfigBtn()"
      >
        Cancelar edición
      </button>
      <button
        class="btn btn-info d-block my-3 mx-auto"
        onclick="updateAtmConfig()"
      >
        Actualizar configuración
      </button>
      `;
    }
    for (let m in atm.config) {
      let colB = document.getElementById(`config-atm-B${m}`);
      if (colB && colB.innerHTML) {
        colB.innerHTML = `
        <input
          type="text"
          class="form-control"
          id="colB${m}"
          placeholder="${atm.config[m]}"
          value="${atm.config[m]}"
        />`;

        console.log(colB);
      }
    }
  } else {
    isEdit === false;
    if (editBTNDiv && editBTNDiv.innerHTML) {
      editBTNDiv.innerHTML = `
      <button
        class="btn btn-info d-block my-3 mx-auto"
        onclick="editConfigBtn()"
      >
        Editar configuración
      </button>
      `;
    }
    for (let m in atm.config) {
      let colB = document.getElementById("config-atm-B" + m);
      if (colB && colB.innerHTML) {
        colB.innerHTML = atm.config[m];
      }
    }
  }
}

function updateAtmConfig() {}
