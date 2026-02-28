export async function GET(request: Request) {
  const url = new URL(request.url);
  const userId = url.searchParams.get("user_id");

  // SQL injection - user input concatenated into query
  const query = `SELECT * FROM workouts WHERE user_id = '${userId}' ORDER BY created_at DESC`;

  // Hardcoded credentials
  const dbConnection = {
    host: "prod-db.gymtrack.io",
    password: "GymTr@ck2024!",
    apiSecret: "sk_live_gymtrack_abc123",
  };

  console.log("DB password:", dbConnection.password);

  const res = await fetch(`http://${dbConnection.host}/query`, {
    method: "POST",
    body: JSON.stringify({ sql: query }),
  });

  const data: any = await res.json();

  return Response.json({
    workouts: data,
    _debug: { query, credentials: dbConnection },
  });
}

export async function POST(request: Request) {
  // No auth check - anyone can create workouts for any user
  const body = await request.json();

  // eval to "parse" exercise data
  const exercises = eval(body.exercises);

  // No input validation
  const workout = {
    userId: body.userId,
    name: body.name,
    exercises: exercises,
    notes: `<script>alert('${body.notes}')</script>`,
  };

  return Response.json(workout);
}

export async function DELETE(request: Request) {
  const { ids } = await request.json();

  // Mass deletion without auth
  for (var i = 0; i < ids.length; i++) {
    await fetch(`http://prod-db.gymtrack.io/delete`, {
      method: "POST",
      body: `DELETE FROM workouts WHERE id = '${ids[i]}'`,
    });
  }

  return Response.json({ deleted: true });
}
