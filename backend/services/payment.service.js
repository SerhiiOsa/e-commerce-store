import config from '../config/payment.js';
import Coupon from '../models/coupon.model.js';
import Order from '../models/order.model.js';
import stripe from '../config/stripe.js';

export default {
  async createCheckoutSession(products, couponCode, userId) {
    let totalAmount = 0;

    const lineItems = products.map((product) => {
      const amount = Math.round(product.price * 100); // stripe format of amount is cents
      totalAmount += amount * product.quantity;

      return {
        price_data: {
          currency: config.currency,
          product_data: {
            name: product.name,
            images: [product.image],
          },
          unit_amount: amount,
        },
        quantity: product.quantity || 1,
      };
    });

    let coupon = null;
    if (couponCode) {
      coupon = await Coupon.findOne({
        code: couponCode,
        userId,
        isActive: true,
      });
      if (coupon) {
        totalAmount -= Math.round(
          (totalAmount * coupon.discountPercentage) / 100
        );
      }
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: config.payment_method_types,
      line_items: lineItems,
      mode: config.mode,
      success_url: config.success_url,
      cancel_url: config.cancel_url,
      discounts: coupon
        ? [
            {
              coupon: await createStripeCoupon(coupon.discountPercentage),
            },
          ]
        : [],
      metadata: {
        userId: userId.toString(),
        couponCode: couponCode || '',
        products: JSON.stringify(
          products.map((p) => ({
            id: p._id,
            quantity: p.quantity,
            price: p.price,
          }))
        ),
      },
    });

    if (totalAmount >= config.amountToCreateNewCoupon) {
      await createNewCoupon(userId);
    }

    return { id: session.id, totalAmount: totalAmount / 100 };
  },

  async checkoutSuccess(sessionId) {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === 'paid') {
      if (session.metadata.couponCode) {
        await Coupon.findOneAndUpdate(
          {
            code: session.metadata.couponCode,
            userId: session.metadata.userId,
          },
          { isActive: false }
        );
      }

      const products = JSON.parse(session.metadata.products);

      const newOrder = new Order({
        userId: session.metadata.userId,
        products: products.map((product) => ({
          product: product.id,
          quantity: product.quantity,
          price: product.price,
        })),
        totalAmount: session.amount_total / 100,
        stripeSessionId: sessionId,
      });

      await newOrder.save();

      return newOrder.id;
    }
  },
};

async function createStripeCoupon(discountPercentage) {
  const coupon = await stripe.coupons.create({
    percent_off: discountPercentage,
    duration: 'once',
  });

  return coupon.id;
}

async function createNewCoupon(userId) {
  await Coupon.findOneAndDelete({ userId });

  const newCoupon = new Coupon({
    code: 'GIFT' + Math.random().toString(36).substring(2, 8).toUpperCase(),
    discountPercentage: config.discountPercentage,
    expirationDate: new Date(Date.now() + config.couponExpIn),
    userId,
  });

  await newCoupon.save();

  return newCoupon;
}
