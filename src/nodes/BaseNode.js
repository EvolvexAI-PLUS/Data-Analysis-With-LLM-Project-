import { Handle } from 'reactflow';
import { theme } from '../styles/theme';

export const BaseNode = ({
  id,
  data,
  title,
  width = theme.sizes.nodeWidth,
  height,
  handles = [],
  children,
  style = {},
  onDataChange = null
}) => {
  const defaultStyle = {
    width,
    minHeight: height || theme.sizes.nodeMinHeight,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.surface,
    color: theme.colors.text,
    padding: theme.spacing.md,
    boxShadow: theme.shadows.md,
    transition: 'all 0.2s ease',
    position: 'relative',
    ...style
  };

  return (
    <div style={defaultStyle}>
      <div style={{
        fontWeight: '600',
        marginBottom: theme.spacing.md,
        color: theme.colors.primary,
        fontSize: '14px',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
      }}>
        {title}
      </div>

      {handles.map((handle, idx) => (
        <Handle
          key={handle.id || idx}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          style={{
            background: theme.colors.handle,
            width: theme.sizes.handleSize,
            height: theme.sizes.handleSize,
            borderRadius: '50%',
            border: `2px solid ${theme.colors.surface}`,
            boxShadow: `0 0 8px rgba(79, 70, 229, 0.5)`,
            ...handle.style
          }}
        />
      ))}

      {children}
    </div>
  );
};