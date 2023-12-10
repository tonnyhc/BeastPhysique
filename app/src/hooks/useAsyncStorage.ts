import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useAsyncStorage = <T>(key: string, defaultValue: T) => {
  const [value, setValue] = useState<T | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedData = await AsyncStorage.getItem(key);

        if (storedData !== null) {
          setValue(JSON.parse(storedData));
        } else {
          setValue(defaultValue);
        }
      } catch (error) {
        console.error("Error loading data from AsyncStorage:", error);
      }
    };

    loadData();
  }, [key, defaultValue]);

  const setAsyncStorageValue = async (newValue: T) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(newValue));
      setValue(newValue);
    } catch (error) {
      console.error("Error saving data to AsyncStorage:", error);
    }
  };

  return [value, setAsyncStorageValue] as const;
};

export default useAsyncStorage;
