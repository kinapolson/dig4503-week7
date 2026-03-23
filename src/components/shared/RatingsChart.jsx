import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler)

export default function RatingsChart({ races }) {
  // Show races oldest → newest (getRaces returns newest first)
  const sorted = [...races].reverse()

  const labels  = sorted.map(r => r.raceName ? r.raceName.replace(' Grand Prix', ' GP') : `Race`)
  const ratings = sorted.map(r => r.rating)

  const data = {
    labels,
    datasets: [
      {
        label: 'Rating',
        data: ratings,
        borderColor: '#e50000',
        backgroundColor: 'rgba(229, 0, 0, 0.1)',
        pointBackgroundColor: '#e50000',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
        fill: true,
        tension: 0.35,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: ctx => ` ${ctx.parsed.y} / 5 stars`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#aaa',
          maxRotation: 45,
          font: { size: 11 },
        },
        grid: { color: '#2a2a2a' },
      },
      y: {
        min: 0,
        max: 5,
        ticks: {
          color: '#aaa',
          stepSize: 1,
          callback: val => `${val}★`,
        },
        grid: { color: '#2a2a2a' },
      },
    },
  }

  return <Line data={data} options={options} />
}
