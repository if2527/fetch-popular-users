import styled from 'styled-components'

export const Avatar = styled.div`
  width: 70px;
  height: 70px;
  background: grey;
  margin-right: 20px;
  img {
    display: block;
    width: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

export const Login = styled.a`
  color: blue;
  margin-right: 5px;
`;

export const Location = styled.div`
  position: relative;
  margin-right: 5px;
`;

export const Email = styled.div`
  position: relative;
  margin-right: 5px;
`;

export const Bio = styled.div`
  margin: 5px 0;
`;

export const UserItem = styled.div`
  display: flex;
  padding: 20px 0;
  background: light-grey;
  border-bottom: 1px solid grey;
  &:first-child {
    border-top: 1px solid grey;
  }
`;

export const Header = styled.div`
  display: flex;
`;
export const Footer = styled.div`
  display: flex;
  color: grey;
`;
