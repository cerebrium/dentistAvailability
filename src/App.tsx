import React, {useMemo, useState} from 'react';
import styled from 'styled-components';
import { useGraphProvider } from './GraphContext/context-provider';
import { Dentist } from './Dentist';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  const [_, remove_dentist, {stringifiedGraph, graph}] = useGraphProvider()
  const [numberOfDentists, setNumberOfDentists] = useState<number>(0);

  const dentists = useMemo(() => {
    const names = ['Herbert', 'Alexander', 'Goeff', 'Dilbert']
    return (
      <>
        {Array(numberOfDentists).fill(0).map((_, i) => {
          return (
            <Dentist key={i} value={i} name={names[i]}/>
          )
        })}
      </>
    )
  }, [numberOfDentists])

  const handleClick = (operation: string) => {
    operation === 'add' ? setNumberOfDentists(() => numberOfDentists + 1) : setNumberOfDentists(() => numberOfDentists - 1)
    if (operation === 'delete') {
      remove_dentist(numberOfDentists-1)
    }
  }

  return (
    <StyledApp>
      <ToastContainer />
      <h2>Dentist Scheduler</h2>
      <DentistContainer>{dentists}</DentistContainer>
      <ButtonContainer>
        {numberOfDentists < 4 && <Button onClick={() => handleClick('add')}>Add Dentist</Button>}
        <Button onClick={() => handleClick('delete')}>Delete Dentist</Button>
      </ButtonContainer>
      {graph && <h3>Available Times: {graph.find_both_available().map((arg: number) => `${arg}, `)}</h3>}
      <GraphDisplay>
        {stringifiedGraph}
      </GraphDisplay>
    </StyledApp>
  );
}

const StyledApp = styled.div`
  background-color: #1b1b1c;
  min-height: 100vh;  
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: calc(5px + 2vmin);
  color: #897475;
`;

const GraphDisplay = styled.pre`
  background-color: #3c3c3b;
  color: white;
  padding: 10px;
  font-size: 16px;
  height: 700px;
  width: 700px;
  border-radius: 10px;
  overflow: scroll;
`

const Button = styled.button`
  background-color: #897475;
  color: #1b1b1c;
  width: 150px;
  height: 50px;
  border-radius: 10px;
  border: none;
  font-size: 16px;
  margin: 10px;
  cursor: pointer;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  :hover {
    transition: 0.5s;
    background-color: #3c3c3b;
    color: #897475;
  }
`

const DentistContainer = styled.div`
  display: flex;
  margin: 0px;
  padding: 0px;
  width: 90%;
  align-items: center;
  justify-content: center;
  padding: 10px;
`

const ButtonContainer = styled.div`
  display: flex;
  margin: 0px;
  padding: 0px;
`


export default App;
