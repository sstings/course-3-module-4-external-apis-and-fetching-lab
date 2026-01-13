document.addEventListener('DOMContentLoaded', () => {
  // Select elements based on test requirements
  const input = document.querySelector('input[placeholder="Enter state abbreviation"]');
  const button = document.querySelector('button'); // Selects the 'Get Weather Alerts' button
  const alertsDisplay = document.getElementById('alerts-display');
  const errorMessage = document.getElementById('error-message');

  // Add event listener to the button
  button.addEventListener('click', async () => {
    const state = input.value.trim();

    // Clear previous alerts from the display
    alertsDisplay.textContent = '';
    
    // Clear and hide the error message
    errorMessage.textContent = '';
    errorMessage.classList.add('hidden');

    // Clear the input field immediately upon click
    input.value = '';

    // --- Fetch Data ---
    try {
      // Construct the URL with the state abbreviation
      const url = `https://api.weather.gov/alerts/active?area=${state}`;
      
      const response = await fetch(url);

      // Check for network errors or bad HTTP responses
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Display Alerts
      // 1. Display the title and count (Format: "Title: Count")
      // The test expects "Weather Alerts: 2" based on the mock data
      const title = data.title;
      const count = data.features.length;
      alertsDisplay.textContent = `${title}: ${count}`;

      // 2. Display the list of headlines
      data.features.forEach(feature => {
        // Create a paragraph for each headline
        const headlineElement = document.createElement('p');
        headlineElement.textContent = feature.properties.headline;
        alertsDisplay.appendChild(headlineElement);
      });

    } catch (error) {
      // Error Handling
      // Display the error message from the caught error object
      errorMessage.textContent = error.message;
      
      // Remove the 'hidden' class to make the error visible
      errorMessage.classList.remove('hidden');
    }
  });
});