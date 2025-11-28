import { useForm } from 'react-hook-form';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

interface LoginForm {
  username: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit } = useForm<LoginForm>();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await api.post('/Auth/login', data, {
        headers: { 'Content-Type': 'application/json' }
      });
      localStorage.setItem('token', res.data.token);
      navigate('/products');
    } catch {
      alert('Credenciales inválidas');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)' }}>
      <form onSubmit={handleSubmit(onSubmit)} style={{ background: 'rgba(255,255,255,0.95)', padding: 40, borderRadius: 16, boxShadow: '0 8px 32px rgba(24,90,157,0.15)', minWidth: 340, maxWidth: 380 }}>
        <h2 style={{ textAlign: 'center', marginBottom: 32, color: '#185a9d', fontWeight: 800, letterSpacing: 1 }}>Iniciar sesión</h2>
        <div style={{ marginBottom: 20 }}>
          <input {...register('username')} placeholder="Usuario" style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #43cea2', fontSize: 16, outline: 'none', transition: 'border 0.2s' }} />
        </div>
        <div style={{ marginBottom: 20 }}>
          <input {...register('password')} type="password" placeholder="Contraseña" style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #43cea2', fontSize: 16, outline: 'none', transition: 'border 0.2s' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button type="submit" style={{ width: '50%', padding: '10px 0', borderRadius: 8, background: 'linear-gradient(90deg, #43cea2 0%, #185a9d 100%)', color: '#fff', border: 'none', fontWeight: 700, fontSize: 16, letterSpacing: 1, boxShadow: '0 2px 8px rgba(24,90,157,0.10)', cursor: 'pointer', marginTop: 8, transition: 'background 0.2s' }}>Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
