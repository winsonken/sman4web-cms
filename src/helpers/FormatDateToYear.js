export const formatDateToYear = (dateString) => {
  const date = new Date(dateString);

  const year = date.getFullYear();

  return year;
};
