import { useState, useEffect } from 'react';
import { AdminRider, AdminTableColumn } from '../../types/admin';
import AdminTable from '../../components/admin/AdminTable';
import AdminModal from '../../components/admin/AdminModal';

const RiderManagement = () => {
  const [riders, setRiders] = useState<AdminRider[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRider, setSelectedRider] = useState<AdminRider | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    team: '',
    nationality: '',
    category: '',
    points: '0',
    imageUrl: ''
  });

  useEffect(() => {
    const storedRiders = JSON.parse(localStorage.getItem('riders') || '[]');
    setRiders(storedRiders.map((rider: any) => ({
      ...rider,
      id: rider.id || Math.random().toString(36).substr(2, 9),
      createdAt: rider.createdAt || new Date().toISOString(),
      updatedAt: rider.updatedAt || new Date().toISOString()
    })));
  }, []);

  const columns: AdminTableColumn[] = [
    { key: 'number', label: 'Number', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'team', label: 'Team', sortable: true },
    { key: 'nationality', label: 'Nationality', sortable: true },
    { key: 'category', label: 'Category', sortable: true },
    { key: 'points', label: 'Points', sortable: true },
    { 
      key: 'updatedAt', 
      label: 'Last Updated', 
      sortable: true,
      render: (value) => new Date(value).toLocaleDateString()
    }
  ];

  const handleAdd = () => {
    setSelectedRider(null);
    setFormData({
      name: '',
      number: '',
      team: '',
      nationality: '',
      category: '',
      points: '0',
      imageUrl: ''
    });
    setIsModalOpen(true);
  };

  const handleEdit = (rider: AdminRider) => {
    setSelectedRider(rider);
    setFormData({
      name: rider.name,
      number: rider.number.toString(),
      team: rider.team,
      nationality: rider.nationality,
      category: rider.category,
      points: rider.points.toString(),
      imageUrl: rider.imageUrl || ''
    });
    setIsModalOpen(true);
  };

  const handleDelete = (rider: AdminRider) => {
    if (window.confirm('Are you sure you want to delete this rider?')) {
      const newRiders = riders.filter(r => r.id !== rider.id);
      setRiders(newRiders);
      localStorage.setItem('riders', JSON.stringify(newRiders));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const riderData = {
      ...formData,
      number: parseInt(formData.number),
      points: parseInt(formData.points)
    };

    if (selectedRider) {
      const updatedRiders = riders.map(rider => 
        rider.id === selectedRider.id 
          ? { 
              ...rider, 
              ...riderData, 
              updatedAt: new Date().toISOString() 
            }
          : rider
      );
      setRiders(updatedRiders);
      localStorage.setItem('riders', JSON.stringify(updatedRiders));
    } else {
      const newRider = {
        id: Math.random().toString(36).substr(2, 9),
        ...riderData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      const updatedRiders = [...riders, newRider];
      setRiders(updatedRiders);
      localStorage.setItem('riders', JSON.stringify(updatedRiders));
    }
    
    setIsModalOpen(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Rider Management</h2>
      
      <AdminTable
        columns={columns}
        data={riders}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedRider ? 'Edit Rider' : 'Add New Rider'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-dark-200 border border-dark-100 rounded-lg py-2 px-3 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Number
            </label>
            <input
              type="number"
              value={formData.number}
              onChange={(e) => setFormData({ ...formData, number: e.target.value })}
              className="w-full bg-dark-200 border border-dark-100 rounded-lg py-2 px-3 text-white"
              required
              min="1"
              max="999"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Team
            </label>
            <input
              type="text"
              value={formData.team}
              onChange={(e) => setFormData({ ...formData, team: e.target.value })}
              className="w-full bg-dark-200 border border-dark-100 rounded-lg py-2 px-3 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Nationality
            </label>
            <input
              type="text"
              value={formData.nationality}
              onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
              className="w-full bg-dark-200 border border-dark-100 rounded-lg py-2 px-3 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Category
            </label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-dark-200 border border-dark-100 rounded-lg py-2 px-3 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Points
            </label>
            <input
              type="number"
              value={formData.points}
              onChange={(e) => setFormData({ ...formData, points: e.target.value })}
              className="w-full bg-dark-200 border border-dark-100 rounded-lg py-2 px-3 text-white"
              required
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Image URL (optional)
            </label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="w-full bg-dark-200 border border-dark-100 rounded-lg py-2 px-3 text-white"
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
              {selectedRider ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
};

export default RiderManagement;