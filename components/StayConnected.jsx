"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, MapPin, Clock, CheckCircle } from 'lucide-react';

export default function StayConnected() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      // Simulate subscription (you can implement actual email subscription later)
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubscribed(true);
      setEmail('');
    } catch (error) {
      console.error('Subscription error:', error);
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: "info@pacesetterfrontier.com",
      link: "mailto:info@pacesetterfrontier.com"
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Phone",
      value: "+234 803 123 4567",
      link: "tel:+2348031234567"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "Address",
      value: "Enugu, Nigeria",
      link: "#"
    },
    {
      icon: <Clock className="w-5 h-5" />,
      label: "Office Hours",
      value: "Mon - Fri: 9AM - 6PM",
      link: "#"
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Newsletter Subscription */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Stay Connected
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            Subscribe to our newsletter for the latest news, updates, and exclusive content.
          </p>
          
          {subscribed ? (
            <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-green-800 font-medium">Successfully subscribed!</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1"
                />
                <Button type="submit" disabled={loading}>
                  {loading ? 'Subscribing...' : 'Subscribe'}
                </Button>
              </div>
            </form>
          )}

          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">Weekly Newsletter</Badge>
            <Badge variant="outline">Breaking News</Badge>
            <Badge variant="outline">Exclusive Content</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="w-5 h-5" />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {contactInfo.map((item, index) => (
            <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="text-blue-600">
                {item.icon}
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">{item.label}</div>
                {item.link !== '#' ? (
                  <a 
                    href={item.link} 
                    className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    {item.value}
                  </a>
                ) : (
                  <div className="text-sm text-gray-600">{item.value}</div>
                )}
              </div>
            </div>
          ))}

          <div className="pt-4 border-t">
            <h4 className="font-medium mb-2">Follow Us</h4>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <a href="https://www.facebook.com/pacefrontier/" target="_blank" rel="noopener noreferrer">
                  Facebook
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href="https://www.instagram.com/pacefrontier/" target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href="https://www.threads.net/@pacefrontier" target="_blank" rel="noopener noreferrer">
                  Threads
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

