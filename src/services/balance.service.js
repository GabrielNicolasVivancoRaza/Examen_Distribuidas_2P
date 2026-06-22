class BalanceService {
  constructor({ usersDb, transactionsHistory }) {
    this.usersDb = usersDb;
    this.transactionsHistory = transactionsHistory;
  }

  applyTransfer(sender, receiver, amount) {
    sender.balance -= amount;
    receiver.balance += amount;

    const transaction = {
      transactionId: `TX-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      from: sender.accountAlpha,
      to: receiver.accountAlpha,
      amount,
      status: 'COMPLETED',
      timestamp: new Date().toISOString()
    };
    this.transactionsHistory.push(transaction);
    return transaction;
  }

  getBalance(accountId) {
    const account = this.usersDb.find(u => u.accountAlpha === accountId);
    if (!account) {
      throw new Error(`La cuenta '${accountId}' no existe.`);
    }
    return { accountId: account.accountAlpha, email: account.email, balance: account.balance };
  }
}

module.exports = BalanceService;
