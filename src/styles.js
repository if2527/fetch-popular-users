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

export const Title = styled.h1`
  text-align: center;
`;

export const Wrapper = styled.div`
  padding: 30px 15px;
  max-width: 600px;
  margin: 0 auto;
`;

export const UserItem = styled.div`
  flex-grow: 1;
  display: flex;
  padding: 20px 0;
  background: light-grey;
  border-bottom: 1px solid grey;
`;

export const ItemWrapper = styled.div`
  align-items: center;
  display: flex;
  > span {
    margin-right: 20px;
  }
  &:last-child {
    ${UserItem} {
      border-bottom: none;
    }
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

export const Header = styled.div`
  display: flex;
`;
export const Footer = styled.div`
  display: flex;
  color: grey;
`;
