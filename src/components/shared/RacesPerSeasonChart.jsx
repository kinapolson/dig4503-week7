import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function RacesPerSeasonChart({ races }) {
  // Count races per season, sorted oldest → newest
  const seasonCounts = races.reduce((acc, r) => {
    acc[r.season] = (acc[r.season] || 0) + 1
    return acc
  }, {})

  const labels  = Object.keys(seasonCounts).sort()
  const counts  = labels.map(s => seasonCounts[s])

  const data = {
    labels,
    datasets: [
      {
        label: 'Races Logged',
        data: counts,
        backgroundColor: '#e50000cc',
        borderColor: '#e50000',
        borderWidth: 2,
        borderRadius: 4,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: ctx => ` ${ctx.parsed.y} race${ctx.parsed.y !== 1 ? 's' : ''}`,
        },
      },
    },
    scales: {
      x: {
        ticks: { color: '#aaa' },
        grid:  { color: '#2a2a2a' },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: '#aaa',
          stepSize: 1,
          precision: 0,
        },
        grid: { color: '#2a2a2a' },
      },
    },
  }

  return <Bar data={data} options={options} />
}
