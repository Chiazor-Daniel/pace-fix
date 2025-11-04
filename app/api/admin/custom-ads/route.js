import { getCustomAdsCollection } from '../../../../utils/mongodb.js';

export async function GET() {
  try {
    const collection = await getCustomAdsCollection();
    const ads = await collection.find({}).sort({ createdAt: -1 }).toArray();
    
    return Response.json({
      success: true,
      data: ads
    });
  } catch (error) {
    console.error('Error fetching custom ads:', error);
    return Response.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, description, adType, content, isActive } = body;

    if (!title || !adType) {
      return Response.json({ 
        error: 'Title and ad type are required' 
      }, { status: 400 });
    }

    const collection = await getCustomAdsCollection();
    
    // Check if ad with same title already exists
    const existingAd = await collection.findOne({ title });
    if (existingAd) {
      return Response.json({ 
        error: 'Ad with this title already exists' 
      }, { status: 400 });
    }

    const newAd = {
      title,
      description: description || '',
      adType,
      content: content || {},
      isActive: isActive !== undefined ? isActive : true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await collection.insertOne(newAd);
    
    return Response.json({
      success: true,
      data: { ...newAd, _id: result.insertedId }
    });
  } catch (error) {
    console.error('Error creating custom ad:', error);
    return Response.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}

