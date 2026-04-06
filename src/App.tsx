import { useState } from 'react';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://a4ff330804fb34c4d8789d828b7cf732-1838654640.us-east-1.elb.amazonaws.com';

function App() {
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const callApi = async () => {
    setLoading(true);
    setError('');
    setResponse('');
    try {
      const res = await fetch(`${API_URL}/api/hello`);
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
      const text = await res.text();
      setResponse(text);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Demo App</h1>
        <p>React Frontend → Spring Boot Backend</p>
        <button onClick={callApi} disabled={loading}>
          {loading ? 'Calling API...' : 'Call /api/hello'}
        </button>
        {response && <p className="response success">{response}</p>}
        {error && <p className="response error">Error: {error}</p>}
      </header>
    </div>
  );
}

export default App;
