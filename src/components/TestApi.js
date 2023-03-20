import React from "react";

const axios = require("axios");

const bookingRes = axios.get(
    "https://lee-cohen.checkfront.com/api/3.0/booking",
    {
      headers: {
        Authorization:
          "Basic NGQzNmNkOWUzZmI4ZjNhZjgyMjY1NDYwMmM1MGIxMmM4MjE0Yjk3Mjo1ZGI5YTQwYjgyZDI2YjU2YTU1MjcwYTg2ZjQyYWRjZDAxNGEzYWU5NjQyNGNlODMzMDNlNWJiNDExNjIxZTQ3",
        "content-type": "text/json",
      },
    }
);

bookingRes.then(function(result) {
  console.log(result.data)
});

// const getRes = axios.get(
//     "https://lee-cohen.checkfront.com/api/3.0/category/",
//     {
//       headers: {
//         Authorization:
//           "Basic NGQzNmNkOWUzZmI4ZjNhZjgyMjY1NDYwMmM1MGIxMmM4MjE0Yjk3Mjo1ZGI5YTQwYjgyZDI2YjU2YTU1MjcwYTg2ZjQyYWRjZDAxNGEzYWU5NjQyNGNlODMzMDNlNWJiNDExNjIxZTQ3",
//         "content-type": "text/json",
//       },
//     }
// );

// getRes.then(function(result) {
//   console.log(result.data.category)
// });

// return (
//     <div>
//       <h1> API checkFront test</h1>
//     </div>
//   );
// }

export default TestApi;
