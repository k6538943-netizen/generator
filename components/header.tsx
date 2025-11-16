"use client";

import { MapPin, Calendar, HelpCircle, Share2, Menu } from "lucide-react";
import { useState } from "react";
import { FestivalLogo } from "./festival-logo";

interface HeaderProps {
  step: "select" | "compare" | "detail";
  onReset: () => void;
}

export function Header({ step, onReset }: HeaderProps) {
  const [showInfo, setShowInfo] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-md border-b border-primary/20 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Info Banner */}
        <div className="hidden md:flex items-center justify-center gap-6 py-2 px-4 bg-primary/5 text-xs text-muted-foreground border-b border-primary/10">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            <span>Москва, Парк Горького</span>
          </div>
          <div className="w-px h-4 bg-border"></div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-secondary" />
            <span>23-25 августа 2024</span>
          </div>
        </div>

        {/* Main Header */}
        <div className="py-4 flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-3 flex-1">
            <div className="p-2.5 bg-gradient-to-br from-primary to-secondary rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <FestivalLogo />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Генератор маршрута
              </h1>
              <p className="text-xs md:text-sm text-muted-foreground mt-0.5">
                Спланируйте свой идеальный фестивальный день
              </p>
            </div>
            <div className="sm:hidden">
              <h1 className="text-lg font-bold text-foreground">Маршрут</h1>
              <p className="text-xs text-muted-foreground">Ваш фестиваль</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <nav className="flex items-center gap-4">
              <button
                onClick={() => setShowInfo(!showInfo)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-primary/10 transition-colors text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Справка</span>
              </button>
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pl-6 border-l border-border">
              {step !== "select" && (
                <button
                  onClick={onReset}
                  className="px-4 py-2 bg-secondary/10 hover:bg-secondary/20 text-secondary rounded-lg transition-all font-medium text-sm"
                >
                  Начать заново
                </button>
              )}
              <button
                className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
                title="Поделиться"
              >
                <Share2 className="w-5 h-5 text-muted-foreground hover:text-primary" />
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            {step !== "select" && (
              <button
                onClick={onReset}
                className="px-3 py-1.5 bg-secondary/10 hover:bg-secondary/20 text-secondary rounded-lg transition-all font-medium text-xs"
              >
                Заново
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Info Tooltip */}
        {showInfo && (
          <div className="hidden md:block mb-3 p-4 bg-primary/5 border border-primary/20 rounded-lg text-sm text-muted-foreground">
            <div className="flex gap-3">
              <div className="w-1 h-full bg-primary rounded-full"></div>
              <div>
                <p className="font-medium text-foreground mb-2">
                  Как это работает?
                </p>
                <p>
                  Выберите интересующие вас мероприятия, и система автоматически
                  создаст оптимальный маршрут без временных конфликтов. Вы
                  можете сравнить несколько вариантов и выбрать лучший для вас.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
