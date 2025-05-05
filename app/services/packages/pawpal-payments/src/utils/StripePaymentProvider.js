import { PaymentProviderInterface } from "./paymentProxy";
import Stripe from "stripe";

export class StripePaymentProvider extends PaymentProviderInterface {
  /**
   * @param {string} apikey 
   */
  constructor(apikey) {
    super();
    this.stripe = new Stripe(apikey);
  }

  async processPayment(amount, currency, customerId) {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount,
        currency,
        customer: customerId,
        payment_method_types: ["card"],
        confirm: true,
      })
      // Store payment intent in database. Queue this option?

      return { success: true, data: paymentIntent }
    }catch(e) {
      return { success: false, error: error.message }
    }
  }
}
