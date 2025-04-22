import React, { useState } from 'react';
import { Menu } from '@headlessui/react';
import { useRecipeExport } from '../../hooks/useRecipeExport';
import { Button } from '../ui/Button';
import clsx from 'clsx';

export function RecipeExport({ recipe }) {
  const [isExporting, setIsExporting] = useState(false);
  const { exportToPDF, exportToExcel } = useRecipeExport(recipe);

  const handleExport = async (format) => {
    setIsExporting(true);
    try {
      if (format === 'pdf') {
        await exportToPDF();
      } else if (format === 'excel') {
        await exportToExcel();
      }
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Menu as="div" className="relative">
      <Menu.Button
        as={Button}
        variant="secondary"
        disabled={isExporting}
      >
        {isExporting ? 'Exportando...' : 'Exportar'}
      </Menu.Button>

      <Menu.Items className="absolute right-0 mt-1 w-48 bg-white dark:bg-dark-card rounded-lg shadow-lg border border-gray-100 dark:border-gray-800 focus:outline-none">
        <div className="p-1">
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() => handleExport('pdf')}
                className={clsx(
                  'flex items-center gap-2 w-full px-3 py-2 text-sm rounded-md',
                  active ? 'bg-gray-50 dark:bg-dark-hover' : ''
                )}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M224,152a8,8,0,0,1-8,8h-8v56a8,8,0,0,1-8,8H56a8,8,0,0,1-8-8V160H40a8,8,0,0,1,0-16h72V96H96a8,8,0,0,1-5.66-13.66l32-32a8,8,0,0,1,11.32,0l32,32A8,8,0,0,1,160,96H144v48h72A8,8,0,0,1,224,152Z" />
                </svg>
                Exportar PDF
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() => handleExport('excel')}
                className={clsx(
                  'flex items-center gap-2 w-full px-3 py-2 text-sm rounded-md',
                  active ? 'bg-gray-50 dark:bg-dark-hover' : ''
                )}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M224,48H32A16,16,0,0,0,16,64V192a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V64A16,16,0,0,0,224,48ZM32,64H92V192H32ZM224,192H108V64H224Z" />
                </svg>
                Exportar Excel
              </button>
            )}
          </Menu.Item>
        </div>
      </Menu.Items>
    </Menu>
  );
}