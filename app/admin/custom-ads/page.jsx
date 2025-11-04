"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Settings, 
  BarChart3, 
  Eye, 
  MousePointer, 
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Upload,
  Image,
  Type,
  Code,
  MapPin
} from 'lucide-react';

export default function CustomAdManagementPage() {
  const [customAds, setCustomAds] = useState([]);
  const [adPositions, setAdPositions] = useState([]);
  const [adPlacements, setAdPlacements] = useState([]);
  const [performanceData, setPerformanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingAd, setEditingAd] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form states
  const [newAd, setNewAd] = useState({
    title: '',
    description: '',
    adType: 'banner',
    content: {
      imageUrl: '',
      linkUrl: '',
      altText: '',
      title: '',
      description: '',
      buttonText: '',
      html: ''
    },
    isActive: true
  });

  const [newPlacement, setNewPlacement] = useState({
    positionKey: '',
    adId: '',
    pageType: 'all',
    isActive: true
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Load custom ads
      const adsResponse = await fetch('/api/admin/custom-ads');
      const adsData = await adsResponse.json();
      setCustomAds(adsData.data || []);

      // Load ad positions
      const positionsResponse = await fetch('/api/admin/ads/positions');
      const positionsData = await positionsResponse.json();
      setAdPositions(positionsData.data || []);

      // Load ad placements
      const placementsResponse = await fetch('/api/admin/custom-ads/placements');
      const placementsData = await placementsResponse.json();
      setAdPlacements(placementsData.data || []);

      // Load performance data
      const performanceResponse = await fetch('/api/ads/track?days=30');
      const performanceData = await performanceResponse.json();
      setPerformanceData(performanceData.data || []);

    } catch (error) {
      console.error('Error loading data:', error);
      setError('Failed to load custom ad management data');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAd = async (ad) => {
    try {
      const response = await fetch('/api/admin/custom-ads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ad),
      });

      if (response.ok) {
        setSuccess('Custom ad saved successfully');
        setEditingAd(null);
        setShowAddForm(false);
        loadData();
      } else {
        setError('Failed to save custom ad');
      }
    } catch (error) {
      console.error('Error saving ad:', error);
      setError('Failed to save custom ad');
    }
  };

  const handleSavePlacement = async (placement) => {
    try {
      const response = await fetch('/api/admin/custom-ads/placements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(placement),
      });

      if (response.ok) {
        setSuccess('Ad placement saved successfully');
        loadData();
      } else {
        setError('Failed to save ad placement');
      }
    } catch (error) {
      console.error('Error saving placement:', error);
      setError('Failed to save ad placement');
    }
  };

  const handleToggleAd = async (adId, isActive) => {
    try {
      const response = await fetch(`/api/admin/custom-ads/${adId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive }),
      });

      if (response.ok) {
        setSuccess('Ad status updated');
        loadData();
      } else {
        setError('Failed to update ad status');
      }
    } catch (error) {
      console.error('Error updating ad:', error);
      setError('Failed to update ad status');
    }
  };

  const handleTogglePlacement = async (placementId, isActive) => {
    try {
      const response = await fetch(`/api/admin/custom-ads/placements/${placementId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive }),
      });

      if (response.ok) {
        setSuccess('Placement status updated');
        loadData();
      } else {
        setError('Failed to update placement status');
      }
    } catch (error) {
      console.error('Error updating placement:', error);
      setError('Failed to update placement status');
    }
  };

  const handleDeleteAd = async (adId) => {
    if (!confirm('Are you sure you want to delete this ad?')) return;
    
    try {
      const response = await fetch(`/api/admin/custom-ads/${adId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSuccess('Ad deleted successfully');
        loadData();
      } else {
        setError('Failed to delete ad');
      }
    } catch (error) {
      console.error('Error deleting ad:', error);
      setError('Failed to delete ad');
    }
  };

  const getAdTypeIcon = (adType) => {
    switch (adType) {
      case 'banner': return <Image className="h-4 w-4" />;
      case 'text': return <Type className="h-4 w-4" />;
      case 'html': return <Code className="h-4 w-4" />;
      default: return <Settings className="h-4 w-4" />;
    }
  };

  const getPositionName = (positionKey) => {
    const position = adPositions.find(p => p.positionKey === positionKey);
    return position ? position.positionName : positionKey;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading custom ad management data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Custom Ad Management</h1>
        <p className="text-gray-600">Manage your custom advertisements and their positions across the website</p>
      </div>

      {error && (
        <Alert className="mb-6 border-red-200 bg-red-50">
          <AlertDescription className="text-red-800">{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="mb-6 border-green-200 bg-green-50">
          <AlertDescription className="text-green-800">{success}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="ads" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="ads" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Custom Ads
          </TabsTrigger>
          <TabsTrigger value="placements" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Placements
          </TabsTrigger>
          <TabsTrigger value="positions" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Positions
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Performance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ads" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Custom Advertisements</h2>
            <Button onClick={() => setShowAddForm(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Custom Ad
            </Button>
          </div>

          {/* Add/Edit Form */}
          {showAddForm && (
            <Card>
              <CardHeader>
                <CardTitle>Add New Custom Ad</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Ad Title</Label>
                    <Input
                      id="title"
                      value={newAd.title}
                      onChange={(e) => setNewAd({...newAd, title: e.target.value})}
                      placeholder="Enter ad title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="adType">Ad Type</Label>
                    <Select value={newAd.adType} onValueChange={(value) => setNewAd({...newAd, adType: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="banner">Banner Image</SelectItem>
                        <SelectItem value="text">Text Ad</SelectItem>
                        <SelectItem value="html">HTML Ad</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newAd.description}
                    onChange={(e) => setNewAd({...newAd, description: e.target.value})}
                    placeholder="Enter ad description"
                  />
                </div>

                {/* Ad Type Specific Fields */}
                {newAd.adType === 'banner' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="imageUrl">Image URL</Label>
                      <Input
                        id="imageUrl"
                        value={newAd.content.imageUrl}
                        onChange={(e) => setNewAd({...newAd, content: {...newAd.content, imageUrl: e.target.value}})}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                    <div>
                      <Label htmlFor="linkUrl">Link URL</Label>
                      <Input
                        id="linkUrl"
                        value={newAd.content.linkUrl}
                        onChange={(e) => setNewAd({...newAd, content: {...newAd.content, linkUrl: e.target.value}})}
                        placeholder="https://example.com"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="altText">Alt Text</Label>
                      <Input
                        id="altText"
                        value={newAd.content.altText}
                        onChange={(e) => setNewAd({...newAd, content: {...newAd.content, altText: e.target.value}})}
                        placeholder="Image alt text"
                      />
                    </div>
                  </div>
                )}

                {newAd.adType === 'text' && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="textTitle">Title</Label>
                      <Input
                        id="textTitle"
                        value={newAd.content.title}
                        onChange={(e) => setNewAd({...newAd, content: {...newAd.content, title: e.target.value}})}
                        placeholder="Ad title"
                      />
                    </div>
                    <div>
                      <Label htmlFor="textDescription">Description</Label>
                      <Textarea
                        id="textDescription"
                        value={newAd.content.description}
                        onChange={(e) => setNewAd({...newAd, content: {...newAd.content, description: e.target.value}})}
                        placeholder="Ad description"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="textLinkUrl">Link URL</Label>
                        <Input
                          id="textLinkUrl"
                          value={newAd.content.linkUrl}
                          onChange={(e) => setNewAd({...newAd, content: {...newAd.content, linkUrl: e.target.value}})}
                          placeholder="https://example.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="buttonText">Button Text</Label>
                        <Input
                          id="buttonText"
                          value={newAd.content.buttonText}
                          onChange={(e) => setNewAd({...newAd, content: {...newAd.content, buttonText: e.target.value}})}
                          placeholder="Learn More"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {newAd.adType === 'html' && (
                  <div>
                    <Label htmlFor="htmlContent">HTML Content</Label>
                    <Textarea
                      id="htmlContent"
                      value={newAd.content.html}
                      onChange={(e) => setNewAd({...newAd, content: {...newAd.content, html: e.target.value}})}
                      placeholder="Enter HTML content"
                      rows={6}
                    />
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <Switch
                    checked={newAd.isActive}
                    onCheckedChange={(checked) => setNewAd({...newAd, isActive: checked})}
                  />
                  <Label>Active</Label>
                </div>

                <div className="flex gap-2">
                  <Button onClick={() => handleSaveAd(newAd)} className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    Save Ad
                  </Button>
                  <Button variant="outline" onClick={() => setShowAddForm(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Ads List */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {customAds.map((ad) => (
              <Card key={ad._id} className="relative">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getAdTypeIcon(ad.adType)}
                      <CardTitle className="text-lg">{ad.title}</CardTitle>
                    </div>
                    <Badge variant={ad.isActive ? "default" : "secondary"}>
                      {ad.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Type</Label>
                    <p className="text-sm text-gray-900 capitalize">{ad.adType}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Description</Label>
                    <p className="text-sm text-gray-900">{ad.description}</p>
                  </div>
                  
                  {ad.adType === 'banner' && ad.content.imageUrl && (
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Preview</Label>
                      <img 
                        src={ad.content.imageUrl} 
                        alt={ad.content.altText}
                        className="w-full h-20 object-cover rounded border"
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={ad.isActive}
                        onCheckedChange={(checked) => handleToggleAd(ad._id, checked)}
                      />
                      <Label className="text-sm">Active</Label>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingAd(ad)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteAd(ad._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="placements" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Ad Placements</h2>
            <Button onClick={() => setShowAddForm(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Placement
            </Button>
          </div>

          {/* Add Placement Form */}
          {showAddForm && (
            <Card>
              <CardHeader>
                <CardTitle>Add New Ad Placement</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="positionKey">Position</Label>
                    <Select value={newPlacement.positionKey} onValueChange={(value) => setNewPlacement({...newPlacement, positionKey: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select position" />
                      </SelectTrigger>
                      <SelectContent>
                        {adPositions.map((position) => (
                          <SelectItem key={position.positionKey} value={position.positionKey}>
                            {position.positionName} ({position.pageType})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="adId">Custom Ad</Label>
                    <Select value={newPlacement.adId} onValueChange={(value) => setNewPlacement({...newPlacement, adId: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select ad" />
                      </SelectTrigger>
                      <SelectContent>
                        {customAds.map((ad) => (
                          <SelectItem key={ad._id} value={ad._id}>
                            {ad.title} ({ad.adType})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="pageType">Page Type</Label>
                  <Select value={newPlacement.pageType} onValueChange={(value) => setNewPlacement({...newPlacement, pageType: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Pages</SelectItem>
                      <SelectItem value="home">Home Page</SelectItem>
                      <SelectItem value="post">Post Pages</SelectItem>
                      <SelectItem value="category">Category Pages</SelectItem>
                      <SelectItem value="search">Search Pages</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    checked={newPlacement.isActive}
                    onCheckedChange={(checked) => setNewPlacement({...newPlacement, isActive: checked})}
                  />
                  <Label>Active</Label>
                </div>

                <div className="flex gap-2">
                  <Button onClick={() => handleSavePlacement(newPlacement)} className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    Save Placement
                  </Button>
                  <Button variant="outline" onClick={() => setShowAddForm(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Placements List */}
          <div className="space-y-4">
            {adPlacements.map((placement) => {
              const ad = customAds.find(a => a._id === placement.adId);
              return (
                <Card key={placement._id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div>
                          <h3 className="font-semibold">{getPositionName(placement.positionKey)}</h3>
                          <p className="text-sm text-gray-600">
                            {ad ? ad.title : 'Ad not found'} • {placement.pageType}
                          </p>
                        </div>
                        <Badge variant={placement.isActive ? "default" : "secondary"}>
                          {placement.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={placement.isActive}
                          onCheckedChange={(checked) => handleTogglePlacement(placement._id, checked)}
                        />
                        <Label className="text-sm">Active</Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="positions" className="space-y-6">
          <h2 className="text-2xl font-semibold">Available Positions</h2>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {adPositions.map((position) => (
              <Card key={position._id}>
                <CardHeader>
                  <CardTitle className="text-lg">{position.positionName}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Position Key</Label>
                    <p className="text-sm text-gray-900 font-mono">{position.positionKey}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Page Type</Label>
                    <p className="text-sm text-gray-900">{position.pageType}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Location</Label>
                    <p className="text-sm text-gray-900">{position.location}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Status</Label>
                    <Badge variant={position.isActive ? "default" : "secondary"}>
                      {position.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <h2 className="text-2xl font-semibold">Performance Analytics</h2>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Eye className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Views</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {performanceData.reduce((sum, item) => sum + (item.totalViews || 0), 0)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <MousePointer className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Clicks</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {performanceData.reduce((sum, item) => sum + (item.totalClicks || 0), 0)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <BarChart3 className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">CTR</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {(() => {
                        const totalViews = performanceData.reduce((sum, item) => sum + (item.totalViews || 0), 0);
                        const totalClicks = performanceData.reduce((sum, item) => sum + (item.totalClicks || 0), 0);
                        return totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(2) : 0;
                      })()}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Settings className="h-8 w-8 text-orange-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Ads</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {customAds.filter(ad => ad.isActive).length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Performance by Ad</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {performanceData.map((item, index) => {
                  const ad = customAds.find(a => a._id === item.adId);
                  return (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{ad ? ad.title : 'Unknown Ad'}</p>
                        <p className="text-sm text-gray-600">{item.pageType} - {item.pageUrl}</p>
                      </div>
                      <div className="flex items-center space-x-6 text-sm">
                        <div className="text-center">
                          <p className="font-medium">{item.totalViews || 0}</p>
                          <p className="text-gray-600">Views</p>
                        </div>
                        <div className="text-center">
                          <p className="font-medium">{item.totalClicks || 0}</p>
                          <p className="text-gray-600">Clicks</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

