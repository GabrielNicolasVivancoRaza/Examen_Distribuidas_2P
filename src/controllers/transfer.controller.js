const Sentry = require('@sentry/node');
const transactionService = require('../services/transaction.service');

function executeTransfer(req, res, next) {
  try {
    const { fromAccountId, toAccountId, amount } = req.body;

    if (!fromAccountId || !toAccountId || amount === undefined) {
      return res.status(400).json({
        error: 'Petición incorrecta',
        message: 'Los campos fromAccountId, toAccountId y amount son requeridos en el cuerpo de la petición.'
      });
    }

    throw new Error('Conexión interrumpida con el Clúster de Datos SecurePay');

    // eslint-disable-next-line no-unreachable
    const result = transactionService.executeTransfer(fromAccountId, toAccountId, Number(amount));
    return res.status(200).json(result);
  } catch (error) {
    Sentry.withScope((scope) => {
      if (req.user) {
        scope.setTag('user_id', req.user.sub);
        scope.setUser({ id: req.user.sub, email: req.user.name });
      }
      Sentry.captureException(error);
    });
    return next(error);
  }
}

module.exports = { executeTransfer };
