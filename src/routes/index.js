const express = require('express');
const config = require('../config/config');
const { verifyToken } = require('../middlewares/jwt.middleware');
const authRoutes = require('./auth.route');
const roleRoutes = require('./role.route');
const permissionRoutes = require('./permission.route');
const rolePermissionRoutes = require('./rolepermission.route');
const ipAddressRoutes = require('./ipaddress.route');
const userRoutes = require('./user.route');
const currencyRoutes = require('./currency.route');
const customerRoutes = require('./customer.route');
const fxrateRoutes = require('./fxrate.route');
const systemBankRoutes = require('./systembank.route');
const dealRoutes = require('./deal.route');
const dataRoutes = require('./dashboard.route');
const statusRoutes = require('./status.route');
const auditRoutes = require('./audit.route');
const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/role',
    route: roleRoutes,
  },
  {
    path: '/permission',
    route: permissionRoutes,
  },
  {
    path: '/role-permission',
    route: rolePermissionRoutes,
  },
  {
    path: '/ip-addresses',
    route: ipAddressRoutes
  },
  {
    path: '/user',
    route: userRoutes,
  },
  {
    path: '/currency',
    route: currencyRoutes,
  },

  {
    path: '/customer',
    route: customerRoutes
  },
  {
    path: '/fxrate',
    route: fxrateRoutes
  },
  {
    path: '/systembank',
    route: systemBankRoutes
  },
  {
    path: '/deal',
    route: dealRoutes
  },
  {
    path: '/data',
    route: dataRoutes
  },
  {
    path: '/status',
    route: statusRoutes
  },
  {
    path: '/audit',
    route: auditRoutes
  }
];

const publicPaths = [
  '/auth/login',
  '/auth/verify-otp',
  '/auth/change-password',
];

router.use((req, res, next) => {
  const path = req.baseUrl + req.path;

  if (publicPaths.includes(path)) {
    return next();
  }

  return verifyToken(req, res, next);
});

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
