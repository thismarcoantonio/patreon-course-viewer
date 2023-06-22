import storage from "./localStorage";

export function togglePostCompleted(postId) {
  const progress = storage.get(storage.KEYS.PROGRESS) || {};
  storage.save(storage.KEYS.PROGRESS, {
    ...progress,
    [postId]: !progress[postId],
  });
  return !progress[postId];
}
