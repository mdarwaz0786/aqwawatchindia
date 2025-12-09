import { createRoot } from 'react-dom/client';
import './index.css';
import './responsive.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/auth.context.jsx';
import { AppProvider } from './context/app.context.jsx';
import { CartProvider } from './context/cart.context.jsx';

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <AppProvider>
      <CartProvider>
        <BrowserRouter basename="/">
          <App />
          <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            bodyClassName="toastBody"
          />
        </BrowserRouter>
      </CartProvider>
    </AppProvider>
  </AuthProvider>
);
