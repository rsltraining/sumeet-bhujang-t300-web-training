// api.js - This file contains an asynchronous function that fetches data from an API.

// fetch() is a global in Node.js 18+ (native Fetch API) — no import needed
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}

export default fetchData;
