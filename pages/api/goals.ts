import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const goal = req.body;

    try {
      const newGoal = await prisma.goal.create({
        data: {
          name: goal.name,
          target: goal.target,
          deadline: new Date(goal.deadline),
          userId: 1, // Replace with actual user ID
        },
      });

      res.status(200).json(newGoal);
    } catch (error) {
      console.error('Error saving goal:', error);
      res.status(500).json({ error: 'Failed to save goal' });
    }
  } else if (req.method === 'GET') {
    try {
      const goals = await prisma.goal.findMany({
        where: {
          userId: 1, // Replace with actual user ID
        },
      });

      res.status(200).json(goals);
    } catch (error) {
      console.error('Error fetching goals:', error);
      res.status(500).json({ error: 'Failed to fetch goals' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}