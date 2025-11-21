/**
 * Cloudflare Pages Function: /api/hitokoto
 */
export async function onRequest(context) {
  const externalApiUrl = "https://v1.hitokoto.cn";

  try {
    console.log("Fetching from Hitokoto API...");
    const response = await fetch(externalApiUrl);
    
    console.log("Response status:", response.status);
    
    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: `Failed to fetch: ${response.statusText}` }), 
        { 
          status: response.status,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const data = await response.json();
    
    return new Response(JSON.stringify(data), {
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });

  } catch (error) {
    console.error("Function error:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error", details: error.message }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}