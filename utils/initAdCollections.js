import { 
  getAdPositionsCollection, 
  getCustomAdsCollection,
  getAdPlacementsCollection, 
  getAdPerformanceCollection,
  getSearchLogsCollection 
} from './mongodb.js';

// Initialize ad management collections with default data
export async function initializeAdCollections() {
  try {
    const adPositionsCollection = await getAdPositionsCollection();
    const customAdsCollection = await getCustomAdsCollection();
    const adPlacementsCollection = await getAdPlacementsCollection();
    const adPerformanceCollection = await getAdPerformanceCollection();
    const searchLogsCollection = await getSearchLogsCollection();

    // Create indexes for better performance
    await adPositionsCollection.createIndex({ positionKey: 1 }, { unique: true });
    await adPositionsCollection.createIndex({ pageType: 1 });
    await adPositionsCollection.createIndex({ location: 1 });
    await adPositionsCollection.createIndex({ isActive: 1 });

    await customAdsCollection.createIndex({ title: 1 });
    await customAdsCollection.createIndex({ isActive: 1 });
    await customAdsCollection.createIndex({ adType: 1 });
    await customAdsCollection.createIndex({ createdAt: 1 });

    await adPlacementsCollection.createIndex({ positionKey: 1 });
    await adPlacementsCollection.createIndex({ adId: 1 });
    await adPlacementsCollection.createIndex({ isActive: 1 });
    await adPlacementsCollection.createIndex({ pageType: 1 });

    await adPerformanceCollection.createIndex({ adId: 1 });
    await adPerformanceCollection.createIndex({ dateRecorded: 1 });
    await adPerformanceCollection.createIndex({ pageType: 1 });
    await adPerformanceCollection.createIndex({ pageUrl: 1 });

    await searchLogsCollection.createIndex({ searchTerm: 1 });
    await searchLogsCollection.createIndex({ createdAt: 1 });
    await searchLogsCollection.createIndex({ ipAddress: 1 });

    // Check if default ad positions exist
    const existingPositions = await adPositionsCollection.countDocuments();
    
    if (existingPositions === 0) {
      // Insert default ad positions
      const defaultPositions = [
        {
          positionName: 'Header Banner',
          positionKey: 'header_banner',
          description: 'Top banner ad on all pages',
          pageType: 'all',
          location: 'header',
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          positionName: 'Sidebar Top',
          positionKey: 'sidebar_top',
          description: 'Top sidebar ad on post and category pages',
          pageType: 'post',
          location: 'sidebar',
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          positionName: 'Sidebar Middle',
          positionKey: 'sidebar_middle',
          description: 'Middle sidebar ad on post and category pages',
          pageType: 'post',
          location: 'sidebar',
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          positionName: 'Sidebar Bottom',
          positionKey: 'sidebar_bottom',
          description: 'Bottom sidebar ad on post and category pages',
          pageType: 'post',
          location: 'sidebar',
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          positionName: 'Below Title',
          positionKey: 'below_title',
          description: 'Ad below article title',
          pageType: 'post',
          location: 'content',
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          positionName: 'In Content',
          positionKey: 'in_content',
          description: 'Ad within article content',
          pageType: 'post',
          location: 'content',
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          positionName: 'End of Article',
          positionKey: 'end_of_article',
          description: 'Ad at the end of article',
          pageType: 'post',
          location: 'content',
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          positionName: 'Mobile Sticky Footer',
          positionKey: 'mobile_sticky_footer',
          description: 'Sticky footer ad on mobile devices',
          pageType: 'all',
          location: 'footer',
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          positionName: 'Home Hero',
          positionKey: 'home_hero',
          description: 'Hero section ad on homepage',
          pageType: 'home',
          location: 'content',
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          positionName: 'Home Sidebar',
          positionKey: 'home_sidebar',
          description: 'Sidebar ad on homepage',
          pageType: 'home',
          location: 'sidebar',
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          positionName: 'Category Header',
          positionKey: 'category_header',
          description: 'Header ad on category pages',
          pageType: 'category',
          location: 'header',
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          positionName: 'Search Results',
          positionKey: 'search_results',
          description: 'Ad in search results',
          pageType: 'search',
          location: 'content',
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];

      const insertedPositions = await adPositionsCollection.insertMany(defaultPositions);
      console.log(`Inserted ${insertedPositions.insertedCount} default ad positions`);

      // Create sample custom ads
      const sampleAds = [
        {
          title: "Sample Banner Ad",
          description: "A sample banner advertisement",
          adType: "banner",
          content: {
            imageUrl: "/default_advert.jpg",
            linkUrl: "#",
            altText: "Sample Banner Ad"
          },
          isActive: false, // Start inactive so client can choose
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Sample Text Ad",
          description: "A sample text advertisement",
          adType: "text",
          content: {
            title: "Check out our latest offer!",
            description: "Get 20% off on all products",
            linkUrl: "#",
            buttonText: "Learn More"
          },
          isActive: false,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];

      const insertedAds = await customAdsCollection.insertMany(sampleAds);
      console.log(`Inserted ${insertedAds.insertedCount} sample custom ads`);
    }

    console.log('Ad collections initialized successfully');
    return true;
  } catch (error) {
    console.error('Error initializing ad collections:', error);
    return false;
  }
}

// Helper function to get default slot IDs
function getDefaultSlotId(positionKey) {
  const slotMap = {
    'header_banner': 'YOUR_HEADER_SLOT_ID',
    'sidebar_top': 'YOUR_SIDEBAR_TOP_SLOT_ID',
    'sidebar_middle': 'YOUR_SIDEBAR_MIDDLE_SLOT_ID',
    'sidebar_bottom': 'YOUR_SIDEBAR_BOTTOM_SLOT_ID',
    'below_title': 'YOUR_BELOW_TITLE_SLOT_ID',
    'in_content': 'YOUR_IN_CONTENT_SLOT_ID',
    'end_of_article': 'YOUR_END_OF_ARTICLE_SLOT_ID',
    'mobile_sticky_footer': 'YOUR_MOBILE_FOOTER_SLOT_ID',
    'home_hero': 'YOUR_HOME_HERO_SLOT_ID',
    'home_sidebar': 'YOUR_HOME_SIDEBAR_SLOT_ID',
    'category_header': 'YOUR_CATEGORY_HEADER_SLOT_ID',
    'search_results': 'YOUR_SEARCH_RESULTS_SLOT_ID'
  };
  
  return slotMap[positionKey] || 'DEFAULT_SLOT_ID';
}
