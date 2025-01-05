import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Gauge, Bolt } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

const weeklyData = [
  { name: 'Mon', electricity: 24, gas: 15 },
  { name: 'Tue', electricity: 28, gas: 17 },
  { name: 'Wed', electricity: 26, gas: 16 },
  { name: 'Thu', electricity: 32, gas: 19 },
  { name: 'Fri', electricity: 30, gas: 18 },
  { name: 'Sat', electricity: 22, gas: 14 },
  { name: 'Sun', electricity: 20, gas: 13 },
];

const monthlyData = [
  { name: 'Week 1', electricity: 182, gas: 112 },
  { name: 'Week 2', electricity: 164, gas: 98 },
  { name: 'Week 3', electricity: 176, gas: 105 },
  { name: 'Week 4', electricity: 169, gas: 101 },
];

export const EnergyManagement = () => {
  const [isMonthlyView, setIsMonthlyView] = useState(false);
  const data = isMonthlyView ? monthlyData : weeklyData;
  
  const totalElectricity = data.reduce((acc, curr) => acc + curr.electricity, 0);
  const totalGas = data.reduce((acc, curr) => acc + curr.gas, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-end mb-4">
        <Button
          variant={isMonthlyView ? "secondary" : "outline"}
          onClick={() => setIsMonthlyView(false)}
          className="mr-2"
        >
          Weekly
        </Button>
        <Button
          variant={isMonthlyView ? "outline" : "secondary"}
          onClick={() => setIsMonthlyView(true)}
        >
          Monthly
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Electricity Usage
            </CardTitle>
            <Bolt className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalElectricity} kWh</div>
            <p className="text-xs text-muted-foreground">
              {isMonthlyView ? 'Monthly' : 'Weekly'} consumption
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Gas Usage
            </CardTitle>
            <Gauge className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalGas} m³</div>
            <p className="text-xs text-muted-foreground">
              {isMonthlyView ? 'Monthly' : 'Weekly'} consumption
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="w-full h-[400px]">
        <CardHeader>
          <CardTitle>{isMonthlyView ? 'Monthly' : 'Weekly'} Energy Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart 
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis 
                dataKey="name" 
                stroke="#fff"
                tick={{ fill: '#fff' }}
                tickLine={{ stroke: '#fff' }}
              />
              <YAxis 
                stroke="#fff"
                tick={{ fill: '#fff' }}
                tickLine={{ stroke: '#fff' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#252837',
                  border: '1px solid #444',
                  color: '#fff'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="electricity" 
                stroke="#9b87f5" 
                name="Electricity (kWh)"
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="gas" 
                stroke="#7E69AB" 
                name="Gas (m³)"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};