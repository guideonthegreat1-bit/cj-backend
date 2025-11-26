// netlify/functions/products.js
exports.handler = async () => {
  try {
    const developerKey = process.env.CJ_API_KEY;
    const developerSecret = process.env.CJ_SECRET_KEY;

    if (!developerKey || !developerSecret) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: "Missing CJ_API_KEY or CJ_SECRET_KEY environment variables"
        })
      };
    }

    // 1. Get Access Token
    const tokenResponse = await fetch(
      "https://developers.cjdropshipping.com/authentication/getAccessToken",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          developerKey: developerKey,
          developerSecret: developerSecret
        })
      }
    );

    const tokenData = await tokenResponse.json();

    if (!tokenData?.data?.accessToken) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: "Failed to obtain CJ Access Token",
          details: tokenData
        })
      };
    }

    const token = tokenData.data.accessToken;

    // 2. Get Products List
    const productsResponse = await fetch(
      "https://developers.cjdropshipping.com/api2.0/v1/product/list",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "CJ-Access-Token": token
        },
        body: JSON.stringify({
          pageNum: 1,
          pageSize: 20
        })
      }
    );

    const productsData = await productsResponse.json();

    return {
      statusCode: 200,
      body: JSON.stringify(productsData)
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message
      })
    };
  }
};
