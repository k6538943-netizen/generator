'use client';

import { useState, useEffect } from 'react';
import { Event, Route } from '@/app/page';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check, Search, Filter } from 'lucide-react';

interface EventSelectorProps {
  onGenerate: (selected: string[]) => void;
  onSetRoutes: (routes: Route[]) => void;
}

const FESTIVAL_EVENTS: Event[] = [
  {
    id: '1',
    name: 'Открытие фестиваля',
    time: '10:00',
    endTime: '10:45',
    duration: 45,
    location: 'Главная сцена',
    category: 'Церемония',
    description: 'Приветственная речь и официальное открытие фестиваля',
  },
  {
    id: '2',
    name: 'Электронная музыка',
    time: '11:00',
    endTime: '12:30',
    duration: 90,
    location: 'Electric Zone',
    category: 'Музыка',
    description: 'Живые электронные выступления международных DJ',
  },
  {
    id: '3',
    name: 'Экскурсия по арт-инсталляциям',
    time: '11:30',
    endTime: '12:45',
    duration: 75,
    location: 'Галерея искусства',
    category: 'Искусство',
    description: 'Экскурсия по современным арт-инсталляциям',
  },
  {
    id: '4',
    name: 'Обеденный перерыв и фуд-корт',
    time: '12:45',
    endTime: '14:00',
    duration: 75,
    location: 'Центральная площадь',
    category: 'Еда',
    description: 'Насладитесь международной кухней и местными деликатесами',
  },
  {
    id: '5',
    name: 'Битва рок-групп',
    time: '13:00',
    endTime: '15:00',
    duration: 120,
    location: 'Rock Arena',
    category: 'Музыка',
    description: 'Топ-группы соревнуются в этом энергичном шоу',
  },
  {
    id: '6',
    name: 'Мастер-класс: Фотография',
    time: '14:00',
    endTime: '15:30',
    duration: 90,
    location: 'Зал семинаров A',
    category: 'Мастер-класс',
    description: 'Изучите профессиональные техники фотографии',
  },
  {
    id: '7',
    name: 'Stand-up комедия',
    time: '15:00',
    endTime: '16:15',
    duration: 75,
    location: 'Comedy Club',
    category: 'Комедия',
    description: 'Смешные выступления лучших комиков',
  },
  {
    id: '8',
    name: 'Танцевальное шоу',
    time: '15:30',
    endTime: '16:45',
    duration: 75,
    location: 'Театр танца',
    category: 'Перформанс',
    description: 'Современные и традиционные танцевальные выступления',
  },
  {
    id: '9',
    name: 'Технологическая выставка',
    time: '16:00',
    endTime: '18:00',
    duration: 120,
    location: 'Tech Zone',
    category: 'Технология',
    description: 'Последние технологические инновации и стартапы',
  },
  {
    id: '10',
    name: 'Джаз выступление',
    time: '17:00',
    endTime: '18:30',
    duration: 90,
    location: 'Jazz Lounge',
    category: 'Музыка',
    description: 'Плавный джаз от известных музыкантов',
  },
  {
    id: '11',
    name: 'Йога сессия на закате',
    time: '17:30',
    endTime: '18:30',
    duration: 60,
    location: 'Wellness Area',
    category: 'Велнес',
    description: 'Расслабляющая йога-сессия в золотой час',
  },
  {
    id: '12',
    name: 'Закрывающий концерт',
    time: '19:00',
    endTime: '21:00',
    duration: 120,
    location: 'Главная сцена',
    category: 'Музыка',
    description: 'Грандиозный финал с топ-артистами',
  },
];

export function EventSelector({ onGenerate, onSetRoutes }: EventSelectorProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isGenerating, setIsGenerating] = useState(false);

  const categories = ['all', ...new Set(FESTIVAL_EVENTS.map(e => e.category))];

  const categoryLabels: { [key: string]: string } = {
    all: 'Все',
    'Церемония': 'Церемония',
    'Музыка': 'Музыка',
    'Искусство': 'Искусство',
    'Еда': 'Еда',
    'Мастер-класс': 'Мастер-класс',
    'Комедия': 'Комедия',
    'Перформанс': 'Перформанс',
    'Технология': 'Технология',
    'Велнес': 'Велнес',
  };

  const filteredEvents = FESTIVAL_EVENTS.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleToggle = (eventId: string) => {
    const newSelected = new Set(selected);
    if (newSelected.has(eventId)) {
      newSelected.delete(eventId);
    } else {
      newSelected.add(eventId);
    }
    setSelected(newSelected);
  };

  const generateRoutes = () => {
    if (selected.size === 0) return;

    setIsGenerating(true);

    setTimeout(() => {
      const selectedEventsList = FESTIVAL_EVENTS.filter(e => selected.has(e.id));
      const generatedRoutes = generateOptimalRoutes(selectedEventsList);
      onSetRoutes(generatedRoutes);
      onGenerate(Array.from(selected));
      setIsGenerating(false);
    }, 800);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Выберите события</h2>
        <p className="text-muted-foreground">Выберите события, которые вы хотите посетить, мы создадим для вас расписание без конфликтов</p>
      </div>

      <div className="grid gap-4 mb-8">
        <div className="flex gap-4 flex-col md:flex-row">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Поиск событий..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  selectedCategory === cat
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {categoryLabels[cat] || cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 mb-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredEvents.map(event => (
          <Card
            key={event.id}
            onClick={() => handleToggle(event.id)}
            className={`cursor-pointer transition-all border-2 ${
              selected.has(event.id)
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50 bg-card'
            }`}
          >
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{event.name}</h3>
                  <p className="text-sm text-muted-foreground">{event.location}</p>
                </div>
                <div className={`ml-2 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                  selected.has(event.id)
                    ? 'bg-primary border-primary'
                    : 'border-border'
                }`}>
                  {selected.has(event.id) && <Check className="w-3 h-3 text-primary-foreground" />}
                </div>
              </div>
              <div className="flex gap-2 mb-3">
                <span className="text-xs px-2 py-1 bg-secondary/20 text-secondary rounded">
                  {event.category}
                </span>
                <span className="text-xs px-2 py-1 bg-accent/20 text-accent rounded">
                  {event.time} - {event.endTime}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{event.description}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex justify-center">
        <Button
          onClick={generateRoutes}
          disabled={selected.size === 0 || isGenerating}
          size="lg"
          className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground px-8"
        >
          {isGenerating ? 'Генерация маршрутов...' : `Создать маршруты (выбрано ${selected.size})`}
        </Button>
      </div>
    </div>
  );
}

function generateOptimalRoutes(selectedEvents: Event[]): Route[] {
  // Sort events by start time
  const sorted = [...selectedEvents].sort((a, b) => {
    const timeA = parseInt(a.time.replace(':', ''));
    const timeB = parseInt(b.time.replace(':', ''));
    return timeA - timeB;
  });

  const routes: Route[] = [];

  // Generate multiple route variations
  const variations = generateVariations(sorted);

  variations.forEach((variation, idx) => {
    routes.push({
      id: `route-${idx + 1}`,
      events: variation,
      totalWalkingTime: calculateWalkingTime(variation),
      coverage: (variation.length / selectedEvents.length) * 100,
    });
  });

  return routes;
}

function generateVariations(events: Event[]): Event[][] {
  const variations: Event[][] = [];
  const n = events.length;

  // Variation 1: All compatible events (no conflicts)
  variations.push(getCompatibleEvents(events));

  // Variation 2: Maximum coverage (greedy approach)
  variations.push(getGreedyEvents(events));

  // Variation 3: Balanced approach
  variations.push(getBalancedEvents(events));

  return variations.filter(v => v.length > 0);
}

function getCompatibleEvents(events: Event[]): Event[] {
  const compatible: Event[] = [];
  
  for (const event of events) {
    const hasConflict = compatible.some(e => {
      const eventStart = timeToMinutes(event.time);
      const eventEnd = eventStart + event.duration;
      const existingStart = timeToMinutes(e.time);
      const existingEnd = existingStart + e.duration;
      
      return (eventStart < existingEnd && eventEnd > existingStart);
    });

    if (!hasConflict) {
      compatible.push(event);
    }
  }

  return compatible;
}

function getGreedyEvents(events: Event[]): Event[] {
  const selected: Event[] = [];
  let currentTime = timeToMinutes(events[0].time);

  for (const event of events) {
    const eventStart = timeToMinutes(event.time);
    const eventEnd = eventStart + event.duration;

    if (eventStart >= currentTime) {
      selected.push(event);
      currentTime = eventEnd;
    }
  }

  return selected;
}

function getBalancedEvents(events: Event[]): Event[] {
  const selected: Event[] = [];
  const eventsByCategory: { [key: string]: Event[] } = {};

  events.forEach(e => {
    if (!eventsByCategory[e.category]) {
      eventsByCategory[e.category] = [];
    }
    eventsByCategory[e.category].push(e);
  });

  for (const category of Object.keys(eventsByCategory)) {
    const categoryEvents = eventsByCategory[category];
    const hasConflict = (event: Event) => {
      return selected.some(e => {
        const eventStart = timeToMinutes(event.time);
        const eventEnd = eventStart + event.duration;
        const existingStart = timeToMinutes(e.time);
        const existingEnd = existingStart + e.duration;
        
        return eventStart < existingEnd && eventEnd > existingStart;
      });
    };

    for (const event of categoryEvents) {
      if (!hasConflict(event)) {
        selected.push(event);
        break;
      }
    }
  }

  return selected.sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time));
}

function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

function calculateWalkingTime(events: Event[]): number {
  // Simplified walking time calculation between locations
  let totalTime = 0;
  const locations = new Set<string>();

  events.forEach(e => {
    locations.add(e.location);
  });

  return Math.min(locations.size * 5, 30); // Max 30 minutes walking
}
