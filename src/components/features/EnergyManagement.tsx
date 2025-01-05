import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Gauge, Bolt } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const data = [
  { name: 'Mon', electricity: 24, gas: 15 },
  { name: 'Tue', electricity: 28, gas: 17 },
  { name: 'Wed', electricity: 26, gas: 16 },
  { name: 'Thu', electricity: 32, gas: 19 },
  { name: 'Fri', electricity: 30, gas: 18 },
  { name: 'Sat', electricity: 22, gas: 14 },
  { name: 'Sun', electricity: 20, gas: 13 },
];

export const EnergyManagement = () => {
  const totalElectricity = data.reduce((acc, curr) => acc + curr.electricity, 0);
  const totalGas = data.reduce((acc, curr) => acc + curr.gas, 0);

  return (
    <div className="space-y-6">
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
            <p className="text-xs text-muted-foreground">Weekly consumption</p>
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
            <p className="text-xs text-muted-foreground">Weekly consumption</p>
          </CardContent>
        </Card>
      </div>

      <Card className="w-full h-[300px]">
        <CardHeader>
          <CardTitle>Weekly Energy Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="electricity" stroke="#9b87f5" name="Electricity (kWh)" />
              <Line type="monotone" dataKey="gas" stroke="#7E69AB" name="Gas (m³)" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};