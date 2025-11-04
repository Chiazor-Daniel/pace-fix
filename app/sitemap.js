import { getDb } from '../utils/mongodb.js';

export default async function sitemap() {
  const baseUrl = 'https://pacesetterfrontier.com';
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms-and-conditions`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];

  try {
    const db = await getDb();
    
    // Fetch posts from MongoDB
    const postsCollection = db.collection('posts');
    const posts = await postsCollection
      .find({ status: 'publish' })
      .sort({ updatedAt: -1 })
      .limit(10000)
      .toArray();
    
    const postPages = posts.map(post => ({
      url: `${baseUrl}/post/${post.id}/${post.slug}`,
      lastModified: new Date(post.updatedAt || post.createdAt),
      changeFrequency: 'weekly',
      priority: 0.9,
    }));

    // Fetch categories from MongoDB
    const categoriesCollection = db.collection('categories');
    const categories = await categoriesCollection
      .find({})
      .sort({ name: 1 })
      .toArray();
    
    const categoryPages = categories.map(category => ({
      url: `${baseUrl}/category/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

    // Generate search result pages for popular terms
    const searchLogsCollection = db.collection('search_logs');
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    let searchPages = [];
    try {
      const searchAggregation = await searchLogsCollection.aggregate([
        {
          $match: {
            createdAt: { $gte: thirtyDaysAgo }
          }
        },
        {
          $group: {
            _id: '$searchTerm',
            searchCount: { $sum: 1 },
            lastSearch: { $max: '$createdAt' }
          }
        },
        {
          $match: {
            searchCount: { $gte: 5 }
          }
        },
        {
          $sort: { searchCount: -1 }
        },
        {
          $limit: 100
        }
      ]).toArray();
      
      searchPages = searchAggregation.map(term => ({
        url: `${baseUrl}/search/${encodeURIComponent(term._id.replace(/\s+/g, '-'))}`,
        lastModified: new Date(term.lastSearch),
        changeFrequency: 'weekly',
        priority: 0.6,
      }));
    } catch (error) {
      console.log('Search logs collection not found, skipping search pages');
    }

    // Generate date-based archive pages
    const twoYearsAgo = new Date();
    twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
    
    let dateArchives = [];
    try {
      const dateAggregation = await postsCollection.aggregate([
        {
          $match: {
            status: 'publish',
            createdAt: { $gte: twoYearsAgo }
          }
        },
        {
          $group: {
            _id: {
              year: { $year: '$createdAt' },
              month: { $month: '$createdAt' }
            },
            postCount: { $sum: 1 },
            archiveDate: { $first: '$createdAt' }
          }
        },
        {
          $match: {
            postCount: { $gte: 5 }
          }
        },
        {
          $sort: { '_id.year': -1, '_id.month': -1 }
        }
      ]).toArray();
      
      dateArchives = dateAggregation.map(archive => {
        const year = archive._id.year;
        const month = String(archive._id.month).padStart(2, '0');
        const day = '01'; // First day of the month
        
        return {
          url: `${baseUrl}/${year}/${month}/${day}`,
          lastModified: new Date(archive.archiveDate),
          changeFrequency: 'monthly',
          priority: 0.7,
        };
      });
    } catch (error) {
      console.log('Date archives generation failed:', error.message);
    }

    return [
      ...staticPages,
      ...postPages,
      ...categoryPages,
      ...searchPages,
      ...dateArchives,
    ];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Return at least static pages if database query fails
    return staticPages;
  }
}
