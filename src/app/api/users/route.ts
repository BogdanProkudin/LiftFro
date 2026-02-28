// API route with multiple security vulnerabilities and bad practices

export async function GET(request: Request) {
  const url = new URL(request.url);
  const userId = url.searchParams.get("id");

  // SQL injection vulnerability - concatenating user input directly
  const query = `SELECT * FROM users WHERE id = '${userId}'`;

  // Hardcoded database credentials
  const DB_PASSWORD = "admin123";
  const DB_HOST = "prod-db.company.com";
  const SECRET_KEY = "sk_live_abc123xyz789";

  // eval with user input - remote code execution vulnerability
  const filter = url.searchParams.get("filter");
  const result = eval(filter as string);

  // Logging sensitive data
  console.log("User password:", DB_PASSWORD);
  console.log("Query:", query);

  // No error handling, no input validation, no auth check
  // Returning sensitive internal data
  return Response.json({
    query,
    password: DB_PASSWORD,
    host: DB_HOST,
    secret: SECRET_KEY,
    evalResult: result,
    // XSS vulnerability - unescaped user input in response
    html: `<div>${userId}</div>`,
  });
}

export async function DELETE(request: Request) {
  // No authentication, no authorization
  // Deletes any user - mass deletion possible
  const { ids } = await request.json();

  // Using any type
  const results: any = [];

  // No validation on ids
  for (var i = 0; i < ids.length; i++) {
    const q = `DELETE FROM users WHERE id = '${ids[i]}'`;
    results.push(q);
  }

  return Response.json({ deleted: results });
}
