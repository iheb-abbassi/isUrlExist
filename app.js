// app.js

// Mock server function for URL existence check
async function checkUrlExistence(url) {
    // Simulate server response delay
    await new Promise((resolve) => setTimeout(resolve, 500));
  
    // Mock server response
    const magicalWord = 'tuta'; // Choose your own magical word
  
    if (url.includes(magicalWord)) {
      if (url.endsWith('.txt')) {
        return { exists: true, type: 'file' };
      } else {
        return { exists: true, type: 'folder' };
      }
    } else {
      // Simulate a 404 error for non-existent links
      return { exists: false, type: '404 error' };
    }
  }
  
  // Throttle function to limit the rate of server requests
  function throttle(func, delay) {
    let lastExecTime = 0;
  
    return function (...args) {
      const currentTime = Date.now();
  
      if (currentTime - lastExecTime > delay) {
        lastExecTime = currentTime;
        func.apply(this, args);
      }
    };
  }
  
  // Entry point for the application
  document.addEventListener('DOMContentLoaded', function () {
    const inputElement = document.getElementById('urlInput');
    const resultElement = document.getElementById('result');
    const checkButton = document.getElementById('checkButton');
  
    // Function to handle URL format check
    const handleUrlFormatCheck = () => {
      const url = inputElement.value;
  
      // Updated URL format validation
      const urlRegex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.){1,3}[a-zA-Z]{1,}(\/[^\s]*)?$/;
      const isValidUrl = urlRegex.test(url);
  
      // Provide feedback to the user while typing
      resultElement.textContent = isValidUrl ? 'URL is valid' : 'Invalid URL format';
  
      // Enable the button only if the URL format is valid
      checkButton.disabled = !isValidUrl;
    };
  
    // Function to handle URL existence check
    const handleUrlExistenceCheck = async () => {
      const url = inputElement.value;
  
      // Mock server call for URL existence check
      try {
        const response = await checkUrlExistence(url);
  
        if (response.exists) {
          resultElement.textContent = `URL exists, type: ${response.type || 'unknown'}`;
        } else {
          resultElement.textContent = 'URL does not exist';
        }
      } catch (error) {
        console.error('Error checking URL existence:', error);
        resultElement.textContent = 'Error checking URL existence';
      }
    };
  
    // Throttle the handleUrlFormatCheck function to avoid frequent validations
    const throttledHandleUrlFormatCheck = throttle(handleUrlFormatCheck, 500);
  
    // Event listener for user input
    inputElement.addEventListener('input', () => {
      throttledHandleUrlFormatCheck();
    });
  
    // Event listener for checkButton click
    checkButton.addEventListener('click', handleUrlExistenceCheck);
  });
  