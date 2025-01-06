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
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold text-white">Energy Usage Overview</h2>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={!isMonthlyView ? "secondary" : "outline"}
            onClick={() => setIsMonthlyView(false)}
          >
            Weekly
          </Button>
          <Button
            size="sm"
            variant={isMonthlyView ? "secondary" : "outline"}
            onClick={() => setIsMonthlyView(true)}
          >
            Monthly
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card className="p-2">
          <CardHeader className="p-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">Electricity</CardTitle>
              <Bolt className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent className="p-2">
            <div className="text-xl font-bold">{totalElectricity} kWh</div>
            <p className="text-xs text-muted-foreground">
              {isMonthlyView ? 'Monthly' : 'Weekly'}
            </p>
          </CardContent>
        </Card>

        <Card className="p-2">
          <CardHeader className="p-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">Gas</CardTitle>
              <Gauge className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent className="p-2">
            <div className="text-xl font-bold">{totalGas} m³</div>
            <p className="text-xs text-muted-foreground">
              {isMonthlyView ? 'Monthly' : 'Weekly'}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="w-full h-[300px]">
        <CardContent className="p-4">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart 
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
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