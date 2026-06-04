import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, Legend } from 'recharts';
import { palette } from '../../utils/mockData';

const tooltip = { background: 'rgba(15,23,42,.96)', border: '1px solid rgba(148,163,184,.22)', borderRadius: 14, boxShadow: '0 18px 50px rgba(0,0,0,.35)' };

export function TrendLine({ data, dataKey = 'count', color = '#38bdf8' }: { data: object[]; dataKey?: string; color?: string }) {
  return <ResponsiveContainer width="100%" height={290}><LineChart data={data} margin={{ top: 12, right: 16, left: -12, bottom: 0 }}><defs><linearGradient id={`line-${dataKey}`} x1="0" x2="1"><stop offset="0%" stopColor={color}/><stop offset="100%" stopColor="#8b5cf6"/></linearGradient></defs><CartesianGrid stroke="rgba(148,163,184,.10)" vertical={false} /><XAxis dataKey="hour" stroke="#91a4bd" tickLine={false} axisLine={false} /><YAxis stroke="#91a4bd" tickLine={false} axisLine={false} /><Tooltip contentStyle={tooltip} cursor={{ stroke: color, strokeDasharray: '4 4' }} /><Line type="monotone" dataKey={dataKey} stroke={`url(#line-${dataKey})`} strokeWidth={4} dot={{ r: 3, fill: color }} activeDot={{ r: 7, strokeWidth: 0, fill: color }} /></LineChart></ResponsiveContainer>;
}
export function HealthArea({ data }: { data: object[] }) {
  return <ResponsiveContainer width="100%" height={290}><AreaChart data={data} margin={{ top: 12, right: 16, left: -12, bottom: 0 }}><defs><linearGradient id="health" x1="0" x2="0" y1="0" y2="1"><stop offset="5%" stopColor="#22c55e" stopOpacity={.58}/><stop offset="95%" stopColor="#22c55e" stopOpacity={0}/></linearGradient></defs><CartesianGrid stroke="rgba(148,163,184,.10)" vertical={false} /><XAxis dataKey="hour" stroke="#91a4bd" tickLine={false} axisLine={false} /><YAxis stroke="#91a4bd" domain={[60, 100]} tickLine={false} axisLine={false} /><Tooltip contentStyle={tooltip} /><Area type="monotone" dataKey="health" stroke="#22c55e" fill="url(#health)" strokeWidth={4}/></AreaChart></ResponsiveContainer>;
}
export function VolumeBar({ data }: { data: object[] }) {
  return <ResponsiveContainer width="100%" height={290}><BarChart data={data} margin={{ top: 12, right: 16, left: -12, bottom: 0 }}><CartesianGrid stroke="rgba(148,163,184,.10)" vertical={false} /><XAxis dataKey="hour" stroke="#91a4bd" tickLine={false} axisLine={false} /><YAxis stroke="#91a4bd" tickLine={false} axisLine={false} /><Tooltip contentStyle={tooltip} cursor={{ fill: 'rgba(139,92,246,.08)' }} /><Bar dataKey="count" fill="url(#barGradient)" radius={[10,10,0,0]} /><defs><linearGradient id="barGradient" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#a78bfa"/><stop offset="100%" stopColor="#38bdf8"/></linearGradient></defs></BarChart></ResponsiveContainer>;
}
export function Donut({ data }: { data: { name: string; value: number }[] }) {
  return <ResponsiveContainer width="100%" height={290}><PieChart><Pie data={data} dataKey="value" nameKey="name" innerRadius={70} outerRadius={102} paddingAngle={5} cornerRadius={10}>{data.map((_, i) => <Cell key={i} fill={palette[i % palette.length]} stroke="rgba(2,6,23,.8)" strokeWidth={3} />)}</Pie><Legend iconType="circle" /><Tooltip contentStyle={tooltip} /></PieChart></ResponsiveContainer>;
}
