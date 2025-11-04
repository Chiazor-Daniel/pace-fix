import { getAdPerformanceCollection } from "../../../../utils/mongodb";

export async function POST(request) {
  try {
    const body = await request.json();
    const { slotId, adId, pageUrl, pageType, action = 'view' } = body;
    
    // Get client IP and user agent
    const userAgent = request.headers.get('user-agent') || '';
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : 
               request.headers.get('x-real-ip') || 
               '127.0.0.1';

    if (!slotId && !adId) {
      return Response.json({ 
        error: 'Slot ID or Ad ID is required' 
      }, { status: 400 });
    }

    const adPerformanceCollection = await getAdPerformanceCollection();
    
    // Create a unique key for today's record
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const identifier = adId || slotId;
    const todayKey = `${identifier}-${pageUrl}-${today.toISOString().split('T')[0]}`;
    
    // Check if record exists for today
    const existingRecord = await adPerformanceCollection.findOne({
      _id: todayKey
    });
    
    if (existingRecord) {
      // Update existing record
      const updateFields = {};
      if (action === 'view') {
        updateFields.viewCount = (existingRecord.viewCount || 0) + 1;
      } else if (action === 'click') {
        updateFields.clickCount = (existingRecord.clickCount || 0) + 1;
      }
      updateFields.updatedAt = new Date();
      
      await adPerformanceCollection.updateOne(
        { _id: todayKey },
        { $set: updateFields }
      );
    } else {
      // Insert new record
      const newRecord = {
        _id: todayKey,
        slotId: slotId || null,
        adId: adId || null,
        pageUrl: pageUrl,
        pageType: pageType,
        userAgent: userAgent,
        ipAddress: ip,
        viewCount: action === 'view' ? 1 : 0,
        clickCount: action === 'click' ? 1 : 0,
        revenue: 0,
        dateRecorded: today,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      await adPerformanceCollection.insertOne(newRecord);
    }

    return Response.json({ 
      success: true, 
      message: 'Ad performance tracked successfully' 
    });

  } catch (error) {
    console.error('Error tracking ad performance:', error);
    return Response.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const slotId = searchParams.get('slotId');
    const adId = searchParams.get('adId');
    const days = parseInt(searchParams.get('days')) || 30;
    const pageType = searchParams.get('pageType');

    const adPerformanceCollection = await getAdPerformanceCollection();
    
    // Calculate date range
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    // Build match criteria
    const matchCriteria = {
      dateRecorded: {
        $gte: startDate,
        $lte: endDate
      }
    };

    if (slotId) {
      matchCriteria.slotId = slotId;
    }

    if (adId) {
      matchCriteria.adId = adId;
    }

    if (pageType) {
      matchCriteria.pageType = pageType;
    }

    // Aggregate performance data
    const aggregationPipeline = [
      { $match: matchCriteria },
      {
        $group: {
          _id: {
            slotId: '$slotId',
            adId: '$adId',
            pageType: '$pageType',
            pageUrl: '$pageUrl'
          },
          totalViews: { $sum: '$viewCount' },
          totalClicks: { $sum: '$clickCount' },
          totalRevenue: { $sum: '$revenue' },
          activeDays: { $addToSet: '$dateRecorded' }
        }
      },
      {
        $project: {
          slotId: '$_id.slotId',
          adId: '$_id.adId',
          pageType: '$_id.pageType',
          pageUrl: '$_id.pageUrl',
          totalViews: 1,
          totalClicks: 1,
          totalRevenue: 1,
          activeDays: { $size: '$activeDays' }
        }
      },
      { $sort: { totalViews: -1 } }
    ];

    const result = await adPerformanceCollection.aggregate(aggregationPipeline).toArray();
    
    return Response.json({
      success: true,
      data: result,
      period: `${days} days`
    });

  } catch (error) {
    console.error('Error fetching ad performance:', error);
    return Response.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}
