'use client';

import { Route } from '@/app/page';
import { Card } from '@/components/ui/card';
import { Clock, MapPin, Users, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RouteGeneratorProps {
  route: Route;
}

export function RouteGenerator({ route }: RouteGeneratorProps) {
  const totalDuration = route.events.reduce((sum, e) => sum + e.duration, 0);
  const startTime = route.events[0]?.time || '';
  const endTime = route.events[route.events.length - 1]?.endTime || '';

  const handleDownload = () => {
    const content = `Расписание дня на фестивале
============================

${route.events.map((e, i) => `
${i + 1}. ${e.name}
   Время: ${e.time} - ${e.endTime} (${e.duration} мин)
   Место: ${e.location}
   Категория: ${e.category}
   ${e.description}
`).join('\n')}

Общее время: ${totalDuration} минут
Переходы: Минимум
Охват: ${Math.round(route.coverage)}%
`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'festival-schedule.txt';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-4">Ваш идеальный день на фестивале</h2>

        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card className="border-border bg-primary/5 p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/20 rounded-lg">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Общее время</p>
                <p className="text-2xl font-bold text-primary">{totalDuration} мин</p>
              </div>
            </div>
          </Card>

          <Card className="border-border bg-secondary/5 p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-secondary/20 rounded-lg">
                <Users className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">События</p>
                <p className="text-2xl font-bold text-secondary">{route.events.length}</p>
              </div>
            </div>
          </Card>

          <Card className="border-border bg-accent/5 p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-accent/20 rounded-lg">
                <MapPin className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Охват</p>
                <p className="text-2xl font-bold text-accent">{Math.round(route.coverage)}%</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        {route.events.map((event, idx) => (
          <Card key={event.id} className="border-2 border-border hover:border-primary transition-colors p-6">
            <div className="flex gap-4">
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg">
                  {idx + 1}
                </div>
                {idx < route.events.length - 1 && (
                  <div className="w-0.5 h-8 bg-border"></div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{event.name}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                      <Clock className="w-4 h-4" />
                      {event.time} - {event.endTime} ({event.duration} мин)
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-primary/10 rounded-full text-xs font-semibold text-primary">
                    {event.category}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground mb-3">{event.description}</p>

                <div className="flex items-center gap-2 text-sm text-secondary">
                  <MapPin className="w-4 h-4" />
                  {event.location}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex gap-4 justify-center">
        <Button
          onClick={handleDownload}
          variant="outline"
          size="lg"
          className="gap-2"
        >
          <Download className="w-4 h-4" />
          Скачать расписание
        </Button>
        <Button
          size="lg"
          className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground"
        >
          Поделиться с друзьями
        </Button>
      </div>
    </div>
  );
}
