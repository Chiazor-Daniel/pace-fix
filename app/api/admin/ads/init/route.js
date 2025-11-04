import { initializeAdCollection } from "../../../../../utils/initAdCollections";

export async function POST() {
  try {
    const success = await initializeAdCollections();
    
    if (success) {
      return Response.json({
        success: true,
        message: 'Ad collections initialized successfully'
      });
    } else {
      return Response.json({
        success: false,
        message: 'Failed to initialize ad collections'
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error initializing ad collections:', error);
    return Response.json({
      success: false,
      message: 'Error initializing ad collections',
      error: error.message
    }, { status: 500 });
  }
}

