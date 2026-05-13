

import { useEffect, useState } from 'react'
import './App.css'
import { getOverview , getRPS, getIps} from './services/api'
import {LineChart, XAxis, Line, YAxis, Tooltip, CartesianGrid} from 'recharts';

function App() {

  const [matrics, setMetrics] = useState({total:0, blocked:0});
  const [rps, setRps] = useState([]);
  const [topIps, setTopIps] = useState([]);

  useEffect(() => {

    // By putting it inside, you are telling React: "This function is only for this specific effect."
    async function fetchData() {
      const data = await getOverview();
      setMetrics(data);

      const rps = await getRPS();
      setRps(rps);

      const ips = await getIps();
      const formatted = [];
      // ips will get like this below type, firest ip then req in list form, so will will take each 0th ip, while 1st is reqs., so that we just through +2
      // [
      //   "::ffff:127.0.0.1",
      //   "15"
      // ]
      for(let i = 0; i < ips.length; i += 2) {
        formatted.push({
          ip: ips[i],
          requests: ips[i + 1]
        });
      };

      setTopIps(formatted);

    }

    fetchData();

    // This will call the fun in every 2sec and make the dashboard live.
    const interval = setInterval(fetchData, 2000);
    return() => clearInterval(interval)
  }, []);

  return(
    <div>
      <h1>Hello this is dashboard</h1>
      <div>
        <h2>Total Request:</h2>
        <p>{matrics.total}</p>
      </div>

      <div>
        <h2>Total Blocked:</h2>
        <p>{matrics.blocked}</p>
      </div>

      <h2>Live request per second:</h2>
      <LineChart width={700} height={300} data={rps}>
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="second"/>
        <YAxis/>
        <Tooltip/>
        <Line type="monotone" dataKey="requests" stroke="#8884d8"/>
      </LineChart>

      <h2>Top IPs</h2>
      <table border="1">

        <thead>
          <tr>
            <th>IP</th>
            <th>Requests</th>
          </tr>
        </thead>

        <tbody>

          {topIps.map((item, index) => (

            <tr key={index}>

              <td>{item.ip}</td>

              <td>{item.requests}</td>

            </tr>

          ))}

        </tbody>

      </table>
          </div>
        )
}

export default App
