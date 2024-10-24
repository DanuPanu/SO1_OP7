import React, { useEffect, useRef, useState } from 'react';
import UusiTehtava from './components/UusiTehtava';
import Lintulista from './components/Lintulista';
import { Route, Routes } from 'react-router-dom';
import Poista from './components/Poista';
import Typography from '@mui/material/Typography';


const App : React.FC = () : React.ReactElement => {

  const kaynnistetty : React.MutableRefObject<boolean> = useRef(false);

  const [tehtavat, setTehtavat] = useState<Tehtava[]>([]);

  useEffect(() => {

    if (!kaynnistetty.current)  {

      if (localStorage.getItem("tehtavalista")) {

        setTehtavat(JSON.parse(String(localStorage.getItem("tehtavalista"))).map((tehtava : Tehtava) => {
          return {
            ...tehtava,
            deadline : new Date(tehtava.deadline)
          }
        }))
      }
    }
    return () => {
      kaynnistetty.current = true;
    }
  });

  useEffect(() => {

    localStorage.setItem("tehtavalista", JSON.stringify(tehtavat));

  }, [tehtavat]);

  return (
    <>
      <Typography variant="h4" sx={{textAlign : "center", margin : "10px"}}>Lintubongaus päiväkirja</Typography>

      <Routes>

        <Route path="/poista/:id" element={<Poista tehtavat={tehtavat} setTehtavat={setTehtavat} />}  />

        <Route path="/uusi" element={<UusiTehtava tehtavat={tehtavat} setTehtavat={setTehtavat} />}  />

        <Route path="/" element={<Lintulista tehtavat={tehtavat} setTehtavat={setTehtavat} />} />

      </Routes>



    </>
  );
}

export default App;