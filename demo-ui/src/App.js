import './App.css';
import { useEffect, useState } from 'react';
import { Table, Button, FormControl } from 'react-bootstrap';

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
  const [filterField, setFilterField] = useState(null);
  const [filterValue, setFilterValue] = useState('');
  const [activeFilter, setActiveFilter] = useState(null);

  const handleSort = field => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const handleFilter = field => {
    if (activeFilter === field) {
      setFilterField(null);
      setFilterValue('');
      setActiveFilter(null);
    } else {
      setFilterField(field);
      setActiveFilter(field);
    }
  };

  const filteredCustomers = filterField
    ? customers.filter(customer =>
        customer[filterField].toLowerCase().includes(filterValue.toLowerCase()),
      )
    : customers;

  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    if (sortField) {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    }

    return 0;
  });

  return (
    <div class="container">
      <h1 className="text-center mb-4">AdventureWorks Sort Filter Customers</h1>
      <div className="mb-4">
        <FormControl
          type="text"
          placeholder="Filter by value..."
          className="mb-3"
          value={filterValue}
          onChange={e => setFilterValue(e.target.value)}
        />
        <span className="me-3">Filter Options: </span>
        <Button
          variant={activeFilter === 'firstName' ? 'primary active' : 'primary'}
          onClick={() => handleFilter('firstName')}
          className="me-3"
        >
          Name
        </Button>
        <Button
          variant={
            activeFilter === 'emailAddress' ? 'primary active' : 'primary'
          }
          onClick={() => handleFilter('emailAddress')}
          className="me-3"
        >
          Email
        </Button>
        <Button
          variant={activeFilter === 'phone' ? 'primary active' : 'primary'}
          onClick={() => handleFilter('phone')}
          className="me-3"
        >
          Phone
        </Button>
      </div>
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
