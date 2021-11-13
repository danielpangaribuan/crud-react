import React from 'react';
import Navbar from './components/Navbar';
import DataTable from './pages/DataTable';
import './App.css';

class App extends React.Component {

  render () {
    return (
      <div>
        <Navbar />
        <div style={{ maxWidth: '80%', margin: '20px auto' }}>
          <DataTable />
        </div>
      </div>
    )
  }
}

export default App;