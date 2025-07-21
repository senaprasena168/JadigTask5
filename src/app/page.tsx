import { Provider } from 'react-redux';
import { store } from '@/store';
import MainContent from '@/components/MainContent';
import './globals.css';

export default function Home() {
  return (
    <Provider store={store}>
      <main className="min-h-screen bg-gradient-to-br from-green-600 to-green-900">
        <MainContent />
      </main>
    </Provider>
  );
}
