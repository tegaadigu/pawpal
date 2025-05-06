import { PaypalPaymentProvider } from "./PaypalPaymentProvider"
import { StripePaymentProvider } from "./StripePaymentProvider"

const SUPPORTED_PAYMENTS = {
  STRIPE: 'stripe',
  PAYPAL: 'paypal'
}

/**
 * 
 */
class PaymentProviderInterface {
  /**
   * @param {string} amount
   * @param {string} currency 
   * @param {string} customerId  
   * 
   * @returns {Promise<{success: boolean, data: Object}>}
   */
  async processPayment(amount, currency, customerId) {
    throw new Error('implement Process payment')
  }
}


/**
 * 
 */
class PaymentProxy {
  /**
   * @param {PaymentProviderInterface} paymentProvider 
   */
  constructor(paymentProvider) {
    this.paymentProvider = paymentProvider
  }
  
  /**
   * @param {string} amount
   * @param {string} currency 
   * @param {string} customerId  
   */
  async processPayment(amount, currency, customerId) {
    return this.paymentProvider.processPayment(amount, currency, customerId)
  }
}

/**
 * @param {string} providerString
 */
export const createPaymentProvider = (providerString) => {
  switch(providerString) {
    case SUPPORTED_PAYMENTS.STRIPE :
      const provider = new StripePaymentProvider("test12345");
     return new PaymentProxy(provider);
    case SUPPORTED_PAYMENTS.PAYPAL:
      const prov = new PaypalPaymentProvider("test12344");
      return new PaymentProxy(prov)
    default:
      return new PaymentProviderInterface;
  }
}