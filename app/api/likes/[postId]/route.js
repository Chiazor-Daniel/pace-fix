import { getLikesCollection } from '@/utils/mongodb';

// GET: Fetch like count for a post
export async function GET(request, context) {
  const { postId } = await context.params;
  try {
    const collection = await getLikesCollection();
    const result = await collection.findOne({ _id: postId });
    const likes = result?.likes ?? 0;
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
    const collection = await getLikesCollection();
    const result = await collection.findOneAndUpdate(
      { _id: postId },
      { $inc: { likes: 1 } },
      { upsert: true, returnDocument: 'after' }
    );
    const likes = result.likes ?? 1;
    return Response.json({ postId, likes });
  } catch (error) {
    console.error('POST error:', error);
    return new Response('Database error', { status: 500 });
  }
}
