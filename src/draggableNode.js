import { theme } from './styles/theme';

export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      
      // Set proper drag effect and ghost element positioning
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
      
      // Set the drag image/ghost element to prevent hiding issues
      // This creates a transparent drag image so the original stays visible
      const img = new Image();
      img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
      event.dataTransfer.setDragImage(img, 0, 0);
    };
  
    return (
      <div
        className={type}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => {
          event.target.style.cursor = 'grab';
          event.target.style.transform = 'scale(1)';
          event.target.style.boxShadow = theme.shadows.md;
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = theme.colors.primaryHover;
          e.target.style.transform = 'scale(1.05)';
          e.target.style.boxShadow = theme.shadows.lg;
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = theme.colors.primary;
          e.target.style.transform = 'scale(1)';
          e.target.style.boxShadow = theme.shadows.md;
        }}
        style={{
          cursor: 'grab',
          minWidth: '100px',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          borderRadius: theme.borderRadius.md,
          backgroundColor: theme.colors.primary,
          justifyContent: 'center',
          flexDirection: 'column',
          color: theme.colors.text,
          fontWeight: '600',
          fontSize: '13px',
          boxShadow: theme.shadows.md,
          transition: 'all 0.2s ease',
          userSelect: 'none'
        }}
        draggable
      >
        <span>{label}</span>
      </div>
    );
  };