import { useEffect, useState } from "react";
export default function App() {
    const [status, setStatus] = useState(null)

    useEffect(() => {
        fetch('api/health')
            .then(r => r.json())
            .then(data => setStatus(data))
            .catch(() => setStatus({ ok: false}))
    }, [])

    return (
        <div style={{padding: 24, fontFamily: 'sans-serif'}}>
            <h1>React + Node Starter</h1>
            <pre>{JSON.stringify(status, null, 2)}</pre>

            <UserList />
        </div>
    )
}