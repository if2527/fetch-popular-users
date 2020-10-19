import React, { useState, useEffect, } from "react";
import { ItemWrapper, Wrapper, Title, Header, Footer, Login, Location, Email, Avatar, Bio, UserItem, } from "./styles";

const App = () => {
  const location = 'Krakow';
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  function getUser(url) {
      return fetch(url)
        .then(res => res.json())
  }

  useEffect(() => {
    async function fetchUsers() {
      try {
        let response = await fetch(`https://api.github.com/search/users?q=location%3A${location.toLocaleLowerCase()}&feature+sort%3Afollowers&type=Users?page=1&per_page=10`);
        response = await response.json();

        if (response.items && response.items.length > 0) {
          const sorted_users = [];

          for (let i = 0; i < response.items.length; i++) {
            sorted_users.push(await getUser(response.items[i].url));
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
    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading ...</div>;
  }

  return (
    <Wrapper>
      <Title>10 most followed users on GitHub in {location}:</Title>
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
