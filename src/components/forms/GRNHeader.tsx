import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Settings, Bell, User } from 'lucide-react';

const GRNHeader = () => {
  return (
    <div className="bg-primary text-primary-foreground shadow-lg">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Logo and Navigation */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-foreground text-primary rounded flex items-center justify-center font-bold text-sm">
                ERP
              </div>
              <span className="text-xl font-bold">ARPA ERP</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-1 text-sm">
              <span className="hover:bg-primary-hover px-3 py-1 rounded cursor-pointer transition-colors">
                Home
              </span>
              <span className="text-primary-foreground/60">/</span>
              <span className="hover:bg-primary-hover px-3 py-1 rounded cursor-pointer transition-colors">
                grn
              </span>
            </div>
          </div>

          {/* Center - Search */}
          <div className="flex-1 max-w-md mx-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-foreground/60 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search..."
                className="pl-10 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60 focus:bg-primary-foreground focus:text-primary"
              />
            </div>
          </div>

          {/* Right side - Actions and User */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-hover">
              <Settings className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-hover">
              <Bell className="w-4 h-4" />
            </Button>
            
            <div className="flex items-center space-x-2 pl-4 border-l border-primary-foreground/20">
              <div className="text-right text-sm">
                <div className="font-medium">Apex Steel Pvt. Ltd.</div>
              </div>
              <div className="w-8 h-8 bg-primary-foreground text-primary rounded-full flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GRNHeader;