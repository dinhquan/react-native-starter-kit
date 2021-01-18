export default class NetError {
  status = 200;
  message = '';

  constructor(status: number, message: string) {
    this.status = status;
    this.message = message;
  }
}
