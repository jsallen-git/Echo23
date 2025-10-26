<script>
document.getElementById('deviceForm').addEventListener('submit', async function(e) {
  e.preventDefault(); // prevent page reload

  const data = {
    make: document.getElementById('field1').value,
    model: document.getElementById('field2').value,
    hostname: document.getElementById('field3').value,
    serialNumber: document.getElementById('field4').value,
    purchaseDate: document.getElementById('field5').value,
    cost: document.getElementById('field6').value,
    department: document.getElementById('field7').value,
    status: document.getElementById('field8').value,
    location: document.getElementById('field9').value
  };

  const response = await fetch('http://localhost:3000/insert-device', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  const result = await response.json();
	console.log("Form data:", data);
	console.log(result);
});
</script>