// clears localStorage except for designated keys
export default function clearLocalStorageWithException(
  exceptionKeys: string[]
) {
  const valuesToKeep = exceptionKeys.map((key) => [
    key,
    localStorage.getItem(key),
  ]);

  localStorage.clear();

  valuesToKeep.map(
    ([key, value]) => key && value && localStorage.setItem(key, value)
  );
}
