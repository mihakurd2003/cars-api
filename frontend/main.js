/** ЗАДАЧА - Создать класс CarBrand
 *
 * brand - Марка автомобиля;
 * age - Возраст марки;
 * averageSpeed - Средняя скорость у всех автомобилей этой марки;
 *
 * 1. Добавить метод "Увеличить возраст", увеличивающий возраст марки автомобиля на 1 год при вызове
 *
 * 2. Добавить метод "Увеличить среднюю скорость", увеличивающий значение средней скорости марки автомобиля на указанное количество
 *
 * 3. Добавить метод "Получить тип", который будет возвращать следующий тип марки автомобиля в зависимости от его средней скорости:
 * "Пора взлетать"(начинается от 360 км/ч), "Гоночный"(начинается от 200 км/ч), "Семейный"(начинается от 90 км/ч), остальные грузовые
 *
 * 4. Добавить статическое поле "Максимальная средняя скорость" и статический метод "Получить максимальную среднюю скорость", который
 * будет выводить макс. среднюю скорость среди всех созданных марок автомобилей
 *
 * 5. Добавить статический метод "filterByScore", возвращающий список марок автомобилей, у которых средняя скорость выше чем указанная
 * скорость
 *
 * UPD: Получилось местами сложновато, но предусмотрел вроде все нюансы :)
 */

class CarBrand {
  constructor(brand, age, averageSpeed) {
    this.brand = brand;
    this.age = age;
    this.averageSpeed = averageSpeed;

    if (averageSpeed > CarBrand.MAX_AVERAGE_SPEED) {
      CarBrand.MAX_AVERAGE_SPEED = averageSpeed;
    }

    CarBrand.BRANDS.push({
      brand: brand,
      age: age,
      averageSpeed: averageSpeed,
    })
  }

  static MAX_AVERAGE_SPEED = 0;
  static BRANDS = [];

  static getMaxAverageSpeed() {
    return CarBrand.MAX_AVERAGE_SPEED;
  }

  static filterByScore(speed) {
    const filtered_brands = CarBrand.BRANDS.filter((brand) => brand.averageSpeed > speed);
    return filtered_brands.length ? filtered_brands : 'Нет результатов';
  }

  #updateBrands() {
    const foundIndex = CarBrand.BRANDS.findIndex((brand) =>
        brand.brand === this.brand
    )
    CarBrand.BRANDS[foundIndex] = {
      brand: this.brand,
      age: this.age,
      averageSpeed: this.averageSpeed,
    }
  }

  increaseAge() {
    this.age += 1;
    this.#updateBrands();
  }

  increaseAverageSpeed(speed) {
    this.averageSpeed += speed;

    if (this.averageSpeed > CarBrand.MAX_AVERAGE_SPEED) {
      CarBrand.MAX_AVERAGE_SPEED = this.averageSpeed;
    }
    this.#updateBrands();
  }

  getCarType() {
    if (this.averageSpeed >= 360) {
      return 'Почти взлетающие автомобили';
    }

    if (this.averageSpeed >= 200) {
      return 'Это гоночный тип';
    }

    if (this.averageSpeed >= 90) {
      return 'Это семейный тип';
    }

    return 'Это грузовой тип';
  }
}

car1 = new CarBrand('Toyota', 91, 132);
car2 = new CarBrand('BMW', 72, 224);
car3 = new CarBrand('Volvo', 67, 226);

console.log(car1.brand, car1.age, car1.averageSpeed);
console.log(car1.getCarType());
car1.increaseAge();
car1.increaseAverageSpeed(100);
console.log(`Обновлённые данные для car1: возраст - ${car1.age}, ср. скорость - ${car1.averageSpeed}\n`);

console.log(car2.brand, car2.age, car2.averageSpeed);
console.log(car2.getCarType());
car2.increaseAge();
car2.increaseAverageSpeed(15);
console.log(`Обновлённые данные для car2: возраст - ${car2.age}, ср. скорость - ${car2.averageSpeed}\n`);

console.log(car3.brand, car3.age, car3.averageSpeed);
console.log(car3.getCarType());
car3.increaseAge();
car3.increaseAverageSpeed(5);
console.log(`Обновлённые данные для car3: возраст - ${car3.age}, ср. скорость - ${car3.averageSpeed}\n`);

console.log(`Макс средняя скорость: ${CarBrand.getMaxAverageSpeed()}`);
console.log('Отфильтрованные марки автомобилей:', CarBrand.filterByScore(200));

/** Результат работы:

Toyota 91 132
Это семейный тип
Обновлённые данные для car1: возраст - 92, ср. скорость - 232

BMW 72 224
Это гоночный тип
Обновлённые данные для car2: возраст - 73, ср. скорость - 239

Volvo 67 226
Это гоночный тип
Обновлённые данные для car3: возраст - 68, ср. скорость - 231

Макс средняя скорость: 239
Отфильтрованные марки автомобилей: [
  { brand: 'Toyota', age: 92, averageSpeed: 232 },
  { brand: 'BMW', age: 73, averageSpeed: 239 },
  { brand: 'Volvo', age: 68, averageSpeed: 231 }
]
 */