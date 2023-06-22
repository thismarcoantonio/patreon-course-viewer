import config from "../config";

const KEYS = {
  POSTS: "posts",
  PROGRESS: "progress",
};

function get(key) {
  const stringifiedValues = window.localStorage.getItem(
    `${config.storageKey}-${key}`
  );
  return stringifiedValues ? JSON.parse(stringifiedValues) : null;
}

function save(key, values) {
  const stringifiedValues = JSON.stringify(values);
  window.localStorage.setItem(`${config.storageKey}-${key}`, stringifiedValues);
}

function destroy(key) {
  const storageKey = `${config.storageKey}-${key}`;
  const stringifiedValues = window.localStorage.getItem(storageKey);
  if (stringifiedValues) {
    window.localStorage.removeItem(storageKey);
    return true;
  }
  return false;
}

export default {
  save,
  get,
  destroy,
  KEYS,
};
