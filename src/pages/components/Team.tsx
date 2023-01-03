import { ITeams, ITeam, IPath } from "@18x18az/rosetta";
import { Fragment, useEffect, useState } from "react";
import Waiting from "./Waiting";
import { useParams } from "react-router-dom";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { AppBar, Button, Toolbar } from "@mui/material";

interface TeamProps {
    teams: ITeams | null
    lastMessagePath: IPath | null
    lastMessageBody: any
}

export const Team = (props: TeamProps) => {

    const { number } = useParams();
    const [team, setTeam] = useState<ITeam | null>(null);

    if (!team) {
        for (const property in props.teams) {
            if (props.teams[property].number === number) {
                setTeam(props.teams[property]);
                break;
            }
        }
    }


    useEffect(() => {

    }, [])

    if (team) {
        return (
            <Fragment>
                {/*<AppBar position="sticky">
                    <Toolbar sx={{ minHeight: '5000px' }}>
                        <Button>
                        <ChevronLeftIcon/>
                        </Button>
                    </Toolbar>
                    </AppBar>*/
                }
                <h1>{team.number}</h1>
                <p>Team page WIP ;)</p>
            </Fragment>

        )
    }
    else {
        return (
            <Waiting />
        )
    }
}