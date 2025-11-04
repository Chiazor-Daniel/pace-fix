import { getAdPositionsCollection } from "../../../../../utils/mongodb";

export async function GET() {
  try {
    const collection = await getAdPositionsCollection();
    const positions = await collection.find({}).sort({ positionName: 1 }).toArray();
    
    return Response.json({
      success: true,
      data: positions
    });
  } catch (error) {
    console.error('Error fetching ad positions:', error);
    return Response.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { positionName, positionKey, description, pageType, location, isActive } = body;

    if (!positionName || !positionKey) {
      return Response.json({ 
        error: 'Position name and key are required' 
      }, { status: 400 });
    }

    const collection = await getAdPositionsCollection();
    
    // Check if position key already exists
    const existingPosition = await collection.findOne({ positionKey });
    if (existingPosition) {
      return Response.json({ 
        error: 'Position key already exists' 
      }, { status: 400 });
    }

    const newPosition = {
      positionName,
      positionKey,
      description: description || '',
      pageType: pageType || 'all',
      location: location || 'header',
      isActive: isActive !== undefined ? isActive : true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await collection.insertOne(newPosition);
    
    return Response.json({
      success: true,
      data: { ...newPosition, _id: result.insertedId }
    });
  } catch (error) {
    console.error('Error creating ad position:', error);
    return Response.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}

