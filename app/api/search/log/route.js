import { getSearchLogsCollection } from "../../../../utils/mongodb.js";

export async function POST(request) {
  try {
    const body = await request.json();
    const { searchTerm, resultsCount = 0 } = body;

    if (!searchTerm || typeof searchTerm !== 'string') {
      return Response.json({ 
        error: 'Search term is required' 
      }, { status: 400 });
    }

    // Get client information
    const userAgent = request.headers.get('user-agent') || '';
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : 
               request.headers.get('x-real-ip') || 
               '127.0.0.1';

    const collection = await getSearchLogsCollection();
    
    const searchLog = {
      searchTerm: searchTerm.toLowerCase().trim(),
      resultsCount,
      userAgent,
      ipAddress: ip,
      createdAt: new Date()
    };

    await collection.insertOne(searchLog);
    
    return Response.json({
      success: true,
      message: 'Search logged successfully'
    });
  } catch (error) {
    console.error('Error logging search:', error);
    return Response.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days')) || 30;
    const limit = parseInt(searchParams.get('limit')) || 100;

    const collection = await getSearchLogsCollection();
    
    // Calculate date range
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    // Aggregate search terms
    const aggregationPipeline = [
      {
        $match: {
          createdAt: {
            $gte: startDate,
            $lte: endDate
          }
        }
      },
      {
        $group: {
          _id: '$searchTerm',
          searchCount: { $sum: 1 },
          avgResultsCount: { $avg: '$resultsCount' },
          lastSearched: { $max: '$createdAt' },
          firstSearched: { $min: '$createdAt' }
        }
      },
      {
        $sort: { searchCount: -1 }
      },
      {
        $limit: limit
      }
    ];

    const result = await collection.aggregate(aggregationPipeline).toArray();
    
    return Response.json({
      success: true,
      data: result,
      period: `${days} days`
    });
  } catch (error) {
    console.error('Error fetching search logs:', error);
    return Response.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}

