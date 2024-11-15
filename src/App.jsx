import reactlogo from 'react';
import { useState } from 'react';
import viteLogo from './assets/vite.svg';  // Importa el archivo Vite SVG
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';

// Componentes específicos de la tienda
import Home from './components/Home';
import ProductsList from './components/Products/ProductsList.jsx';
import CreateProduct from './components/Products/CreateProduct.jsx';
import CustomersList from './components/Customers/CustomersList.jsx';
import CreateCustomer from './components/Customers/CreateCustomers.jsx';
import OrdersList from './components/Orders/OrderList.jsx';
import LoginUser from './components/Users/LoginUser.jsx';
import Dashboard from './components/Dashboard.jsx';

function App() {
  const [count, setCount] = useState(0);

  // Menú de navegación con las diferentes secciones
  const items = [
    { label: 'Inicio', icon: 'pi pi-home', url: '/' },
    { label: 'Productos', icon: 'pi pi-box', url: '/productos' },
    { label: 'Clientes', icon: 'pi pi-users', url: '/clientes' },
    { label: 'Pedidos', icon: 'pi pi-cart', url: '/pedidos' },
    { label: 'Login', icon: 'pi pi-sign-in', url: '/login' },
  ];

  return (
    <BrowserRouter>
      <Menubar model={items}>
        {/* Aquí mostramos el logo de Vite */}
        <img src={viteLogo} alt="Vite Logo" style={{ width: '40px', height: '40px' }} />
      </Menubar>
      <div className="app-container">
        <Routes>
          {/* Rutas de las páginas principales */}
          <Route path='/' element={<Home />} />
          <Route path='/productos' element={<ProductsList />} />
          <Route path='/nuevo-producto' element={<CreateProduct />} />
          <Route path='/clientes' element={<CustomersList />} />
          <Route path='/nuevo-cliente' element={<CreateCustomer />} />
          <Route path='/pedidos' element={<OrdersList />} />
          <Route path='/login' element={<LoginUser />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

