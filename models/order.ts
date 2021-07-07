import moment from "moment";
class Order {
  id: string;
  items: any;
  totalAmount: number;
  date: Date;
  constructor(id: string, items: any, totalAmount: number, date: Date) {
    this.id = id;
    this.items = items;
    this.totalAmount = totalAmount;
    this.date = date;
  }
  get ReadableDate() {
    return moment(this.date).format("MMMM do YYYY, hh");
  }
}

export default Order;
