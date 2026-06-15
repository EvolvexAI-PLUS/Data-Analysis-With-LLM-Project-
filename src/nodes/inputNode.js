import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { theme } from '../styles/theme';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  const handles = [
    { type: 'source', position: Position.Right, id: `${id}-value` }
  ];

  return (
    <BaseNode id={id} data={data} title="Input" handles={handles}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.sm }}>
        <label style={{ fontSize: '12px', color: theme.colors.textSecondary }}>
          Name:
          <input
            type="text"
            value={currName}
            onChange={(e) => setCurrName(e.target.value)}
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
        <label style={{ fontSize: '12px', color: theme.colors.textSecondary }}>
          Type:
          <select
            value={inputType}
            onChange={(e) => setInputType(e.target.value)}
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
            <option value="Text">Text</option>
            <option value="File">File</option>
            <option value="Number">Number</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
}

