##### Here is some guidelines that I would like to outline, to help myself and anyone who comes across this documentation.

##### the following is a summary of what I have learnt in the Udemy Course by
**Maximilian Schwarzmüller - Academind**
##### [Clean Code Course](https://www.udemy.com/course/writing-clean-code/learn/)
---

### Topics
1. Naming - Assigning Names to Variables, Functions & classes
2. Code Structure, Comments & Formatting
3. Functions & Methods
4. Control Structures & Errors
5. Objects, Classes & Data Containers / Structures

## Naming
#### Why Good Names Matter

Names should be meaningful, and should transport what a variable or method/function should do.


Here is an example of a poorly names piece of code:
```
const us = new MainEntity();
us.process();
if(login){
    //...
}
```
as you can see nothing really makes sense from the get go. nothing is straight forward and this code will mean that you will have to dig deeper into each function and variable to understand its meaning.

take a look at an example where we refactor the above into code that is more easy to understand.
```
class User {
  save() {}
}

const isLoggedIn = true;

const user = new User();
user.save();

if (isLoggedIn) {
  // ...
}
```

as you can see, its the same code, but way easier to read and understand.

in conclusion to this, well-named "things" allow readers to **understand your code without going through it in detail**

---
### 1.How to name things correctly
#### **variable & Constants**
Use nouns or short phrases with adjectives
e.g 
``` 
const userData = {...} 
``` 

or 
``` 
const isValid = ... 
```

#### **Functions & Methods**
use verbs or short phrases with adjectives
e.g
```
sendData();
inputIsValid();
```

#### **Classes**
use nouns or short phrases with nouns
```
class User {...}
class RequestBody {...}
```

---

### Name Casings

| snake_case                     | camelCase                        | PasacalCase               | kebab-case
| -----------                    |-----------                       | -----------               | ----------- |
| is_valid                       | isValid; SendResponse            | AdminRole; UserRepository | ```<side-drawer>```
| e.g Python, PHP                | Java, Javascript                 | Python, Java, Javascript  | e.g HTML
| Variables, functions, methods  | Variables, functions, method     | Classes                   | Custom HTML elements

---

### 2. Code Structure, Comments & Formatting

#### Bad Comments include the following:

1. Redudent information
2. Dividers/Blockers
3. Misleading information 
4. Commented out code.

#### Good Comments include the following:
1. Legal Information
2. Explanation which can’t be replaced by good meaning
3. Warnings
4. Documentation

#### Code Formatting
Code Formatting improves Readability & Transports Meaning

There are two areas of formatting to consider
1. Vertical Formatting
2. Horizontal Formatting

##### Vertical Formatting
1. Vertical Space Between Lines
2. Grouping of Code

##### Horizontal Formatting
1. Indentation
2. Space Between Code

---

### Functions & Methods
#### What makes up a function?

Calling the function should be readable and working with the function should be easy / readable

therefore the number and order of arguments matter and the length of the function body matters.

#### Minimize the number of parameters
why? Because the more parameters a function uses the more dificult it becomes to use. 

A function with no parameters is the simplest function to call and read and this should always be the goal when creating a function. 

of course there will be situations where you will need to use parameters and from there obviously 1 parameters is the next best thing to no parameters. 

2 Parameters starts to become more tricky to understand as it requires more information in order to get the function to run, a function with 2 parameters is acceptable but should be used with caution. 

3 Arguments is really difficult to understand and is usually challenging to call and should be avoided if possible. its usually difficult to determine the order of arguments and that inherentily becomes more complex and difficult to understand.

any function with more than 3 arguments should be avoided at all costs because its extemly difficult to understand and maintain. there are solutions to handle functions that require so many arguments. which is explained in the next chapter.

#### Refactoring Functions that have multiple params.

```
function saveUser(email, password){
    const user = {
        id: Math.random().toString(),
        email:email,
        password: password
    }
    db.insert('users', user);
}

saveUser('user@test.com' , '123');

```

This is not terrible code and does make sense when reading it, however it can be refactored to use less parameters. Take the following code as an example where we outsouce the user argument and parse in a single argument to the function.

```
function saveUser(user){
    db.insert('users',user)
}

```
the above is better because it only takes in one argument for the function to work, and that greatly simplifies the calling of the function. The better solution would be to lift this functionality into a class based approach, such as the following:

```
class User{
    constructor(userData){
        this.email = userData.email;
        this.password = userData.password;
        this.id = Math.random().toString();
    }

    save(){
        db.insert('users',this);
    }
}

const user = new User({email: 'test.user.com', password: '123'})
user.save();

```
This is much better as its very easy to read and you can immediately see what is expected to get a user object.


#### functions should be small and do one thing.

As developers we often get carried away with writing huge chunks of code and often forget to split our functions into smaller and more meaningful functions. This

in general a function can have code naming and formatting, but a monolithic function that handles multiple things all at once is still consider bad code. This
its okay to write more code if it adds readability and clarity to what it is that you are trying to achieve. This

take the below bad code as an example:

```
function renderContent(renderInformation) {
  const element = renderInformation.element;
  if (element === 'script' || element === 'SCRIPT') {
    throw new Error('Invalid element.');
  }

  let partialOpeningTag = '<' + element;

  const attributes = renderInformation.attributes;

  for (const attribute of attributes) {
    partialOpeningTag =
      partialOpeningTag + ' ' + attribute.name + '="' + attribute.value + '"';
  }

  const openingTag = partialOpeningTag + '>';

  const closingTag = '</' + element + '>';
  const content = renderInformation.content;

  const template = openingTag + content + closingTag;

  const rootElement = renderInformation.root;

  rootElement.innerHTML = template;
}

```

as you can see this function is trying to do to much at once. whereas we can outsouce each concept into smaller chunks which will allow us to read the operations more precisely. we can refactor the above to the following: we

```
function renderContent(renderInformation) {
  const element = renderInformation.element;
  const rootElement = renderInformation.root;

  validateElementType(element);

  const content = createRenderableContent(renderInformation);

  renderOnRoot(rootElement, content);
}

function validateElementType(element) {
  if (element === 'script' || element === 'SCRIPT') {
    throw new Error('Invalid element.');
  }
}

function createRenderableContent(renderInformation) {
  const tags = createTags(
    renderInformation.element,
    renderInformation.attributes
  );
  const template = tags.opening + renderInformation.content + tags.closing;
  return template;
}

function renderOnRoot(root, template) {
  root.innerHTML = template;
}

function createTags(element, attributes) {
  const attributeList = generateAttributesList(attributes);
  const openingTag = buildTag({
    element: element,
    attributes: attributeList,
    isOpening: true,
  });
  const closingTag = buildTag({
    element: element,
    isOpening: false,
  });

  return { opening: openingTag, closing: closingTag };
}

function generateAttributesList(attributes) {
  let attributeList = '';
  for (const attribute of attributes) {
    attributeList = `${attributeList} ${attribute.name}="${attribute.value}"`;
  }

  return attributeList;
}

function buildTag(tagInformation) {
  const element = tagInformation.element;
  const attributes = tagInformation.attributes;
  const isOpeningTag = tagInformation.isOpening;

  let tag;
  if (isOpeningTag) {
    tag = '<' + element + attributes + '>';
  } else {
    tag = '</' + element + '>';
  }

  return tag;
}

```


as you can immediately tell this is alot more code, but you can identify each function individually and read each function with more clarity than before. 

#### functions should do one thing and what is one thing?

One thing can be thought of in terms of operations and levels of abstraction. 

#### understanding levels of abstraction
So when it comes to abstraction you have a range of levels.
1. High Level
2. Low Levels

High levels can be thought of as user defined functions
e.g 

```
isEmail(email)

```

Low Level abstractions is usually language or programme specific low level api and methods.

e.g
```
email.includes('@);
```

in High Level operations we don't control how the email is validated - we just want it to be validated. So

in Low level operations, we control how the email is validated.

Something else to note is that high level abstractions usually are easy to read - there is no room for interpretation, whereas low level operations might be technically clear but the interpretation must be added by the reader

