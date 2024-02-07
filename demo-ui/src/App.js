import './App.css';
import { useEffect, useState } from 'react';


function App() {


  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5290/getCustomers')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCustomers(data);
      });
  }, []);



  return (
    <div className="App">
      {customers.map((customer) => (
        <div>{JSON.stringify(customer)}</div>
      ))}
    </div>
  );
}

export default App;
