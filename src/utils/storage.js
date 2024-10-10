export const getStorage = type => {
  let storage = localStorage.getItem(type) || null;
  if (storage) {
    // const decryptData = Crypto.AES.decrypt(storage, EncryptKey).toString(
    //   Crypto.enc.Utf8
    // );
    const decryptData = storage;
    storage = JSON.parse(decryptData);
  }

  if (storage === null) storage = [];
  return storage;
};

const getStorageData = storageKey => {
  return JSON.parse(localStorage.getItem(storageKey)) || {};
};

export const initStorage = (storageKey, store) => {
  //TODO: 추후 DB 값 체크로 변경 및 연동 필요

  const storageData = getStorageData(storageKey);

  //스토리지 key 없을시 store의 초기 값 할당
  if (Object.keys(storageData).length === 0) {
    for (const [key, value] of Object.entries(store.get)) {
        storageData[key] = value;
    }
  }

  //스토리지 할당
  localStorage.setItem(storageKey, JSON.stringify(storageData));

  //스토어에 있는 key만 할당
  for (const [storeKey, storeValue] of Object.entries(store.state)) {
    for (const [key, value] of Object.entries(storageData)) {
      if (storeKey === key) {
        store.set[key](value);
      }
    }
  }
};

export const setStorage = (storageKey, configKey, param) => {
  const storageData = getStorageData(storageKey);
  storageData[configKey] = param;
  localStorage.setItem(storageKey, JSON.stringify(storageData));
};
