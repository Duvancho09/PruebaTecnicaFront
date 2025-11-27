import api from '../services/api';
import { useState } from 'react';

const BulkProductTest = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleBulkCreate = async () => {
    setLoading(true);
    setResult(null);
    // Genera 1000 productos de prueba (puedes cambiar a 100000 si el backend lo soporta)
    const products = Array.from({ length: 1000 }, (_, i) => ({
      productName: `ProductoTest${i+1}`,
      categoryId: 1, // Usa un categoryId válido
      quantityPerUnit: 'Caja',
      unitPrice: 10 + i,
      unitsInStock: 100,
      unitsOnOrder: 0,
      reorderLevel: 10,
      discontinued: false
    }));
    try {
      await api.post('/Products', products);
      setResult('Carga masiva exitosa');
    } catch (err) {
      setResult('Error en la carga masiva');
    }
    setLoading(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)' }}>
      <h2 style={{ color: '#185a9d', fontWeight: 800, marginBottom: 32 }}>Carga masiva de productos de prueba</h2>
      <button onClick={handleBulkCreate} disabled={loading} style={{ padding: '12px 32px', borderRadius: 8, background: 'linear-gradient(90deg, #43cea2 0%, #185a9d 100%)', color: '#fff', border: 'none', fontWeight: 700, fontSize: 18, cursor: 'pointer', marginBottom: 24 }}>
        {loading ? 'Cargando...' : 'Cargar 1000 productos de prueba'}
      </button>
      {result && <div style={{ color: result.includes('exitosa') ? 'green' : 'red', fontWeight: 700 }}>{result}</div>}
    </div>
  );
};

export default BulkProductTest;
