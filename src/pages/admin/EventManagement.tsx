import { useState, useEffect } from 'react';
import { AdminEvent, AdminTableColumn } from '../../types/admin';
import AdminTable from '../../components/admin/AdminTable';
import AdminModal from '../../components/admin/AdminModal';

const EventManagement = () => {
  const [events, setEvents] = useState<AdminEvent[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<AdminEvent | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    circuit: '',
    date: '',
    country: '',
    category: '',
    status: 'upcoming',
    maxParticipants: '50',
    registeredParticipants: '0',
    points: '25'
  });

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('events') || '[]');
    setEvents(storedEvents.map((event: any) => ({
      ...event,
      id: event.id || Math.random().toString(36).substr(2, 9),
      createdAt: event.createdAt || new Date().toISOString(),
      updatedAt: event.updatedAt || new Date().toISOString()
    })));
  }, []);

  const columns: AdminTableColumn[] = [
    { key: 'name', label: 'Event Name', sortable: true },
    { key: 'circuit', label: 'Circuit', sortable: true },
    { 
      key: 'date', 
      label: 'Date', 
      sortable: true,
      render: (value) => new Date(value).toLocaleDateString()
    },
    { key: 'country', label: 'Country', sortable: true },
    { key: 'category', label: 'Category', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { 
      key: 'participants', 
      label: 'Participants',
      render: (_, row) => `${row.registeredParticipants}/${row.maxParticipants}`
    },
    { key: 'points', label: 'Points', sortable: true }
  ];

  const handleAdd = () => {
    setSelectedEvent(null);
    setFormData({
      name: '',
      circuit: '',
      date: '',
      country: '',
      category: '',
      status: 'upcoming',
      maxParticipants: '50',
      registeredParticipants: '0',
      points: '25'
    });
    setIsModalOpen(true);
  };

  const handleEdit = (event: AdminEvent) => {
    setSelectedEvent(event);
    setFormData({
      name: event.name,
      circuit: event.circuit,
      date: event.date,
      country: event.country,
      category: event.category,
      status: event.status,
      maxParticipants: event.maxParticipants.toString(),
      registeredParticipants: event.registeredParticipants.toString(),
      points: event.points.toString()
    });
    setIsModalOpen(true);
  };

  const handleDelete = (event: AdminEvent) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      const newEvents = events.filter(e => e.id !== event.id);
      setEvents(newEvents);
      localStorage.setItem('events', JSON.stringify(newEvents));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const eventData = {
      ...formData,
      maxParticipants: parseInt(formData.maxParticipants),
      registeredParticipants: parseInt(formData.registeredParticipants),
      points: parseInt(formData.points)
    };

    if (selectedEvent) {
      const updatedEvents = events.map(event => 
        event.id === selectedEvent.id 
          ? { 
              ...event, 
              ...eventData,
              updatedAt: new Date().toISOString() 
            }
          : event
      );
      setEvents(updatedEvents);
      localStorage.setItem('events', JSON.stringify(updatedEvents));
    } else {
      const newEvent = {
        id: Math.random().toString(36).substr(2, 9),
        ...eventData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      const updatedEvents = [...events, newEvent];
      setEvents(updatedEvents);
      localStorage.setItem('events', JSON.stringify(updatedEvents));
    }
    
    setIsModalOpen(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Event Management</h2>
      
      <AdminTable
        columns={columns}
        data={events}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedEvent ? 'Edit Event' : 'Add New Event'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Event Name
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
              Circuit
            </label>
            <input
              type="text"
              value={formData.circuit}
              onChange={(e) => setFormData({ ...formData, circuit: e.target.value })}
              className="w-full bg-dark-200 border border-dark-100 rounded-lg py-2 px-3 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Date
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full bg-dark-200 border border-dark-100 rounded-lg py-2 px-3 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Country
            </label>
            <input
              type="text"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
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
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as 'upcoming' | 'ongoing' | 'completed' })}
              className="w-full bg-dark-200 border border-dark-100 rounded-lg py-2 px-3 text-white"
            >
              <option value="upcoming">Upcoming</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Max Participants
              </label>
              <input
                type="number"
                value={formData.maxParticipants}
                onChange={(e) => setFormData({ ...formData, maxParticipants: e.target.value })}
                className="w-full bg-dark-200 border border-dark-100 rounded-lg py-2 px-3 text-white"
                required
                min="1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Registered
              </label>
              <input
                type="number"
                value={formData.registeredParticipants}
                onChange={(e) => setFormData({ ...formData, registeredParticipants: e.target.value })}
                className="w-full bg-dark-200 border border-dark-100 rounded-lg py-2 px-3 text-white"
                required
                min="0"
              />
            </div>
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
              {selectedEvent ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
};

export default EventManagement;