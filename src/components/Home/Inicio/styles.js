import styled from "styled-components";

export const Inicio = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const BlockForm = styled.div`
  position: relative;
  padding: 9px 0px;
  width: 100%;

  :not(:last-child) {
    border-bottom: 1px solid #fff4;
  }

  @media (min-width: 769px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    grid-template-areas: "left right";
  }

  p {
    color: white;
  }
`;

export const InsideBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  > p {
    font-size: 2.5rem;

    @media (max-width: 768px) {
      text-align: center;
      text-indent: 0px;
    }
  }

  grid-area: ${({ side }) => side};
`;

export const FormArea = styled.div`
  border: 1px solid #999;
  width: 100%;
  max-width: 422px;

  padding: 5px 10px;
  border-radius: 9px;
  background: #f5f5f599;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Form = styled.form`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  row-gap: 5px;

  button {
    width: 100%;
  }
`;

export const FormHeader = styled.div`
  border-bottom: 1px solid #aaa;
  width: 100%;

  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
`;

export const FormMessage = styled.span`
  font-size: 15px;
  margin: 10px 0px 0px 20px;
`;

export const FormHeaderLabel = styled.label`
  font-size: 25px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const AreaInput = styled.div`
  padding: 3px 0px;

  display: flex;
  row-gap: 5px;
  column-gap: 10px;
  flex-direction: ${({ double }) => (double ? "row" : "column-reverse")};
  ${({ double }) => {
    if (double)
      return `
      justify-content: space-around;

      @media (max-width: 500px) {
        flex-direction: column;
      }
    `;
  }}
  label {
    position: relative;
    font-weight: bold;

    :after {
      content: "";
      height: 10px;
      width: 10px;
      position: absolute;
      background: black;
      transform: rotate(45deg);
      left: 0px;
      bottom: -30px;
      border: 1px solid black;
    }
  }

  input:focus ~ label:after {
    background: yellow;
  }

  input:focus:valid ~ label:after,
  input:valid ~ label:after {
    background: ${({ double, verify }) => {
      if (!double) return verify() ? "green" : "red";
    }};
  }
  select ~ label:after {
    background: green;
  }
`;

export const Input = styled.input`
  border-radius: 5px;
  padding: 10px;
  margin: 0px 5px;
  border: 1px solid rgb(139, 153, 231);
  height: 39px;
  width: 100%;

  :hover {
    box-shadow: 0px 0px 10px rgb(139, 153, 231);
  }
`;

export const Select = styled.select`
  border-radius: 5px;
  padding: 10px;
  border: 1px solid rgb(139, 153, 231);
  height: 39px;
  min-width: 147px;
  margin-left: 5px;

  :hover {
    box-shadow: 0px 0px 10px rgb(139, 153, 231);
  }
`;
