'use client';

import { useState } from 'react';
import { EventSelector } from '@/components/event-selector';
import { RouteGenerator } from '@/components/route-generator';
import { RouteComparison } from '@/components/route-comparison';
import { Header } from '@/components/header';

export interface Event {
  id: string;
  name: string;
  time: string;
  endTime: string;
  duration: number;
  location: string;
  category: string;
  description: string;
}

export interface Route {
  id: string;
  events: Event[];
  totalWalkingTime: number;
  coverage: number;
}

export default function Home() {
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [step, setStep] = useState<'select' | 'compare' | 'detail'>('select');

  const handleGenerateRoutes = (selected: string[]) => {
    setSelectedEvents(selected);
    setStep('compare');
  };

  const handleSelectRoute = (route: Route) => {
    setSelectedRoute(route);
    setStep('detail');
  };

  const handleReset = () => {
    setSelectedEvents([]);
    setRoutes([]);
    setSelectedRoute(null);
    setStep('select');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-background">
      <Header step={step} onReset={handleReset} />
      <div className="container mx-auto px-4 py-8">
        {step === 'select' && (
          <EventSelector onGenerate={handleGenerateRoutes} onSetRoutes={setRoutes} />
        )}
        {step === 'compare' && (
          <RouteComparison routes={routes} onSelectRoute={handleSelectRoute} />
        )}
        {step === 'detail' && selectedRoute && (
          <div className="mt-8">
            <button
              onClick={() => setStep('compare')}
              className="mb-6 px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              ← Вернуться к маршрутам
            </button>
            <RouteGenerator route={selectedRoute} />
          </div>
        )}
      </div>
    </main>
  );
}
