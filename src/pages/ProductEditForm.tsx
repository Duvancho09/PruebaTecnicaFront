import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

interface ProductForm {
  productName: string;
  categoryId: number;
  unitPrice: number;
  unitsInStock: number;
}

const ProductEditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm<ProductForm>();

  useEffect(() => {
    api.get(`/Products/${id}`).then(res => {
      const p = res.data;
      setValue('productName', p.productName);
      setValue('categoryId', p.categoryId);
      setValue('unitPrice', p.unitPrice);
      setValue('unitsInStock', p.unitsInStock);
    });
  }, [id, setValue]);

  const onSubmit = async (data: ProductForm) => {
    await api.put(`/Products/${id}`, {
      productName: data.productName,
      categoryId: Number(data.categoryId),
      unitPrice: Number(data.unitPrice),
      unitsInStock: Number(data.unitsInStock)
});
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f5f5f5' }}>
      <form onSubmit={handleSubmit(onSubmit)} style={{ background: '#fff', padding: 32, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', minWidth: 320 }}>
        <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Editar producto</h2>
        <div style={{ marginBottom: 16 }}>
          <input {...register('productName', { required: 'Nombre requerido' })} placeholder="Nombre" style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <input {...register('categoryId', { required: 'ID Categoría requerido', valueAsNumber: true })} placeholder="ID Categoría" />
        </div>
        <div style={{ marginBottom: 16 }}>
          <input {...register('unitPrice', { required: 'Precio requerido', valueAsNumber: true, min: { value: 0, message: 'Precio debe ser positivo' } })} placeholder="Precio" style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <input {...register('unitsInStock', { required: 'Stock requerido', valueAsNumber: true, min: { value: 0, message: 'Stock debe ser positivo' } })} placeholder="Stock" style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }} />
        </div>
        <button type="submit" style={{ width: '100%', padding: 10, borderRadius: 4, background: '#ffa726', color: '#fff', border: 'none', fontWeight: 'bold' }}>Actualizar</button>
      </form>
    </div>
  );
};

export default ProductEditForm;