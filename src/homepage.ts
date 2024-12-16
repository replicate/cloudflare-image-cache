export function homepage(): Response {
    const html = `
      <html>
        <body>
          <h1>Placeholder Zoo</h1>
          <p>Examples:</p>
          <ul>
            <li><a href="/800x600/sunglasses-sloth">/800x600/sunglasses-sloth</a></li>
            <li><a href="/512x512/psychic-goat">/512x512/psychic-goat</a></li>
            <li><a href="/1024x768/hippie-lion">/1024x768/hippie-lion</a></li>
            <li><a href="/600x800/punk-giraffe">/600x800/punk-giraffe</a></li>
          </ul>
        </body>
      </html>
    `;
    return new Response(html, { 
      status: 400,
      headers: { 'Content-Type': 'text/html' }
    });
  } 