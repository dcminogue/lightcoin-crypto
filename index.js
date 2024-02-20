class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

   get balance() {
    let balance = 0;
    for (let trx of this.transactions) {
      balance += trx.value
    }
    return balance
   }

   addTransaction(transaction) {
    this.transactions.push(transaction);
   }

}

class Transaction {

  constructor(amount, account) {
    this.amount  = amount;
    this.account = account;
  }

  commit() {
    if (!this.isAllowed()) {
      return true;
    }
    this.time = new Date();
    this.account.addTransaction(this);
  }

}

class Deposit extends Transaction {

  get value() {
    return this.amount
  }
isAllowed() {
  return this.amount;
}
}

class Withdrawal extends Transaction {

  get value() {
    return -this.amount
  }
  isAllowed() {
    return this.account.balance - this.amount >= 0;

  }

}


// DRIVER CODE BELOW

const myAccount = new Account('billybob');

console.log('Starting Balance:', myAccount.balance);

const t1 = new Deposit(120.00, myAccount);
t1.commit();

const t2 = new Withdrawal(120.00, myAccount);
t2.commit();

console.log('Ending Balance:', myAccount.balance);

