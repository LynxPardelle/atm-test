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

let atm = new AtmConfig(config);

console.log(atm.config);
