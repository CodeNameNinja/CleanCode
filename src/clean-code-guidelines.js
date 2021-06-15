/**
 * Class to creat a user
 */
class User {
    /**
     * 
     * @param {Object} userData Information about the user 
     */
    constructor(userData){
        /**
         * @private
         * @property {string} name User name
         */
        this.name = userData.name;
        /**
         * @private
         * @property {number} age User age
         */
        this.age = userData.age;
        /**
         * @private
         * @property {string} email User email
         */
        this.email = userData.email;
    }

    /**
     * @public
     * @property {Function} addId - adds an Id to user
     * @returns void
     */
    addId(){
        this.id = 'ui';
    }
}

const user = new User({name: 'Mitchel', email:"mwhyuen@gmail.com",age:21});
user;
// Function with Dynamic Parameters

/**
 * Sum up numbers
 * @param  {...number} numbers 
 * @returns sum of all the numbers given
 */
function sumUp(...numbers){
    let sum = 0;
    for(const number of numbers){
        sum += number;
    }
    return sum;
}

const total = sumUp(10,24,-31);
total;

//Beware of output Parameters
/**
 * creates an Id for a user
 * @param {Object} user 
 * @returns void
 */
function addId(user){
    user.id = 'ui';
}

const newUser = new User({ name: "mitchell", age: 21, email: 'mwhyuen@gmail.com'});
newUser.addId();
newUser;



// Functions should only do one thing

