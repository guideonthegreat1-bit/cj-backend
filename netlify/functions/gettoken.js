// netlify/functions/getToken.js
exports.handler = async () => {
  const developerKey = process.env.CJ_API_KEY;
  const developerSecret = process.env.CJ_SECRET_KEY;

  if (!developerKey || !developerSecret) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "CJ_API_KEY or CJ_SECRET_KEY is missing in Netlify"
      })
    };
  }

  try {
    const response = await fetch(
      "https://developers.cjdropshipping.com/authentication/getAccessToken",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          developerKey,
          developerSecret
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
