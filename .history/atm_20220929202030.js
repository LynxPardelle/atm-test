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
  B50: 10,
  B100: 10,
  B200: 10,
  B500: 10,
});

console.log(atm.config);
