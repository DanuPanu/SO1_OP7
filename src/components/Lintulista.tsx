import React from 'react'
import { List, ListItem, ListItemIcon, IconButton, ListItemText, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

interface Props {
    tehtavat : Tehtava[];
    setTehtavat : (arg0 : Tehtava[]) => void;
}

const Lintulista : React.FC<Props> = ({tehtavat}) : React.ReactElement => {

    return (
        <>       
        <List>
            {tehtavat.slice(0).reverse().map( (tehtava : Tehtava, idx : number) => {
            return (
                    <ListItem key={idx}>
                        <ListItemText sx={{textAlign:"center"}} primary={`${tehtava.lintu} löytyi paikasta ${tehtava.paikka}`} secondary={format(tehtava.deadline, "d.M.Y HH:mm")}/>
                        <ListItemIcon>
                            <IconButton 
                                component={Link}
                                to={`/poista/${tehtava.id}`}
                                edge="end"
                            >
                                <DeleteIcon />
                            </IconButton>
                            </ListItemIcon>
                    </ListItem>
                    );
            } ) }
        </List>

            <Button
                variant="contained"
                fullWidth={true}
                component={Link}
                to="/uusi"
            >Uusi lintuhavainto!</Button> 

        </>
    )
}

export default Lintulista;