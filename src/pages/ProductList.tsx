import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

interface Product {
  productID: number;
  productName: string;
  unitPrice: number;
  unitsInStock: number;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/Products').then(res => {
      setProducts(res.data.products);
    });
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ background: 'rgba(255,255,255,0.97)', padding: 40, borderRadius: 16, boxShadow: '0 8px 32px rgba(24,90,157,0.15)', minWidth: 400, maxWidth: 600 }}>
        <h2 style={{ textAlign: 'center', marginBottom: 32, color: '#185a9d', fontWeight: 800, letterSpacing: 1 }}>Listado de productos</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 32 }}>
          <button onClick={() => navigate('/products/new')} style={{ padding: '10px 32px', borderRadius: 8, background: 'linear-gradient(90deg, #43cea2 0%, #185a9d 100%)', color: '#fff', border: 'none', fontWeight: 700, fontSize: 16, letterSpacing: 1, boxShadow: '0 2px 8px rgba(24,90,157,0.10)', cursor: 'pointer', transition: 'background 0.2s' }}>Crear producto</button>
          <button onClick={() => navigate('/products/bulk-test')} style={{ padding: '10px 32px', borderRadius: 8, background: 'linear-gradient(90deg, #ffa726 0%, #185a9d 100%)', color: '#fff', border: 'none', fontWeight: 700, fontSize: 16, letterSpacing: 1, boxShadow: '0 2px 8px rgba(24,90,157,0.10)', cursor: 'pointer', transition: 'background 0.2s' }}>Carga masiva de prueba</button>
        </div>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {products.length === 0 ? (
            <li style={{ textAlign: 'center', color: '#888', fontSize: 18 }}>No hay productos para mostrar.</li>
          ) : (
            products.map(p => (
              <li key={p.productID} style={{ padding: '18px 0', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontWeight: 'bold', fontSize: 18, color: '#185a9d' }}>{p.productName}</span>
                  <span style={{ marginLeft: 16, color: '#43cea2', fontWeight: 500 }}>${p.unitPrice}</span>
                  <span style={{ marginLeft: 16, color: '#888' }}>Stock: {p.unitsInStock}</span>
                </div>
                <button onClick={() => navigate(`/products/edit/${p.productID}`)} style={{ marginLeft: 16, padding: '6px 18px', borderRadius: 8, background: 'linear-gradient(90deg, #ffa726 0%, #185a9d 100%)', color: '#fff', border: 'none', fontWeight: 700, fontSize: 15, letterSpacing: 1, boxShadow: '0 2px 8px rgba(24,90,157,0.10)', cursor: 'pointer', transition: 'background 0.2s' }}>Editar</button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default ProductList;
