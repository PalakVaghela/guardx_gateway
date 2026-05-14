import { useEffect, useState } from 'react'
import './App.css'
import { getOverview, getRPS, getIps } from './services/api'
import { LineChart, XAxis, Line, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts'

function App () {
  const [matrics, setMetrics] = useState({ total: 0, blocked: 0 })
  const [rps, setRps] = useState([])
  const [topIps, setTopIps] = useState([])

  useEffect(() => {
    // By putting it inside, you are telling React: "This function is only for this specific effect."
    async function fetchData () {
      const data = await getOverview()
      setMetrics(data)

      const rps = await getRPS()
      setRps(rps)

      const ips = await getIps()
      const formatted = []
      // ips will get like this below type, firest ip then req in list form, so will will take each 0th ip, while 1st is reqs., so that we just through +2
      // [
      //   "::ffff:127.0.0.1",
      //   "15"
      // ]
      for (let i = 0; i < ips.length; i += 2) {
        formatted.push({
          ip: ips[i],
          requests: ips[i + 1]
        })
      }

      setTopIps(formatted)
    }

    fetchData()

    // This will call the fun in every 2sec and make the dashboard live.
    const interval = setInterval(fetchData, 2000)
    return () => clearInterval(interval)
  }, [])

  const total = matrics.total || 0;
  const blocked = matrics.blocked || 0;

  // Calculate percentage: ((Total - Blocked) / Total) * 100
  const successRate = total > 0
    ? (((total - blocked) / total) * 100).toFixed(1)
    : "100.0";

  return (
    <div className="dashboard-wrapper">
      <header>
        <div className="header-title">
          <h1 style={{ margin: 0 }}>Gateway Monitor</h1>
          <p style={{ color: 'var(--text-muted)', margin: '4px 0 0 0' }}>API Traffic Control Center</p>
        </div>
        <div className="refresh-tag">
          <span className="dot">●</span> LIVE FEED
        </div>
      </header>

      {/* Metric Cards */}
      <div className="card-container">
        <div className="metric-card">
          <p>Total Requests</p>
          <h2>{matrics.total.toLocaleString()}</h2>
        </div>

        <div className="metric-card">
          <p>Blocked Requests</p>
          <h2 style={{ color: 'var(--danger)' }}>{matrics.blocked.toLocaleString()}</h2>
        </div>

        <div className="metric-card">
          <p>System Health</p>
          <h2 style={{ color: successRate > 95 ? 'var(--success)' : 'orange' }}>
            {successRate}%
          </h2>
        </div>
      </div>

      {/* Chart Section */}
      <div className="chart-section">
        <h3 style={{ marginTop: 0, marginBottom: '1.5rem' }}>Traffic Flow (RPS)</h3>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={rps}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis
                dataKey="second"
                stroke="#b5c2d8"
                fontSize={15}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#b5c2d8"
                fontSize={15}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                itemStyle={{ color: '#6366f1' }}
              />
              <Line
                type="monotone"
                dataKey="requests"
                stroke="#6366f1"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* IP Table Section */}
      <div className="table-section">
        <h3 style={{ marginBottom: '1rem' }}>Top Traffic Sources</h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>SOURCE IP ADDRESS</th>
                <th>REQUEST COUNT</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {topIps.map((item, index) => (
                <tr key={index}>
                  <td>{item.ip.replace('::ffff:', '')}</td>
                  <td>{item.requests.toLocaleString()}</td>
                  <td>
                    <span style={{
                      fontSize: '0.7rem',
                      padding: '2px 8px',
                      borderRadius: '10px',
                      background: '#10b98122',
                      color: 'var(--success)'
                    }}>
                      ACTIVE
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default App
