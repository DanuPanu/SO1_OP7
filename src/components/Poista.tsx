import React from 'react'
import { Button, Typography } from '@mui/material';
import { Link, NavigateFunction, useNavigate, useParams } from 'react-router-dom';

interface Props {
    tehtavat : Tehtava[]
    setTehtavat : (arg0 : Tehtava[]) => void
}

const Poista : React.FC<Props> = ({tehtavat, setTehtavat}) : React.ReactElement => {

    const navigate : NavigateFunction = useNavigate();

    const { id } = useParams<any>();

    const poistettavaTehtava : Tehtava | undefined = tehtavat.find((tehtava : Tehtava) => {
        return tehtava.id === id;
    });

    const vahvistaPoisto = () : void => {

        setTehtavat([...tehtavat.filter((tehtava : Tehtava) => tehtava.id !== id)]);

        navigate("/");
    }    

    return (
        <>
            <Typography sx={{margin : "10px 0 10px 0", textAlign : "center"}} >Haluatko varmasti poistaa listauksen "{poistettavaTehtava!.lintu}" listasta?</Typography>

            <Button variant="contained" fullWidth={true} onClick={vahvistaPoisto} >Poista listaus</Button>  

            <Button fullWidth={true} component={Link} to="/" >Peruuta</Button>   
        </>
    )
}

export default Poista;