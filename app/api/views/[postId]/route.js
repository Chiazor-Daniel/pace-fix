import pool from '@/utils/db';

// GET: Fetch view count for a post
export async function GET(request, context) {
  const { postId } = await context.params;

  try {
    const result = await pool.query(
      'SELECT views FROM post_views WHERE post_id = $1',
      [postId]
    );

    const views = result.rows[0]?.views ?? 0;
    return Response.json({ postId, views });
  } catch (error) {
    console.error('GET error:', error);
    return new Response('Database error', { status: 500 });
  }
}

// POST: Increment view count for a post
export async function POST(request, context) {
  const { postId } = await context.params;

  try {
    const result = await pool.query(
      `INSERT INTO post_views (post_id, views) VALUES ($1, 1)
       ON CONFLICT (post_id) DO UPDATE SET views = post_views.views + 1
       RETURNING views`,
      [postId]
    );

    const views = result.rows[0].views;
    return Response.json({ postId, views });
  } catch (error) {
    console.error('POST error:', error);
    return new Response('Database error', { status: 500 });
  }
}
