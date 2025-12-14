import { Card } from '@/components/ui/card';
import { useEffect, useRef } from 'react';

interface PriceChartProps {
  data: number[];
  label: string;
  color?: string;
}

export default function PriceChart({ data, label, color = '#0EA5E9' }: PriceChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const padding = 20;

    ctx.clearRect(0, 0, width, height);

    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min;

    const points = data.map((value, index) => ({
      x: padding + (index * (width - padding * 2)) / (data.length - 1),
      y: height - padding - ((value - min) / range) * (height - padding * 2)
    }));

    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, color + '40');
    gradient.addColorStop(1, color + '00');

    ctx.beginPath();
    ctx.moveTo(points[0].x, height - padding);
    points.forEach(point => {
      ctx.lineTo(point.x, point.y);
    });
    ctx.lineTo(points[points.length - 1].x, height - padding);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    points.forEach(point => {
      ctx.lineTo(point.x, point.y);
    });
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();

    points.forEach(point => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    });

  }, [data, color]);

  return (
    <Card className="p-6 animate-slide-up">
      <h3 className="font-semibold text-lg mb-4">{label}</h3>
      <canvas
        ref={canvasRef}
        width={800}
        height={300}
        className="w-full h-auto"
      />
    </Card>
  );
}
