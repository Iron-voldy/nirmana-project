// config/security.js

/**
 * Security configuration settings
 * This file centralizes security settings for different environments
 */

const securityConfig = {
    // JWT settings
    jwt: {
      expiresIn: process.env.JWT_EXPIRES_IN || '1d',
      cookieExpiresIn: process.env.JWT_COOKIE_EXPIRES_IN || 24 * 60 * 60 * 1000, // 1 day in milliseconds
      issuer: 'marketing-manager-api',
      audience: process.env.JWT_AUDIENCE || 'marketing-manager-clients'
    },
  
    // Password policy settings
    password: {
      minLength: 8,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: true,
      // RegEx pattern based on the above requirements
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    },
  
    // Rate limiting settings
    rateLimit: {
      // General API rate limiting
      api: {
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100 // 100 requests per 15 minutes
      },
      // More strict rate limiting for authentication routes
      auth: {
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 10 // 10 requests per 15 minutes
      },
      // Even more strict rate limiting for failed login attempts
      login: {
        maxAttempts: 5, // Max failed attempts
        lockoutTime: 15 * 60 * 1000 // 15 minutes lockout
      }
    },
  
    // CORS settings
    cors: {
      production: {
        origin: [
          'https://marketing-manager.com',
          'https://admin.marketing-manager.com',
          // Add any other allowed domains here
        ],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token'],
        credentials: true,
        maxAge: 86400 // 1 day cache
      },
      development: {
        origin: true, // Allow all origins in development
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token'],
        credentials: true,
        maxAge: 86400
      }
    },
  
    // Request body size limits
    bodyLimit: '10kb',
  
    // Content Security Policy (for helmet middleware)
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        imgSrc: ["'self'", 'data:'],
        connectSrc: ["'self'"]
      }
    }
  };
  
  module.exports = securityConfig;