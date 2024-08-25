import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { goalSchema, workoutSchema } from '@/utils/validation';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = req.session;

  if (req.method === 'POST') {
    if (req.body.type === 'goal') {
      const { name, target, deadline } = req.body;

      try {
        const goal = goalSchema.parse({ name, target, deadline });

        const newGoal = await prisma.goal.create({
          data: {
            name: goal.name,
            target: goal.target,
            deadline: new Date(goal.deadline),
            userId: session.user.id,
          },
        });

        res.status(200).json(newGoal);
      } catch (error) {
        console.error('Error saving goal:', error);
        res.status(500).json({ error: 'Failed to save goal' });
      }
    } else if (req.body.type === 'workout') {
      const { date, type, duration, caloriesBurned } = req.body;

      try {
        const workout = workoutSchema.parse({
          date,
          type,
          duration,
          caloriesBurned,
        });

        const newWorkout = await prisma.workout.create({
          data: {
            date: new Date(workout.date),
            type: workout.type,
            duration: workout.duration,
            caloriesBurned: workout.caloriesBurned,
            userId: session.user.id,
          },
        });

        res.status(200).json(newWorkout);
      } catch (error) {
        console.error('Error saving workout:', error);
        res.status(500).json({ error: 'Failed to save workout' });
      }
    } else {
      res.status(400).json({ error: 'Invalid request type' });
    }
  } else if (req.method === 'GET') {
    if (req.body.type === 'goals') {
      try {
        const goals = await prisma.goal.findMany({
          where: {
            userId: session.user.id,
          },
        });

        res.status(200).json(goals);
      } catch (error) {
        console.error('Error fetching goals:', error);
        res.status(500).json({ error: 'Failed to fetch goals' });
      }
    } else if (req.body.type === 'workouts') {
      try {
        const workouts = await prisma.workout.findMany({
          where: {
            userId: session.user.id,
          },
        });

        res.status(200).json(workouts);
      } catch (error) {
        console.error('Error fetching workouts:', error);
        res.status(500).json({ error: 'Failed to fetch workouts' });
      }
    } else {
      res.status(400).json({ error: 'Invalid request type' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}