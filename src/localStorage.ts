const STATE_NAME = '_rgstate_local_storage'

export const getStoredState = () => {
  const value = localStorage.getItem(STATE_NAME);
  if (value) return JSON.parse(value);
  return {};
}

export const setStoredState = (name: string, value: any) => {
  const stored = getStoredState();
  stored[name] = value;
  localStorage.setItem(STATE_NAME, JSON.stringify(stored));
}
