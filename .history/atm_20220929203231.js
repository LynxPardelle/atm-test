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
    console.log(solicitedMoney.value);
  } else {
    messagesDiv.innerHTML = `
    <h3>Error:</h3>
    <p class="bg-danger text-light w-75 mx-auto text-center p-3">
    Es necesario escribir un valor.
    </p>
    `;
  }
}
