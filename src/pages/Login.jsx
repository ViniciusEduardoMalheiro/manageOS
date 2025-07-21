import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Card from '../components/Card';
import Input from '../components/Input';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // Estado para o erro
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null); // Limpa o erro anterior
    try {
      login(email, password);
      navigate('/');
    } catch (err) {
      // Define a mensagem de erro para ser exibida
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-hero p-4">
      <Card className="w-full max-w-md animate-scale-in glass">
        <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground">
            ManageOS
            </h1>
            <p className="text-muted-foreground mt-2 mb-6">Acesse sua conta para continuar</p>
        </div>
        <form onSubmit={handleSubmit}>
          <Input
            label="E-mail"
            type="email"
            name="email"
            placeholder="seuemail@exemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Senha"
            type="password"
            name="password"
            placeholder="Sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <div className="bg-destructive/20 text-destructive text-sm font-medium p-3 rounded-md mb-4 text-center">
                {error}
            </div>
          )}
          <Button type="submit" variant="primary" className="w-full mt-2">
            Entrar
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Login; 