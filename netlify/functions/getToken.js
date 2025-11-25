exports.handler = async (event, context) => {
  const apiKey = process.env.CJ_API_KEY;

  const response = await fetch(
    "https://developers.cjdropshipping.com/authentication/getAccessToken",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: apiKey,
        client_secret: ""
      })
    }
  );

  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
};
