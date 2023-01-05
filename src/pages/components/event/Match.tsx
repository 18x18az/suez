import { IAllianceTeams, IMatchInfo, ITeams, TeamId } from "@18x18az/rosetta";
import { TableRow, TableCell, Table } from "@mui/material";
import { makeShortMatchName } from "../../../utils/TextGenerator";
import './Match.css';

interface TeamProps {
    id: TeamId
    color: string
    teams: ITeams
}

const Team = (props: TeamProps) => {
    return (
        <p className={props.color}>{props.teams[props.id].number}</p>
    )
}
interface MatchProps {
    match: IMatchInfo
    teams: ITeams
}

export const Match = (props: MatchProps) => {
    const matchName = props.match.matchId;
    const red: IAllianceTeams | string = props.match.red;
    const blue: IAllianceTeams | string = props.match.blue;
    return (
        <TableRow>
            <TableCell align="center">
                <Team id={(red as IAllianceTeams).team1} color={"redMatch"} teams={props.teams}/>
                <Team id={(red as IAllianceTeams).team2} color={"redMatch"} teams={props.teams}/>
            </TableCell>
            <TableCell/>
            <TableCell align="center">
                <h2 className="matchName">{matchName}</h2>
            </TableCell>
            <TableCell/>
            <TableCell align="center">
                <Team id={(blue as IAllianceTeams).team1} color={"blueMatch"} teams={props.teams}/>
                <Team id={(blue as IAllianceTeams).team2} color={"blueMatch"} teams={props.teams}/>
            </TableCell>
        </TableRow>
    )
}

interface ScoredMatchProps {
    match: IMatchInfo
    name: string
    teams: ITeams
    scoreRed: number
    scoreBlue: number
}

export const ScoredMatch = (props: ScoredMatchProps) => {
    const matchName = props.name;
    const red: IAllianceTeams | string = props.match.red;
    const blue: IAllianceTeams | string = props.match.blue;

    let redOutput = <h3>{props.scoreRed}</h3>;
    let blueOutput = <h3>{props.scoreBlue}</h3>;
    if (props.scoreRed > props.scoreBlue) {
        redOutput = <h3><u>{props.scoreRed}</u></h3>
        blueOutput = <h3>{props.scoreBlue}</h3>
    }
    else if (props.scoreBlue > props.scoreRed) {
        redOutput = <h3>{props.scoreRed}</h3>
        blueOutput = <h3><u>{props.scoreBlue}</u></h3>
    }
    else {
    }
    return (
        <TableRow>
            <TableCell align="center" width="10%">
                <Team id={(red as IAllianceTeams).team1} color={"redMatch"} teams={props.teams}/>
                <Team id={(red as IAllianceTeams).team2} color={"redMatch"} teams={props.teams}/>
            </TableCell>
            <TableCell align="center" width="10%">
                {redOutput}
            </TableCell>
            <TableCell align="center" width="40%">
                <h2 className="matchName">{matchName}</h2>
            </TableCell>
            <TableCell align="center" width="10%">
                {blueOutput}
            </TableCell>
            <TableCell align="center" width="10%">
                <Team id={(blue as IAllianceTeams).team1} color={"blueMatch"} teams={props.teams}/>
                <Team id={(blue as IAllianceTeams).team2} color={"blueMatch"} teams={props.teams}/>
            </TableCell>
        </TableRow>
    )
}