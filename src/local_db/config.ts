interface UserConfig {
  homeViewId: string;
}

interface Config {
  [index: string]: UserConfig;
}

const config: Config = {};

export function setUserConfig(userId: string, options: UserConfig): void {
  config[userId] = options;
}

export function getUserConfig(userId: string): UserConfig {
  return config[userId];
}
