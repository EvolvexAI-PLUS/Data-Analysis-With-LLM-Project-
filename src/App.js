import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { theme } from './styles/theme';

function App() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      backgroundColor: theme.colors.background,
      color: theme.colors.text,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif'
    }}>
      <PipelineToolbar />
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <PipelineUI />
      </div>
      <SubmitButton />
    </div>
  );
}

export default App;

