import React, { useEffect, useState } from 'react'

const API = 'http://localhost:8000'

function Stat({label, value, tone}) {
  return <div className="stat"><span>{label}</span><strong className={tone}>{value}</strong></div>
}

export default function App() {
  const [stats, setStats] = useState(null)
  const [file, setFile] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch(`${API}/api/dashboard`).then(r => r.json()).then(setStats).catch(() => {})
  }, [])

  async function analyze() {
    if (!file) return
    setLoading(true)
    const body = new FormData()
    body.append('file', file)
    try {
      const r = await fetch(`${API}/api/analyze/pcap`, {method:'POST', body})
      setResult(await r.json())
    } finally { setLoading(false) }
  }

  return <div className="shell">
    <aside>
      <div className="brand"><div className="logo">C</div><div><b>CyberLens</b><small>SOC Investigation</small></div></div>
      {['Overview','Incidents','PCAP Analyzer','Log Explorer','IOCs','Timeline','Reports'].map((x,i)=>
        <div className={`nav ${i===0?'active':''}`} key={x}>{x}</div>)}
      <div className="sidebar-bottom">DEFENSIVE MODE<br/><small>Authorized analysis only</small></div>
    </aside>

    <main>
      <header><div><p className="eyebrow">SECURITY OPERATIONS CENTER</p><h1>Investigation Overview</h1></div><div className="status">● SYSTEM ONLINE</div></header>

      <section className="stats">
        <Stat label="OPEN INCIDENTS" value={stats?.open_incidents ?? '—'} tone="red"/>
        <Stat label="CRITICAL ALERTS" value={stats?.critical_alerts ?? '—'} tone="orange"/>
        <Stat label="SUSPICIOUS IOCs" value={stats?.suspicious_iocs ?? '—'} tone="yellow"/>
        <Stat label="CASES TODAY" value={stats?.cases_today ?? '—'} tone="green"/>
      </section>

      <section className="grid">
        <div className="panel hero">
          <div><p className="eyebrow">AI INVESTIGATION ENGINE</p><h2>Turn security evidence into an investigation.</h2>
          <p>Upload an authorized PCAP and CyberLens extracts protocols, endpoints and investigation indicators for analyst review.</p></div>
          <div className="upload">
            <input type="file" accept=".pcap,.pcapng,.cap" onChange={e=>setFile(e.target.files[0])}/>
            <button onClick={analyze} disabled={!file || loading}>{loading ? 'Analyzing…' : 'Analyze PCAP'}</button>
          </div>
        </div>

        <div className="panel">
          <div className="panel-head"><h3>Active Investigations</h3><span>LIVE</span></div>
          {[
            ['INC-0241','Suspicious outbound traffic','CRITICAL'],
            ['INC-0238','Repeated authentication failures','HIGH'],
            ['INC-0235','Unusual DNS activity','MEDIUM']
          ].map(x=><div className="incident" key={x[0]}><div><b>{x[0]}</b><p>{x[1]}</p></div><label className={x[2].toLowerCase()}>{x[2]}</label></div>)}
        </div>
      </section>

      {result && <section className="panel result">
        <div className="panel-head"><h3>PCAP Analysis Result</h3><span>{result.packet_count} PACKETS</span></div>
        <div className="result-grid"><div><b>Protocols</b><pre>{JSON.stringify(result.protocols,null,2)}</pre></div>
        <div><b>Top Source IPs</b><pre>{JSON.stringify(result.top_source_ips,null,2)}</pre></div>
        <div><b>Findings</b><pre>{JSON.stringify(result.findings,null,2)}</pre></div></div>
      </section>}

      <footer>CyberLens • AI-assisted defensive investigation platform • Evidence first, conclusions second.</footer>
    </main>
  </div>
}
