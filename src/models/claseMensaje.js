import moment from 'moment';

export const formatMessages = (data) => {
  const { author, text } = data;
  return {
    author,
    text,
    time: moment().format('DD/MM/YYYY hh:mm:ss'),
  };
};