
async function checkUrlExistence(url) {
    await new Promise((resolve) => setTimeout(resolve, 500));
  
    const magicalWord = 'tuta'; 
  
    if (url.includes(magicalWord)) {
      if (url.endsWith('.txt')) {
        return { exists: true, type: 'file' };
      } else {
        return { exists: true, type: 'folder' };
      }
    } else {
      return { exists: false, type: '404 error' };
    }
  }
  
  function throttle(func, delay) {
    let lastExecTime = 0;
  
    return function () {
      const currentTime = Date.now();
    
      if (currentTime - lastExecTime > delay) {
        lastExecTime = currentTime;
        func.apply(this, arguments); 
      }
    };
    
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    const inputElement = document.getElementById('urlInput');
    const resultElement = document.getElementById('result');
    const checkButton = document.getElementById('checkButton');
  
    const handleUrlFormatCheck = () => {
      const url = inputElement.value;
  
      const urlRegex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.){1,3}[a-zA-Z]{1,}(\/[^\s]*)?$/;
      const isValidUrl = urlRegex.test(url);
  
      resultElement.textContent = isValidUrl ? 'URL is valid' : 'Invalid URL format';
  
      checkButton.disabled = !isValidUrl;
    };
  
    const handleUrlExistenceCheck = async () => {
      const url = inputElement.value;
  
      try {
        const response = await checkUrlExistence(url);
  
        if (response.exists) {
          resultElement.textContent = `URL exists, type: ${response.type}`;
        } else {
          resultElement.textContent = `URL does not exist: ${response.type}`;
        }
      } catch (error) {
        console.error('Error checking URL existence:', error);
        resultElement.textContent = 'Error checking URL existence';
      }
    };
  
    const throttledHandleUrlFormatCheck = throttle(handleUrlFormatCheck, 500);
    const throttledHandleUrlExistenceCheck = throttle(handleUrlExistenceCheck, 10000);

  
    inputElement.addEventListener('input', () => {
      throttledHandleUrlFormatCheck();
    });
  
    checkButton.addEventListener('click', throttledHandleUrlExistenceCheck);
  });
  