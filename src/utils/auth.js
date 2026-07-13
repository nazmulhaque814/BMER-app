// Admin Authentication
const ADMIN_EMAIL = process.env.REACT_APP_ADMIN_EMAIL || 'admin@bmer.com';
const ADMIN_PASSWORD_HASH = process.env.REACT_APP_ADMIN_PASSWORD_HASH || 'hashed_password';

export const verifyAdminCredentials = async (email, password) => {
  try {
    // In production, this should verify against a secure backend
    // For now, using environment variables (NOT recommended for production)
    const isValid = email === ADMIN_EMAIL && password === (process.env.REACT_APP_ADMIN_PASSWORD || 'admin');
    return isValid;
  } catch (err) {
    console.error('Admin verification failed:', err);
    return false;
  }
};

export const isAdminLoggedIn = () => {
  return !!localStorage.getItem('adminToken');
};

export const getAdminEmail = () => {
  return localStorage.getItem('adminEmail');
};
