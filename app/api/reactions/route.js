import { getReactionsCollection } from '../../../utils/mongodb.js';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('postId');

    if (!postId) {
      return Response.json({
        error: 'Post ID is required'
      }, { status: 400 });
    }

    const collection = await getReactionsCollection();
    
    // Get reaction counts for the post
    const reactions = await collection.aggregate([
      { $match: { postId } },
      { $group: { _id: '$reactionType', count: { $sum: 1 } } }
    ]).toArray();

    // Convert to object format
    const reactionCounts = {
      like: 0,
      love: 0,
      laugh: 0,
      angry: 0,
      sad: 0,
      wow: 0
    };

    reactions.forEach(reaction => {
      if (reactionCounts.hasOwnProperty(reaction._id)) {
        reactionCounts[reaction._id] = reaction.count;
      }
    });

    return Response.json({
      success: true,
      data: reactionCounts
    });
  } catch (error) {
    console.error('Error fetching reactions:', error);
    return Response.json({
      error: 'Internal server error'
    }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { postId, reactionType, userIdentifier } = body;

    if (!postId || !reactionType || !userIdentifier) {
      return Response.json({
        error: 'Post ID, reaction type, and user identifier are required'
      }, { status: 400 });
    }

    const validReactions = ['like', 'love', 'laugh', 'angry', 'sad', 'wow'];
    if (!validReactions.includes(reactionType)) {
      return Response.json({
        error: 'Invalid reaction type'
      }, { status: 400 });
    }

    const collection = await getReactionsCollection();
    
    // Check if user already reacted to this post
    const existingReaction = await collection.findOne({
      postId,
      userIdentifier
    });

    if (existingReaction) {
      if (existingReaction.reactionType === reactionType) {
        // Remove reaction if same type
        await collection.deleteOne({ _id: existingReaction._id });
        return Response.json({
          success: true,
          message: 'Reaction removed',
          action: 'removed'
        });
      } else {
        // Update reaction type
        await collection.updateOne(
          { _id: existingReaction._id },
          { $set: { reactionType, updatedAt: new Date() } }
        );
        return Response.json({
          success: true,
          message: 'Reaction updated',
          action: 'updated'
        });
      }
    } else {
      // Add new reaction
      const reaction = {
        postId,
        reactionType,
        userIdentifier,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      await collection.insertOne(reaction);
      return Response.json({
        success: true,
        message: 'Reaction added',
        action: 'added'
      });
    }
  } catch (error) {
    console.error('Error handling reaction:', error);
    return Response.json({
      error: 'Internal server error'
    }, { status: 500 });
  }
}

