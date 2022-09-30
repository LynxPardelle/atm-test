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
      switch (m) {
        case "50":
          value += this.config[m] * 50;
          break;
        case "100":
          value += this.config[m] * 100;
          break;
        case "200":
          value += this.config[m] * 200;
          break;
        case "500":
          value += this.config[m] * 500;
          break;
        case "1000":
          value += this.config[m] * 1000;
          break;
      }
    }
    return value;
  }
}
const atm = new AtmConfig({
  50: 10,
  100: 10,
  200: 10,
  500: 10,
  1000: 10,
});

const messagesDiv = document.getElementById("messages");

console.log(atm.config);
console.log(atm.getMaxValue());

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
          let B1000 = 0;
          let B500 = 0;
          let B200 = 0;
          let B100 = 0;
          let B50 = 0;
          if (value >= 1000) {
            B1000 = parseInt(value / 1000);
            value = value - B1000 * 1000;
          }
          if (value >= 500) {
            B500 = parseInt(value / 500);
            value = value - B500 * 500;
          }
          if (value >= 200) {
            B200 = parseInt(value / 200);
            value = value - B200 * 200;
          }
          if (value >= 100) {
            B100 = parseInt(value / 100);
            value = value - B100 * 100;
          }
          if (value >= 50) {
            B50 = parseInt(value / 50);
            value = value - B50 * 50;
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
                ${
                  B1000 > 0
                    ? `<tr>
                  <th scope="row">1000</th>
                  <td>${B1000}</td>
                </tr>`
                    : ""
                }
                ${
                  B500 > 0
                    ? `<tr>
                  <th scope="row">500</th>
                  <td>${B500}</td>
                </tr>`
                    : ""
                }
                ${
                  B200 > 0
                    ? `<tr>
                  <th scope="row">200</th>
                  <td>${B200}</td>
                </tr>`
                    : ""
                }
                ${
                  B100 > 0
                    ? `<tr>
                  <th scope="row">100</th>
                  <td>${B100}</td>
                </tr>`
                    : ""
                }
                ${
                  B50 > 0
                    ? `<tr>
                  <th scope="row">50</th>
                  <td>${B50}</td>
                </tr>`
                    : ""
                }
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
