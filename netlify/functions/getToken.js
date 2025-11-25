exports.handler = async () => {
  const clientId = process.env.CJ_API_KEY;
  const clientSecret = process.env.CJ_API_SECRET;

  try {
    const response = await fetch(
      "https://developers.cjdropshipping.com/authentication/getAccessToken",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret
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
