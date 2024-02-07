import './App.css';
import { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';

function App() {
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5290/getCustomers')
      .then(res => {
        return res.json();
      })
      .then(data => {
        setCustomers(data);
      });
  }, []);

  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSort = field => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const sortedCustomers = [...customers].sort((a, b) => {
    if (sortField) {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    }

    return 0;
  });

  return (
    <div className="App">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <Button variant="link" onClick={() => handleSort('customerId')}>
                Customer ID
              </Button>
            </th>
            <th>
              <Button variant="link" onClick={() => handleSort('firstName')}>
                Name
              </Button>
            </th>
            <th>
              <Button variant="link" onClick={() => handleSort('title')}>
                Title
              </Button>
            </th>
            <th>
              <Button variant="link" onClick={() => handleSort('emailAddress')}>
                Email Address
              </Button>
            </th>
            <th>
              <Button variant="link" onClick={() => handleSort('phone')}>
                Phone
              </Button>
            </th>
            {/* Add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          {sortedCustomers.map(customer => (
            <tr key={customer.customerId}>
              <td>{customer.customerId}</td>
              <td>{`${customer.firstName} ${customer.lastName}`}</td>
              <td>{customer.title}</td>
              <td>{customer.emailAddress}</td>
              <td>{customer.phone}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default App;
