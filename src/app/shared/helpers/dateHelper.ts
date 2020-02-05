const getMonth2Dig = (d) => {
  const month = d.getMonth() + 1;
  return month.toString().length === 1 ? '0' + month : month;
};

const getDay2Dig = (d) => {
  const date = d.getDate();
  return date.toString().length === 1 ? '0' + date : date;
};

export const getDateParsed = (d) => d.getFullYear() + '-' + getMonth2Dig(d) + '-' + getDay2Dig(d);
