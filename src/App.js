import './App.css';
import { Header } from './components/header';
import { Text } from './pages/text_summary';
import { File } from './pages/file_summary';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Text />} />
          <Route path="/file" element={<File />} />
        </Routes>
      </Router>
    </>
  )
};

export default App;