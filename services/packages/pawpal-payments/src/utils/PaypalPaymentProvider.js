import { PaymentProviderInterface } from "./paymentProxy"

export class PaypalPaymentProvider extends PaymentProviderInterface {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }  

  async processPayment(amount, currency, customerId) {
    return {}
  }
}