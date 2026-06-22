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


git checkout -b feature/03-observabilidad

git add src/instrument.js
git add index.js
git add src/controllers/transfer.controller.js

git commit -m "feat(sentry): instrumentar backend y separar manejo de excepciones logicas 401 de fallos operacionales 500"

git checkout main
git merge feature/03-observabilidad --no-ff -m "merge: feature/03-observabilidad -> main"