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
