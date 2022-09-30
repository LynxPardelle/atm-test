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

function getMoney() {
  const solicitedMoney = document.getElementById("quantity");
  if (solicitedMoney.value) {
    if (solicitedMoney.value % 50 === 0) {
      let value = solicitedMoney.value;
      messagesDiv.innerHTML = `
      <div class="bg-success text-light w-75 mx-auto text-center p-3">
        <h3 class="mb-3">Operación exitosa:</h3>
        <p>
          Se le está entregando $${solicitedMoney.value}.
        </p>
      </div>
      `;
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
}
