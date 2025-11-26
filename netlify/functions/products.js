// netlify/functions/products.js

exports.handler = async () => {
  const token = process.env.CJ_ACCESS_TOKEN;
  const developerKey = process.env.CJ_API_KEY;

  if (!token || !developerKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "CJ_ACCESS_TOKEN or CJ_API_KEY is missing in Netlify"
      })
    };
  }

  try {
    const response = await fetch(
      "https://developers.cjdropshipping.com/api2.0/v1/product/list",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "CJ-Access-Token": token,
          "CJ-Developer-Key": developerKey
        },
        body: JSON.stringify({
          pageNum: 1,
          pageSize: 10
        })
      }
    );

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
