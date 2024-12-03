import { useState, useEffect } from 'react';
import { AdminEvent, AdminTableColumn } from '../../types/admin';
import AdminTable from '../../components/admin/AdminTable';
import { Calendar } from 'lucide-react';

const CalendarManagement = () => {
  const [events, setEvents] = useState<AdminEvent[]>([]);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('events') || '[]');
    setEvents(storedEvents);
  }, []);

  const columns: AdminTableColumn[] = [
    { 
      key: 'date', 
      label: 'Date', 
      sortable: true,
      render: (value) => new Date(value).toLocaleDateString()
    },
    { key: 'name', label: 'Event Name', sortable: true },
    { key: 'circuit', label: 'Circuit', sortable: true },
    { key: 'country', label: 'Country', sortable: true },
    { key: 'category', label: 'Category', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { 
      key: 'participants', 
      label: 'Registration',
      render: (_, row) => `${row.registeredParticipants}/${row.maxParticipants}`
    }
  ];

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Calendar className="text-accent-primary" size={28} />
        <h2 className="text-2xl font-bold">Race Calendar</h2>
      </div>

      <AdminTable
        columns={columns}
        data={events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())}
      />

      <div className="mt-6 glass-card p-4 rounded-lg">
        <p className="text-gray-400">
          Note: To add or modify events, please use the Event Management section.
        </p>
      </div>
    </div>
  );
};

export default CalendarManagement;