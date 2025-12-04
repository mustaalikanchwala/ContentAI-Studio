const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
const API_BASE_KEY = import.meta.env.VITE_API_BASE_KEY ;

export const processContent = async (content, operation, targetLanguage = '', tone = 'professional') => {
  try {
    const endpoint = `${API_BASE_URL}/process`;
    
    const requestBody = {
      content: content,
      operation: operation,
      tone: tone,
      targetLanguage: targetLanguage || null
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data)
    return data.result || data;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};
