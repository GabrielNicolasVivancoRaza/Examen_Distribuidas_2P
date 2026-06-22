const db = require('../data/users.db');
const ValidationService = require('./validation.service');
const BalanceService = require('./balance.service');
const NotificationService = require('./notification.service');

class TransactionService {
  constructor(validationService, balanceService, notificationService) {
    this.validationService = validationService;
    this.balanceService = balanceService;
    this.notificationService = notificationService;
  }

  executeTransfer(fromAccountId, toAccountId, amount) {
    const { sender, receiver } = this.validationService.validateTransfer(fromAccountId, toAccountId, amount);
    const transaction = this.balanceService.applyTransfer(sender, receiver, amount);
    this.notificationService.notifyTransfer(sender, receiver, amount, fromAccountId);
    return {
      success: true,
      message: 'Transferencia ejecutada con éxito',
      transaction,
      balanceRestante: sender.balance
    };
  }

  getAccountBalance(accountId) {
    return this.balanceService.getBalance(accountId);
  }
}

const validationService = new ValidationService(db);
const balanceService = new BalanceService(db);
const notificationService = new NotificationService();

module.exports = new TransactionService(validationService, balanceService, notificationService);
