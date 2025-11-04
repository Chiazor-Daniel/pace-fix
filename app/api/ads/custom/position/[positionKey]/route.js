import { getAdPositionsCollection, getCustomAdsCollection, getAdPlacementsCollection } from "../../../../../../utils/mongodb.js";

export async function GET(request, { params }) {
  try {
    const { positionKey } = params;
    const { searchParams } = new URL(request.url);
    const pageType = searchParams.get('pageType') || 'all';

    const adPositionsCollection = await getAdPositionsCollection();
    const customAdsCollection = await getCustomAdsCollection();
    const adPlacementsCollection = await getAdPlacementsCollection();

    // Find the ad position
    const position = await adPositionsCollection.findOne({
      positionKey: positionKey,
      isActive: true,
      $or: [
        { pageType: 'all' },
        { pageType: pageType }
      ]
    });

    if (!position) {
      return Response.json({ 
        error: 'Ad position not found or inactive' 
      }, { status: 404 });
    }

    // Find the active ad placement for this position
    const placement = await adPlacementsCollection.findOne({
      positionKey: positionKey,
      isActive: true,
      $or: [
        { pageType: 'all' },
        { pageType: pageType }
      ]
    });

    if (!placement) {
      return Response.json({ 
        error: 'No active ad placement for this position' 
      }, { status: 404 });
    }

    // Get the custom ad details
    const customAd = await customAdsCollection.findOne({
      _id: placement.adId,
      isActive: true
    });

    if (!customAd) {
      return Response.json({ 
        error: 'Custom ad not found or inactive' 
      }, { status: 404 });
    }

    return Response.json({
      _id: customAd._id,
      title: customAd.title,
      description: customAd.description,
      adType: customAd.adType,
      content: customAd.content,
      isActive: customAd.isActive && placement.isActive && position.isActive,
      positionName: position.positionName,
      positionKey: position.positionKey,
      pageType: position.pageType,
      location: position.location
    });

  } catch (error) {
    console.error('Error fetching custom ad position:', error);
    return Response.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}

