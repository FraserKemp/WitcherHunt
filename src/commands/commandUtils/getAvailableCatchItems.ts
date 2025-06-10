import { UserData } from "../../types/UserTypes/UserTypes";
import { defaultUserData } from "../../data/UserData";

/**
 * To Test this get the bot running in your terminal by doing npm run dev
 *
 * I have set it up, so you can just run the hunt command. select capture and this will trigger.
 *
 * To understand where this function is invoked (meaning triggered, ran, or called all different terminology) go to huntCapture.ts
 * **/

/**
 *  We need to return an ordered array of items "[]"
 *  the items will need to be ordered in the same way as above ^
 *
 *   1. Find the catch items on the userData object. Make use of console.log() to understand where this data is.
 *
 *   2. Assign this data to a variable and add a console.log() below the variable. Log out the variable, so we can see what we have set it too.
 *
 *   2. Now we have a variable with an object "{}" of the catch items. We need an array "[]" of the catch item Ids. BUT we only want
 *   an array of id where we actually have a number for them. (if we don't have an item we cant use it)
 *
 *   EXAMPLE: Lets say I have this data
 *
 *   {
 *     "dimeritium_trap": 0,
 *     "moon_dust": 1,
 *     "snare_trap": 0,
 *     "yrden_trap": 10
 *    }
 *
 *    I will want an array of ["moon_dust", "yrden_trap"]
 *
 *    - There are several ways to achieve this. but we will boil it down to a more basic way and a more complex.
 *    - Get the basic way a go. then you can try the complex way.
 *
 *    Basic:
 *
 *    - Create a variable which is set to an empty array "[]". We will be checking each item key value pair e.g. key: "dimeritium_trap" value: 0 and adding it to the array if the number is higher than 0
 *
 *    - Now we have the empty array ready. Make an if statement to check first capture item to see if the number is greater than ">" 0.
 *    Again add a console.log() in the if statement, so you can see when this is getting hit. ( on your account you have 100 of every item apart from "yrden_trap")
 *
 *    - Now we have the if statement checking if the number is greater than 0 we want to PUSH the name of the item to the array. Google what push does with javascript arrays. if you get stuck feel free to message.
 *
 *    - repeat this for each item we know we have in the capture list. and Boom now we have an array with all the items we have avaliable.
 *
 *    - Finally add " return yourArray.sort((a, b) => itemOrder.indexOf(a.id) - itemOrder.indexOf(b.id));" at the end of the file. replace "yourArray" with your array variable name
 *    This will just order the items in the order that is shown at the top of this function.
 *
 *    Complex this uses javascrit/typescript helpers that is provided by default. These helpers exist to let you make complex data transformations without doing it manually.:
 *
 *    - Take a look at Object.entries. https://www.geeksforgeeks.org/javascript/javascript-object-entries-method/ This will return an array of arrays containing key value pairs.
 *
 *    - Take a look at the array filter method https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter This will allow you to filter the array down to the items where the value is
 *    greater than ">" 0
 *
 *    - Take a look at the array method map https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map This will allow you to loop over the whole array and only return the item name.
 *
 *    - Finally add " return yourArray.sort((a, b) => itemOrder.indexOf(a.id) - itemOrder.indexOf(b.id));" at the end of the file. replace "yourArray" with your array variable name
 *    This will just order the items in the order that is shown at the top of this function.
 *
 *
 **/

export const getAvailableCatchItems = (userData: UserData) => {
  const itemOrder = [
    "snare_trap",
    "moon_dust",
    "yrden_trap",
    "dimeritium_trap",
  ];
  console.log(userData);
};
