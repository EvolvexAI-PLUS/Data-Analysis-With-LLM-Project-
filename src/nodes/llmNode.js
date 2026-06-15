import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { theme } from '../styles/theme';

export const LLMNode = ({ id, data }) => {
  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-system`, style: { top: '33%' } },
    { type: 'target', position: Position.Left, id: `${id}-prompt`, style: { top: '66%' } },
    { type: 'source', position: Position.Right, id: `${id}-response` }
  ];

  return (
    <BaseNode id={id} data={data} title="LLM" handles={handles}>
      <div style={{ fontSize: '12px', color: theme.colors.textSecondary }}>
        <div style={{ marginBottom: theme.spacing.sm }}>System input</div>
        <div>Prompt input</div>
      </div>
    </BaseNode>
  );
}

