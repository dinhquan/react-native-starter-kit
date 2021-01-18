export default class User {
  firstName = '';
  lastName = '';
  phoneNumber = '';

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
