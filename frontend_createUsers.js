console.log("frontend_createUsers.js loaded");

document.getElementById('form-user').addEventListener('submit', async function (e) {
  e.preventDefault(); // Prevent page reload

  const data = {
    fullName: document.getElementById('field1').value,
    userName: document.getElementById('field2').value,
    email: document.getElementById('field3').value,
    password: document.getElementById('field4').value,
    phoneNumber: document.getElementById('field5').value,
    creationDate: document.getElementById('field6').value,
  };

  console.log("Form data collected:", data);

  try {
    const response = await fetch('http://echo.netsh.us:3000/insert-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    console.log("Server response:", result);

    if (result.success) {
      alert("User created successfully!");
    } else {
      alert("Creation failed: " + result.error);
    }
  } catch (error) {
    console.error("Creation error:", error);
    alert("An error occurred while creating user. Check console for details.");
  }
});