import React, { useState, useEffect } from "react";

/** useLocalStorage returns [localStorageVal (state), setLocalStorageVal]
 *  in order to abstract all the token changes within the LocalStorage
 *
 *  Gets called every time token state within app changes.
*/
const useLocalStorage = (key) => {
  const localVal = localStorage.getItem(key) || "";
  const [localStorageVal, setLocalStorageVal] = useState(localVal);

  useEffect(function checkLocalStorage() {
    if (localStorageVal === "") {
      localStorage.removeItem(key);
    }
    localStorage.setItem(key, localStorageVal);
  }, [key, localStorageVal]);

  return [localStorageVal, setLocalStorageVal];
};

export default useLocalStorage;