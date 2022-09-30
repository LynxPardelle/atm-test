let atmConfigs;

class AtmConfig {
  config = {
    B50 : 10,
    B100 : 10,
    B200 : 10,
    B500 : 10,
  };
  constructor() {
    if (atmConfigs === undefined) {
      atmConfigs = this;
    } else {
      this = atmConfigs;
    }
  }
  change(config) {
    this.config = config;
  }
}

let atm = new AtmConfig();