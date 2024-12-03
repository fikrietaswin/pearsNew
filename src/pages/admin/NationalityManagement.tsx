import { useState, useEffect } from 'react';
import { AdminNationality, AdminTableColumn } from '../../types/admin';
import AdminTable from '../../components/admin/AdminTable';
import AdminModal from '../../components/admin/AdminModal';

const NationalityManagement = () => {
  const [nationalities, setNationalities] = useState<AdminNationality[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNationality, setSelectedNationality] = useState<AdminNationality | null>(null);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    flag: ''
  });

  useEffect(() => {
    const storedNationalities = JSON.parse(localStorage.getItem('nationalities') || '[]');
    setNationalities(storedNationalities.map((nationality: any) => ({
      ...nationality,
      id: nationality.id || Math.random().toString(36).substr(2, 9),
      createdAt: nationality.createdAt || new Date().toISOString()
    })));
  }, []);

  const columns: AdminTableColumn[] = [
    { key: 'code', label: 'Code', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
    { 
      key: 'flag', 
      label: 'Flag', 
      render: (value) => value ? (
        <img src={value} alt="flag" className="w-8 h-8 rounded object-cover" />
      ) : null
    },
    { 
      key: 'createdAt', 
      label: 'Created At', 
      sortable: true,
      render: (value) => new Date(value).toLocaleDateString()
    }
  ];

  const handleAdd = () => {
    setSelectedNationality(null);
    setFormData({ code: '', name: '', flag: '' });
    setIsModalOpen(true);
  };

  const handleEdit = (nationality: AdminNationality) => {
    setSelectedNationality(nationality);
    setFormData({
      code: nationality.code,
      name: nationality.name,
      flag: nationality.flag || ''
    });
    setIsModalOpen(true);
  };

  const handleDelete = (nationality: AdminNationality) => {
    if (window.confirm('Are you sure you want to delete this nationality?')) {
      const newNationalities = nationalities.filter(n => n.id !== nationality.id);
      setNationalities(newNationalities);
      localStorage.setItem('nationalities', JSON.stringify(newNationalities));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedNationality) {
      const updatedNationalities = nationalities.map(nationality => 
        nationality.id === selectedNationality.id 
          ? { 
              ...nationality, 
              ...formData,
              updatedAt: new Date().toISOString() 
            }
          : nationality
      );
      setNationalities(updatedNationalities);
      localStorage.setItem('nationalities', JSON.stringify(updatedNationalities));
    } else {
      const newNationality = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData,
        createdAt: new Date().toISOString()
      };
      const updatedNationalities = [...nationalities, newNationality];
      setNationalities(updatedNationalities);
      localStorage.setItem('nationalities', JSON.stringify(updatedNationalities));
    }
    
    setIsModalOpen(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Nationality Management</h2>
      
      <AdminTable
        columns={columns}
        data={nationalities}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedNationality ? 'Edit Nationality' : 'Add New Nationality'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Country Code
            </label>
            <input
              type="text"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
              className="w-full bg-dark-200 border border-dark-100 rounded-lg py-2 px-3 text-white"
              required
              maxLength={3}
              placeholder="e.g., USA, GBR, JPN"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Country Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-dark-200 border border-dark-100 rounded-lg py-2 px-3 text-white"
              required
              placeholder="e.g., United States, United Kingdom, Japan"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Flag URL (optional)
            </label>
            <input
              type="url"
              value={formData.flag}
              onChange={(e) => setFormData({ ...formData, flag: e.target.value })}
              className="w-full bg-dark-200 border border-dark-100 rounded-lg py-2 px-3 text-white"
              placeholder="https://example.com/flag.png"
            />
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-gray-300 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-accent-primary text-white rounded-lg hover:bg-accent-secondary"
            >
              {selectedNationality ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
};

export default NationalityManagement;