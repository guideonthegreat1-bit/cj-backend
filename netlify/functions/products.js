// netlify/functions/products.js
exports.handler = async () => {
  const apiKey = process.env.CJ_API_KEY;

  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "CJ_API_KEY is missing in Netlify" })
    };
  }

  try {
    // 1️⃣ Get Access Token
    const tokenResponse = await fetch(
      "https://developers.cjdropshipping.com/api2.0/v1/authentication/getAccessToken",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey })
      }
    );

    const tokenData = await tokenResponse.json();

    if (!tokenData.accessToken) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Failed to obtain CJ access token", details: tokenData })
      };
    }

    const accessToken = tokenData.accessToken;

    // 2️⃣ Call the CJ products API
    const productResponse = await fetch(
      "https://developers.cjdropshipping.com/api2.0/v1/product/list?pageNum=1&pageSize=20",
      {
        method: "GET",
        headers: {
          "CJ-Access-Token": accessToken,
          "Content-Type": "application/json"
        }
      }
    );

    const productData = await productResponse.json();

    return {
      statusCode: 200,
      body: JSON.stringify(productData)
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
