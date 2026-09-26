import { INITIAL_INITIATIVES, LEADERBOARD } from '../data/mockData';

const STORAGE_KEYS = {
  INITIATIVES: 'tozamakan_initiatives_v1',
  USER: 'tozamakan_current_user_v1',
  LIKES: 'tozamakan_user_likes_v1',
  LEADERBOARD: 'tozamakan_leaderboard_v1'
};

export const getStoredInitiatives = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.INITIATIVES);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error("Failed to read initiatives from localStorage", e);
  }
  // Initialize with mock data
  try {
    localStorage.setItem(STORAGE_KEYS.INITIATIVES, JSON.stringify(INITIAL_INITIATIVES));
  } catch (e) {}
  return INITIAL_INITIATIVES;
};

export const saveInitiative = (newInitiative) => {
  const current = getStoredInitiatives();
  const updated = [newInitiative, ...current];
  try {
    localStorage.setItem(STORAGE_KEYS.INITIATIVES, JSON.stringify(updated));
  } catch (e) {
    console.error("Failed to save initiative to localStorage", e);
  }
  return updated;
};

export const getStoredUser = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USER);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error("Failed to read user from localStorage", e);
  }
  return null;
};

export const saveUser = (user) => {
  try {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  } catch (e) {
    console.error("Failed to save user to localStorage", e);
  }
  return user;
};

export const removeUser = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.USER);
  } catch (e) {}
};

export const getLikedInitiatives = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.LIKES);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {}
  return {};
};

export const toggleLikeInitiative = (id) => {
  const currentLikes = getLikedInitiatives();
  const isLiked = !!currentLikes[id];
  if (isLiked) {
    delete currentLikes[id];
  } else {
    currentLikes[id] = true;
  }
  try {
    localStorage.setItem(STORAGE_KEYS.LIKES, JSON.stringify(currentLikes));
  } catch (e) {}
  return !isLiked;
};

export const getLeaderboard = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.LEADERBOARD);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {}
  return LEADERBOARD;
};
