import { useState } from 'react';
import { ArrowUpDown, Pencil, Trash2, Plus } from 'lucide-react';
import { AdminTableColumn, AdminSearchParams } from '../../types/admin';

interface AdminTableProps {
  columns: AdminTableColumn[];
  data: any[];
  onAdd?: () => void;
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
  onSort?: (params: AdminSearchParams) => void;
}

const AdminTable = ({
  columns,
  data,
  onAdd,
  onEdit,
  onDelete,
  onSort
}: AdminTableProps) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    
    setSortConfig({ key, direction });
    if (onSort) {
      onSort({
        sortBy: key,
        sortOrder: direction
      });
    }
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-dark-100">
      <div className="flex justify-between items-center p-4 bg-dark-200">
        <h3 className="text-lg font-semibold text-white">Data Management</h3>
        {onAdd && (
          <button
            onClick={onAdd}
            className="flex items-center gap-2 px-4 py-2 bg-accent-primary text-white rounded-lg hover:bg-accent-secondary transition-colors"
          >
            <Plus size={20} />
            Add New
          </button>
        )}
      </div>
      
      <table className="w-full">
        <thead>
          <tr className="border-b border-dark-100">
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-4 py-3 text-left text-sm font-medium text-gray-400"
              >
                <div className="flex items-center gap-2">
                  {column.label}
                  {column.sortable && (
                    <button
                      onClick={() => handleSort(column.key)}
                      className="hover:text-white"
                    >
                      <ArrowUpDown size={16} />
                    </button>
                  )}
                </div>
              </th>
            ))}
            <th className="px-4 py-3 text-right text-sm font-medium text-gray-400">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={item.id || index}
              className="border-b border-dark-100 hover:bg-dark-200/50"
            >
              {columns.map((column) => (
                <td key={column.key} className="px-4 py-3 text-sm text-gray-300">
                  {column.render
                    ? column.render(item[column.key], item)
                    : item[column.key]}
                </td>
              ))}
              <td className="px-4 py-3 text-right space-x-2">
                {onEdit && (
                  <button
                    onClick={() => onEdit(item)}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    <Pencil size={16} />
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={() => onDelete(item)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;