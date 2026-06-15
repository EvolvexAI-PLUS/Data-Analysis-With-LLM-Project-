import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { theme } from '../styles/theme';

export const MathNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'add');
  const [constant, setConstant] = useState(data?.constant || '0');

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-a`, style: { top: '33%' } },
    { type: 'target', position: Position.Left, id: `${id}-b`, style: { top: '66%' } },
    { type: 'source', position: Position.Right, id: `${id}-result` }
  ];

  const operations = [
    { value: 'add', label: 'Add (+)' },
    { value: 'subtract', label: 'Subtract (-)' },
    { value: 'multiply', label: 'Multiply (×)' },
    { value: 'divide', label: 'Divide (÷)' }
  ];

  return (
    <BaseNode id={id} data={data} title="Math" handles={handles}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.sm }}>
        <label style={{ fontSize: '12px', color: theme.colors.textSecondary }}>
          Operation:
          <select
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
            style={{
              width: '100%',
              marginTop: '4px',
              padding: theme.spacing.xs,
              backgroundColor: theme.colors.background,
              border: `1px solid ${theme.colors.borderLight}`,
              borderRadius: theme.borderRadius.sm,
              color: theme.colors.text,
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            {operations.map(op => (
              <option key={op.value} value={op.value}>{op.label}</option>
            ))}
          </select>
        </label>
        <label style={{ fontSize: '12px', color: theme.colors.textSecondary }}>
          Constant:
          <input
            type="number"
            value={constant}
            onChange={(e) => setConstant(e.target.value)}
            style={{
              width: '100%',
              marginTop: '4px',
              padding: theme.spacing.xs,
              backgroundColor: theme.colors.background,
              border: `1px solid ${theme.colors.borderLight}`,
              borderRadius: theme.borderRadius.sm,
              color: theme.colors.text,
              fontSize: '12px'
            }}
          />
        </label>
      </div>
    </BaseNode>
  );
};
