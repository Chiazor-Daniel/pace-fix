import { getAdPositionsCollection } from "../../../../../../utils/mongodb.js";
import { ObjectId } from 'mongodb';

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { isActive } = body;

    if (typeof isActive !== 'boolean') {
      return Response.json({ 
        error: 'isActive must be a boolean value' 
      }, { status: 400 });
    }

    const collection = await getAdPositionsCollection();
    
    // Try to update by ObjectId first, then by positionKey
    let result;
    try {
      result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { 
          $set: { 
            isActive,
            updatedAt: new Date()
          }
        }
      );
    } catch (error) {
      // If ObjectId fails, try updating by positionKey
      result = await collection.updateOne(
        { positionKey: id },
        { 
          $set: { 
            isActive,
            updatedAt: new Date()
          }
        }
      );
    }

    if (result.matchedCount === 0) {
      return Response.json({ 
        error: 'Position not found' 
      }, { status: 404 });
    }

    return Response.json({
      success: true,
      message: 'Position updated successfully'
    });
  } catch (error) {
    console.error('Error updating ad position:', error);
    return Response.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const collection = await getAdPositionsCollection();
    
    // Try to delete by ObjectId first, then by positionKey
    let result;
    try {
      result = await collection.deleteOne({ _id: new ObjectId(id) });
    } catch (error) {
      // If ObjectId fails, try deleting by positionKey
      result = await collection.deleteOne({ positionKey: id });
    }

    if (result.deletedCount === 0) {
      return Response.json({ 
        error: 'Position not found' 
      }, { status: 404 });
    }

    return Response.json({
      success: true,
      message: 'Position deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting ad position:', error);
    return Response.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}

