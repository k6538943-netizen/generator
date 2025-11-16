'use client';

import { Route } from '@/app/page';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, MapPin, Zap } from 'lucide-react';

interface RouteComparisonProps {
  routes: Route[];
  onSelectRoute: (route: Route) => void;
}

export function RouteComparison({ routes, onSelectRoute }: RouteComparisonProps) {
  if (routes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">Оптимизация маршрутов...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Ваши маршруты фестиваля</h2>
        <p className="text-muted-foreground">Мы создали {routes.length} расписаний без конфликтов, оптимизированных под ваши предпочтения</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {routes.map((route, idx) => (
          <Card key={route.id} className="border-2 border-border hover:border-primary transition-colors overflow-hidden flex flex-col h-full">
            <div className="p-6 flex-1">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-foreground">Маршрут {idx + 1}</h3>
                <div className="px-3 py-1 bg-primary/10 rounded-full">
                  <span className="text-sm font-semibold text-primary">{Math.round(route.coverage)}% охват</span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Zap className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">События</p>
                    <p className="text-lg font-bold text-foreground">{route.events.length} мероприятий</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-secondary/10 rounded-lg">
                    <Clock className="w-4 h-4 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Переходы</p>
                    <p className="text-lg font-bold text-foreground">{route.totalWalkingTime} мин</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-6 max-h-32 overflow-y-auto">
                {route.events.map((event, i) => (
                  <div key={event.id} className="flex items-center gap-2 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    <span className="text-muted-foreground">{event.time}</span>
                    <span className="font-medium text-foreground flex-1 truncate">{event.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-border bg-muted/30">
              <Button
                onClick={() => onSelectRoute(route)}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Подробнее <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
