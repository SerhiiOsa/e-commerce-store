import ENV_VARS from '../config/envVars.js';

export default {
  //payment
  currency: 'usd',
  payment_method_types: ['card'],
  mode: 'payment',
  success_url: `${ENV_VARS.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${ENV_VARS.CLIENT_URL}/purchase-cancel`,
  //coupon
  discountPercentage: 10, //10%
  couponExpIn: 30 * 24 * 60 * 60 * 1000, // 30 days
  amountToCreateNewCoupon: 20000, // $200 in cents
};
