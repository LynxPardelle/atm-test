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
let atm = new AtmConfig({
  50: 10,
  100: 10,
  200: 10,
  500: 10,
  1000: 10,
});

console.log(atm.config);

function getMoney() {
  const solicitedMoney = document.getElementById("quantity");
  console.log(solicitedMoney);
}
