export const platformIcons = {
  tokopedia: "/icons/tokopedia.svg",
  shopee: "/icons/shopee.svg",
};

export const getPlatformIcon = (name) => {
  if (!name) return null;
  return platformIcons[name.toLowerCase()] || null;
};