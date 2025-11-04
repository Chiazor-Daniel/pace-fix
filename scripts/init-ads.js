#!/usr/bin/env node

/**
 * Ad Management System Initialization Script
 * 
 * This script initializes the ad management collections in MongoDB
 * Run this after setting up your MongoDB connection
 */

const fetch = require('node-fetch');

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';

async function initializeAdSystem() {
  console.log('🚀 Initializing Ad Management System...\n');

  try {
    // Initialize ad collections
    console.log('📊 Creating ad collections and default positions...');
    const initResponse = await fetch(`${API_BASE_URL}/api/admin/ads/init`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (initResponse.ok) {
      const result = await initResponse.json();
      console.log('✅', result.message);
    } else {
      const error = await initResponse.json();
      console.log('❌ Error:', error.message);
      return;
    }

    // Verify collections were created
    console.log('\n🔍 Verifying ad positions...');
    const positionsResponse = await fetch(`${API_BASE_URL}/api/admin/ads/positions`);
    
    if (positionsResponse.ok) {
      const positions = await positionsResponse.json();
      console.log(`✅ Found ${positions.data.length} ad positions`);
      
      // List all positions
      positions.data.forEach((position, index) => {
        console.log(`   ${index + 1}. ${position.positionName} (${position.positionKey})`);
      });
    }

    // Verify ad slots
    console.log('\n🔍 Verifying ad slots...');
    const slotsResponse = await fetch(`${API_BASE_URL}/api/admin/ads/slots`);
    
    if (slotsResponse.ok) {
      const slots = await slotsResponse.json();
      console.log(`✅ Found ${slots.data.length} ad slots`);
    }

    console.log('\n🎉 Ad Management System initialized successfully!');
    console.log('\n📋 Next Steps:');
    console.log('1. Go to /admin/ads to manage your ad positions');
    console.log('2. Update ad slot IDs with your actual Google AdSense slot IDs');
    console.log('3. Enable/disable ad positions as needed');
    console.log('4. Monitor performance through the analytics dashboard');
    console.log('\n🔗 Admin URL: http://localhost:3000/admin/ads');

  } catch (error) {
    console.error('❌ Error initializing ad system:', error.message);
    console.log('\n💡 Make sure your Next.js server is running and MongoDB is connected');
  }
}

// Run the initialization
initializeAdSystem();

