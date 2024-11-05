import './App.css';
import Topbar from "./components/Topbar.jsx";
import Group from './components/Group.jsx';
import { useDisplay } from './context/DisplayContext.jsx';
import { useState, useEffect } from 'react';

function App() {
  const { grouping, ordering } = useDisplay();
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupedTickets, setGroupedTickets] = useState([]);
  
  const priorityMapping = {
    0: "No priority",
    1: "Low",
    2: "Medium",
    3: "High",
    4: "Urgent"
  };

  const groupTickets = (tickets, grouping) => {
    let options, grouped, computed = [];
    switch (grouping) {
      case 'Status':
        options = ['Backlog', 'Todo', 'In progress', 'Done', 'Canceled'];
        grouped = tickets.reduce((groups, ticket) => {
          const group = ticket.status;
          if (!groups[group]) groups[group] = [];
          groups[group].push(ticket);
          return groups;
        }, {});
        
        options.forEach((option) => {
          computed.push([
            option, 
            `/assets/${option}.svg`, 
            grouped[option] ? grouped[option].length : 0, 
            grouped[option] || []
          ]);
        });
        return computed;

      case 'Priority':
        options = [0, 4, 3, 2, 1];
        grouped = tickets.reduce((groups, ticket) => {
          const group = ticket.priority;
          if (!groups[group]) groups[group] = [];
          groups[group].push(ticket);
          return groups;
        }, {});

        options.forEach((option) => {
          computed.push([
            priorityMapping[option], 
            `/assets/priority${option}.svg`, 
            grouped[option] ? grouped[option].length : 0, 
            grouped[option] || []
          ]);
        });
        return computed;

      case 'User':
        grouped = tickets.reduce((groups, ticket) => {
          const user = users.find(u => u.id === ticket.userId);
          const group = user ? user.name : "Unknown User";
          if (!groups[group]) groups[group] = [];
          groups[group].push(ticket);
          return groups;
        }, {});

        users.forEach((user) => {
          computed.push([
            user.name, 
            '/assets/person.svg', 
            grouped[user.name] ? grouped[user.name].length : 0, 
            grouped[user.name] || []
          ]);
        });
        return computed;

      default:
        return [];
    }
  };

  const orderTickets = (tickets, ordering) => {
    return tickets.map(([name, icon, count, items]) => {
      const sortedItems = [...items].sort((a, b) => {
        switch (ordering) {
          case 'Priority':
            return b.priority - a.priority;
          case 'Title':
            return a.title.localeCompare(b.title);
          default:
            return 0;
        }
      });
      return [name, icon, count, sortedItems];
    });
  };

  useEffect(() => {
    fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then(response => response.json())
      .then(json => {
        setTickets(json.tickets);
        setUsers(json.users);
      });
  }, []);

  useEffect(() => {
    const grouped = groupTickets(tickets, grouping);
    const ordered = orderTickets(grouped, ordering);
    setGroupedTickets(ordered);
  }, [tickets, users, grouping, ordering]);

  return (
    <>
      <Topbar />
      <div className='container'>
        {groupedTickets.map((item, key) => (
          <Group key={key} groupRecord={item} />
        ))}
      </div>
    </>
  );
}

export default App;
