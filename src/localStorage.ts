const STATE_NAME = '_rgstate_local_storage'

export const getStoredState = () => {
  if (typeof window === 'undefined') {
    return;
  }
  const value = localStorage.getItem(STATE_NAME);
  if (value) return JSON.parse(value);
  return {};
}

export const setStoredState = (name: string, value: any) => {
  if (typeof window === 'undefined') {
    return;
  }

  const stored = getStoredState();
  stored[name] = value;
  localStorage.setItem(STATE_NAME, JSON.stringify(stored));
}
