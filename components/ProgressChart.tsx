import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LineController, LineElement, PointElement, LinearScale, Title } from "chart.js";

ChartJS.register(CategoryScale, LineController, LineElement, PointElement, LinearScale, Title);

interface ProgressChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
    }[];
  };
}

const ProgressChart: React.FC<ProgressChartProps> = ({ data }) => {
  const [chartData, setChartData] = useState(data);

  useEffect(() => {
    setChartData(data);
  }, [data]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Progress Chart",
      },
    },
  };

  return (
    <div className="w-full h-64 mt-4">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default ProgressChart;