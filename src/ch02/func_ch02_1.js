class Person {
  constructor(firstname, lastname, ssn) {
    this._firstname = firstname;
    this._lastname = lastname;
    this._ssn = ssn;
    this._address = null;
    this._birthYear = null;
  }

  get ssn() {
    return this._ssn;
  }

  get firstname() {
    return this._firstname;
  }

  get lastname() {
    return this._lastname;
  }

  get address() {
    return this._address;
  }

  get birthYear() {
    return this._birthYear;
  }

  set birthYear(year) {
    this._birthYear = year;
  }

  set address(addr) {
    this._address = addr;
  }
  set firstname(name) {
    this._firstname = name;
  }

  toString() {
    return `Person(${this._firstname}, ${this._lastname})`;
  }

  // 数据-匹配行为。内部高耦合'
  peopleSameCoutry(friends) {
    const result = [];
    for (let idx in friends) {
      let friend = friends[idx];
      if (this.address.country === friend.address.country) {
        result.push(friend);
      }
    }

    return result;
  }
}

// 定义派生模型- Student
class Student extends Person {
  constructor(firstname, lastname, ssn, school) {
    super(firstname, lastname, ssn);
    this._shcool = school;
  }

  get school() {
    return this._shcool;
  }

  set school(name) {
    this._shcool = name;
  }

  studentSameAndSchool(friends) {
    const closefriends = super.peopleSameCoutry(friends);
    const result = [];
    // debugger;
    for (let idx in closefriends) {
      let friend = closefriends[idx];
      if (friend.shool === this.shool) {
        result.push(friend);
      }
    }

    return result;
  }
}

class Address {
  /**
   * Construct a new address object
   * @param country Country code (required)
   * @param state State code
   * @param city City name
   * @param zip Zip code value object instance
   * @param street Street name
   *
   */
  constructor(country, state = null, city = null, zip = null, street = null) {
    this._country = country;
    this._state = state;
    this._city = city;
    this._zip = zip;
    this._street = street;
  }

  get street() {
    return this._street;
  }

  get city() {
    return this._city;
  }

  get state() {
    return this._state;
  }

  get zip() {
    return this._zip;
  }

  get country() {
    return this._country;
  }

  set country(country) {
    this._country = country;
    return this;
  }
}

(function () {
  // 定义Person模型
  this.Person = Person;
  this.Student = Student;
  this.Address = Address;
})(Person, Student, Address);
