import { useStore } from './store';
import { theme } from './styles/theme';

export const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('nodes', JSON.stringify(nodes));
      formData.append('edges', JSON.stringify(edges));

      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      const message = `Pipeline Analysis Results:
Nodes: ${result.num_nodes}
Edges: ${result.num_edges}
Is DAG: ${result.is_dag ? 'Yes ✓' : 'No ✗ (contains cycle)'}`;

      alert(message);
    } catch (error) {
      alert(`Error submitting pipeline: ${error.message}`);
    }
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.spacing.lg,
      backgroundColor: theme.colors.surface,
      borderTop: `1px solid ${theme.colors.border}`
    }}>
      <button
        onClick={handleSubmit}
        style={{
          padding: `${theme.spacing.md} ${theme.spacing.lg}`,
          backgroundColor: theme.colors.primary,
          color: theme.colors.text,
          border: 'none',
          borderRadius: theme.borderRadius.md,
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          boxShadow: theme.shadows.md
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = theme.colors.primaryHover;
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = theme.shadows.lg;
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = theme.colors.primary;
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = theme.shadows.md;
        }}
      >
        Submit Pipeline
      </button>
    </div>
  );
}

