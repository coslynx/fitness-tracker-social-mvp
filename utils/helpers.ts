import { format } from 'date-fns';

export const formatDate = (date: Date) => {
  return format(date, 'MMMM do, yyyy');
};

export const formatTime = (date: Date) => {
  return format(date, 'h:mm a');
};

export const calculateCaloriesBurned = (
  duration: number,
  activityType: string,
  weight: number
) => {
  // Example calculation, adjust based on activity type and intensity
  const MET = {
    walking: 3.5,
    running: 8,
    swimming: 7,
    cycling: 5,
    yoga: 2.5,
  };

  const caloriesPerMinute =
    (MET[activityType] || 3.5) * weight * 0.0175;

  return Math.round(caloriesPerMinute * duration);
};

export const generateRandomId = () => {
  return Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
};

export const generateUniqueFileName = (originalFilename: string) => {
  const extension = originalFilename.split('.').pop() || '';
  const timestamp = Date.now().toString();
  return `${timestamp}-${generateRandomId()}.${extension}`;
};