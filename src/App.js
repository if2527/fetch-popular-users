import React, { useState, useEffect, } from "react";
import { Header, Footer, Login, Location, Email, Avatar, Bio, UserItem, } from "./styles";

const App = () => {
  const [users, setUsers] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  function getUser(url) {
      return fetch(url)
        .then(res => res.json())
  }
  
  useEffect(() => {
    async function fetchUsers() {
      try {
        let response = await fetch('https://api.github.com/search/users?q=location%3Akrakow&feature+sort%3Afollowers&type=Users')
        response = await response.json();
    
        if (!response.message) {
          const users = [];
      
          for (let i = 0; i < 10; i++) {
            const user = await getUser(response.items[i].url);
            users.push(user);
          }
          setUsers(users);
        } else {
          setError(true);
          setErrorMsg(response.message);
          return false;
        }
      }
      catch (error) {
        setError(true);
        setErrorMsg(error);
      }
      finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);
  
  if (loading) {
    return <div>Loading ...</div>;
  }
  
  if (error) {
    return <div>Error: {errorMsg}</div>;
  }
  
  return (
    <div>
      {Object.values(users).map((user, index) => (
        <UserItem key={index}>
          <Avatar>
            {user.avatar_url && <img src={user.avatar_url} alt={user.login} />}
          </Avatar>
          <div>
            <Header>
              {user.login && (
                <Login href={user.html_url} target="_blank" rel="noopener noreferrer" >{user.login}</Login>
              )}
              {user.name}
            </Header>
            {user.bio && <Bio>{user.bio}</Bio>}
            <Footer>
              {user.location && <Location>{user.location}</Location>}
              {user.email && <Email>{user.email}</Email>}
            </Footer>
          </div>
        </UserItem>
      ))}
    </div>
  )
}

export default App;
