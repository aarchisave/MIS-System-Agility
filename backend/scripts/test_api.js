async function test() {
  const baseUrl = 'http://localhost:5000/api';
  
  const endpoints = [
    '/health',
    '/production/analytics',
    '/production/alerts'
  ];

  for (const ep of endpoints) {
    try {
      const res = await fetch(baseUrl + ep);
      const data = await res.json();
      console.log(`Endpoint ${ep}:`, res.status === 200 ? 'SUCCESS' : 'FAILED', data.status);
      if (ep === '/production/alerts') {
        console.log(' - Alerts found:', data.data.system_alerts.length);
        console.log(' - Risks found:', data.data.contamination_risks.length);
      }
    } catch (e) {
      console.log(`Endpoint ${ep}: ERROR - ${e.message}`);
    }
  }

  // Test POST /api/batches/new
  try {
    const res = await fetch(baseUrl + '/batches/new', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        batch_number: 'TEST-BATCH-' + Date.now(),
        fryer_type: 'BATCH_FRYER',
        temperature_c: 180.5,
        oil_ppm: 10.2
      })
    });
    const data = await res.json();
    console.log('Endpoint /batches/new: ', res.status === 201 ? 'SUCCESS' : 'FAILED', data.status);
  } catch (e) {
    console.log('Endpoint /batches/new: ERROR - ' + e.message);
  }
}

test();
