let atmConfigs;
class AtmConfig {
  constructor(config) {
    if (!atmConfigs) this.config = config;
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
});

console.log(atm.config);
