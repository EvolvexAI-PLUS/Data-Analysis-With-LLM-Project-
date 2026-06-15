import { DraggableNode } from './draggableNode';
import { theme } from './styles/theme';

export const PipelineToolbar = () => {

    return (
        <div style={{
            padding: theme.spacing.lg,
            backgroundColor: theme.colors.surface,
            borderBottom: `1px solid ${theme.colors.border}`,
            maxHeight: theme.sizes.toolbarHeight,
            overflowY: 'auto',
            position: 'relative',
            zIndex: 10
        }}>
            <div style={{ fontSize: '12px', color: theme.colors.textSecondary, marginBottom: theme.spacing.md, fontWeight: '600' }}>
                Drag nodes to canvas:
            </div>
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: theme.spacing.md
            }}>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='math' label='Math' />
                <DraggableNode type='database' label='Database' />
                <DraggableNode type='api' label='API' />
                <DraggableNode type='transform' label='Transform' />
                <DraggableNode type='condition' label='Condition' />
            </div>
        </div>
    );
};
