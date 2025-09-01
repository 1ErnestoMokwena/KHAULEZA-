{currentView === 'dao' && (  // Additional Features
  const [hasVehiclePass, setHasVehiclePass] = useState(false);import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Clock, DollarSign, User, Wallet, Car, Star, Shield, Zap, ToggleLeft, ToggleRight, Bell, TrendingUp, Battery, Smartphone } from 'lucide-react';

const KhaulezaPlatform = () => {
  const [userType, setUserType] = useState('rider'); // rider or driver
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  // Rider State
  const [currentView, setCurrentView] = useState('home');
  const [rideState, setRideState] = useState('idle');
  const [pickupLocation, setPickupLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [selectedVehicleCategory, setSelectedVehicleCategory] = useState('sedan');
  const [estimatedFare, setEstimatedFare] = useState(null);
  const [availableDrivers, setAvailableDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [currentRide, setCurrentRide] = useState(null);
  const [mileBalance, setMileBalance] = useState(250);

  // Driver State
  const [driverOnline, setDriverOnline] = useState(false);
  const [driverView, setDriverView] = useState('dashboard');
  const [pendingRideRequest, setPendingRideRequest] = useState(null);
  const [driverCurrentRide, setDriverCurrentRide] = useState(null);
  const [autoBiddingEnabled, setAutoBiddingEnabled] = useState(false);
  const [bidMargin, setBidMargin] = useState(10);
  const [driverStats, setDriverStats] = useState({
    todayEarnings: '450.2 MATIC',
    todayMileEarned: '60 MILE',
    ridesCompleted: 12,
    rating: 4.87,
    stakedTokens: 150,
    bidSuccessRate: 78,
    totalBids: 45
  });

  // Additional advanced state
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'reward', message: 'You earned 5 MILE tokens!', timestamp: '2 min ago', read: false },
    { id: 2, type: 'dao', message: 'New proposal: Reduce Platform Fee', timestamp: '1 hour ago', read: false },
    { id: 3, type: 'referral', message: 'Someone used your referral code!', timestamp: '3 hours ago', read: true }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [priceHistory, setPriceHistory] = useState([
    { route: 'Airport → Downtown', avgPrice: '45.2 MATIC', trend: '+5.2%' },
    { route: 'Mall → University', avgPrice: '28.7 MATIC', trend: '-2.1%' },
    { route: 'Hotel → Station', avgPrice: '33.4 MATIC', trend: '+8.7%' }
  ]);
  const [liquidityPools, setLiquidityPools] = useState([
    { pair: 'MILE/MATIC', apy: '127%', tvl: '2.4M MATIC', yourStake: '0 MILE' },
    { pair: 'MILE/USDC', apy: '89%', tvl: '1.8M USDC', yourStake: '150 MILE' }
  ]);
  const [verificationStatus, setVerificationStatus] = useState('pending');
  const [referralCode, setReferralCode] = useState('');
  const [userReferralCode, setUserReferralCode] = useState('KHAU123');
  const [referralStats, setReferralStats] = useState({ 
    totalReferrals: 5, 
    totalRewards: 75, 
    riderReferrals: 3, 
    driverReferrals: 2 
  });

  const vehicleCategories = [
    { id: 'motorcycle', name: 'Motorcycle', subtitle: 'Parcels', icon: '🏍️', multiplier: 0.6 },
    { id: 'hatchback', name: 'Hatchback', subtitle: 'Economy', icon: '🚗', multiplier: 0.9 },
    { id: 'sedan', name: 'Sedan', subtitle: 'Standard', icon: '🚙', multiplier: 1.0 },
    { id: 'premium', name: 'Premium Sedan', subtitle: 'Luxury', icon: '🚘', multiplier: 1.5 },
    { id: 'group', name: '7-Seater', subtitle: 'Group', icon: '🚐', multiplier: 1.4 },
    { id: 'van', name: 'Van', subtitle: 'Courier', icon: '🚛', multiplier: 1.2 }
  ];

  const [rideHistory] = useState([
    { id: 1, date: '2024-08-29', from: 'Downtown Plaza', to: 'Tech Park', fare: '15.5 MATIC', mileEarned: '5 MILE', rating: 5 },
    { id: 2, date: '2024-08-28', from: 'Airport Terminal', to: 'Hotel District', fare: '42.8 MATIC', mileEarned: '5 MILE', rating: 4 },
    { id: 3, date: '2024-08-27', from: 'Mall Center', to: 'University Ave', fare: '8.2 MATIC', mileEarned: '5 MILE', rating: 5 }
  ]);

  // Simulate wallet connection
  const connectWallet = async () => {
    setTimeout(() => {
      setWalletConnected(true);
      setWalletAddress('0x742d35Cc6634C0532925a3b8D404d6C1E5C8E5D9');
    }, 1000);
  };

  // Set maximum fare with vehicle category pricing
  const estimateRide = () => {
    if (pickupLocation && destination) {
      const basePrice = Math.random() * 20 + 15;
      const categoryMultiplier = vehicleCategories.find(cat => cat.id === selectedVehicleCategory)?.multiplier || 1.0;
      const mockMaxFare = (basePrice * categoryMultiplier).toFixed(1);
      setEstimatedFare(mockMaxFare);
      setCurrentView('orderPlacement');
    }
  };

  // Simulate placing ride order with vehicle category
  const placeRideOrder = () => {
    if (pickupLocation && destination && estimatedFare) {
      setRideState('orderPlaced');
      setCurrentView('orderBook');
      
      // Generate category-specific driver bids
      const selectedCategory = vehicleCategories.find(cat => cat.id === selectedVehicleCategory);
      const mockBids = [
        { 
          id: 1, 
          name: 'Alex Chen', 
          rating: 4.9, 
          distance: '2 min away', 
          vehicle: selectedCategory.id === 'motorcycle' ? 'Honda CBR' : selectedCategory.id === 'premium' ? 'BMW 5 Series' : 'Toyota Camry',
          category: selectedCategory.name,
          bidFare: (parseFloat(estimatedFare) - 3).toFixed(1), 
          mileDiscount: '2 MILE',
          stakes: '150 MILE', 
          eta: '2 min',
          isVerified: true
        },
        { 
          id: 2, 
          name: 'Sarah Kim', 
          rating: 4.8, 
          distance: '3 min away', 
          vehicle: selectedCategory.id === 'van' ? 'Ford Transit' : selectedCategory.id === 'group' ? 'Honda Pilot' : 'Toyota Prius',
          category: selectedCategory.name,
          bidFare: (parseFloat(estimatedFare) - 1).toFixed(1), 
          mileDiscount: '1 MILE',
          stakes: '200 MILE', 
          eta: '3 min',
          isVerified: true
        }
      ].sort((a, b) => parseFloat(a.bidFare) - parseFloat(b.bidFare));
      
      setAvailableDrivers(mockBids);
    }
  };

  // Connected ride booking - accepts driver bid
  const acceptDriverBid = (driver) => {
    setSelectedDriver(driver);
    setRideState('searching');
    
    // Create ride with accepted bid
    const rideRequest = {
      riderId: walletAddress,
      driverId: driver.id,
      pickup: pickupLocation,
      destination: destination,
      fare: driver.bidFare,
      maxFare: estimatedFare,
      savings: (parseFloat(estimatedFare) - parseFloat(driver.bidFare)).toFixed(1),
      timestamp: Date.now()
    };
    
    // Simulate driver accepting the matched ride
    setTimeout(() => {
      setPendingRideRequest(rideRequest);
      setRideState('matched');
      setCurrentRide(rideRequest);
    }, 1000);
  };

  // Driver accepts ride
  const acceptRide = () => {
    if (pendingRideRequest) {
      setDriverCurrentRide(pendingRideRequest);
      setPendingRideRequest(null);
      setRideState('pickup');
      
      // Simulate ride progression
      setTimeout(() => setRideState('inTransit'), 5000);
      setTimeout(() => {
        setRideState('completed');
        setDriverCurrentRide(null);
        setCurrentRide(null);
      }, 12000);
    }
  };

  // Driver rejects ride
  const rejectRide = () => {
    setPendingRideRequest(null);
    setRideState('idle');
  };

  if (!walletConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center">
          <div className="mb-8">
            {/* KHAULEZA Logo */}
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl">
              <div className="text-white text-4xl font-black transform -rotate-12 font-sans">K</div>
            </div>
            
            {/* Brand Name */}
            <h1 className="text-4xl font-black mb-2">
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                KHAULEZA
              </span>
            </h1>
            
            {/* Tagline */}
            <p className="text-blue-600 font-bold text-base tracking-widest mb-1">SIYA HAMBA MANJE</p>
            <p className="text-gray-600 text-sm">Decentralized Ride-Hailing Platform</p>
          </div>
          
          {/* User Type Selection */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
            <button
              onClick={() => setUserType('rider')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                userType === 'rider' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Rider
            </button>
            <button
              onClick={() => setUserType('driver')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                userType === 'driver' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Driver
            </button>
          </div>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-center space-x-3 text-sm text-gray-700">
              <Shield className="w-5 h-5 text-blue-500" />
              <span>Trustless & Secure</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-sm text-gray-700">
              <Zap className="w-5 h-5 text-blue-500" />
              <span>Low Fees (2.5% vs 25%)</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-sm text-gray-700">
              <Star className="w-5 h-5 text-blue-500" />
              <span>Earn MILE Rewards</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-sm text-gray-700">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              <span>DEX-Style Fair Pricing</span>
            </div>
          </div>

          <button
            onClick={connectWallet}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-3 shadow-xl transform hover:scale-105"
          >
            <Wallet className="w-6 h-6" />
            <span>Connect Wallet</span>
          </button>
        </div>
      </div>
    );
  }

  // Driver UI
  if (userType === 'driver') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Driver Header */}
        <div className="bg-white shadow-lg border-b border-blue-100 px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* KHAULEZA Logo */}
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                <div className="text-white text-lg font-black transform -rotate-12">K</div>
              </div>
              <div>
                <h1 className="text-xl font-black">
                  <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                    KHAULEZA
                  </span>
                </h1>
                <p className="text-xs text-blue-500 font-semibold tracking-wide">DRIVER</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-2 ${driverOnline ? 'text-green-600' : 'text-gray-500'}`}>
                {driverOnline ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6" />}
                <button 
                  onClick={() => setDriverOnline(!driverOnline)}
                  className="text-sm font-medium"
                >
                  {driverOnline ? 'Online' : 'Offline'}
                </button>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <div className="flex items-center space-x-1 bg-purple-100 px-2 py-1 rounded-full">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-purple-700 font-medium">{mileBalance} MILE</span>
                </div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Driver Navigation */}
        <div className="bg-white border-b">
          <div className="flex overflow-x-auto">
            {['dashboard', 'verification', 'orderbook', 'analytics', 'defi', 'referrals', 'nft'].map((view) => (
              <button
                key={view}
                onClick={() => setDriverView(view)}
                className={`flex-shrink-0 py-3 px-3 text-center font-medium text-sm capitalize ${
                  driverView === view
                    ? 'text-green-600 border-b-2 border-green-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {view === 'orderbook' ? 'Orders' : 
                 view === 'nft' ? 'Vehicle Pass' :
                 view === 'analytics' ? 'Stats' :
                 view === 'defi' ? 'DeFi' : view}
              </button>
            ))}
          </div>
        </div>

        {/* Pending Ride Request Notification */}
        {pendingRideRequest && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mx-4 mt-4 rounded-r-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="w-6 h-6 text-yellow-600" />
                <div>
                  <div className="font-semibold text-yellow-800">New Ride Request!</div>
                  <div className="text-sm text-yellow-700">
                    {pendingRideRequest.pickup} → {pendingRideRequest.destination}
                  </div>
                  <div className="text-sm text-yellow-700">Fare: {pendingRideRequest.fare} MATIC</div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={rejectRide}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600"
                >
                  Reject
                </button>
                <button
                  onClick={acceptRide}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600"
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Driver Main Content */}
        <div className="p-4 space-y-6">
          {driverView === 'dashboard' && (
            <>
              {/* Driver Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl shadow-sm p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-800">{driverStats.todayEarnings}</div>
                      <div className="text-xs text-gray-600">MATIC Earned</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Star className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-800">{driverStats.todayMileEarned}</div>
                      <div className="text-xs text-gray-600">MILE Rewards</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-800">{driverStats.bidSuccessRate}%</div>
                      <div className="text-xs text-gray-600">Bid Success</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Shield className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-800">{driverStats.stakedTokens}</div>
                      <div className="text-xs text-gray-600">MILE Staked</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Auto-Bidding Settings */}
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Auto-Bidding</h3>
                  <button
                    onClick={() => setAutoBiddingEnabled(!autoBiddingEnabled)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      autoBiddingEnabled ? 'bg-green-600' : 'bg-gray-200'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      autoBiddingEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
                
                {autoBiddingEnabled && (
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block">Bid Margin (% below max fare)</label>
                      <input
                        type="range"
                        min="5"
                        max="50"
                        value={bidMargin}
                        onChange={(e) => setBidMargin(e.target.value)}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>5%</span>
                        <span className="font-medium">{bidMargin}%</span>
                        <span>50%</span>
                      </div>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="text-sm text-green-800">
                        Auto-bidding will place bids at {bidMargin}% below rider's max fare
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Driver Status */}
              <div className="bg-white rounded-xl shadow-sm p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Status</h3>
                <div className="text-center py-8">
                  {driverOnline ? (
                    <div className="space-y-2">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                        <Car className="w-8 h-8 text-green-600" />
                      </div>
                      <div className="text-lg font-semibold text-green-600">Online & Ready</div>
                      <div className="text-sm text-gray-600">Waiting for ride requests...</div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                        <Car className="w-8 h-8 text-gray-400" />
                      </div>
                      <div className="text-lg font-semibold text-gray-600">Offline</div>
                      <div className="text-sm text-gray-600">Go online to start receiving rides</div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {driverView === 'orderbook' && driverOnline && (
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Available Orders (Highest Fare First)</h3>
              <div className="space-y-3">
                {[
                  { id: 1, maxFare: '35.0', route: 'Downtown → Airport', distance: '12 km', time: '2m ago', rider: '0x742...5D9' },
                  { id: 2, maxFare: '28.5', route: 'Mall → University', distance: '8 km', time: '1m ago', rider: '0x123...ABC' },
                  { id: 3, maxFare: '22.0', route: 'Hotel → Station', distance: '5 km', time: '3m ago', rider: '0x456...DEF' }
                ].map((order) => (
                  <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-semibold text-gray-800">{order.route}</div>
                        <div className="text-sm text-gray-600">{order.distance} • {order.time}</div>
                        <div className="text-xs text-gray-500">Rider: {order.rider}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-blue-600">{order.maxFare} MATIC</div>
                        <div className="text-xs text-gray-500">Max Fare</div>
                        <div className="flex space-x-2 mt-2">
                          <input
                            type="number"
                            placeholder="Your bid"
                            className="w-20 px-2 py-1 text-sm border border-gray-300 rounded"
                            step="0.1"
                            max={order.maxFare}
                          />
                          <button className="px-3 py-1 bg-green-500 text-white rounded text-sm font-medium hover:bg-green-600">
                            Bid
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* NFT Pass Management */}
          {driverView === 'nft' && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow-sm p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Vehicle Pass NFT</h3>
                
                {hasVehiclePass ? (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                              <div className="text-white text-sm font-bold">K</div>
                            </div>
                            <div className="text-sm opacity-80">KHAULEZA Vehicle Pass</div>
                          </div>
                          <div className="text-2xl font-bold">Sedan (Standard)</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm opacity-80">Expires</div>
                          <div className="font-semibold">2024-12-31</div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="text-sm">
                          <div className="opacity-80">NFT ID</div>
                          <div className="font-mono">#1247</div>
                        </div>
                        <div className="text-4xl">🚙</div>
                      </div>
                    </div>
                    
                    <button className="w-full bg-purple-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-purple-600">
                      Renew Pass (75 MATIC)
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-center py-8">
                      <div className="text-6xl mb-4">🎫</div>
                      <div className="text-lg font-semibold text-gray-800 mb-2">No Vehicle Pass</div>
                      <div className="text-sm text-gray-600 mb-4">
                        You need a Vehicle Pass NFT to operate as a driver on KHAULEZA
                      </div>
                    </div>
                    
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-green-600">🎁</span>
                        <span className="font-medium text-green-800">30-Day Free Trial</span>
                      </div>
                      <div className="text-sm text-green-700">
                        Get a free 30-day trial pass for any vehicle category. No payment required!
                      </div>
                      <button 
                        onClick={() => setHasVehiclePass(true)}
                        className="w-full mt-3 bg-green-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-600"
                      >
                        Claim Free Trial
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Rider UI
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Rider Header */}
      <div className="bg-white shadow-lg border-b border-blue-100 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* KHAULEZA Logo */}
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
              <div className="text-white text-lg font-black transform -rotate-12">K</div>
            </div>
            <div>
              <h1 className="text-xl font-black">
                <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  KHAULEZA
                </span>
              </h1>
              <p className="text-xs text-blue-500 font-semibold tracking-wide">SIYA HAMBA MANJE</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            {/* Notifications Bell */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <Bell className="w-5 h-5" />
                {notifications.filter(n => !n.read).length > 0 && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-bold">{notifications.filter(n => !n.read).length}</span>
                  </div>
                )}
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-800">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div key={notification.id} className={`p-4 border-b border-gray-100 ${!notification.read ? 'bg-blue-50' : ''}`}>
                        <div className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            notification.type === 'reward' ? 'bg-purple-500' :
                            notification.type === 'dao' ? 'bg-blue-500' :
                            'bg-green-500'
                          }`}></div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-800">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{notification.timestamp}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 text-center">
                    <button className="text-sm text-blue-600 hover:text-blue-800">Mark all as read</button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-1 bg-purple-100 px-2 py-1 rounded-full">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-purple-700 font-medium">{mileBalance} MILE</span>
            </div>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-gray-600">{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-white border-b">
        <div className="flex">
          {['home', 'defi', 'referrals', 'dao', 'history'].map((view) => (
            <button
              key={view}
              onClick={() => setCurrentView(view)}
              className={`flex-1 py-3 px-2 text-center font-medium text-sm capitalize ${
                currentView === view
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {view === 'dao' ? 'DAO' : view === 'defi' ? 'DeFi' : view}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-6">
        {currentView === 'home' && (
          <>
            {/* Vehicle Category Selection */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Choose Vehicle Type</h3>
              <div className="grid grid-cols-2 gap-3">
                {vehicleCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedVehicleCategory(category.id)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedVehicleCategory === category.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">{category.icon}</div>
                    <div className="font-medium text-gray-800 text-sm">{category.name}</div>
                    <div className="text-xs text-gray-500">{category.subtitle}</div>
                    <div className="text-xs text-blue-600 mt-1">{category.multiplier}x rate</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Location Inputs */}
            <div className="bg-white rounded-xl shadow-sm p-4 space-y-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-green-500" />
                <input
                  type="text"
                  placeholder="Pickup location"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="relative">
                <Navigation className="absolute left-3 top-3 w-5 h-5 text-red-500" />
                <input
                  type="text"
                  placeholder="Where to?"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={estimateRide}
                disabled={!pickupLocation || !destination}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Get Price Estimate
              </button>
            </div>

            {/* Current Ride Status */}
            {rideState !== 'idle' && currentRide && (
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Current Ride</h3>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    rideState === 'searching' ? 'bg-yellow-100 text-yellow-800' :
                    rideState === 'matched' ? 'bg-blue-100 text-blue-800' :
                    rideState === 'pickup' ? 'bg-blue-100 text-blue-800' :
                    rideState === 'inTransit' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {rideState === 'searching' ? 'Finding Driver...' :
                     rideState === 'matched' ? 'Driver Found' :
                     rideState === 'pickup' ? 'Driver Coming' :
                     rideState === 'inTransit' ? 'In Transit' :
                     'Completed'}
                  </div>
                </div>
                
                {/* Show savings and MILE rewards when ride is matched */}
                {currentRide.savings && (
                  <div className="space-y-2 mb-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                        <span className="text-green-800 font-medium">You saved {currentRide.savings} MATIC!</span>
                      </div>
                      <div className="text-sm text-green-700 mt-1">
                        Paid {currentRide.fare} MATIC instead of {currentRide.maxFare} MATIC
                      </div>
                    </div>
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <Star className="w-5 h-5 text-purple-600" />
                        <span className="text-purple-800 font-medium">+2.5 MILE tokens earned!</span>
                      </div>
                      <div className="text-sm text-purple-700">Reward for completing ride</div>
                    </div>
                  </div>
                )}
                
                {selectedDriver && (
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800">{selectedDriver.name}</div>
                      <div className="text-sm text-gray-600">{selectedDriver.vehicle} • {selectedDriver.category}</div>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm text-gray-600 ml-1">{selectedDriver.rating}</span>
                        </div>
                        <span className="text-gray-400">•</span>
                        <span className="text-sm text-gray-600">{selectedDriver.distance}</span>
                        {selectedDriver.isVerified && (
                          <>
                            <span className="text-gray-400">•</span>
                            <span className="text-sm text-green-600">✓ Verified</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {currentView === 'orderPlacement' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Place Your Ride Order</h3>
              
              <div className="space-y-4">
                {/* Selected Vehicle Category */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-2">Vehicle Type</div>
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">
                      {vehicleCategories.find(cat => cat.id === selectedVehicleCategory)?.icon}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">
                        {vehicleCategories.find(cat => cat.id === selectedVehicleCategory)?.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {vehicleCategories.find(cat => cat.id === selectedVehicleCategory)?.subtitle}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-2">Route</div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-green-500" />
                      <span className="text-gray-800">{pickupLocation}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Navigation className="w-4 h-4 text-red-500" />
                      <span className="text-gray-800">{destination}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="text-sm text-blue-700 mb-2">Maximum Fare (Your Buy Order)</div>
                  <div className="flex items-center justify-between">
                    <input
                      type="number"
                      value={estimatedFare}
                      onChange={(e) => setEstimatedFare(e.target.value)}
                      className="text-2xl font-bold text-blue-800 bg-transparent border-none outline-none w-32"
                      step="0.1"
                    />
                    <span className="text-blue-800 font-medium">MATIC</span>
                  </div>
                  <div className="text-xs text-blue-600 mt-1">
                    This is the maximum you'll pay. Drivers will bid lower amounts.
                  </div>
                </div>
                
                <button
                  onClick={placeRideOrder}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all"
                >
                  Place Order ({estimatedFare} MATIC Max)
                </button>
              </div>
            </div>
            
            <button
              onClick={() => setCurrentView('home')}
              className="w-full bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              Back
            </button>
          </div>
        )}

        {currentView === 'orderBook' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Your Order</h3>
                <div className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                  Accepting Bids
                </div>
              </div>
              
              <h4 className="font-semibold text-gray-800 mb-3">Driver Bids (Lowest First)</h4>
              <div className="space-y-3">
                {availableDrivers.map((driver, index) => (
                  <div key={driver.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-gray-800">{driver.name}</span>
                            {driver.isVerified && <span className="text-green-600 text-xs">✓</span>}
                          </div>
                          <div className="text-sm text-gray-600">{driver.vehicle}</div>
                          <div className="flex items-center space-x-2 text-sm">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span>{driver.rating}</span>
                            <span className="text-gray-400">•</span>
                            <span>{driver.eta} ETA</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">{driver.bidFare} MATIC</div>
                        <div className="text-xs text-green-600">
                          Save {(parseFloat(estimatedFare) - parseFloat(driver.bidFare)).toFixed(1)} MATIC
                        </div>
                        {index === 0 && (
                          <div className="text-xs text-blue-600 mb-2">Best Offer</div>
                        )}
                        <button
                          onClick={() => acceptDriverBid(driver)}
                          className="mt-2 bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
                        >
                          Accept Bid
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {availableDrivers.length === 0 && (
                <div className="text-center py-8">
                  <Clock className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <div className="text-gray-600">Waiting for driver bids...</div>
                  <div className="text-sm text-gray-500">Drivers will bid below your max fare</div>
                </div>
              )}
            </div>
          </div>
        )}

        {currentView === 'referrals' && (
          <div className="space-y-4">
            {/* Referral Stats */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Referral Program</h3>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-xl p-4 mb-4">
                <div className="text-center">
                  <div className="text-3xl font-black text-purple-800 mb-1">{userReferralCode}</div>
                  <div className="text-sm text-purple-600 mb-3">Your Referral Code</div>
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-purple-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-600 transition-colors">
                      Copy Code
                    </button>
                    <button className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
                      Share
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-800">{referralStats.totalReferrals}</div>
                  <div className="text-sm text-green-600">Total Referrals</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-purple-800">{referralStats.totalRewards}</div>
                  <div className="text-sm text-purple-600">MILE Earned</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">🚗</span>
                    <span className="text-gray-700">Rider Referrals</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-800">{referralStats.riderReferrals}</div>
                    <div className="text-xs text-green-600">+{referralStats.riderReferrals * 10} MILE</div>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">🚙</span>
                    <span className="text-gray-700">Driver Referrals</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-800">{referralStats.driverReferrals}</div>
                    <div className="text-xs text-green-600">+{referralStats.driverReferrals * 25} MILE</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Use Referral Code */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h4 className="font-semibold text-gray-800 mb-3">Have a Referral Code?</h4>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Enter referral code"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button className="bg-purple-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-600 transition-colors">
                  Apply
                </button>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-3">
                <div className="text-sm text-green-800 font-medium">🎁 Get 5 MILE tokens when you use a referral code!</div>
              </div>
            </div>

            {/* Referral Leaderboard */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h4 className="font-semibold text-gray-800 mb-3">Top Referrers This Month</h4>
              <div className="space-y-2">
                {[
                  { rank: 1, address: '0x742d...5D9', referrals: 47, rewards: 1175 },
                  { rank: 2, address: '0x123a...ABC', referrals: 32, rewards: 800 },
                  { rank: 3, address: '0x456b...DEF', referrals: 28, rewards: 700 },
                  { rank: 4, address: '0x789c...GHI', referrals: 21, rewards: 525 },
                  { rank: 5, address: '0x012d...JKL', referrals: 18, rewards: 450 }
                ].map((user) => (
                  <div key={user.rank} className={`flex items-center justify-between p-2 rounded-lg ${
                    user.address === '0x742d...5D9' ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        user.rank === 1 ? 'bg-yellow-500 text-white' :
                        user.rank === 2 ? 'bg-gray-400 text-white' :
                        user.rank === 3 ? 'bg-orange-500 text-white' :
                        'bg-gray-300 text-gray-600'
                      }`}>
                        {user.rank}
                      </div>
                      <span className="font-mono text-sm">{user.address}</span>
                      {user.address === '0x742d...5D9' && <span className="text-xs text-blue-600 font-medium">(You)</span>}
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold">{user.referrals} referrals</div>
                      <div className="text-xs text-purple-600">{user.rewards} MILE</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentView === 'defi' && (
          <div className="space-y-4">
            {/* DeFi Overview */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">MILE DeFi Hub</h3>
              </div>

              {/* Portfolio Overview */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800 mb-1">$347.82</div>
                  <div className="text-sm text-gray-600 mb-3">Total Portfolio Value</div>
                  <div className="flex justify-center space-x-4 text-sm">
                    <div className="text-center">
                      <div className="font-semibold text-green-600">+12.4%</div>
                      <div className="text-gray-500">24h Change</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-blue-600">250 MILE</div>
                      <div className="text-gray-500">Total Tokens</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Liquidity Pools */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">Liquidity Pools</h4>
                <div className="space-y-3">
                  {liquidityPools.map((pool, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-semibold text-gray-800">{pool.pair}</div>
                        <div className="text-lg font-bold text-green-600">{pool.apy} APY</div>
                      </div>
                      <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
                        <span>TVL: {pool.tvl}</span>
                        <span>Your Stake: {pool.yourStake}</span>
                      </div>
                      <div className="flex space-x-2">
                        <button className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors">
                          Add Liquidity
                        </button>
                        <button className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
                          Stake MILE
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Analytics */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Route Price Analytics</h4>
                <div className="space-y-2">
                  {priceHistory.map((route, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-800">{route.route}</div>
                        <div className="text-sm text-gray-600">Avg Price: {route.avgPrice}</div>
                      </div>
                      <div className={`font-semibold ${
                        route.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {route.trend}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* MILE Token Stats */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h4 className="font-semibold text-gray-800 mb-3">MILE Token Stats</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-purple-50 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-purple-800">$1.39</div>
                  <div className="text-sm text-purple-600">Current Price</div>
                  <div className="text-xs text-green-600 mt-1">+7.2% (24h)</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-blue-800">$1.2M</div>
                  <div className="text-sm text-blue-600">Market Cap</div>
                  <div className="text-xs text-gray-500 mt-1">Circulating Supply</div>
                </div>
                <div className="bg-green-50 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-green-800">$45K</div>
                  <div className="text-sm text-green-600">24h Volume</div>
                  <div className="text-xs text-green-600 mt-1">+15.3%</div>
                </div>
                <div className="bg-yellow-50 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-yellow-800">750K</div>
                  <div className="text-sm text-yellow-600">Total Staked</div>
                  <div className="text-xs text-gray-500 mt-1">75% of supply</div>
                </div>
              </div>
            </div>

            {/* Yield Farming */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h4 className="font-semibold text-gray-800 mb-3">Yield Farming Opportunities</h4>
              <div className="space-y-3">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-semibold text-gray-800">Driver Rewards Pool</div>
                    <div className="text-lg font-bold text-green-600">245% APR</div>
                  </div>
                  <div className="text-sm text-gray-600 mb-3">
                    Stake MILE tokens to earn additional rewards from driver fees
                  </div>
                  <button className="w-full bg-green-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors">
                    Stake MILE Tokens
                  </button>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-semibold text-gray-800">LP Token Staking</div>
                    <div className="text-lg font-bold text-blue-600">180% APR</div>
                  </div>
                  <div className="text-sm text-gray-600 mb-3">
                    Provide liquidity and stake LP tokens for boosted rewards
                  </div>
                  <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
                    Stake LP Tokens
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <div className="text-white text-sm font-bold">⚡</div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">DAO Governance</h3>
                </div>
                <div className="text-sm text-purple-600 font-medium">
                  Voting Power: {mileBalance.toLocaleString()} MILE
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-4 mb-6">
                <div className="text-center">
                  <div className="text-sm text-indigo-800 mb-2 font-medium">Platform Governance</div>
                  <div className="text-xs text-indigo-600 mb-3">
                    Use your MILE tokens to vote on platform changes, fee adjustments, and new features.
                    Minimum 1,000 MILE required to create proposals.
                  </div>
                  <button className="bg-indigo-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-indigo-600 transition-colors">
                    Create New Proposal
                  </button>
                </div>
              </div>
              
              <div className="space-y-4">
                {[
                  { id: 1, title: 'Reduce Platform Fee to 2.0%', description: 'Proposal to reduce platform fee from 2.5% to 2.0% to attract more drivers and increase competitiveness', forVotes: 45000, againstVotes: 12000, endDate: '2024-09-08', status: 'active', category: 'Fee Change' },
                  { id: 2, title: 'Add Electric Vehicle Category', description: 'Add new vehicle category for electric vehicles with 1.1x rate multiplier and reduced staking requirements', forVotes: 38000, againstVotes: 8000, endDate: '2024-09-05', status: 'active', category: 'Platform Feature' },
                  { id: 3, title: 'Increase Driver MILE Rewards', description: 'Increase driver MILE rewards from 5 to 7 tokens per completed ride to incentivize more drivers', forVotes: 52000, againstVotes: 15000, endDate: '2024-09-12', status: 'active', category: 'Token Economics' }
                ].map((proposal) => (
                  <div key={proposal.id} className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold text-gray-800">{proposal.title}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            proposal.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {proposal.status}
                          </span>
                        </div>
                        <div className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full inline-block mb-2">
                          {proposal.category}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4">{proposal.description}</p>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-green-600 font-medium">👍 For: {proposal.forVotes.toLocaleString()} MILE</span>
                        <span className="text-red-600 font-medium">👎 Against: {proposal.againstVotes.toLocaleString()} MILE</span>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div className="flex h-full">
                          <div 
                            className="bg-green-500 h-full" 
                            style={{width: `${(proposal.forVotes / (proposal.forVotes + proposal.againstVotes)) * 100}%`}}
                          ></div>
                          <div 
                            className="bg-red-500 h-full" 
                            style={{width: `${(proposal.againstVotes / (proposal.forVotes + proposal.againstVotes)) * 100}%`}}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>Voting ends: {proposal.endDate}</span>
                        <span>Total votes: {(proposal.forVotes + proposal.againstVotes).toLocaleString()} MILE</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors">
                        Vote Against
                      </button>
                      <button className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors">
                        Vote For
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* DAO Stats */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h4 className="font-semibold text-gray-800 mb-3">DAO Statistics</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-indigo-50 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-indigo-800">1.2M</div>
                  <div className="text-sm text-indigo-600">Total MILE Voting Power</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-purple-800">847</div>
                  <div className="text-sm text-purple-600">Active Voters</div>
                </div>
                <div className="bg-green-50 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-green-800">23</div>
                  <div className="text-sm text-green-600">Proposals Passed</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-blue-800">3</div>
                  <div className="text-sm text-blue-600">Active Proposals</div>
                </div>
              </div>
            </div>
          </div>
        )}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Ride History</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {rideHistory.map((ride) => (
                <div key={ride.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <MapPin className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-600">{ride.from}</span>
                      </div>
                      <div className="flex items-center space-x-2 mb-2">
                        <Navigation className="w-4 h-4 text-red-500" />
                        <span className="text-sm text-gray-600">{ride.to}</span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{ride.date}</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span>{ride.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-800">{ride.fare}</div>
                      <div className="text-xs text-purple-600">+{ride.mileEarned}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KhaulezaPlatform;
