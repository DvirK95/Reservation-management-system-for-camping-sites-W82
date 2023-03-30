// import React from 'react';
import axios from 'axios'

async function TestApi(){
  const getRes = await axios.get(
    "https://lee-cohen.checkfront.com/api/3.0/category/",
    {
      headers: {
        Authorization:
          "Basic NGQzNmNkOWUzZmI4ZjNhZjgyMjY1NDYwMmM1MGIxMmM4MjE0Yjk3Mjo3NTczYjZhMDU1MGMzOGFlZTVjOWZlMDFmY2QxMWE4MzMwYTQyYWIyZmZlMDcwMDdiMTU1MzFhMGFjMjhkMWVh",
        "content-type": "text/json",
        
      },
    }
  );

  return getRes
}


export default TestApi;
