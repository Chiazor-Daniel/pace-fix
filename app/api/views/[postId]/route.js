import { getViewsCollection } from '@/utils/mongodb';

// GET: Fetch view count for a post
export async function GET(request, context) {
  const { postId } = await context.params;

  try {
    const collection = await getViewsCollection();
    const result = await collection.findOne({ _id: postId });
    const views = result?.views ?? 0;
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
    const collection = await getViewsCollection();
    const result = await collection.findOneAndUpdate(
      { _id: postId },
      { $inc: { views: 1 } },
      { upsert: true, returnDocument: 'after' }
    );
    const views = result.views ?? 1;
    return Response.json({ postId, views });
  } catch (error) {
    console.error('POST error:', error);
    return new Response('Database error', { status: 500 });
  }
}
