document.getElementById('schedulerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const onTime = document.getElementById('onTime').value;
    const offTime = document.getElementById('offTime').value;
    const statusDiv = document.getElementById('status');

    try {
        const ws = new WebSocket('ws://localhost:8765');
        
        ws.onopen = () => {
            ws.send(JSON.stringify({ onTime, offTime }));
        };

        ws.onmessage = (event) => {
            const response = JSON.parse(event.data);
            statusDiv.textContent = response.message;
            statusDiv.className = response.success ? 'status-success' : 'status-error';
            ws.close();
        };

        ws.onerror = () => {
            statusDiv.textContent = 'Connection error. Please try again.';
            statusDiv.className = 'status-error';
        };
    } catch (error) {
        statusDiv.textContent = 'Error: ' + error.message;
        statusDiv.className = 'status-error';
    }
});
