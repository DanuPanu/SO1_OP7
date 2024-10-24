import React, { useRef, useState } from 'react'
import { Button, TextField } from '@mui/material';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { v4 as uuid } from 'uuid';
import { fi } from 'date-fns/locale';


interface Props {
    tehtavat : Tehtava[]
    setTehtavat : (arg0 : Tehtava[]) => void
}

const UusiTehtava : React.FC<Props> = ({ tehtavat, setTehtavat }) : React.ReactElement => {

    const [pvmAika, setPvmAika] = useState<Date>(new Date());

    const navigate : NavigateFunction = useNavigate();

    const paikkaRef : React.MutableRefObject<HTMLInputElement | undefined> = useRef<HTMLInputElement>();
    
    const lintuRef : React.MutableRefObject<HTMLInputElement | undefined> = useRef<HTMLInputElement>();

    const lisaaTehtava = () : void => {

        let apuTehtava : Tehtava = {
            id : uuid(),
            lintu : lintuRef.current!.value || "Nimetön",
            paikka : paikkaRef.current!.value || "Nimetön",
            deadline : pvmAika,
            tehty : false
        }

        setTehtavat([...tehtavat, apuTehtava]);

        navigate("/");
    }

    return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi}>

        <TextField 
            label="Linnun nimi..."
            inputRef={lintuRef}
            variant="outlined"
            fullWidth={true}
            sx={{marginBottom : "10px"}}
        />

        <TextField 
            label="Bongaus paikka..."
            inputRef={paikkaRef}
            variant="outlined"
            fullWidth={true}
            sx={{marginBottom : "10px"}}
        />

        <DateTimePicker 
            sx={{width : "100%", marginBottom : "10px", display : "none"}}
            label="Bongaus aika..."
            value={pvmAika}
            onChange={(uusiPvm : Date | null) => setPvmAika(uusiPvm!)}
        />

        <Button
            variant="contained"
            fullWidth={true}
            onClick={lisaaTehtava}
        >Tallenna</Button>  

        <Button
            fullWidth={true}
            component={Link}
            to="/"
        >Peruuta</Button>    
    </LocalizationProvider>
    )
}

export default UusiTehtava;