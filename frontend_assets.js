<script>
	console.log("frontend_assets.js loaded");

document.getElementById('deviceForm').addEventListener('submit', async function (e) {
  e.preventDefault(); // Prevent page reload

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

  console.log("Form data collected:", data);

  try {
    const response = await fetch('http://echo.netsh.us:3000/insert-device', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    console.log("Server response:", result);

    if (result.success) {
      alert("Device uploaded successfully!");
    } else {
      alert("Upload failed: " + result.error);
    }
  } catch (error) {
    console.error("Upload error:", error);
    alert("An error occurred while uploading. Check console for details.");
  }
});
</script>