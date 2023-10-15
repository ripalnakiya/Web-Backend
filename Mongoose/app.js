const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27017/fruitsDB');

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: [true,"Please check your data entry, No name specified"]
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

const Fruit = mongoose.model('Fruit', fruitSchema);

// INSERTING THE DATA INTO DATABASE
const fruit = new Fruit({
  name: 'Apple',
  rating: 1,
  review: 'Peaches are not great'
});

// fruit.save();

const kiwi = new Fruit({
  name: 'Kiwi',
  rating: 5,
  review: 'Not so great!'
});

const orange = new Fruit({
  name: 'Orange',
  rating: 9,
  review: 'Great for summers!'
});

const banana = new Fruit({
  name: 'Banana',
  rating: 10,
  review: 'Best for mass bulking'
});

// Fruit.insertMany([kiwi, orange, banana]);



// RELATIONSHIPS AND EMBEDDING
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favFruit: fruitSchema
});

const Person = mongoose.model('Person', personSchema);

const berry = new Fruit({
  name: 'Berry',
  rating: 7,
  review: 'Nice!'
});
berry.save();

const john = new Person({
  name: 'John',
  age: 21,
  favFruit: berry
});
john.save();



// VALIDATION TESTING
const mango = new Fruit({
  name: 'Mango',
  rating: 15,
  review: 'Great!'
});

// mango.save();



// UPDATING THE DATABASE
const peach = new Fruit({
  rating: 1,
  review: 'Peaches are not great'
});
// peach.save();

async function updt(){
  const res = await Fruit.updateOne({_id:"64a454fb2921e7da829d0b77" }, {name: 'Peaches'});
  console.log(res);
}
// updt();



// DELETING FROM DATABASE
async function dlt(){
  const res = await Fruit.deleteOne({ _id:"64a45418fd8e1dfa894606c1"});
  console.log(res);
}
// dlt();



async function myfun() {
  const fruits = await Fruit.find();
  fruits.forEach(function(fruit){
    console.log(fruit.name);
  });
}
// myfun();