import React, {useEffect, useMemo, useState} from 'react';
import { parse } from './Parser/parser'
import styled from 'styled-components';
import './App.css';

const App: React.FC = () => {
  const [graph, setGraph] = useState<any>()

  useEffect( () => {
    setGraph(parse())
  }, []);

  const parsed_tree = useMemo(() => {
    if (graph) {
      const stringified_tree = JSON.stringify(graph.nodes, null, 2)
      return (
        <>
          <h3>Both Available: {graph.find_both_available().map((arg: number) => `${arg}, `)}</h3>
          <GraphDisplay>
            {stringified_tree}
          </GraphDisplay>
        </>
      )
    }
  }, [graph])

  return (
    <StyledApp>
      <h1>Dentist Scheduler</h1>
      {parsed_tree}
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


export default App;
