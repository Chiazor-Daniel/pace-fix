"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, CreditCard, Banknote, Smartphone, Globe, CheckCircle } from 'lucide-react';

export default function SupportDonate() {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [donationAmount, setDonationAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const donationAmounts = ['1000', '2500', '5000', '10000', '25000'];

  const paymentMethods = [
    {
      id: 'bank-transfer',
      name: 'Bank Transfer',
      icon: <Banknote className="w-5 h-5" />,
      description: 'Direct bank transfer',
      details: 'Account: 1234567890\nBank: Access Bank\nName: Pacesetter Frontier Magazine'
    },
    {
      id: 'mobile-money',
      name: 'Mobile Money',
      icon: <Smartphone className="w-5 h-5" />,
      description: 'Pay with mobile money',
      details: 'MTN: 08031234567\nAirtel: 08021234567\n9mobile: 08091234567'
    },
    {
      id: 'online-payment',
      name: 'Online Payment',
      icon: <CreditCard className="w-5 h-5" />,
      description: 'Pay with card or PayPal',
      details: 'Secure online payment processing'
    }
  ];

  const handleDonate = async () => {
    if (!selectedMethod || (!donationAmount && !customAmount)) {
      alert('Please select a payment method and amount');
      return;
    }

    setProcessing(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSuccess(true);
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  if (success) {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="p-6 text-center">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
          <p className="text-gray-600 mb-4">
            Your support means the world to us. We'll use your donation to continue bringing you quality journalism.
          </p>
          <Button onClick={() => {
            setSuccess(false);
            setSelectedMethod('');
            setDonationAmount('');
            setCustomAmount('');
          }}>
            Make Another Donation
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Heart className="w-8 h-8 text-red-500" />
          <h2 className="text-2xl font-bold">Support Pacesetter Frontier</h2>
        </div>
        <p className="text-gray-600 mb-6">
          Help us continue delivering quality journalism and independent reporting. 
          Your support enables us to maintain our editorial independence and bring you the stories that matter.
        </p>
      </div>

      {/* Donation Amount */}
      <Card>
        <CardHeader>
          <CardTitle>Choose Amount</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {donationAmounts.map((amount) => (
              <Button
                key={amount}
                variant={donationAmount === amount ? "default" : "outline"}
                onClick={() => {
                  setDonationAmount(amount);
                  setCustomAmount('');
                }}
                className="h-12"
              >
                ₦{parseInt(amount).toLocaleString()}
              </Button>
            ))}
          </div>
          
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Custom amount"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value);
                setDonationAmount('');
              }}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-gray-500 self-center">NGN</span>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                selectedMethod === method.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedMethod(method.id)}
            >
              <div className="flex items-center gap-3">
                <div className="text-blue-600">
                  {method.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{method.name}</h4>
                  <p className="text-sm text-gray-600">{method.description}</p>
                  {selectedMethod === method.id && (
                    <p className="text-xs text-gray-500 mt-1 whitespace-pre-line">
                      {method.details}
                    </p>
                  )}
                </div>
                <div className={`w-4 h-4 rounded-full border-2 ${
                  selectedMethod === method.id
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300'
                }`}>
                  {selectedMethod === method.id && (
                    <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Donate Button */}
      <div className="text-center">
        <Button
          onClick={handleDonate}
          disabled={processing || !selectedMethod || (!donationAmount && !customAmount)}
          size="lg"
          className="px-8 py-3"
        >
          {processing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Processing...
            </>
          ) : (
            <>
              <Heart className="w-4 h-4 mr-2" />
              Donate ₦{(donationAmount || customAmount || 0).toLocaleString()}
            </>
          )}
        </Button>
        
        <p className="text-xs text-gray-500 mt-2">
          Your donation is secure and will be used to support independent journalism
        </p>
      </div>

      {/* Impact Statement */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-2">Your Impact</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">50+</div>
              <div className="text-sm text-gray-600">Articles Published Monthly</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">10K+</div>
              <div className="text-sm text-gray-600">Readers Reached</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">24/7</div>
              <div className="text-sm text-gray-600">News Coverage</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

