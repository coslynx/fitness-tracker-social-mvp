import { useState } from 'react';
import { useStore } from '@/utils/store';

interface GoalInputProps {
  onClose: () => void;
}

const GoalInput: React.FC<GoalInputProps> = ({ onClose }) => {
  const [name, setName] = useState('');
  const [target, setTarget] = useState('');
  const [deadline, setDeadline] = useState('');
  const { addGoal } = useStore();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const newGoal = {
        name,
        target: parseFloat(target),
        deadline: new Date(deadline),
      };

      addGoal(newGoal);
      onClose();
    } catch (error) {
      console.error('Error adding goal:', error);
      // Handle error gracefully (e.g., display error message)
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-md shadow-md p-6 w-96 max-w-md">
        <h2 className="text-xl font-bold mb-4">Set a New Goal</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              Goal Name
            </label>
            <input
              type="text"
              id="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="target" className="block text-gray-700 text-sm font-bold mb-2">
              Target
            </label>
            <input
              type="number"
              id="target"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="deadline" className="block text-gray-700 text-sm font-bold mb-2">
              Deadline
            </label>
            <input
              type="date"
              id="deadline"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded mr-4"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Goal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GoalInput;