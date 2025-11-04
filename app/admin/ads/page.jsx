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
import { 
  Settings, 
  BarChart3, 
  Eye, 
  MousePointer, 
  DollarSign,
  Plus,
  Edit,
  Trash2,
  Save,
  X
} from 'lucide-react';

export default function AdManagementPage() {
  const [adPositions, setAdPositions] = useState([]);
  const [adSlots, setAdSlots] = useState([]);
  const [performanceData, setPerformanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingPosition, setEditingPosition] = useState(null);
  const [editingSlot, setEditingSlot] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form states
  const [newPosition, setNewPosition] = useState({
    positionName: '',
    positionKey: '',
    description: '',
    pageType: 'all',
    location: 'header',
    isActive: true
  });

  const [newSlot, setNewSlot] = useState({
    positionId: '',
    slotName: '',
    adClientId: 'ca-pub-3536158399576400',
    adSlotId: '',
    adFormat: 'auto',
    isResponsive: true,
    isActive: true
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Load ad positions
      const positionsResponse = await fetch('/api/admin/ads/positions');
      const positionsData = await positionsResponse.json();
      setAdPositions(positionsData.data || []);

      // Load ad slots
      const slotsResponse = await fetch('/api/admin/ads/slots');
      const slotsData = await slotsResponse.json();
      setAdSlots(slotsData.data || []);

      // Load performance data
      const performanceResponse = await fetch('/api/ads/track?days=30');
      const performanceData = await performanceResponse.json();
      setPerformanceData(performanceData.data || []);

    } catch (error) {
      console.error('Error loading data:', error);
      setError('Failed to load ad management data');
    } finally {
      setLoading(false);
    }
  };

  const handleSavePosition = async (position) => {
    try {
      const response = await fetch('/api/admin/ads/positions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(position),
      });

      if (response.ok) {
        setSuccess('Ad position saved successfully');
        setEditingPosition(null);
        loadData();
      } else {
        setError('Failed to save ad position');
      }
    } catch (error) {
      console.error('Error saving position:', error);
      setError('Failed to save ad position');
    }
  };

  const handleSaveSlot = async (slot) => {
    try {
      const response = await fetch('/api/admin/ads/slots', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(slot),
      });

      if (response.ok) {
        setSuccess('Ad slot saved successfully');
        setEditingSlot(null);
        loadData();
      } else {
        setError('Failed to save ad slot');
      }
    } catch (error) {
      console.error('Error saving slot:', error);
      setError('Failed to save ad slot');
    }
  };

  const handleTogglePosition = async (positionId, isActive) => {
    try {
      const response = await fetch(`/api/admin/ads/positions/${positionId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive }),
      });

      if (response.ok) {
        setSuccess('Position status updated');
        loadData();
      } else {
        setError('Failed to update position status');
      }
    } catch (error) {
      console.error('Error updating position:', error);
      setError('Failed to update position status');
    }
  };

  const handleToggleSlot = async (slotId, isActive) => {
    try {
      const response = await fetch(`/api/admin/ads/slots/${slotId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive }),
      });

      if (response.ok) {
        setSuccess('Slot status updated');
        loadData();
      } else {
        setError('Failed to update slot status');
      }
    } catch (error) {
      console.error('Error updating slot:', error);
      setError('Failed to update slot status');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading ad management data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Ad Management</h1>
        <p className="text-gray-600">Manage ad positions, slots, and track performance</p>
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

      <Tabs defaultValue="positions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="positions" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Positions
          </TabsTrigger>
          <TabsTrigger value="slots" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Slots
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Performance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="positions" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Ad Positions</h2>
            <Button onClick={() => setShowAddForm(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Position
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {adPositions.map((position) => (
              <Card key={position._id} className="relative">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{position.positionName}</CardTitle>
                    <Badge variant={position.isActive ? "default" : "secondary"}>
                      {position.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
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
                  {position.description && (
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Description</Label>
                      <p className="text-sm text-gray-900">{position.description}</p>
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={position.isActive}
                        onCheckedChange={(checked) => handleTogglePosition(position._id, checked)}
                      />
                      <Label className="text-sm">Active</Label>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingPosition(position)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="slots" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Ad Slots</h2>
            <Button onClick={() => setShowAddForm(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Slot
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {adSlots.map((slot) => (
              <Card key={slot._id} className="relative">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{slot.slotName}</CardTitle>
                    <Badge variant={slot.isActive ? "default" : "secondary"}>
                      {slot.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Position</Label>
                    <p className="text-sm text-gray-900">{slot.positionId}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Ad Slot ID</Label>
                    <p className="text-sm text-gray-900 font-mono">{slot.adSlotId}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Format</Label>
                    <p className="text-sm text-gray-900">{slot.adFormat}</p>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={slot.isActive}
                        onCheckedChange={(checked) => handleToggleSlot(slot._id, checked)}
                      />
                      <Label className="text-sm">Active</Label>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingSlot(slot)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
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
                  <DollarSign className="h-8 w-8 text-yellow-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">
                      ${performanceData.reduce((sum, item) => sum + (item.totalRevenue || 0), 0).toFixed(2)}
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
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Performance by Slot</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {performanceData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{item.slotId}</p>
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
                      <div className="text-center">
                        <p className="font-medium">${(item.totalRevenue || 0).toFixed(2)}</p>
                        <p className="text-gray-600">Revenue</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

