import { useState, useEffect, useRef } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { theme } from '../styles/theme';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [nodeWidth, setNodeWidth] = useState(theme.sizes.nodeWidth);
  const [nodeHeight, setNodeHeight] = useState(theme.sizes.nodeMinHeight);
  const textareaRef = useRef(null);

  // Extract variables from text {{variableName}} - allows spaces inside braces
  const extractVariables = (text) => {
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const matches = [];
    let match;
    while ((match = regex.exec(text)) !== null) {
      matches.push(match[1]);
    }
    return [...new Set(matches)];
  };

  const variables = extractVariables(currText);

  // Generate input handles for each detected variable
  const handles = [
    { type: 'source', position: Position.Right, id: `${id}-output` },
    ...variables.map((variable, index) => ({
      type: 'target',
      position: Position.Left,
      id: `${id}-${variable}`,
      style: { top: `${(index + 1) * 100 / (variables.length + 1)}%` }
    }))
  ];

  // Auto-size textarea and node
  useEffect(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.style.height = 'auto';
      const newHeight = Math.max(80, textarea.scrollHeight + 30);
      textarea.style.height = `${newHeight}px`;
      setNodeHeight(newHeight);

      // Calculate width based on longest line
      const lines = currText.split('\n');
      const longestLine = Math.max(...lines.map(line => line.length), 1);
      const estimatedWidth = Math.max(theme.sizes.nodeWidth, Math.min(longestLine * 8 + 40, 400));
      setNodeWidth(estimatedWidth);
    }
  }, [currText]);

  return (
    <BaseNode
      id={id}
      data={data}
      title="Text"
      width={nodeWidth}
      height={nodeHeight}
      handles={handles}
      style={{
        transition: 'width 0.2s ease, height 0.2s ease'
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.sm }}>
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={(e) => setCurrText(e.target.value)}
          placeholder="Enter text... Use {{variable}} for inputs"
          style={{
            width: '100%',
            minHeight: '60px',
            backgroundColor: theme.colors.background,
            border: `1px solid ${theme.colors.borderLight}`,
            borderRadius: theme.borderRadius.sm,
            color: theme.colors.text,
            padding: theme.spacing.sm,
            resize: 'none',
            outline: 'none',
            fontSize: '12px',
            boxSizing: 'border-box',
            fontFamily: 'monospace'
          }}
        />
        {variables.length > 0 && (
          <div style={{ fontSize: '10px', color: theme.colors.success }}>
            {variables.length} variable{variables.length !== 1 ? 's' : ''}: {variables.join(', ')}
          </div>
        )}
      </div>
    </BaseNode>
  );
}