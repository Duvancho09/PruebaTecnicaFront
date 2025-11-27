import { useForm } from 'react-hook-form';
import api from '../services/api';

interface CategoryForm {
  categoryName: string;
  description: string;
}

const CategoryForm = () => {
  const { register, handleSubmit, reset } = useForm<CategoryForm>();

  const onSubmit = async (data: CategoryForm) => {
    try {
      const res = await api.post('/Category', data);
      alert('Categoría creada con ID: ' + res.data.id);
      reset();
    } catch (err) {
      alert('Error al crear categoría');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'linear-gradient(135deg, #ffb347 0%, #ffcc33 100%)' }}>
      <form onSubmit={handleSubmit(onSubmit)} style={{ background: 'rgba(255,255,255,0.95)', padding: 40, borderRadius: 16, boxShadow: '0 8px 32px rgba(255,204,51,0.15)', minWidth: 340, maxWidth: 380 }}>
        <h2 style={{ textAlign: 'center', marginBottom: 32, color: '#ffb347', fontWeight: 800, letterSpacing: 1 }}>Crear categoría</h2>
        <div style={{ marginBottom: 20 }}>
          <input {...register('categoryName', { required: 'Nombre requerido' })} placeholder="Nombre de categoría" style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #ffb347', fontSize: 16, outline: 'none', transition: 'border 0.2s' }} />
        </div>
        <div style={{ marginBottom: 20 }}>
          <input {...register('description', { required: 'Descripción requerida' })} placeholder="Descripción" style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #ffb347', fontSize: 16, outline: 'none', transition: 'border 0.2s' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button type="submit" style={{ width: '50%', padding: '10px 0', borderRadius: 8, background: 'linear-gradient(90deg, #ffb347 0%, #ffcc33 100%)', color: '#fff', border: 'none', fontWeight: 700, fontSize: 16, letterSpacing: 1, boxShadow: '0 2px 8px rgba(255,204,51,0.10)', cursor: 'pointer', marginTop: 8, transition: 'background 0.2s' }}>Crear</button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
