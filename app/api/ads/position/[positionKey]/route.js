import { getAdPositionsCollection, getAdSlotsCollection } from "../../../../../utils/mongodb.js";

export async function GET(request, { params }) {
  try {
    const { positionKey } = params;
    const { searchParams } = new URL(request.url);
    const pageType = searchParams.get('pageType') || 'all';

    const adPositionsCollection = await getAdPositionsCollection();
    const adSlotsCollection = await getAdSlotsCollection();

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

    // Find the active slot for this position
    const slot = await adSlotsCollection.findOne({
      positionId: position.positionKey,
      isActive: true
    });

    if (!slot) {
      return Response.json({ 
        error: 'No active ad slot for this position' 
      }, { status: 404 });
    }

    // Parse display conditions if they exist
    let displayConditions = {};
    if (slot.displayConditions) {
      try {
        displayConditions = typeof slot.displayConditions === 'string' 
          ? JSON.parse(slot.displayConditions) 
          : slot.displayConditions;
      } catch (e) {
        console.error('Error parsing display conditions:', e);
      }
    }

    // Check display conditions
    const userAgent = request.headers.get('user-agent') || '';
    const isMobile = /Mobile|Android|iPhone|iPad/.test(userAgent);
    
    if (displayConditions.device_type) {
      if (displayConditions.device_type === 'mobile' && !isMobile) {
        return Response.json({ 
          error: 'Ad not displayed due to device conditions' 
        }, { status: 404 });
      }
      if (displayConditions.device_type === 'desktop' && isMobile) {
        return Response.json({ 
          error: 'Ad not displayed due to device conditions' 
        }, { status: 404 });
      }
    }

    return Response.json({
      id: slot._id,
      positionName: position.positionName,
      positionKey: position.positionKey,
      description: position.description,
      pageType: position.pageType,
      location: position.location,
      slotName: slot.slotName,
      adClientId: slot.adClientId,
      adSlotId: slot.adSlotId,
      adFormat: slot.adFormat,
      isResponsive: slot.isResponsive,
      isActive: slot.isActive && position.isActive,
      displayConditions: displayConditions
    });

  } catch (error) {
    console.error('Error fetching ad position:', error);
    return Response.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}
