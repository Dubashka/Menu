export const formatNumber = (value: number) => {
  if (Number.isInteger(value)) {
    return String(value);
  }
  return value.toFixed(1);
};

export const formatMinutes = (minutes: number) => `${minutes} мин`;