
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
  primaryStat: string | number;
  primaryLabel: string;
  secondaryStat: string | number;
  secondaryLabel: string;
  link: string;
  linkText: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  description,
  icon: Icon,
  iconBgColor,
  iconColor,
  primaryStat,
  primaryLabel,
  secondaryStat,
  secondaryLabel,
  link,
  linkText
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className={`p-2 ${iconBgColor} rounded-full`}>
              <Icon className={`h-6 w-6 ${iconColor}`} />
            </div>
            <div>
              <p className="text-2xl font-bold">{primaryStat}</p>
              <p className="text-sm text-gray-500">{primaryLabel}</p>
            </div>
          </div>
          <div>
            <p className="text-xl font-semibold">{secondaryStat}</p>
            <p className="text-sm text-gray-500">{secondaryLabel}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" asChild className="w-full">
          <Link to={link}>{linkText}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DashboardCard;
