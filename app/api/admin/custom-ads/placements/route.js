import { getAdPlacementsCollection } from "../../../../../utils/mongodb.js";

export async function GET() {
  try {
    const collection = await getAdPlacementsCollection();
    const placements = await collection.find({}).sort({ createdAt: -1 }).toArray();
    
    return Response.json({
      success: true,
      data: placements
    });
  } catch (error) {
    console.error('Error fetching ad placements:', error);
    return Response.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { positionKey, adId, pageType, isActive } = body;

    if (!positionKey || !adId) {
      return Response.json({ 
        error: 'Position key and ad ID are required' 
      }, { status: 400 });
    }

    const collection = await getAdPlacementsCollection();
    
    // Check if placement already exists for this position and page type
    const existingPlacement = await collection.findOne({ 
      positionKey, 
      pageType: pageType || 'all' 
    });
    
    if (existingPlacement) {
      return Response.json({ 
        error: 'Placement already exists for this position and page type' 
      }, { status: 400 });
    }

    const newPlacement = {
      positionKey,
      adId,
      pageType: pageType || 'all',
      isActive: isActive !== undefined ? isActive : true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await collection.insertOne(newPlacement);
    
    return Response.json({
      success: true,
      data: { ...newPlacement, _id: result.insertedId }
    });
  } catch (error) {
    console.error('Error creating ad placement:', error);
    return Response.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}

