import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = "mongodb+srv://buzz:buzz@cluster0.j2e8o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Connection pool
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  clientPromise = client.connect();
}

export default clientPromise;

// Helper function to get the database
export async function getDb() {
  const client = await clientPromise;
  return client.db("pace-setter");
}

// Helper functions for collections
export async function getLikesCollection() {
  const db = await getDb();
  return db.collection("likes");
}

export async function getViewsCollection() {
  const db = await getDb();
  return db.collection("views");
}

// Custom Ad management collections
export async function getAdPositionsCollection() {
  const db = await getDb();
  return db.collection("ad_positions");
}

export async function getCustomAdsCollection() {
  const db = await getDb();
  return db.collection("custom_ads");
}

export async function getAdPlacementsCollection() {
  const db = await getDb();
  return db.collection("ad_placements");
}

export async function getAdPerformanceCollection() {
  const db = await getDb();
  return db.collection("ad_performance");
}

export async function getSearchLogsCollection() {
  const db = await getDb();
  return db.collection("search_logs");
}

export async function getCommentsCollection() {
  const db = await getDb();
  return db.collection("comments");
}

export async function getReactionsCollection() {
  const db = await getDb();
  return db.collection("reactions");
}
