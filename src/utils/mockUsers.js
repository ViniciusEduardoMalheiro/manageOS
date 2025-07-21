// Simulação de uma tabela de usuários no banco de dados.
// Em uma aplicação real, as senhas NUNCA devem ser armazenadas em texto plano.
// Elas devem ser hasheadas com um algoritmo forte como o bcrypt.

export const mockUsers = [
  {
    id: 1,
    name: 'Admin Geral',
    email: 'admin@manageos.com',
    password: 'admin', // Apenas para fins de simulação
    role: 'Administrador',
  },
  {
    id: 2,
    name: 'João Pereira',
    email: 'joao.pereira@manageos.com',
    password: '123',
    role: 'Funcionário',
  },
  {
    id: 3,
    name: 'Lucas Martins',
    email: 'lucas.martins@manageos.com',
    password: '123',
    role: 'Funcionário',
  },
]; 