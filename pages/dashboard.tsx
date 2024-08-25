import { useSession } from "next-auth/react";
import { useStore } from "@/utils/store";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import GoalInput from "@/components/GoalInput";
import ProgressChart from "@/components/ProgressChart";
import Button from "@/components/Button";
import SocialShareButton from "@/components/SocialShareButton";

interface Goal {
  name: string;
  target: number;
  deadline: Date;
}

interface Workout {
  date: Date;
  type: string;
  duration: number;
  caloriesBurned: number;
}

const DashboardPage = () => {
  const { data: session } = useSession();
  const { user, goals, addGoal, workouts, addWorkout } = useStore();
  const router = useRouter();
  const [showGoalInput, setShowGoalInput] = useState(false);
  const [showWorkoutInput, setShowWorkoutInput] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session, router]);

  const handleAddGoal = () => {
    setShowGoalInput(true);
  };

  const handleCloseGoalInput = () => {
    setShowGoalInput(false);
  };

  const handleAddWorkout = () => {
    setShowWorkoutInput(true);
  };

  const handleCloseWorkoutInput = () => {
    setShowWorkoutInput(false);
  };

  const handleSelectGoal = (goal: Goal) => {
    setSelectedGoal(goal);
  };

  const handleSelectWorkout = (workout: Workout) => {
    setSelectedWorkout(workout);
  };

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleSaveWorkout = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (selectedDate && selectedWorkout) {
        const newWorkout = {
          ...selectedWorkout,
          date: selectedDate,
        };
        await fetch("/api/progress", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newWorkout),
        });
        addWorkout(newWorkout);
        handleCloseWorkoutInput();
      } else {
        // Handle error gracefully (e.g., display error message)
        console.error("Error saving workout: missing data");
      }
    } catch (error) {
      console.error("Error saving workout:", error);
      // Handle error gracefully (e.g., display error message)
    }
  };

  const progressData = {
    labels: workouts.map((workout) => formatDate(workout.date)),
    datasets: [
      {
        label: "Calories Burned",
        data: workouts.map((workout) => workout.caloriesBurned),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="flex justify-between items-center mb-4">
        <Button onClick={handleAddGoal}>Add Goal</Button>
        <Button onClick={handleAddWorkout}>Log Workout</Button>
      </div>

      {showGoalInput && (
        <GoalInput onClose={handleCloseGoalInput} />
      )}

      {showWorkoutInput && (
        <div className="bg-white rounded-md shadow-md p-6 w-96 max-w-md">
          <h2 className="text-xl font-bold mb-4">Log Workout</h2>
          <form onSubmit={handleSaveWorkout}>
            <div className="mb-4">
              <label
                htmlFor="date"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Date
              </label>
              <input
                type="date"
                id="date"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={selectedDate ? formatDate(selectedDate) : ""}
                onChange={(e) =>
                  setSelectedDate(new Date(e.target.value))
                }
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="type"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Type
              </label>
              <input
                type="text"
                id="type"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={selectedWorkout?.type || ""}
                onChange={(e) =>
                  setSelectedWorkout({
                    ...selectedWorkout,
                    type: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="duration"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Duration (minutes)
              </label>
              <input
                type="number"
                id="duration"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={selectedWorkout?.duration || ""}
                onChange={(e) =>
                  setSelectedWorkout({
                    ...selectedWorkout,
                    duration: parseInt(e.target.value, 10),
                  })
                }
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="caloriesBurned"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Calories Burned
              </label>
              <input
                type="number"
                id="caloriesBurned"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={selectedWorkout?.caloriesBurned || ""}
                onChange={(e) =>
                  setSelectedWorkout({
                    ...selectedWorkout,
                    caloriesBurned: parseInt(e.target.value, 10),
                  })
                }
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleCloseWorkoutInput}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded mr-4"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Save Workout
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-md shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Goals</h2>
          <ul>
            {goals.map((goal) => (
              <li
                key={goal.name}
                className="cursor-pointer hover:bg-gray-100 rounded-md p-2 mb-2"
                onClick={() => handleSelectGoal(goal)}
              >
                <span className="font-medium">{goal.name}</span> -{" "}
                <span>{goal.target}</span> by{" "}
                <span>{formatDate(goal.deadline)}</span>
              </li>
            ))}
          </ul>
        </div>

        {selectedGoal && (
          <div className="bg-white rounded-md shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">
              {selectedGoal.name} Progress
            </h2>
            <ProgressChart data={progressData} />
          </div>
        )}

        {selectedWorkout && (
          <div className="bg-white rounded-md shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">
              Workout Details
            </h2>
            <div className="mb-2">
              <p className="font-medium">Date:</p>
              <p>{formatDate(selectedWorkout.date)}</p>
            </div>
            <div className="mb-2">
              <p className="font-medium">Type:</p>
              <p>{selectedWorkout.type}</p>
            </div>
            <div className="mb-2">
              <p className="font-medium">Duration:</p>
              <p>{selectedWorkout.duration} minutes</p>
            </div>
            <div className="mb-2">
              <p className="font-medium">Calories Burned:</p>
              <p>{selectedWorkout.caloriesBurned}</p>
            </div>
            <SocialShareButton
              url={`http://localhost:3000/dashboard?workout=${selectedWorkout.id}`}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;