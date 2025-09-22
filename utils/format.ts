import { default as dayjs } from 'dayjs';

export const formatDate = (date: number) =>
  dayjs(date).format('D MMMM YYYY');

export const formatType = (type: string) => type.replace('_', ' ');