import React, { useState, useEffect, } from "react";
import { ItemWrapper, Wrapper, Title, Header, Footer, Login, Location, Email, Avatar, Bio, UserItem, } from "./styles";

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState('');

  async function fetchUsers(url) {
    setLoading(true);
    try {
      let response = await fetch(url);
      response = await response.json();

      if (response.items && response.items.length > 0) {
        const sorted_users = [];

        for (let i = 0; i < response.items.length; i++) {
          sorted_users.push(await getDetailedInfo(response.items[i].url));
        }
        setUsers(sorted_users);
      }
    }
    catch (e) {
      console.log(e);
    }
    finally {
      setLoading(false);
    }
  }

  function getDetailedInfo(url) {
      return fetch(url)
        .then(res => res.json())
  }

  useEffect(() => {
    fetchUsers('https://api.github.com/search/users?q=feature+sort%3Afollowers&type=Users?page=1&per_page=10');
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <div>Loading ...</div>;
  }

  const handleSubmit = e => {
      e.preventDefault();
      setUsers([]);
      fetchUsers(`https://api.github.com/search/users?q=location%3A${inputValue.trim()}&feature+sort%3Afollowers&type=Users?page=1&per_page=10`);
  }
  console.log(users);
  return (
    <Wrapper>
      <Title>10 most followed users on GitHub:</Title>
      <form onSubmit={handleSubmit} style={{textAlign: 'center'}}>
        <label>
          Enter your city:&nbsp;
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
          />
        </label>
    </form>
      <div>
        {users.length ? Object.values(users).map((user, index) => (
          <ItemWrapper key={index}>
            <span>{index+1}</span>
            <UserItem>
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
          </ItemWrapper>
        )) : <p style={{textAlign: 'center'}}>Not found any users :(</p>}
      </div>
    </Wrapper>
  )
}

export default App;
