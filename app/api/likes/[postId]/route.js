import pool from '@/utils/db';

// GET: Fetch like count for a post
export async function GET(request, context) {
  const { postId } = await context.params;
  try {
    const result = await pool.query(
      'SELECT likes FROM post_likes WHERE post_id = $1',
      [postId]
    );
    const likes = result.rows[0]?.likes ?? 0;
    return Response.json({ postId, likes });
  } catch (error) {
    console.error('GET error:', error);
    return new Response('Database error', { status: 500 });
  }
}

// POST: Increment like count for a post
export async function POST(request, context) {
  const { postId } = await context.params;
  try {
    const result = await pool.query(
      `INSERT INTO post_likes (post_id, likes) VALUES ($1, 1)
       ON CONFLICT (post_id) DO UPDATE SET likes = post_likes.likes + 1
       RETURNING likes`,
      [postId]
    );
    const likes = result.rows[0].likes;
    return Response.json({ postId, likes });
  } catch (error) {
    console.error('POST error:', error);
    return new Response('Database error:', { status: 500 });
  }
}
