import { useState, useEffect } from 'react';
import { AdminCategory, AdminTableColumn } from '../../types/admin';
import AdminTable from '../../components/admin/AdminTable';
import AdminModal from '../../components/admin/AdminModal';

const CategoryManagement = () => {
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<AdminCategory | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    minAge: '',
    maxAge: ''
  });

  useEffect(() => {
    const storedCategories = JSON.parse(localStorage.getItem('categories') || '[]');
    setCategories(storedCategories.map((category: any) => ({
      ...category,
      id: category.id || Math.random().toString(36).substr(2, 9),
      createdAt: category.createdAt || new Date().toISOString()
    })));
  }, []);

  const columns: AdminTableColumn[] = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'description', label: 'Description', sortable: true },
    { 
      key: 'ageRange', 
      label: 'Age Range',
      render: (_, row) => {
        if (row.minAge && row.maxAge) {
          return `${row.minAge} - ${row.maxAge} years`;
        } else if (row.minAge) {
          return `${row.minAge}+ years`;
        } else if (row.maxAge) {
          return `Up to ${row.maxAge} years`;
        }
        return 'No age limit';
      }
    },
    { 
      key: 'createdAt', 
      label: 'Created At', 
      sortable: true,
      render: (value) => new Date(value).toLocaleDateString()
    }
  ];

  const handleAdd = () => {
    setSelectedCategory(null);
    setFormData({
      name: '',
      description: '',
      minAge: '',
      maxAge: ''
    });
    setIsModalOpen(true);
  };

  const handleEdit = (category: AdminCategory) => {
    setSelectedCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      minAge: category.minAge?.toString() || '',
      maxAge: category.maxAge?.toString() || ''
    });
    setIsModalOpen(true);
  };

  const handleDelete = (category: AdminCategory) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      const newCategories = categories.filter(c => c.id !== category.id);
      setCategories(newCategories);
      localStorage.setItem('categories', JSON.stringify(newCategories));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const categoryData = {
      ...formData,
      minAge: formData.minAge ? parseInt(formData.minAge) : undefined,
      maxAge: formData.maxAge ? parseInt(formData.maxAge) : undefined
    };

    if (selectedCategory) {
      const updatedCategories = categories.map(category => 
        category.id === selectedCategory.id 
          ? { 
              ...category, 
              ...categoryData,
              updatedAt: new Date().toISOString() 
            }
          : category
      );
      setCategories(updatedCategories);
      localStorage.setItem('categories', JSON.stringify(updatedCategories));
    } else {
      const newCategory = {
        id: Math.random().toString(36).substr(2, 9),
        ...categoryData,
        createdAt: new Date().toISOString()
      };
      const updatedCategories = [...categories, newCategory];
      setCategories(updatedCategories);
      localStorage.setItem('categories', JSON.stringify(updatedCategories));
    }
    
    setIsModalOpen(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Category Management</h2>
      
      <AdminTable
        columns={columns}
        data={categories}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedCategory ? 'Edit Category' : 'Add New Category'}
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
              placeholder="e.g., Junior A, Senior Elite"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-dark-200 border border-dark-100 rounded-lg py-2 px-3 text-white"
              required
              rows={3}
              placeholder="Category description and requirements"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Minimum Age
              </label>
              <input
                type="number"
                value={formData.minAge}
                onChange={(e) => setFormData({ ...formData, minAge: e.target.value })}
                className="w-full bg-dark-200 border border-dark-100 rounded-lg py-2 px-3 text-white"
                min="0"
                placeholder="Optional"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Maximum Age
              </label>
              <input
                type="number"
                value={formData.maxAge}
                onChange={(e) => setFormData({ ...formData, maxAge: e.target.value })}
                className="w-full bg-dark-200 border border-dark-100 rounded-lg py-2 px-3 text-white"
                min="0"
                placeholder="Optional"
              />
            </div>
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
              {selectedCategory ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
};

export default CategoryManagement;