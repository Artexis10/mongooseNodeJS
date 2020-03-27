const express = require('express');
const mongoose = require('mongoose');
const app = express();
 
mongoose.connect('mongodb://localhost:27017/fruitDB', { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(3000, ()=>{
    console.log("Server is Running on Port 3000");
});

//fruit schema - a blueprint for the object that will be saved in the database
const fruitSchema = new mongoose.Schema({
    name:  {
        type: String,
        required: [true, "Error: no name specified" ] //the property name must not be empty
    },
       rating: {
           type: Number, //must be a number
           min: 1, //minimum value allowed 1
           max: 10 //maximum value allowed 10
       }, 
       review: String 
   });
   

//use the schema to create a Mongoose model
const Fruit = mongoose.model("Fruit", fruitSchema);

const personSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    age: Number
});

const Person = mongoose.model("Person", personSchema);

/*
//create a fruit document
const fruit = new Fruit({
    name: "Apple",
    rating: 8,
    review: "Sweet and crunchy"
});
//saving the document (our object) to the database
//fruit.save();
*/

/*
const banana = new Fruit({
    name: "Banana",
    rating: 5,
    review: "Soft texture"
});
 
const lemon = new Fruit({
    name: "Lemon",
    rating: 5,
    review: "Sour as hell"
});

//to add all the fruit in bulk
Fruit.insertMany([banana, lemon], (error)=> {
    if(error){
        console.log(err);
    } else {
        console.log("Fruit successfully added to the fruitDB");
    }
})
*/

/*
const fruit = new Fruit({
    rating: 10,
    review: "Yummy"
});
 
fruit.save();
*/

/*
const orange = new Fruit({
    name: "orange",
    rating: 8
});
 
orange.save();
*/

Fruit.find(function(error, fruits) {
    if(error){
        console.log(error);
    } else {
        console.log(fruits);
    }
});

Fruit.find(function(error, fruits) {
    if(error){
        console.log(error);
    } else {
        //console.log(fruits);
        fruits.forEach(fruit => {
            console.log(fruit.name);
        });
 
    }
});

/*
Fruit.update({_id: "5e7dc3c59e040a22c89122ac"}, {review: "Juicy fruit"}, function(error){
    if(error){
        console.log(error);
    } else {
        console.log("Record successfully updated.");
    }
});
*/

Fruit.deleteMany({name: {$in: ["Banana", "orange"]}}, function(error){
    if(error){
        console.log(error);
    } else {
        console.log("Items successfully deleted.");
    }
});

const person = new Person({
    firstname: "John",
    lastname: "Doe",
    age: 29
});
//person.save();

const mary = new Person({
    firstname: "Mary",
    lastname: "Johnson",
    age: 26
});
 
const hugh = new Person({
    firstname: "Hugh",
    lastname: "Jackson",
    age: 37
});

/*
//to add all the fruit in bulk
Person.insertMany([mary, hugh], (error)=> {
    if(error){
        console.log(err);
    } else {
        console.log("People successfully added to the fruitDB");
    }
})
*/

Person.find(function(error, people) {
    if(error){
        console.log(error);
    } else {
        people.forEach(person => {
            console.log(person.firstname + " — " + person.age + " years old");
        });
 
    }
});

Person.update({_id: "5e7db2dc403adc1e181fd4b8"}, {age: 30}, function(error){
    if(error){
        console.log(error);
    } else {
        console.log("Record successfully updated.");
    }
});
