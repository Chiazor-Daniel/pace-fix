import { getAdSlotsCollection } from "../../../../../utils/mongodb";

export async function GET() {
  try {
    const collection = await getAdSlotsCollection();
    const slots = await collection.find({}).sort({ slotName: 1 }).toArray();
    
    return Response.json({
      success: true,
      data: slots
    });
  } catch (error) {
    console.error('Error fetching ad slots:', error);
    return Response.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { 
      positionId, 
      slotName, 
      adClientId, 
      adSlotId, 
      adFormat, 
      isResponsive, 
      isActive 
    } = body;

    if (!positionId || !slotName || !adSlotId) {
      return Response.json({ 
        error: 'Position ID, slot name, and ad slot ID are required' 
      }, { status: 400 });
    }

    const collection = await getAdSlotsCollection();
    
    // Check if slot already exists for this position
    const existingSlot = await collection.findOne({ 
      positionId, 
      adSlotId 
    });
    
    if (existingSlot) {
      return Response.json({ 
        error: 'Slot already exists for this position' 
      }, { status: 400 });
    }

    const newSlot = {
      positionId,
      slotName,
      adClientId: adClientId || 'ca-pub-3536158399576400',
      adSlotId,
      adFormat: adFormat || 'auto',
      isResponsive: isResponsive !== undefined ? isResponsive : true,
      displayConditions: {},
      isActive: isActive !== undefined ? isActive : true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await collection.insertOne(newSlot);
    
    return Response.json({
      success: true,
      data: { ...newSlot, _id: result.insertedId }
    });
  } catch (error) {
    console.error('Error creating ad slot:', error);
    return Response.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}

