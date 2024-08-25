import { z } from "zod";

export const goalSchema = z.object({
  name: z.string().min(1).max(50),
  target: z.number().positive(),
  deadline: z.date(),
});

export const workoutSchema = z.object({
  date: z.date(),
  type: z.string().min(1).max(50),
  duration: z.number().positive(),
  caloriesBurned: z.number().positive(),
});

export const validateGoal = (goal: any): z.infer<typeof goalSchema> => {
  return goalSchema.parse(goal);
};

export const validateWorkout = (workout: any): z.infer<typeof workoutSchema> => {
  return workoutSchema.parse(workout);
};