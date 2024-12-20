export default function useLocalStorage(key, initialValue) {
  const storedData = JSON.parse(localStorage.getItem(key)) || initialValue;

  const save = (data) => localStorage.setItem(key, JSON.stringify(data));

  return { data: storedData, save };
}