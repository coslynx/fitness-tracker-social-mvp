import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const workout = req.body;

    try {
      const newWorkout = await prisma.workout.create({
        data: {
          date: new Date(workout.date),
          type: workout.type,
          duration: workout.duration,
          caloriesBurned: workout.caloriesBurned,
          userId: 1, // Replace with actual user ID
        },
      });

      res.status(200).json(newWorkout);
    } catch (error) {
      console.error("Error saving workout:", error);
      res.status(500).json({ error: "Failed to save workout" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}