exports.handler = async () => {
  try {
    const APP_KEY = process.env.CJ_APP_KEY;
    const APP_SECRET = process.env.CJ_APP_SECRET;

    if (!APP_KEY) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "CJ_APP_KEY is missing" })
      };
    }

    // 1. Get Access Token
    const tokenResponse = await fetch(
      "https://developers.cjdropshipping.com/authentication/getAccessToken",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apiKey: APP_KEY,        // ← CORRECT CJ FIELD NAME
          apiSecret: APP_SECRET || ""
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
