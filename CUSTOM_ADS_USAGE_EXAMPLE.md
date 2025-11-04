# Custom Ad Management System - Usage Guide

## 🎯 What This System Does

This system allows your client to **manage their own custom advertisements** (not Google AdSense) across all pages of the website. They can:

- ✅ **See exactly where ads are showing** on the website
- ✅ **Easily add/remove ads** from any position
- ✅ **Create different types of ads** (banner images, text ads, HTML ads)
- ✅ **Track performance** of their custom ads
- ✅ **Control which pages** show which ads

## 🚀 Quick Start

### 1. Initialize the System
```bash
# Make a POST request to initialize the collections
curl -X POST http://localhost:3000/api/admin/ads/init
```

### 2. Access Admin Dashboard
- Go to `/admin/custom-ads` (after logging in with admin credentials)
- You'll see 4 tabs: Custom Ads, Placements, Positions, Performance

### 3. Create Your First Custom Ad
1. Click "Add Custom Ad"
2. Choose ad type:
   - **Banner**: Image with link
   - **Text**: Text with button
   - **HTML**: Custom HTML content
3. Fill in the details and save

### 4. Place the Ad on Your Website
1. Go to "Placements" tab
2. Click "Add Placement"
3. Select which position and which ad to show
4. Choose which pages to show it on

## 📍 Available Ad Positions

| Position | Where It Shows | Page Types |
|----------|----------------|------------|
| `header_banner` | Top of all pages | All pages |
| `sidebar_top` | Top of sidebar | Post pages |
| `sidebar_middle` | Middle of sidebar | Post pages |
| `sidebar_bottom` | Bottom of sidebar | Post pages |
| `below_title` | Below article title | Post pages |
| `in_content` | Within article content | Post pages |
| `end_of_article` | End of article | Post pages |
| `mobile_sticky_footer` | Sticky footer (mobile) | All pages |
| `home_hero` | Hero section | Home page |
| `home_sidebar` | Sidebar | Home page |
| `category_header` | Category page header | Category pages |
| `search_results` | Search results | Search pages |

## 💻 How to Use Custom Ads in Your Code

### Replace Existing Ad Components

Instead of using the old Google AdSense components, use the new custom ad components:

```jsx
// OLD WAY (Google AdSense)
import { SidebarAd, EndOfArticleAd } from "../../components/AdsPlacements"

// NEW WAY (Custom Ads)
import { 
  SidebarTopCustomAd, 
  EndOfArticleCustomAd 
} from '@/components/CustomAdManager';

function PostPage() {
  return (
    <div>
      <h1>Article Title</h1>
      <SidebarTopCustomAd /> {/* Shows custom ad if placed */}
      
      <div className="content">
        <p>Article content...</p>
        <EndOfArticleCustomAd /> {/* Shows custom ad if placed */}
      </div>
    </div>
  );
}
```

### Add Custom Ads to Any Page

```jsx
import { 
  HeaderBannerCustomAd,
  CustomAd 
} from '@/components/CustomAdManager';

function HomePage() {
  return (
    <div>
      <HeaderBannerCustomAd /> {/* Shows at top of page */}
      
      <main>
        <h1>Welcome to our site</h1>
        <p>Content here...</p>
      </main>
      
      {/* Custom position for specific pages */}
      <CustomAd 
        positionKey="home_hero" 
        pageType="home"
        className="my-custom-ad-class"
      />
    </div>
  );
}
```

### Add to Existing Components

Update your existing components to include custom ads:

```jsx
// In your existing post component
import { BelowTitleCustomAd, InContentCustomAd } from '@/components/CustomAdManager';

function PostContent({ post }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <BelowTitleCustomAd /> {/* Custom ad below title */}
      
      <div className="post-content">
        {post.content}
        <InContentCustomAd /> {/* Custom ad in content */}
      </div>
    </article>
  );
}
```

## 🎨 Ad Types You Can Create

### 1. Banner Ad
```json
{
  "title": "Summer Sale Banner",
  "adType": "banner",
  "content": {
    "imageUrl": "/images/summer-sale.jpg",
    "linkUrl": "/summer-sale",
    "altText": "Summer Sale - 50% Off"
  }
}
```

### 2. Text Ad
```json
{
  "title": "Newsletter Signup",
  "adType": "text",
  "content": {
    "title": "Stay Updated!",
    "description": "Get the latest news delivered to your inbox",
    "linkUrl": "/newsletter",
    "buttonText": "Subscribe Now"
  }
}
```

### 3. HTML Ad
```json
{
  "title": "Custom HTML Ad",
  "adType": "html",
  "content": {
    "html": "<div class='custom-ad'><h3>Special Offer</h3><p>Get 20% off today!</p><a href='/offer' class='btn'>Claim Now</a></div>"
  }
}
```

## 📊 What Your Client Can See

### Admin Dashboard Features:
1. **Custom Ads Tab**: Create and manage all custom ads
2. **Placements Tab**: See exactly where each ad is placed
3. **Positions Tab**: View all available positions on the website
4. **Performance Tab**: Track views, clicks, and performance

### Easy Management:
- ✅ **Toggle ads on/off** instantly
- ✅ **Remove ads** from positions with one click
- ✅ **See preview** of banner ads
- ✅ **Track performance** in real-time
- ✅ **Manage multiple ads** easily

## 🔧 API Endpoints

### Custom Ads
- `GET /api/admin/custom-ads` - List all custom ads
- `POST /api/admin/custom-ads` - Create new custom ad
- `PATCH /api/admin/custom-ads/[id]` - Update custom ad
- `DELETE /api/admin/custom-ads/[id]` - Delete custom ad

### Ad Placements
- `GET /api/admin/custom-ads/placements` - List all placements
- `POST /api/admin/custom-ads/placements` - Create new placement
- `PATCH /api/admin/custom-ads/placements/[id]` - Update placement
- `DELETE /api/admin/custom-ads/placements/[id]` - Delete placement

### Performance Tracking
- `POST /api/ads/track` - Track ad performance
- `GET /api/ads/track` - Get performance analytics

## 🎯 Benefits for Your Client

1. **Full Control**: They can see and manage every ad on their website
2. **Easy Management**: Simple interface to add/remove ads
3. **Performance Tracking**: See which ads are working
4. **Flexible Placement**: Put ads anywhere on the website
5. **Multiple Ad Types**: Banner, text, or custom HTML ads
6. **Page-Specific**: Show different ads on different pages

## 🚀 Next Steps

1. **Initialize the system** with the API call above
2. **Add custom ad components** to your existing pages
3. **Show your client** the admin dashboard at `/admin/custom-ads`
4. **Create sample ads** to demonstrate the system
5. **Train your client** on how to manage their ads

The system is now ready to use! Your client will have complete control over their custom advertisements and can easily see where each ad appears on their website.

