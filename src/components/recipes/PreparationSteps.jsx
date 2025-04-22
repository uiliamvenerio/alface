import React from 'react';
import { Button } from '../ui/Button';

export function PreparationSteps({ steps = [], onChange }) {
  const handleAddStep = () => {
    onChange([...steps, '']);
  };

  const handleRemoveStep = (index) => {
    onChange(steps.filter((_, i) => i !== index));
  };

  const handleUpdateStep = (index, value) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    onChange(newSteps);
  };

  const handleMoveStep = (index, direction) => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === steps.length - 1)
    ) {
      return;
    }

    const newSteps = [...steps];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    [newSteps[index], newSteps[newIndex]] = [newSteps[newIndex], newSteps[index]];
    onChange(newSteps);
  };

  return (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <div key={index} className="flex gap-4">
          <div className="flex-none pt-2">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary bg-opacity-10 text-primary">
              {index + 1}
            </span>
          </div>
          <div className="flex-1">
            <textarea
              value={step}
              onChange={(e) => handleUpdateStep(index, e.target.value)}
              rows={2}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary"
              placeholder={`Passo ${index + 1}`}
            />
          </div>
          <div className="flex flex-none gap-2">
            <button
              type="button"
              onClick={() => handleMoveStep(index, 'up')}
              disabled={index === 0}
              className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 disabled:opacity-50"
            >
              ↑
            </button>
            <button
              type="button"
              onClick={() => handleMoveStep(index, 'down')}
              disabled={index === steps.length - 1}
              className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 disabled:opacity-50"
            >
              ↓
            </button>
            <button
              type="button"
              onClick={() => handleRemoveStep(index)}
              className="p-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
            >
              ×
            </button>
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="secondary"
        onClick={handleAddStep}
        className="w-full"
      >
        Adicionar Passo
      </Button>
    </div>
  );
}