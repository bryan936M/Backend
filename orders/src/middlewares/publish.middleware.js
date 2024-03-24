import { publishOrderToExchange } from '../utils/Broker/rabbitMQ.js';

const injectPublishToExchange = (req, res, next) => {
    const exchangeServices = {
        publishOrderToExchange: publishOrderToExchange
    }

    // inject exchangeServices in request object
    req.exchangeServices = exchangeServices;
    next();
}

export default injectPublishToExchange;