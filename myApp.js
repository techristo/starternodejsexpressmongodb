require('dotenv').config();
var mongoose = require('mongoose');

var uri = 'URL';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

var peopleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

var Person = mongoose.model("Person", peopleSchema);


var createAndSavePerson = function(done) {
  var francesca = new Person({
    name: "Francesca",
    age: 20,
    favoriteFoods: ["sushi"]
  });

  francesca.save(function(error, data)  {
    if (error) {
      console.log(error);
    } else {
      done(null, data);
    }
  });
  //done(null /*, data*/);
};

var arrayOfPeople = [
  {
    name: "Garry",
    age: 35,
    favoriteFoods: ["fried chicken", "chicken wings", "chicken nuggets"]
  },
  { name: "Hannah", age: 24, favoriteFoods: ["watermelon", "mango"] },
  { name: "Igor", age: 52, favoriteFoods: ["vegetable soup"] }
];
var createManyPeople = function(arrayOfPeople, done) {
  
  Person.create(arrayOfPeople, function(error, createdPeople){
    if(error){
      console.log(error);
    }else{
      done(null, createdPeople);
    }
  });
};

var findPeopleByName = function(personName, done) {
  
  Person.find({name: personName}, function(error, arrayOfResults){
    if(error){
      console.log(error);
    }else{
      done(null, arrayOfResults);
    }
  });
};

var findOneByFood = function(food, done) {
  Person.findOne({favoriteFoods : {$all : [food]}}, function(error, result) {
    if(error){
      console.log(error);
    }else{
      done(null, result);
    }
  });
};

var findOneByFood = function(food, done) {
  Person.findOne({favoriteFoods : {$all : [food]}}, function(error, result) {
    if(error){
      console.log(error);
    }else{
      done(null, result);
    }
  });
};

var findPersonById = function(personId, done) {
  Person.findById(personId, function(error, result){
    if(error){
      console.log(error);
    }else{
      done(null, result);
    }
  });
};

var findEditThenSave = function(personId, done) {
  var foodToAdd = "hamburger";
  
  Person.findById(personId, function(error, result) {
    if(error){
      console.log(error);
    }else{
      result.favoriteFoods.push(foodToAdd);
      result.save(function(error, updatedResult){
        if(error){
          console.log(error);
        }else{
          done(null, updatedResult);
        }
      });
    }
  });
};

var findAndUpdate = function(personName, done) {
  var ageToSet = 20;
  
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, function(error, updatedRecord){
    if(error){
      console.log(error);
    }else{
      done(null, updatedRecord);
    }
  }); 
};

var removeById = function(personId, done) {
  
  Person.findByIdAndRemove(personId, function(error, deletedRecord){
    if(error){
      console.log(error);
    }else{
      done(null, deletedRecord);
    }
  });
};

var removeManyPeople = function(done) {
  var nameToRemove = "Mary";

  Person.remove({name: nameToRemove}, function(error, JSONStatus){
    if(error){
      console.log(error);
    }else{
      done(null, JSONStatus);
    }
  });
};

var queryChain = function(done) {
  var foodToSearch = "burrito";
  
  Person.find({favoriteFoods : {$all: [foodToSearch]}})
    .sort({name: 'asc'})
    .limit(2)
    .select('-age')
    .exec(function(error, filteredResults) {
    if(error){
      console.log(error);
    }else{
      done(null, filteredResults);
    }
  });
  
};



/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
