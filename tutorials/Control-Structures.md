#### Keep your Control Structures Clean

1. Avoid Deep Nesting

To achieve this we can use [Factory Functions](#factory-functions) and [polymorphism](#polymorphism)

you can also utilize [Prefer Positive Checks](#positive-checks)

e.g

```javascript
if isEmpty vs if !isNotEmpty)
```

as well as [utilize errors](#utilize-errors)

#### Introducing Guards

We will be working on the following code throughout this chapter.
<a name="example"></a>

```javascript
function processTransactions(transactions) {
  if (transactions && transactions.length > 0) {
    for (const transaction of transactions) {
      if (transaction.type === "PAYMENT") {
        if (transaction.status === "OPEN") {
          if (transaction.method === "CREDIT_CARD") {
            processCreditCardPayment(transaction);
          } else if (transaction.method === "PAYPAL") {
            processPayPalPayment(transaction);
          } else if (transaction.method === "PLAN") {
            processPlanPayment(transaction);
          }
        } else {
          console.log("Invalid transaction type!");
        }
      } else if (transaction.type === "REFUND") {
        if (transaction.status === "OPEN") {
          if (transaction.method === "CREDIT_CARD") {
            processCreditCardRefund(transaction);
          } else if (transaction.method === "PAYPAL") {
            processPayPalRefund(transaction);
          } else if (transaction.method === "PLAN") {
            processPlanRefund(transaction);
          }
        } else {
          console.log("Invalid transaction type!", transaction);
        }
      } else {
        console.log("Invalid transaction type!", transaction);
      }
    }
  } else {
    console.log("No transactions provided!");
  }
}
```

as you can clearly tell, having a look at the above code is an eye sore and totally overwhelming.

this is where we can introduce the technique of

> Guards and Fail Fast

take a look at the following:

```javascript
if (email.includes("@")) {
  // do stuff
}
```

as you can see if this statement we can add a lot of code within the if block as per the [first example](#example)

where as refactoring to the below code:

```javascript
if (!email.includes("@")) {
  return;
}
//do stuff
```

now you can begin to understand the concept of adding a Guard and Fail Fast.

immediately when this programme runs it will validate and return back if it fails. Notice how we use the inverse in the if statement to achieve this.

lets add a Guard to the [first example](#example)

```javascript
function processTransactions(transactions) {
  if (!transactions || transactions.length === 0) {
    // Guard 1. check if there are no transactions
    console.log("No transactions provided!");
    return;
  }
  for (const transaction of transactions) {
    if (!transaction.status !== "OPEN") {
      // Guard 2. check if the status is not open
      console.log("Invalid transaction type!");
      continue; // this means stop the current iteration and move onto the next iteration as we are in a loop
    }
    if (transaction.type === "PAYMENT") {
      if (transaction.method === "CREDIT_CARD") {
        processCreditCardPayment(transaction);
      } else if (transaction.method === "PAYPAL") {
        processPayPalPayment(transaction);
      } else if (transaction.method === "PLAN") {
        processPlanPayment(transaction);
      }
    } else if (transaction.type === "REFUND") {
      if (transaction.method === "CREDIT_CARD") {
        processCreditCardRefund(transaction);
      } else if (transaction.method === "PAYPAL") {
        processPayPalRefund(transaction);
      } else if (transaction.method === "PLAN") {
        processPlanRefund(transaction);
      }
    } else {
      console.log("Invalid transaction type!", transaction);
    }
  }
}
```

as you can tell this is way fewer lines and slightly better to read and digest.

#### Extracting Control Structures & Preferring Positive Phrasing

another issue with this [example](#example) is that we are mixing levels of abstraction.

we can begin by outsourcing some of the lower level abstractions to separate function, the benefits with this aswell is that it allows us to use positive wording.

lets outsource this chunk of validation to a separate function

```javascript
if (!transactions || transactions.length === 0) {
  // Guard 1. check if there are no transactions
  console.log("No transactions provided!");
  return;
}
```

to (Positive Checks/Phrasing)

```javascript
function isEmpty(transactions) {
  return !transactions || transactions.length == 0;
}
```

<a name="positive-checks"></a>
Remember its always easier to read positive language than negative
and adding the code into a function with a positive name "isEmpty()" we already are utilizing the Positive Checks rule

```javascript

function processTransactions(transactions) {
  if(isEmpty(transactions)){
      console.log("No transactions provided!"); // <- this also violates the levels of abstraction and should also be moved to a separate function
      return;
  }
```

add a function showErrorMessage

```javascript
function showErrorMessage(message) {
  console.log(showErrorMessage);
}
```

so this all finally becomes.

```javascript
function processTransactions(transactions) {
  if(isEmpty(transactions)){
      showErrorMessage("No transactions provided!"); // <- this also violates the levels of abstraction and should also be moved to a separate function
      return;
  }
```

next we can go back to our [example](#example) and see what else we can separate.

we can immediately tell we can section of this chunk of code into a separate function

```javascript
if (transaction.type === "PAYMENT") {
  if (transaction.method === "CREDIT_CARD") {
    processCreditCardPayment(transaction);
  } else if (transaction.method === "PAYPAL") {
    processPayPalPayment(transaction);
  } else if (transaction.method === "PLAN") {
    processPlanPayment(transaction);
  }
} else if (transaction.type === "REFUND") {
  if (transaction.method === "CREDIT_CARD") {
    processCreditCardRefund(transaction);
  } else if (transaction.method === "PAYPAL") {
    processPayPalRefund(transaction);
  } else if (transaction.method === "PLAN") {
    processPlanRefund(transaction);
  }
} else {
  console.log("Invalid transaction type!", transaction);
}
```

lets creat a new function call processTransaction

```javascript
processTransaction(transaction){
     if (!transaction.status !== "OPEN") {
      console.log("Invalid transaction type!");
      return;
    }
    if (transaction.type === "PAYMENT") {
  if (transaction.method === "CREDIT_CARD") {
    processCreditCardPayment(transaction);
  } else if (transaction.method === "PAYPAL") {
    processPayPalPayment(transaction);
  } else if (transaction.method === "PLAN") {
    processPlanPayment(transaction);
  }
} else if (transaction.type === "REFUND") {
  if (transaction.method === "CREDIT_CARD") {
    processCreditCardRefund(transaction);
  } else if (transaction.method === "PAYPAL") {
    processPayPalRefund(transaction);
  } else if (transaction.method === "PLAN") {
    processPlanRefund(transaction);
  }
} else {
  console.log("Invalid transaction type!", transaction);
}
}
```

and we can add this to our for loop as such

```javascript
function processTransactions(transactions) {
  if (!transactions || transactions.length === 0) {
    // Guard 1. check if there are no transactions
    console.log("No transactions provided!");
    return;
  }
  for (const transaction of transactions) {
    processTransaction(transaction);
  }
}
```

#### Writing Clean Functions With Control Structures

taking a look at everything we done previously, we can already see the huge improvments we have made with refactoring the code, however there are still a couple improvments we can make to simplify the code further and increase readablity.

take a look at how I refactor what we have into something more readable.

```javascript
function processTransactions(transactions) {
  if (isEmpty(transactions)) {
    showErrorMessage("No transactions provided!");
    return;
  }

  for (const transaction of transactions) {
    processTransaction(transaction);
  }
}

function isEmpty(transactions) {
  return !transactions || transactions.length === 0;
}

function showErrorMessage(message, item) {
  console.log(message);
  if (item) {
    console.log(item);
  }
}

function processTransaction(transaction) {
  if (!isOpen(transaction)) {
    showErrorMessage("Invalid transaction type!");
    return;
  }
  if (isPayment(transaction)) {
    processPayment(transaction);
  } else if (isRefund(transaction)) {
    processRefund(transaction);
  } else {
    showErrorMessage("Invalid transaction type!", transaction);
  }
}

function isOpen(transaction) {
  return transaction.status === "OPEN";
}

function isPayment(transaction) {
  return transaction.type === "PAYMENT";
}

function isRefund(transaction) {
  return transaction.type === "REFUND";
}

function processPayment(paymentTransaction) {
  if (paymentTransaction.method === "CREDIT_CARD") {
    processCreditCardPayment(paymentTransaction);
  } else if (paymentTransaction.method === "PAYPAL") {
    processPayPalPayment(paymentTransaction);
  } else if (paymentTransaction.method === "PLAN") {
    processPlanPayment(paymentTransaction);
  }
}

function processRefund(refundTransaction) {
  if (refundTransaction.method === "CREDIT_CARD") {
    processCreditCardRefund(refundTransaction);
  } else if (refundTransaction.method === "PAYPAL") {
    processPayPalRefund(refundTransaction);
  } else if (refundTransaction.method === "PLAN") {
    processPlanRefund(refundTransaction);
  }
}

function processCreditCardPayment(transaction) {
  console.log(
    "Processing credit card payment for amount: " + transaction.amount
  );
}

function processCreditCardRefund(transaction) {
  console.log(
    "Processing credit card refund for amount: " + transaction.amount
  );
}

function processPayPalPayment(transaction) {
  console.log("Processing PayPal payment for amount: " + transaction.amount);
}

function processPayPalRefund(transaction) {
  console.log("Processing PayPal refund for amount: " + transaction.amount);
}

function processPlanPayment(transaction) {
  console.log("Processing plan payment for amount: " + transaction.amount);
}

function processPlanRefund(transaction) {
  console.log("Processing plan refund for amount: " + transaction.amount);
}
```

now everything is more concise and readable. Each function is clear as to what is going on, and we can argue that mostly everything is good in terms of levels of abstraction.

however can you see a problem with the code that we have?

take a look at these two functions

```javascript
processPayment();
processRefund();
```

both these functions duplicate code and we should stay DRY(Don't repeat yourself) as possible.

lets do a bit more refactoring but adding a couple functions as the following:

```javascript
function usesTransactionMethod(transaction, method) {
  return transaction.method === method;
}
```

and

```javascript
function processCreditCardTransaction(transaction) {
  if (isPayment(transaction)) {
    processCreditCardPayment();
  } else if (isRefund(transaction)) {
    processCreditCardRefund();
  } else {
    showErrorMessage("Invalid transaction type!", transaction);
  }
}

function processPayPalTransaction(transaction) {
  if (isPayment(transaction)) {
    processPayPalPayment();
  } else if (isRefund(transaction)) {
    processPayPalRefund();
  } else {
    showErrorMessage("Invalid transaction type!", transaction);
  }
}
function processPlanTransaction(transaction) {
  if (isPayment(transaction)) {
    processPlanPayment();
  } else if (isRefund(transaction)) {
    processPlanRefund();
  } else {
    showErrorMessage("Invalid transaction type!", transaction);
  }
}
```
and now put it all together

```javascript

function processTransactions(transactions) {
  if (isEmpty(transactions)) {
    showErrorMessage('No transactions provided!');
    return;
  }

  for (const transaction of transactions) {
    processTransaction(transaction);
  }
}

function isEmpty(transactions) {
  return !transactions || transactions.length === 0;
}

function showErrorMessage(message, item) {
  console.log(message);
  if (item) {
    console.log(item);
  }
}

function processTransaction(transaction) {
  if (!isOpen(transaction)) {
    showErrorMessage('Invalid transaction type!');
    return;
  }

  if (usesTransactionMethod(transaction, 'CREDIT_CARD')) {
    processCreditCardTransaction(transaction);
  } else if (usesTransactionMethod(transaction, 'PAYPAL')) {
    processPayPalTransaction(transaction);
  } else if (usesTransactionMethod(transaction, 'PLAN')) {
    processPlanTransaction(transaction);
  }
}

function isOpen(transaction) {
  return transaction.status === 'OPEN';
}

function usesTransactionMethod(transaction, method) {
  return transaction.method === method;
}

function isPayment(transaction) {
  return transaction.type === 'PAYMENT';
}

function isRefund(transaction) {
  return transaction.type === 'REFUND';
}

function processCreditCardTransaction(transaction) {
  if (isPayment(transaction)) {
    processCreditCardPayment();
  } else if (isRefund(transaction)) {
    processCreditCardRefund();
  } else {
    showErrorMessage('Invalid transaction type!', transaction);
  }
}

function processPayPalTransaction(transaction) {
  if (isPayment(transaction)) {
    processPayPalPayment();
  } else if (isRefund(transaction)) {
    processPayPalRefund();
  } else {
    showErrorMessage('Invalid transaction type!', transaction);
  }
}

function processPlanTransaction(transaction) {
  if (isPayment(transaction)) {
    processPlanPayment();
  } else if (isRefund(transaction)) {
    processPlanRefund();
  } else {
    showErrorMessage('Invalid transaction type!', transaction);
  }
}

```

### Embrace Errors & Error Handling ###
Throwing = handling errors can replace if statements and lead to more focused functions
>simple rule: if something is an error -> make it an error.

```javascript
if(!isEmail){
    return {code: 422, message: "Invalid input"}
}
```
we should use built in error handling logic
```javascript
if(!isEmail){
    const error = new Error('Invalid Input');
    error.code = 422;
    throw error;
}
```

<a name="factory-functions"></a>
<a name="polymorphism"></a>

### Factory Functions and Polymorphism ###

#### What is a Factory Function? ####

A factory function is simply a function which is used to produce something, for example, to produce objects
or produce maps, arrays, anything like that. We provide a certain input, and it then produces a certain object for us.

#### What is Polymorphism? ####
It means that we can have an object or a function, which we can always use in the same way,
for example, an object on which we always can use the same method, but what this method does in detail,
then depends on some other factors.

Lets refactor the code we have been working on to use a factory function to handle processing Payments and Refunds.

```javascript
main();

function main() {
  try {
    processTransactions(transactions);
  } catch (error) {
    showErrorMessage(error.message);
  }
}

function processTransactions(transactions) {
  validateTransactions(transactions);

  for (const transaction of transactions) {
    processTransaction(transaction);
  }
}

function validateTransactions(transactions) {
  if (isEmpty(transactions)) {
    const error = new Error('No transactions provided!');
    error.code = 1;
    throw error;
  }
}

function isEmpty(transactions) {
  return !transactions || transactions.length === 0;
}

function showErrorMessage(message, item) {
  console.log(message);
  if (item) {
    console.log(item);
  }
}

function processTransaction(transaction) {
  try {
    validateTransaction(transaction);
    processWithProcessor(transaction);
  } catch (error) {
    showErrorMessage(error.message, error.item);
  }
}

function isOpen(transaction) {
  return transaction.status === 'OPEN';
}

function validateTransaction(transaction) {
  if (!isOpen(transaction)) {
    const error = new Error('Invalid transaction type.');
    throw error;
  }

  if (!isPayment(transaction) && !isRefund(transaction)) {
    const error = new Error('Invalid transaction type!');
    error.item = transaction;
    throw error;
  }
}

function processWithProcessor(transaction) {
  const processors = getTransactionProcessors(transaction);

  if (isPayment(transaction)) {
    processors.processPayment(transaction);
  } else {
    processors.processRefund(transaction);
  }
}

function getTransactionProcessors(transaction) {
  let processors = {
    processPayment: null,
    processRefund: null,
  };
  if (usesTransactionMethod(transaction, 'CREDIT_CARD')) {
    processors.processPayment = processCreditCardPayment;
    processors.processRefund = processCreditCardRefund;
  } else if (usesTransactionMethod(transaction, 'PAYPAL')) {
    processors.processPayment = processPayPalPayment;
    processors.processRefund = processPayPalRefund;
  } else if (usesTransactionMethod(transaction, 'PLAN')) {
    processors.processPayment = processPlanPayment;
    processors.processRefund = processPlanRefund;
  }
  return processors;
}

function usesTransactionMethod(transaction, method) {
  return transaction.method === method;
}

function isPayment(transaction) {
  return transaction.type === 'PAYMENT';
}

function isRefund(transaction) {
  return transaction.type === 'REFUND';
}

function processCreditCardPayment(transaction) {
  console.log(
    'Processing credit card payment for amount: ' + transaction.amount
  );
}

function processCreditCardRefund(transaction) {
  console.log(
    'Processing credit card refund for amount: ' + transaction.amount
  );
}

function processPayPalPayment(transaction) {
  console.log('Processing PayPal payment for amount: ' + transaction.amount);
}

function processPayPalRefund(transaction) {
  console.log('Processing PayPal refund for amount: ' + transaction.amount);
}

function processPlanPayment(transaction) {
  console.log('Processing plan payment for amount: ' + transaction.amount);
}

function processPlanRefund(transaction) {
  console.log('Processing plan refund for amount: ' + transaction.amount);
}

```