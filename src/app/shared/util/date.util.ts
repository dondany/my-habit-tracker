export default class DateUtils {
  static isDateOfYear(date: Date, year: number) {
    return date.getFullYear() === year;
  }

  static isDateOfMonth(date: Date, year: number, month: number) {
    return this.isDateOfYear(date, year) && date.getMonth() === month;
  }

  static compareDate(d1: Date, d2: Date) {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  }
}
