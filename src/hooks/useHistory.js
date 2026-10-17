import { useState } from 'react'

const KEY = 'smart-health-history'
const read = () => { try { return JSON.parse(localStorage.getItem(KEY)) || [] } catch { return [] } }

// Saves each generated report locally so the trend chart can compare readings over time
export default function useHistory() {
  const [history, setHistory] = useState(read)
  const save = (next) => { setHistory(next); try { localStorage.setItem(KEY, JSON.stringify(next)) } catch { /* storage unavailable */ } }
  return { history, add: (entry) => save([...history, entry].slice(-30)), clear: () => save([]) }
}
