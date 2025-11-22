const testContactForm = async () => {
  const backendUrl = 'https://auction-backend-lv5a.onrender.com';
  
  console.log('Testing contact form endpoint...');
  console.log('URL:', `${backendUrl}/api/v1/contact/submit`);
  
  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    subject: 'Test Subject',
    message: 'This is a test message from automated test'
  };
  
  try {
    console.log('\nSending request with data:', testData);
    
    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
    
    const response = await fetch(`${backendUrl}/api/v1/contact/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testData),
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    let responseData;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      responseData = await response.json();
    } else {
      responseData = await response.text();
    }
    
    console.log('\n✅ Response Received!');
    console.log('Status Code:', response.status);
    console.log('Status Text:', response.statusText);
    console.log('Response:', JSON.stringify(responseData, null, 2));
    
    if (response.ok) {
      console.log('\n✅ SUCCESS - Contact form submitted successfully!');
    } else {
      console.log('\n⚠️  Warning: Response status is not OK');
      console.log('This might indicate an error on the server side.');
    }
  } catch (error) {
    console.log('\n❌ ERROR!');
    if (error.name === 'AbortError') {
      console.log('Request timed out after 30 seconds');
      console.log('This might mean the backend is slow or not responding');
    } else {
      console.log('Error Message:', error.message);
      console.log('Error Type:', error.name);
    }
    console.log('Full Error:', error);
  }
  
  console.log('\nTest completed.');
};

testContactForm();

