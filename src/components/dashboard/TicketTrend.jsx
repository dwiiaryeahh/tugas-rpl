import { useState } from 'react'

const values = [34, 47, 39, 62, 51, 72, 57, 66, 49, 77, 61, 86, 68, 74, 55, 80, 63, 94, 73, 83, 67, 91, 72, 84, 62, 89, 72, 95]

export function TicketTrend() {
  const [range, setRange] = useState('7 hari terakhir')
  return <section className="panel trend-panel"><div className="panel-heading"><div><h2>Tren tiket</h2><p>Perbandingan tiket masuk dan terselesaikan</p></div><label className="sr-only" htmlFor="trend-range">Rentang waktu</label><select id="trend-range" className="select-control trend-range" value={range} onChange={(event) => setRange(event.target.value)}><option>7 hari terakhir</option><option>30 hari terakhir</option><option>90 hari terakhir</option></select></div><div className="chart-legend"><span><i className="legend-dot legend-created" />Dibuat <strong>126</strong></span><span><i className="legend-dot legend-resolved" />Selesai <strong>98</strong></span></div><div className="chart-area"><div className="chart-y"><span>40</span><span>30</span><span>20</span><span>10</span><span>0</span></div><div className="chart"><div className="chart-grid"><i /><i /><i /><i /><i /></div><div className="bars">{values.map((value, index) => <div className="bar-group" key={index}><i className="bar-created" style={{ height: `${value}%` }} /><i className="bar-resolved" style={{ height: `${Math.max(22, value * (index % 3 === 0 ? .58 : .73))}%` }} /></div>)}</div></div></div><div className="chart-x"><span>29 Sep</span><span>1 Okt</span><span>3 Okt</span><span>5 Okt</span></div></section>
}
