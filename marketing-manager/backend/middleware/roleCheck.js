module.exports = (...roles) => {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({ message: 'Not authorized' });
      }
  
      const hasRole = roles.includes(req.user.role);
      if (!hasRole) {
        return res.status(403).json({ message: 'Not allowed to access this resource' });
      }
      
      next();
    };
  };
  