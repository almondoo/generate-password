'use client';

import ToolPageLayout from '@/components/ToolPageLayout';
import { Input } from '@/components/ui/input';
import { Percent } from 'lucide-react';
import { useState } from 'react';
import { calcAddPercent, calcPercentOf, calcWhatPercent } from './calcPercent';

const PercentCalcPage = () => {
  const [wp_a, setWpA] = useState('');
  const [wp_b, setWpB] = useState('');
  const [po_a, setPoA] = useState('');
  const [po_b, setPoB] = useState('');
  const [as_a, setAsA] = useState('');
  const [as_b, setAsB] = useState('');

  const wpResult = wp_a && wp_b ? calcWhatPercent(Number(wp_a), Number(wp_b)) : null;
  const poResult = po_a && po_b ? calcPercentOf(Number(po_a), Number(po_b)) : null;
  const asAddResult = as_a && as_b ? calcAddPercent(Number(as_a), Number(as_b), true) : null;
  const asSubResult = as_a && as_b ? calcAddPercent(Number(as_a), Number(as_b), false) : null;

  return (
    <ToolPageLayout icon={Percent} title="パーセント計算" contentClassName="space-y-6">
      <div className="space-y-3 rounded-md border p-4">
        <p className="text-sm font-medium">AはBの何%？</p>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={wp_a}
            onChange={(e) => setWpA(e.target.value)}
            placeholder="A"
            className="w-28"
          />
          <span className="text-sm">は</span>
          <Input
            type="number"
            value={wp_b}
            onChange={(e) => setWpB(e.target.value)}
            placeholder="B"
            className="w-28"
          />
          <span className="text-sm">の</span>
          <span className="font-mono font-bold">
            {wpResult !== null ? `${wpResult.toFixed(2)}%` : '—'}
          </span>
        </div>
      </div>

      <div className="space-y-3 rounded-md border p-4">
        <p className="text-sm font-medium">AのB%は？</p>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={po_a}
            onChange={(e) => setPoA(e.target.value)}
            placeholder="A"
            className="w-28"
          />
          <span className="text-sm">の</span>
          <Input
            type="number"
            value={po_b}
            onChange={(e) => setPoB(e.target.value)}
            placeholder="B"
            className="w-28"
          />
          <span className="text-sm">%は</span>
          <span className="font-mono font-bold">
            {poResult !== null ? poResult.toFixed(2) : '—'}
          </span>
        </div>
      </div>

      <div className="space-y-3 rounded-md border p-4">
        <p className="text-sm font-medium">AにB%足す/引く</p>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={as_a}
            onChange={(e) => setAsA(e.target.value)}
            placeholder="A"
            className="w-28"
          />
          <span className="text-sm">に</span>
          <Input
            type="number"
            value={as_b}
            onChange={(e) => setAsB(e.target.value)}
            placeholder="B"
            className="w-28"
          />
          <span className="text-sm">%</span>
        </div>
        <div className="flex gap-4 text-sm">
          <span>足す: <span className="font-mono font-bold">{asAddResult !== null ? asAddResult.toFixed(2) : '—'}</span></span>
          <span>引く: <span className="font-mono font-bold">{asSubResult !== null ? asSubResult.toFixed(2) : '—'}</span></span>
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default PercentCalcPage;
