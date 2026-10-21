import { BrowserRouter as Router } from 'react-router-dom'
import AppRouter from './ui/routes/AppRouter'
import AuthProvider from './shared/context/AuthContext'
import CartProvider from './shared/context/CartContext'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppRouter />
        </Router>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
