import styled from "styled-components";

export default function Footer() {
  return (
    <FooterStyled>
      Made by <Link href="https://github.com/AlfreMK"> Alfredo Medina</Link>.
      Inspired by <Link href="https://www.jairtrejo.com/"> Jair Trejo</Link> and
      <Link href="https://www.danheisman.com/chess-exercises.html">
        {" "}
        Dan Heisman{" "}
      </Link>
    </FooterStyled>
  );
}

const FooterStyled = styled.footer`
  margin: 10px;
  margin-top: 30px;
  margin-bottom: 30px;
  text-align: center;
  @media (max-width: 640px) {
    font-size: 0.8em;
  }
`;

const Link = styled.a`
  color: #4183c4;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;
