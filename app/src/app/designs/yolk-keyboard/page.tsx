'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import _Footer from '../../../components/footer';

// Custom CSS for transitions and TE-inspired styling with extralight fonts and gradients
const customStyles = {
  __html: `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400&display=swap');
    
    body {
      font-family: 'Inter', sans-serif;
      font-weight: 200;
      background-color: #f7f7f7;
      color: #000;
      overflow-x: hidden;
    }
    
    .te-section {
      padding: 6rem 0;
      position: relative;
      overflow: hidden;
    }
    
    .te-section::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 200px;
      background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.8));
      pointer-events: none;
      z-index: 1;
    }
    
    .te-gradient-yellow {
      background: linear-gradient(180deg, #f7f7f7 0%, rgba(255, 221, 0, 0.3) 100%);
    }
    
    .te-gradient-red {
      background: linear-gradient(180deg, #f7f7f7 0%, rgba(255, 51, 51, 0.2) 100%);
    }
    
    .te-gradient-white {
      background: linear-gradient(180deg, #f7f7f7 0%, #ffffff 100%);
    }
    
    .te-gradient-black {
      background: linear-gradient(180deg, #f7f7f7 0%, rgba(0, 0, 0, 0.05) 100%);
    }
    
    .te-hero {
      height: 100vh;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    
    .te-nav-dot {
      width: 12px;
      height: 12px;
      background-color: #fff;
      border-radius: 50%;
      opacity: 0.5;
      transition: all 0.5s ease;
    }
    
    .te-nav-dot.active {
      opacity: 1;
      transform: scale(1.3);
    }
    
    .te-container {
      width: 100%;
      max-width: 1600px;
      margin: 0 auto;
      padding: 0 6rem;
    }
    
    .te-title {
      font-weight: 200;
      letter-spacing: -0.03em;
      line-height: 1.1;
    }
    
    .te-subtitle {
      font-weight: 200;
      color: #fff;
      letter-spacing: -0.02em;
      line-height: 1.4;
    }
    
    .te-gallery {
      position: relative;
      width: 100%;
      height: 90vh;
      background-color: #000;
      overflow: hidden;
    }
    
    .te-image-slide {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      transition: opacity 1.2s ease;
    }
    
    .te-image-slide.active {
      opacity: 1;
    }
    
    .te-feature-card {
      background: white;
      padding: 3rem;
      border-radius: 0;
      margin-bottom: 2rem;
    }
    
    .te-feature-title {
      font-weight: 300;
      margin-bottom: 1rem;
    }
    
    .te-button {
      background: #000;
      color: #fff;
      font-size: 1.2rem;
      font-weight: 200;
      padding: 1rem 2rem;
      border: none;
      border-radius: 0;
      cursor: pointer;
      transition: all 0.3s ease;
      letter-spacing: -0.02em;
    }
    
    .te-button:hover {
      background: #333;
    }
    
    .te-specs-row {
      display: flex;
      border-bottom: 1px solid #eaeaea;
      padding: 1.5rem 0;
      align-items: flex-start;
    }
    
    .te-specs-label {
      width: 180px;
      flex-shrink: 0;
      font-weight: 300;
      letter-spacing: -0.01em;
    }
    
    .te-specs-value {
      flex-grow: 1;
      font-weight: 200;
      letter-spacing: -0.01em;
    }
    
    .te-variant {
      position: relative;
      height: 500px;
      overflow: hidden;
      transition: all 0.5s ease;
      cursor: pointer;
    }
    
    .te-variant:hover .te-variant-content {
      background-color: rgba(0, 0, 0, 0.4);
    }
    
    .te-variant.active .te-variant-content {
      background-color: rgba(0, 0, 0, 0.6);
    }
    
    .te-variant-content {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 3rem;
      background-color: rgba(0, 0, 0, 0.2);
      color: white;
      transition: all 0.5s ease;
    }
    
    .te-text-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 3rem 6rem;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
      color: white;
    }
    
    .wide-text {
      max-width: 1400px;
      margin: 0 auto;
      line-height: 1.5;
    }
    
    .intro-text {
      line-height: 1.5;
      letter-spacing: -0.02em;
    }
  `
};

export default function DesignPage() {
  const [registrationEmail, setRegistrationEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [activeVariant, setActiveVariant] = useState('sunny'); // 'sunny' or 'terror'

  // Image slider states
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Define image arrays based on variants
  const sunnyImages = [
    '/sunny_side_down_top_far.png',
    '/sunny_side_down_side.png',
    '/sunny_side_down_close.png',
    '/sunny_side_down.png'
  ];

  const terrorImages = [
    '/red_terror11.png',
    '/red_terror10.png',
    '/red_terror7.png',
    '/red_terror4.png'
  ];

  // Get current image array based on active variant
  const currentImages = activeVariant === 'sunny' ? sunnyImages : terrorImages;

  // Auto cycle images
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % currentImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [currentImages]);

  // Function to go to specific image
  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  // Handle registration form submission
  const handleRegistration = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/register-interest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: registrationEmail,
          product: 'yolk-keyboard'
        }),
      });

      if (!response.ok) throw new Error('Failed to register');

      setStatus('success');
      setRegistrationEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  // Features with icons
  const features = [
    {
      title: "Ultra-responsive input",
      description: "1ms polling rate with custom firmware ensures instant input recognition with zero perceptible delay."
    },
    {
      title: "Full NKRO",
      description: "N-Key Rollover supports simultaneous key presses for complex key combinations without ghosting."
    },
    {
      title: "Dual connectivity",
      description: "Seamless automatic switching between USB Type-C and Bluetooth 5.1 LE for versatile connectivity."
    },
    {
      title: "Advanced sensors",
      description: "Integrated capacitive touch and proximity sensors enable innovative interaction methods."
    },
    {
      title: "Programmable RGB lighting",
      description: "Customizable backlighting with 15 preset effects and per-key programming options."
    },
    {
      title: "Hot-swappable switches",
      description: "Change switches without soldering for a truly customizable typing experience."
    }
  ];

  return (
    <main className="min-h-screen">
      {/* Custom Styles */}
      <style dangerouslySetInnerHTML={customStyles} />

      {/* Hero Section */}
      <section className="te-hero overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={activeVariant === 'sunny' ? "/sunny_side_down1.png" : "/red_terror1.png"}
            alt="Yolk Keyboard"
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="te-text-overlay w-full text-center">
          <div className="te-container">
            <h1 className="text-9xl te-title">Yolk Keyboard</h1>
            <p className="text-5xl te-subtitle mt-6 text-center">mechanical precision. refined aesthetics.</p>
          </div>
        </div>
      </section>

      {/* Short Intro Section */}
      <section className="te-section py-32 te-gradient-white">
        <div className="te-container">
          <div className="wide-text mx-auto text-center">
            <p className="text-6xl intro-text leading-relaxed">
              The Yolk Keyboard redefines typing with innovative ergonomics and cutting-edge technology.
              Built around an STM32L07 MCU, this custom mechanical keyboard delivers professional-grade
              performance with striking aesthetics.
            </p>
          </div>
        </div>
      </section>

      {/* Palettes Section */}
      <section className="te-section py-24 ">
        <div className="te-container">
          <h2 className="text-8xl te-title mb-16 text-center">Palettes</h2>

          {/* Visual Selector */}
          <div className="flex justify-center mb-12">
            <div className="bg-white/20 shadow-lg p-3 inline-flex rounded-full">
              <button
                onClick={() => setActiveVariant('sunny')}
                className={`px-8 py-4 rounded-full transition-all duration-500 text-xl ${activeVariant === 'sunny'
                    ? 'bg-[#ffdd00] text-black font-light shadow-md'
                    : 'bg-transparent text-gray-700 hover:bg-gray-100'
                  }`}
              >
                Sunny Side Down
              </button>
              <button
                onClick={() => setActiveVariant('terror')}
                className={`px-8 py-4 rounded-full transition-all duration-500 text-xl ${activeVariant === 'terror'
                    ? 'bg-[#ff3333] text-white font-light shadow-md'
                    : 'bg-transparent text-gray-700 hover:bg-gray-100'
                  }`}
              >
                Red Terror
              </button>
            </div>
          </div>
        </div>

        {/* Full Width Image Container */}
        <div className="relative w-full h-[90vh] min-h-[800px] mt-8">
          {/* Current Variant Image */}
          <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{ opacity: activeVariant === 'sunny' ? 1 : 0 }}>
            <Image
              src="/sunny_side_down.png"
              alt="Sunny Side Down Keyboard"
              fill
              className="object-cover object-center"
              priority
            />
          </div>
          <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{ opacity: activeVariant === 'terror' ? 1 : 0 }}>
            <Image
              src="/red_terror.png"
              alt="Red Terror Keyboard"
              fill
              className="object-cover object-center"
              priority
            />
          </div>

          {/* Color Indicator */}
          <div className="absolute top-8 right-8 flex items-center gap-4 bg-black/60 text-white px-6 py-3 rounded-full">
            <div className={`w-5 h-5 rounded-full ${activeVariant === 'sunny' ? 'bg-[#ffdd00]' : 'bg-[#ff3333]'}`}></div>
            <span className="text-xl font-extralight">{activeVariant === 'sunny' ? 'Sunny Side Down' : 'Red Terror'}</span>
          </div>

          {/* Variant Info Panel - Positioned within container */}
          <div className="absolute bottom-0 left-0 right-0 py-12 px-8">
            <div className="te-container">
              <h3 className="text-7xl te-title mb-6 text-black">
                {activeVariant === 'sunny' ? 'Sunny Side Down' : 'Red Terror'}
              </h3>
              <p className="text-black/90 text-2xl font-extralight max-w-4xl leading-relaxed">
                {activeVariant === 'sunny'
                  ? 'Our signature vibrant yellow design with pristine white keycaps. A perfect balance of visual impact and ergonomic comfort for those who want their keyboard to make a statement. The sunny yellow aluminum frame contrasts beautifully with the clean white keycaps for a typing experience that\'s as enjoyable to look at as it is to use.'
                  : 'Bold black frame with striking red backplate for a powerful statement. Designed for the discerning keyboard enthusiast who demands both performance and aesthetics. The Red Terror variant combines aggressive styling with premium materials to create a keyboard that commands attention while delivering professional-grade performance.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Top View Section - Image */}
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <Image
            src={activeVariant === 'sunny' ? "/sunny_side_down1.png" : "/red_terror1.png"}
            alt={`${activeVariant === 'sunny' ? 'Sunny Side Down' : 'Red Terror'} - Top View`}
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Top View Section - Info */}
      <section className="py-28 bg-black/1">
        <div className="te-container">
          <div className="wide-text mx-auto text-center">
            <p className="text-6xl font-extralight mb-20 leading-relaxed">
              The 65% compact layout preserves essential functionality while maintaining a minimal footprint.
              With hot-swappable switches, you can customize your typing experience without soldering.
            </p>
          </div>
        </div>
      </section>

      {/* Front View Section - Image */}
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <Image
            src={activeVariant === 'sunny' ? "/sunny_side_down_close.png" : "/red_terror_close.png"}
            alt={`${activeVariant === 'sunny' ? 'Sunny Side Down' : 'Red Terror'} - Front View`}
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Front View Section - Info */}
      <section className="py-28 te-gradient-grey">
        <div className="te-container">
          <div className="wide-text mx-auto">
            <p className="text-6xl font-extralight mb-20 leading-relaxed text-center">
              The front panel features a USB-C port for both charging and data transfer.
              Our custom firmware enables seamless device switching between wired and wireless connections.
            </p>
            <ul className="space-y-10 text-4xl font-extralight text-center">
              <li className="items-start gap-4">
                <span>USB Type-C connectivity with fast charging support</span>
              </li>
              <li className="items-start gap-4">
                <span>Automatic switching between USB and Bluetooth connections</span>
              </li>
              <li className="items-start gap-4">
                <span>Connect to up to 4 different Bluetooth devices simultaneously</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Side View Section - Image */}
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <Image
            src={activeVariant === 'sunny' ? "/sunny_side_down_touch_close.png" : "/red_terror_touch_close.png"}
            alt={`${activeVariant === 'sunny' ? 'Sunny Side Down' : 'Red Terror'} - Side Detail`}
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Side View Section - Info */}
      <section className="py-28 ">
        <div className="te-container">
          <div className="wide-text mx-auto">
            <p className="text-6xl font-extralight mb-20 leading-relaxed text-center">
              The low-profile design comes in at just 25mm height, with an ergonomic 7° typing angle.
              The side features a touch-sensitive slider with haptic feedback for intuitive control.
            </p>
            <ul className="space-y-10 text-4xl font-extralight text-center">
              <li className="items-start gap-4">
                <span>Ultra-slim 25mm profile with ergonomic 7° angle</span>
              </li>
              <li className=" items-start gap-4">
                <span>Touch slider with haptic feedback for intuitive control</span>
              </li>
              <li className="items-start gap-4">
                <span>Fully customizable on Windows and Linux, volume control on macOS</span>
              </li>
              <li className="items-start gap-4">
                <span>Adjustable tilt stands for personalized typing position</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Technical Drawing Section */}
      <section className="py-32 bg-[#ffdd00]">
        <div className="te-container">
          <h2 className="text-8xl te-title mb-20 text-center">Technical Drawing</h2>

          <div className="relative w-full aspect-[16/9] max-w-5xl mx-auto mb-20  p-10">
            <div className="relative w-full h-full">
              <Image
                src="/technical_drawing.png"
                alt=""
                fill
                className="object-contain"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 wide-text mx-auto">
            <div>
              <h3 className="text-5xl font-light mb-8">Features</h3>
              <ul className="space-y-5 text-2xl font-extralight">
                <li className="flex items-start gap-4">
                  <span>Ultra-responsive 1ms polling rate</span>
                </li>
                <li className="flex items-start gap-4">
                  <span>Full NKRO (N-Key Rollover)</span>
                </li>
                <li className="flex items-start gap-4">
                  <span>Automatic USB/BLE switching</span>
                </li>
                <li className="flex items-start gap-4">
                  <span>Capacitive touch and proximity sensors</span>
                </li>
                <li className="flex items-start gap-4">
                  <span>Programmable RGB backlighting</span>
                </li>
                <li className="flex items-start gap-4">
                  <span>Hot-swappable key switches</span>
                </li>
                <li className="flex items-start gap-4">
                  <span>Touch-sensitive slider with haptic feedback</span>
                </li>
                <li className="flex items-start gap-4">
                  <span>Adjustable tilt stands</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-5xl font-light mb-8">Specifications</h3>
              <ul className="space-y-5 text-2xl font-extralight">
                <li className="flex items-start gap-4">
                  <span>Dimensions: 320 × 120 × 25mm</span>
                </li>
                <li className="flex items-start gap-4">
                  <span>Weight: 900g</span>
                </li>
                <li className="flex items-start gap-4">
                  <span>Layout: 65% compact with arrow keys</span>
                </li>
                <li className="flex items-start gap-4">
                  <span>MCU: STM32L07 ARM Cortex-M0+</span>
                </li>
                <li className="flex items-start gap-4">
                  <span>Battery: 2000mAh Li-Po rechargeable</span>
                </li>
                <li className="flex items-start gap-4">
                  <span>Battery Life: 100+ hours with backlighting</span>
                </li>
                <li className="flex items-start gap-4">
                  <span>Connectivity: USB-C, Bluetooth 5.1 LE (4 devices)</span>
                </li>
                <li className="flex items-start gap-4">
                  <span>Frame: 6063 aluminum with anodized finish</span>
                </li>
                <li className="flex items-start gap-4">
                  <span>Keycaps: PBT double-shot with shine-through legends</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Kickstarter Section with background image */}
      <section className="relative h-[80vh] min-h-[700px]">
        <div className="absolute inset-0">
          <Image
            src={activeVariant === 'sunny' ? "/sunny_side_down1.png" : "/red_terror1.png"}
            alt="Keyboard background"
            fill
            className="object-cover brightness-70"
          />
        </div>

        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="te-container text-center text-white">
            <h2 className="text-6xl te-title mb-8">Launching on kickstarter</h2>
            <p className="text-3xl mb-16 font-extralight max-w-4xl mx-auto leading-relaxed">
              Be among the first to back the revolutionary Yolk Keyboard on Kickstarter.
              Early backers will receive exclusive discounts and limited-edition designs not available after the campaign.
            </p>

            <div className="max-w-2xl mx-auto">
              <form onSubmit={handleRegistration} className="space-y-6">
                <div className="flex gap-6">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={registrationEmail}
                    onChange={(e) => setRegistrationEmail(e.target.value)}
                    className="flex-1 p-4 text-xl border border-white/20 bg-black/50 text-white placeholder:text-white/50 rounded-none"
                    required
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="px-10 py-4 text-xl bg-white text-black hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed rounded-none font-extralight"
                  >
                    {status === 'loading' ? 'Processing...' : 'Get Notified'}
                  </button>
                </div>

                {status === 'success' && (
                  <div className="mt-6 p-4 bg-white/10 text-white text-xl font-extralight text-center">
                    Thank you. We'll notify you when our Kickstarter campaign launches.
                  </div>
                )}

                {status === 'error' && (
                  <div className="mt-6 p-4 bg-red-500/30 text-white text-xl font-extralight text-center">
                    An error occurred. Please try again.
                  </div>
                )}
              </form>
            </div>

            <p className="text-white/70 mt-12 text-2xl font-extralight">Kickstarter launch: April 2025</p>
          </div>
        </div>
      </section>

    </main>
  );
}