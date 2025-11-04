import { getCommentsCollection } from '../../../utils/mongodb.js';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('postId');
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const skip = (page - 1) * limit;

    const collection = await getCommentsCollection();
    
    let query = { isApproved: true };
    if (postId) {
      query.postId = postId;
    }

    const comments = await collection
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    const total = await collection.countDocuments(query);

    return Response.json({
      success: true,
      data: comments,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return Response.json({
      error: 'Internal server error'
    }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { postId, authorName, authorEmail, content, parentId } = body;

    if (!postId || !authorName || !authorEmail || !content) {
      return Response.json({
        error: 'Post ID, author name, email, and content are required'
      }, { status: 400 });
    }

    const collection = await getCommentsCollection();
    
    const comment = {
      postId,
      authorName,
      authorEmail,
      content,
      parentId: parentId || null,
      isApproved: false, // Comments need approval
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await collection.insertOne(comment);

    return Response.json({
      success: true,
      message: 'Comment submitted successfully. It will be reviewed before being published.',
      data: { id: result.insertedId }
    });
  } catch (error) {
    console.error('Error creating comment:', error);
    return Response.json({
      error: 'Internal server error'
    }, { status: 500 });
  }
}

