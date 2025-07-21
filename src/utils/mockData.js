export const mockOrders = [
  {
    id: 1,
    title: 'Reparo de Notebook Dell',
    description: 'O notebook não liga. A cliente relatou que derramou uma pequena quantidade de café perto do aparelho. Necessário verificar a placa-mãe e a fonte de energia.',
    creationDate: '2023-10-26',
    client: 'Ana Costa',
    address: 'Rua das Flores, 123',
    phone: '(11) 98765-4321',
    status: 'Iniciada',
  },
  {
    id: 2,
    title: 'Manutenção de Impressora HP',
    description: 'A impressora está atolando papel constantemente e a qualidade de impressão está baixa, com manchas de tinta. Requer limpeza dos roletes e verificação dos cartuchos.',
    creationDate: '2023-10-25',
    client: 'Carlos Silva',
    address: 'Av. Principal, 456',
    phone: '(21) 91234-5678',
    status: 'Em Execução',
    employeeId: 2, // Corresponde ao ID de João Pereira
    location: { lat: -23.5505, lng: -46.6333 }, // São Paulo
  },
  {
    id: 3,
    title: 'Troca de Tela - iPhone 12',
    description: 'A tela do aparelho está trincada após uma queda. O touch screen ainda funciona, mas a visualização está comprometida. Proceder com a substituição da tela.',
    creationDate: '2023-10-24',
    client: 'Mariana Lima',
    address: 'Travessa dos Sonhos, 789',
    phone: '(31) 99999-8888',
    status: 'Finalizada',
    employeeId: 3, // Corresponde ao ID de Lucas Martins
  },
  {
    id: 4,
    title: 'Formatação de PC com Backup',
    description: 'O computador está extremamente lento e apresentando telas de erro. O cliente solicitou backup completo dos arquivos e formatação do sistema operacional Windows 11.',
    creationDate: '2023-10-26',
    client: 'Fernanda Souza',
    address: 'Alameda dos Anjos, 101',
    phone: '(41) 98888-7777',
    status: 'Iniciada',
  },
    {
    id: 5,
    title: 'Configuração de Rede Wi-Fi',
    description: 'O cliente precisa de ajuda para configurar uma nova rede de Wi-Fi mesh em seu escritório, garantindo cobertura em todos os ambientes e segurança na rede.',
    creationDate: '2023-10-25',
    client: 'Ricardo Nunes',
    address: 'Rua da Paz, 202',
    phone: '(51) 97777-6666',
    status: 'Em Execução',
    employeeId: 3, // Corresponde ao ID de Lucas Martins
    location: { lat: -22.9068, lng: -43.1729 }, // Rio de Janeiro
  },
]; 