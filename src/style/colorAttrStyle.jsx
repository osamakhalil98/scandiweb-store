import styled from "styled-components";

const BigColorAttr = styled.p`
  width: 32px;
  height: 32px;
  margin-top: 4px;
  margin-inline-end: 10px;
  padding-top: 5px;
  text-align: center;
  font-size: 11px;
  color: #ffffff;
  background-color: ${(props) => props.bgColor};
  cursor: ${(props) => props.cursor};
`;

const BigColorAttrSelected = styled.p`
  width: 32px;
  height: 32px;
  margin-top: 4px;
  margin-inline-end: 10px;
  border: 1px solid white;
  outline: 1px solid #5ece7b;
  padding-top: 5px;
  text-align: center;
  font-size: 11px;
  background-color: ${(props) => props.bgColor};
  cursor: ${(props) => props.cursor};
`;

const SmallColorAttr = styled.p`
  width: 16px;
  height: 16px;
  margin-top: 4px;
  margin-inline-end: 8px;
  padding-top: 5px;
  text-align: center;
  font-size: 11px;
  color: #ffffff;
  background-color: ${(props) => props.bgColor};
`;

const SmallColorAttrSelected = styled.p`
  border: 1px solid white;
  outline: 1px solid #5ece7b;
  width: 16px;
  height: 16px;
  margin-top: 4px;
  margin-inline-end: 8px;
  padding-top: 5px;
  text-align: center;
  font-size: 11px;
  color: #ffffff;
  background-color: ${(props) => props.bgColor};
`;

export {
  SmallColorAttr,
  BigColorAttr,
  SmallColorAttrSelected,
  BigColorAttrSelected,
};
