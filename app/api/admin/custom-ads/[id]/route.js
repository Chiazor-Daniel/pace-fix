import { getCustomAdsCollection } from "../../../../../utils/mongodb";
import { ObjectId } from 'mongodb';

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { isActive, title, description, adType, content } = body;

    const collection = await getCustomAdsCollection();
    
    // Build update object
    const updateFields = {
      updatedAt: new Date()
    };

    if (typeof isActive === 'boolean') {
      updateFields.isActive = isActive;
    }
    if (title) {
      updateFields.title = title;
    }
    if (description !== undefined) {
      updateFields.description = description;
    }
    if (adType) {
      updateFields.adType = adType;
    }
    if (content) {
      updateFields.content = content;
    }

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateFields }
    );

    if (result.matchedCount === 0) {
      return Response.json({ 
        error: 'Ad not found' 
      }, { status: 404 });
    }

    return Response.json({
      success: true,
      message: 'Ad updated successfully'
    });
  } catch (error) {
    console.error('Error updating custom ad:', error);
    return Response.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const collection = await getCustomAdsCollection();
    
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return Response.json({ 
        error: 'Ad not found' 
      }, { status: 404 });
    }

    return Response.json({
      success: true,
      message: 'Ad deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting custom ad:', error);
    return Response.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}

