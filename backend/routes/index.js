import express from 'express';
import authRoutes from './auth.route.js';
import categoryRoutes from './category.route.js';
import productRoutes from './product.route.js';
import cartRoutes from './cart.route.js';
import couponRoutes from './coupon.route.js';
import paymentRoutes from './payment.route.js';
import analyticsRoutes from './analitycs.route.js';

const router = express.Router();

const apiRouter = express.Router();

apiRouter.use('/auth', authRoutes);
apiRouter.use('/categories', categoryRoutes);
apiRouter.use('/products', productRoutes);
apiRouter.use('/cart', cartRoutes);
apiRouter.use('/coupons', couponRoutes);
apiRouter.use('/payments', paymentRoutes);
apiRouter.use('/analytics', analyticsRoutes);

router.use('/api/v1', apiRouter);

export default router;
