import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import api from '../services/api';

interface ProductForm {
  productName: string;
  categoryId: number;
  quantityPerUnit: string;
  unitPrice: number;
  unitsInStock: number;
  unitsOnOrder: number;
  reorderLevel: number;
  discontinued: boolean;
}

interface Category {
  categoryId: number;
  categoryName: string;
}

const ProductForm = () => {
  const { register, handleSubmit } = useForm<ProductForm>();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    api.get('/Category').then(res => {
      setCategories(res.data.categories || res.data);
    });
  }, []);

  const onSubmit = async (data: ProductForm) => {
    // Asegurar tipos correctos
    const payload = {
      productName: data.productName,
      categoryId: Number(data.categoryId),
      quantityPerUnit: data.quantityPerUnit,
      unitPrice: Number(data.unitPrice),
      unitsInStock: Number(data.unitsInStock),
      unitsOnOrder: Number(data.unitsOnOrder),
      reorderLevel: Number(data.reorderLevel),
      discontinued: Boolean(data.discontinued)
    };
    await api.post('/Products', payload);
    alert('Producto creado');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)' }}>
      <form onSubmit={handleSubmit(onSubmit)} style={{ background: 'rgba(255,255,255,0.95)', padding: 40, borderRadius: 16, boxShadow: '0 8px 32px rgba(24,90,157,0.15)', minWidth: 340, maxWidth: 380 }}>
        <h2 style={{ textAlign: 'center', marginBottom: 32, color: '#185a9d', fontWeight: 800, letterSpacing: 1 }}>Crear producto</h2>
        <div style={{ marginBottom: 20 }}>
          <input {...register('productName', { required: 'Nombre requerido' })} placeholder="Nombre" style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #43cea2', fontSize: 16, outline: 'none', transition: 'border 0.2s' }} />
        </div>
        <div style={{ marginBottom: 20 }}>
          <select {...register('categoryId', { required: 'Categoría requerida', valueAsNumber: true })} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #43cea2', fontSize: 16, outline: 'none', transition: 'border 0.2s' }}>
            <option value="">Selecciona una categoría</option>
            {categories.map(cat => (
              <option key={cat.categoryId} value={cat.categoryId}>{cat.categoryName} (ID: {cat.categoryId})</option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: 20 }}>
          <input {...register('quantityPerUnit', { required: 'Cantidad por unidad requerida' })} placeholder="Cantidad por unidad" style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #43cea2', fontSize: 16, outline: 'none', transition: 'border 0.2s' }} />
        </div>
        <div style={{ marginBottom: 20 }}>
          <input {...register('unitPrice', { required: 'Precio requerido', valueAsNumber: true, min: { value: 0, message: 'Precio debe ser positivo' } })} placeholder="Precio" style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #43cea2', fontSize: 16, outline: 'none', transition: 'border 0.2s' }} />
        </div>
        <div style={{ marginBottom: 20 }}>
          <input {...register('unitsInStock', { required: 'Stock requerido', valueAsNumber: true, min: { value: 0, message: 'Stock debe ser positivo' } })} placeholder="Stock" style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #43cea2', fontSize: 16, outline: 'none', transition: 'border 0.2s' }} />
        </div>
        <div style={{ marginBottom: 20 }}>
          <input {...register('unitsOnOrder', { required: 'Unidades en orden requeridas', valueAsNumber: true })} placeholder="Unidades en orden" style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #43cea2', fontSize: 16, outline: 'none', transition: 'border 0.2s' }} />
        </div>
        <div style={{ marginBottom: 20 }}>
          <input {...register('reorderLevel', { required: 'Nivel de reorden requerido', valueAsNumber: true })} placeholder="Nivel de reorden" style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #43cea2', fontSize: 16, outline: 'none', transition: 'border 0.2s' }} />
        </div>
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontWeight: 500, marginRight: 12 }}>¿Descontinuado?</label>
          <input type="checkbox" {...register('discontinued')} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button type="submit" style={{ width: '50%', padding: '10px 0', borderRadius: 8, background: 'linear-gradient(90deg, #43cea2 0%, #185a9d 100%)', color: '#fff', border: 'none', fontWeight: 700, fontSize: 16, letterSpacing: 1, boxShadow: '0 2px 8px rgba(24,90,157,0.10)', cursor: 'pointer', marginTop: 8, transition: 'background 0.2s' }}>Crear</button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
