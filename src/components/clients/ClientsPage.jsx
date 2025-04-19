import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { ClientFilters } from './ClientFilters';
import { ClientTable } from './ClientTable';
import { AddClientModal } from './AddClientModal';

const initialClients = [
  {
    id: 1,
    name: 'Lar Nossa Senhora dos Navegantes',
    phone: '(11) 98765-4321',
    address: 'Rua das Flores, 123 - Capão da Canoa/RS',
    responsible: 'João Silva',
    notes: 'Cliente preferencial',
    avatar: 'https://cdn.usegalileo.ai/stability/117a7a12-7704-4917-9139-4a3f76c42e78.png'
  },
  {
    id: 2,
    name: 'Escolinha Amigos do Mar',
    phone: '(11) 91234-5678',
    address: 'Av. Principal, 456 - Tramandaí/RS',
    responsible: 'Maria Santos',
    notes: 'Atendimento especial',
    avatar: 'https://cdn.usegalileo.ai/stability/d4e7d763-28f3-4af2-bc57-a26db12c522b.png'
  }
];

export function ClientsPage() {
  const [clients, setClients] = useState(initialClients);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    sortBy: 'name'
  });

  const handleAddClient = (newClient) => {
    setClients([...clients, newClient]);
  };

  const filteredClients = clients.filter(client => {
    if (filters.search) {
      const search = filters.search.toLowerCase();
      return (
        client.name.toLowerCase().includes(search) ||
        client.phone.toLowerCase().includes(search) ||
        client.responsible?.toLowerCase().includes(search)
      );
    }
    return true;
  }).sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  return (
    <main className="flex-1 min-w-0 overflow-auto">
      <div className="max-w-[1440px] mx-auto animate-fade-in">
        <div className="flex flex-wrap items-center justify-between gap-4 p-4">
          <h1 className="text-gray-900 dark:text-white text-2xl md:text-3xl font-bold">Clientes</h1>
          <Button onClick={() => setIsAddModalOpen(true)}>
            Adicionar Cliente
          </Button>
        </div>

        <div className="p-4">
          <Card>
            <CardHeader>
              <ClientFilters filters={filters} onChange={setFilters} />
            </CardHeader>
            <CardContent>
              <ClientTable clients={filteredClients} />
            </CardContent>
          </Card>
        </div>
      </div>

      <AddClientModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddClient}
      />
    </main>
  );
}