import { getAdSlotsCollection } from "../../../../../../utils/mongodb.js";
import { ObjectId } from 'mongodb';

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { isActive, adSlotId, adFormat, isResponsive } = body;

    const collection = await getAdSlotsCollection();
    
    // Build update object
    const updateFields = {
      updatedAt: new Date()
    };

    if (typeof isActive === 'boolean') {
      updateFields.isActive = isActive;
    }
    if (adSlotId) {
      updateFields.adSlotId = adSlotId;
    }
    if (adFormat) {
      updateFields.adFormat = adFormat;
    }
    if (typeof isResponsive === 'boolean') {
      updateFields.isResponsive = isResponsive;
    }

    // Try to update by ObjectId first, then by slot name or other identifier
    let result;
    try {
      result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updateFields }
      );
    } catch (error) {
      // If ObjectId fails, try updating by other identifier
      result = await collection.updateOne(
        { slotName: id },
        { $set: updateFields }
      );
    }

    if (result.matchedCount === 0) {
      return Response.json({ 
        error: 'Slot not found' 
      }, { status: 404 });
    }

    return Response.json({
      success: true,
      message: 'Slot updated successfully'
    });
  } catch (error) {
    console.error('Error updating ad slot:', error);
    return Response.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const collection = await getAdSlotsCollection();
    
    // Try to delete by ObjectId first, then by other identifier
    let result;
    try {
      result = await collection.deleteOne({ _id: new ObjectId(id) });
    } catch (error) {
      // If ObjectId fails, try deleting by other identifier
      result = await collection.deleteOne({ slotName: id });
    }

    if (result.deletedCount === 0) {
      return Response.json({ 
        error: 'Slot not found' 
      }, { status: 404 });
    }

    return Response.json({
      success: true,
      message: 'Slot deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting ad slot:', error);
    return Response.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}

