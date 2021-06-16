### What this tutorial will cover

1. Classes, Objects & Data Structures/Containers
2. Object-Orientated Principals (SOLID, Law of Demeter)
3. Polymorphism

#### What is an Object?

An Object is identified by the following:

1. Private internals / properties, public API (methods)
2. Contain your business logic (in OOP)
3. Abstractions over concretions

#### What is a Data container / Data Structure?

Data container / Data Structure are identified by the following:

1. Public internals / properties,
2. (almost) no API (methods)
3. Store and transport data
4. Concretions only

---

#### Classes & Polymorphism

> Polymorphism is the ability of an object to take on many forms.

The section is taken out of a blog post by Rachel Appel in a 4 part series on Typescript [post](https://blog.jetbrains.com/webstorm/2019/03/write-object-oriented-typescript-polymorphism/)

### Implement polymorphism in TypeScript

When multiple classes inherit from a parent and override the same functionality, the result is polymorphism. Each of those child classes now implements a property or method, but they each may have their own way of performing that implementation.

For example, both business and personal checking accounts can inherit from a parent checking account. Calling a method to open the business checking account might require that the code checks for a higher initial deposit than when opening a personal checking account. A business account might require multiple owners, where a personal checking account can have one or more. Alternatively, one child class might override the parent’s members while another child doesn’t but just accepts the parent class’s implementation instead. This also demonstrates polymorphic behavior, since those behaviors are different between the siblings.

Polymorphism allows you to specify discrete logic that is customized for each specific child class. Let’s look at how this works with a CheckingAccount base class, and its two child classes: BusinessCheckingAccount and PersonalCheckingAccount.

```javascript
class CheckingAccount {
  open(initialAmount: number) {
    // code to open account and save in database
  }
}
class BusinessCheckingAccount extends CheckingAccount {
  open(initialAmount: number) {
    if (initialAmount < 1000) {
      throw new Error(
        "Business accounts must have an initial deposit of 1.000 Euros"
      );
    }
    super.open(initialAmount);
  }
}
class PersonalCheckingAccount extends CheckingAccount {
  open(initialAmount: number) {
    if (initialAmount <= 0) {
      throw new Error(
        "Personal accounts must have an initial deposit of more than zero Euros"
      );
    }
    super.open(initialAmount);
  }
}
```

As the previous code sample shows, the two child classes have different business rules to implement when it comes to opening an account – mainly different opening balances. Because both children have a method to open the account but both children choose to do it differently means the behavior is polymorphic.

To achieve polymorphism, inherit from a base class, then override methods and write implementation code in them. In addition to overriding methods, you can overload methods to achieve polymorphism. Overloaded methods are methods that have different signatures (i.e., different data types or number of arguments) with the same name. However, in TypeScript, methods aren’t overloaded by simply modifying the types or number of arguments like in some other languages. To create an overload in TypeScript, you can either add optional arguments to a method, or overload function declarations in an interface and implement the interface.

---

### Cohesion

#### Maximum Cohesion

1. All methods each use all properties
2. A highly cohesive object

#### No Cohesion

1. All methods don't use any class properties
2. Data structure / container with utility methods

The goal here is to write classes that are highly cohesive but are also a reasonable size.

---

### Law of Demeter

> The law of demeter is about the principle
> of least knowledge, which means your class shouldn't rely
> too much on the internals of strangers of other objects
> you are interacting with in your code.

an example that violates the "law of demeter" is the following:

```javascript
this.customer.lastPurchase.date;
```

as you can tell we access properties of objects within objects.

Now, why shouldn't we do that?
Well, because whenever something changes
about the internal structure of lastPurchase,
all our code in this place where we have this line of code
needs to change as well.

And that then makes our code harder to extend and maintain
because simple changes can result in a lot of changes
in a lot of places of your application.

#### These are the principles of the Law of Demeter:

> Code in a method may only access direct internals(properties and methods) of:
>
> - the object it belongs to
> - objects that are stored in properties of that object
> - objects which are received as method parameters
> - objects which are created in the method

---

#### The SOLID Principles

Now here's what these different characters stand for.

The S principle is the single responsibility principle,

O stands for open-closed principle,

L for Liskov substitution principle,

I for interface segregation principle,

and D for dependency inversion principle.

These are the SOLID principles

#### Single Responsibility Principle

Now the Single-Responsibility Principle
in the end says
that classes should have a single responsibility,

And that a class shouldn't change
for more than one reason, therefore.

#### The Open-Closed Principle

The open-closed principle says that a clause should be open
for extension, but closed for modification.

What does that mean?

take a look at this example:

```javascript
class Printer {
  printPDF(data: any) {
    // ...
  }

  printWebDocument(data: any) {
    // ...
  }

  printPage(data: any) {
    // ...
  }

  verifyData(data: any) {
    // ...
  }
}
```

Now what's the problem with this class?

It basically needs to grow whenever
we add new functionality.

If we also want to print Word documents
or Microsoft Excel spreadsheets,
we need to add a new method.

Whenever we need to call a new method, besides verify data
from our print methods, we have to add the logic
to all the print methods.

So this printer class might have one responsibility.
It's about printing data and about generating output
but it actually is not closed for modification.

lets refactor the code to follow the OCP

```javascript
interface Printer {
  print(data: any);
}

class PrinterImplementation {
  verifyData(data: any) {}
}

class WebPrinter extends PrinterImplementation implements Printer {
  print(data: any) {
    // print web document
  }
}

class PDFPrinter extends PrinterImplementation implements Printer {
  print(data: any) {
    // print PDF document
  }
}

class PagePrinter extends PrinterImplementation implements Printer {
  print(data: any) {
    // print real page
  }
}
```

Now we can add features without modifying the Printer Class. but by extending the Printer Class.

#### Liskov Substitution Principle

The Liskov Substitution Principle basically says
that objects should be replaceable
with instances of their subclasses
without altering their behavior.


for e.g:

```javascript
class Bird {
    fly() {
    console.log("Fyling...");
  }
}

class Eagle extends Bird {
  dive() {
    console.log("Diving...");
  }
}

const eagle = new Eagle();
eagle.fly();
eagle.dive();

class Penguin extends Bird {
  // Problem: Can't fly!
}
```
now we can see that we our base class "Bird" is incorrect because a Penguin cannot fly and therefore this is an indicator telling us that we need to adjust this so the attributes of the class that we extend are only available to the class in a sensible manner

Objects should be replaceable with instances of their subclasses without altering their behavior

we can refactor as such:

```javascript
class Bird {}

class FlyingBird extends Bird {
  fly() {
    console.log("Fyling...");
  }
}

class Eagle extends FlyingBird {
  dive() {
    console.log("Diving...");
  }
}

const eagle = new Eagle();
eagle.fly();
eagle.dive();

class Penguin extends Bird {
}
```

----

#### Interface Segregation Principle
The interface segregation principles says
that many client-specific interfaces are better
than one general purpose interface.

take a look at the following:

```javascript
interface Database {
    connect(uri:string);
    disconnect(data:any);
}


class SQLDatabase implements Database {
  connect(uri: string) {
    // connecting...
  }

  storeData(data: any) {
    // Storing data...
  }
}
class InMemoryDatabase implements Database {
  connect(uri: string) {
    // ???
  }

  storeData(data: any) {
    // Storing data...
  }
}

```

So this principle is very similar to the Liskov Substitution Principle.
but now we have the problem that we impose the wrong interface on a certain class, such as the inMemoryDatabase as it does not need a connect method.

the Interface Segregation Principle states that we should 
> have many client specific interfaces are better than one general purpose interface

lets refactor as the following:

```javascript
interface Database {
  storeData(data: any);
}

interface RemoteDatabase {
  connect(uri: string);
}

class SQLDatabase implements Database, RemoteDatabase {
  connect(uri: string) {
    // connecting...
  }

  storeData(data: any) {
    // Storing data...
  }
}

class InMemoryDatabase implements Database {
  storeData(data: any) {
    // Storing data...
  }
}
```

--------

#### Dependency Inversion Principles

The Dependency Inversion Principle
says that you should depend upon abstractions
not concretions.

take a look at the following:

```javascript
interface Database {
  storeData(data: any);
}

interface RemoteDatabase {
  connect(uri: string);
}

class SQLDatabase implements Database, RemoteDatabase {
  connect(uri: string) {
    console.log('Connecting to SQL database!');
  }

  storeData(data: any) {
    console.log('Storing data...');
  }
}

class InMemoryDatabase implements Database {
  storeData(data: any) {
    console.log('Storing data...');
  }
}

class App {
  private database: SQLDatabase | InMemoryDatabase;

  constructor(database: SQLDatabase | InMemoryDatabase) {
      if(database instanceof SQLDatabase) {
          database.connect('my-url');                  
      }
    this.database = database; 
  }

  saveSettings() {
    this.database.storeData('Some data');
  }
}
```
The problem with this example,
is that we depend on concretions.

I depend on the concrete implementation of my database.
I accept both types here,
and therefore I have to check which type I'm getting,
so that I can execute this extra code,
which I might need to execute.

Now, it shouldn't be needless to say
that code like this can be hard to maintain,
because the more types of databases we add,
the more if-checks we might need to add here,
and whenever the connect method changes,
we also need to change it in all the places
where we do have a check like this
and where we do call connect.

lets refactor to the following:
```javascript
interface Database {
  storeData(data: any);
}

interface RemoteDatabase {
  connect(uri: string);
}

class SQLDatabase implements Database, RemoteDatabase {
  connect(uri: string) {
    console.log('Connecting to SQL database!');
  }

  storeData(data: any) {
    console.log('Storing data...');
  }
}

class InMemoryDatabase implements Database {
  storeData(data: any) {
    console.log('Storing data...');
  }
}

class App {
  private database: Database;

  constructor(database: Database) {
    this.database = database; 
  }

  saveSettings() {
    this.database.storeData('Some data');
  }
}


const sqlDatabase = new SQLDatabase();
sqlDatabase.connect('my-url');
const app = new App(sqlDatabase);
```
And then here in this app, we could say
that in the end all we want is a database.

I don't wanna deal with connecting here.
I just want to ensure that the type of database I have here
the type of disagreement is of type database.

So it should be a class
which implements the database interface.

And the database interface
in the end just ensures that there is a store data method,
not that there is a connect method.

So therefore of course, we should remove this if-check
because we know we got a database
which only has a store data method
and we don't have a connect method here.

Instead it's now the place where we create our app
where we have to provide a database
as expected by this class.

And that's why it's called
the Dependency Inversion Principle.