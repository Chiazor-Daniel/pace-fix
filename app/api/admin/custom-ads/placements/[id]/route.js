import { getAdPlacementsCollection } from "../../../../../../utils/mongodb.js";
import { ObjectId } from 'mongodb';

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { isActive, positionKey, adId, pageType } = body;

    const collection = await getAdPlacementsCollection();
    
    // Build update object
    const updateFields = {
      updatedAt: new Date()
    };

    if (typeof isActive === 'boolean') {
      updateFields.isActive = isActive;
    }
    if (positionKey) {
      updateFields.positionKey = positionKey;
    }
    if (adId) {
      updateFields.adId = adId;
    }
    if (pageType) {
      updateFields.pageType = pageType;
    }

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateFields }
    );

    if (result.matchedCount === 0) {
      return Response.json({ 
        error: 'Placement not found' 
      }, { status: 404 });
    }

    return Response.json({
      success: true,
      message: 'Placement updated successfully'
    });
  } catch (error) {
    console.error('Error updating ad placement:', error);
    return Response.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const collection = await getAdPlacementsCollection();
    
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return Response.json({ 
        error: 'Placement not found' 
      }, { status: 404 });
    }

    return Response.json({
      success: true,
      message: 'Placement deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting ad placement:', error);
    return Response.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}

