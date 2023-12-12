import * as SecureStore from "expo-secure-store";

const useSecureStore = <T>(key:any, defaultValue: T) => {
  async function store(value: T) {
    await SecureStore.setItemAsync(key, JSON.stringify(value));
  }

  async function getValueFor() {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      return JSON.parse(result);
    }
    return defaultValue;
  }

  return [store, getValueFor];
};

export default useSecureStore;
