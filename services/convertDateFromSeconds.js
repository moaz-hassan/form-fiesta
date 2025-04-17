export default function convertDateFromSeconds(dateInSeconds) {
    const seconds = dateInSeconds;
    const date = new Date(seconds * 1000);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }