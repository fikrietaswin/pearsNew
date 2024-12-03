import { useState, useEffect } from 'react';
import { AdminPoint, AdminTableColumn } from '../../types/admin';
import AdminTable from '../../components/admin/AdminTable';
import AdminModal from '../../components/admin/AdminModal';

const PointManagement = () => {
  const [points, setPoints] = useState<AdminPoint[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<AdminPoint | null>(null);
  const [formData, setFormData] = useState({
    eventId: '',
    riderId: '',
    position: '1',
    points: '25',
    bonusPoints: '0'
  });

  useEffect(() => {
    const storedPoints = JSON.parse(localStorage.getItem('points') || '[]');
    setPoints(storedPoints.map((point: any) => ({
      ...point,
      id: point.id || Math.random().toString(36).substr(2, 9),
      createdAt: point.createdAt || new Date().toISOString()
    })));
  }, []);

  const columns: AdminTableColumn[] = [
    { key: 'eventId', label: 'Event', sortable: true },
    { key: 'riderId', label: 'Rider', sortable: true },
    { key: 'position', label: 'Position', sortable: true },
    { key: 'points', label: 'Points', sortable: true },
    { key: 'bonusPoints', label: 'Bonus Points', sortable: true },
    { 
      key: 'totalPoints', 
      label: 'Total',
      render: (_, row) => row.points + row.bonusPoints
    },
    { 
      key: 'createdAt', 
      label: 'Created At', 
      sortable: true,
      render: (value) => new Date(value).toLocaleDateString()
    }
  ];

  const handleAdd = () => {
    setSelectedPoint(null);
    setFormData({
      eventId: '',
      riderId: '',
      position: '1',
      points: '25',
      bonusPoints: '0'
    });
    setIsModalOpen(true);
  };

  const handleEdit = (point: AdminPoint) => {
    setSelectedPoint(point);
    setFormData({
      eventId: point.eventId,
      riderId: point.riderId,
      position: point.position.toString(),
      points: point.points.toString(),
      bonusPoints: point.bonusPoints.toString()
    });
    setIsModalOpen(true);
  };

  const handleDelete = (point: AdminPoint) => {
    if (window.confirm('Are you sure you want to delete these points?')) {
      const newPoints = points.filter(p => p.id !== point.id);
      setPoints(newPoints);
      localStorage.setItem('points', JSON.stringify(newPoints));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const pointData = {
      ...formData,
      position: parseInt(formData.position),
      points: parseInt(formData.points),
      bonusPoints: parseInt(formData.bonusPoints)
    };

    if (selectedPoint) {
      const updatedPoints = points.map(point => 
        point.id === selectedPoint.id 
          ? { ...point, ...pointData }
          : point
      );
      setPoints(updatedPoints);
      localStorage.setItem('points', JSON.stringify(updatedPoints));
    } else {
      const newPoint = {
        id: Math.random().toString(36).substr(2, 9),
        ...pointData,
        createdAt: new Date().toISOString()
      };
      const updatedPoints = [...points, newPoint];
      setPoints(updatedPoints);
      localStorage.setItem('points', JSON.stringify(updatedPoints));
    }
    
    setIsModalOpen(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Point Management</h2>
      
      <AdminTable
        columns={columns}
        data={points}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedPoint ? 'Edit Points' : 'Add New Points'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Event ID
            </label>
            <input
              type="text"
              value={formData.eventId}
              onChange={(e) => setFormData({ ...formData, eventId: e.target.value })}
              className="w-full bg-dark-200 border border-dark-100 rounded-lg py-2 px-3 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Rider ID
            </label>
            <input
              type="text"
              value={formData.riderId}
              onChange={(e) => setFormData({ ...formData, riderId: e.target.value })}
              className="w-full bg-dark-200 border border-dark-100 rounded-lg py-2 px-3 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Position
            </label>
            <input
              type="number"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              className="w-full bg-dark-200 border border-dark-100 rounded-lg py-2 px-3 text-white"
              required
              min="1"
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
              Bonus Points
            </label>
            <input
              type="number"
              value={formData.bonusPoints}
              onChange={(e) => setFormData({ ...formData, bonusPoints: e.target.value })}
              className="w-full bg-dark-200 border border-dark-100 rounded-lg py-2 px-3 text-white"
              required
              min="0"
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
              {selectedPoint ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
};

export default PointManagement;