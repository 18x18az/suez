import { IAllianceTeams, ITeams, ITeam, IPath, IMatchList, MatchId, IMatchInfo, ISimpleMatchResult, ISkillsRankingData, IRankingData, ISkillsRankings, IRankings, IFieldState } from "@18x18az/rosetta";
import { Fragment, useEffect, useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails, Table, TableBody, TableRow, TableCell, TableHead } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import { Match, ScoredMatch } from "./event/Match";
import Waiting from "./Waiting";
import { useParams } from "react-router-dom";
import { bifrost } from "../../ws";

// TODO: move to rosetta
export interface TeamSchedule {
    [key: MatchId]: IMatchInfo
}

export interface TeamResults {
    [key: string]: ISimpleMatchResult
}

export interface TeamEventData {
    schedule: TeamSchedule,
    results: TeamResults
}

interface TeamProps {
    teams: ITeams | null
    matches: IMatchList | null
    lastMessagePath: IPath | null
    lastMessageBody: any
}

export const Team = (props: TeamProps) => {

    const { number } = useParams();
    const [team, setTeam] = useState<ITeam | null>(null);
    const [data, setData] = useState<TeamEventData | null>(null);
    const [skills, setSkills] = useState<ISkillsRankings | null>(null);
    const [rankings, setRankings] = useState<IRankings | null>(null);
    const [field, setField] = useState<IFieldState | null>(null);

    if (!team) {
        for (const property in props.teams) {
            if (props.teams[property].number === number) {
                setTeam(props.teams[property]);
                break;
            }
        }
    }

    if (!data) {
        //bifrost.get(['team', number as string]);
    }

    if (!skills) {
        bifrost.get(['skills']);
    }

    if (!rankings) {
        bifrost.get(['rankings']);
    }

    if (!field) {
        bifrost.get(['field']);
    }

    useEffect(() => {
        if (props && props.lastMessagePath && props.lastMessagePath[0] === "team" && props.lastMessagePath.length >= 2) {
            if (props.lastMessagePath[1] === number) {
                setData(props.lastMessageBody);
            }
        }
        else if (props && props.lastMessagePath && props.lastMessagePath[0] === "rankings") {
            setRankings(props.lastMessageBody);
        }
        else if (props && props.lastMessagePath && props.lastMessagePath[0] === "skills") {
            setSkills(props.lastMessageBody);
        }
        else if (props && props.lastMessagePath && props.lastMessagePath[0] === "field") {
            setField(props.lastMessageBody);
        }
    }, [props]);

    if (field && team && rankings && skills && props.teams && props.matches) {
        // rankings section
        let rankingsOutput = <div></div>

        rankings.forEach((ranking: IRankingData) => {
            if (ranking.team === team.id) {
                let pointsString = ranking.avgWP + " / ";
                pointsString += ranking.avgAP + " / ";
                pointsString += ranking.avgSP;
                rankingsOutput = 
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">
                                    Rank
                                </TableCell>
                                <TableCell align="center">
                                    W-L-T
                                </TableCell>
                                <TableCell align="center">
                                    Average WP / AP / SP
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell align="center">
                                    {ranking.rank}
                                </TableCell>
                                <TableCell align="center">
                                    {ranking.record}
                                </TableCell>
                                <TableCell align="center">
                                    {pointsString}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

            }
        });

        // skills section
        let skillsOutput = 
                <p>No Robot Skills attempts found, 3 Driver and 3 Programming attempts remaining</p>;
        skills.forEach((skillsData: ISkillsRankingData) => {
            if (skillsData.team === team.id) {
                skillsOutput = <div>
                    <p>Driver Attempts left: {3-skillsData.numDriver}</p>
                    <p>Programming Attempts left: {3-skillsData.numProgramming}</p>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">
                                    Rank
                                </TableCell>
                                <TableCell align="center">
                                    Total Score
                                </TableCell>
                                <TableCell align="center">
                                    Highest Programming
                                </TableCell>
                                <TableCell align="center">
                                    Highest Driver
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        <TableRow>
                                <TableCell align="center">
                                    {skillsData.rank}
                                </TableCell>
                                <TableCell align="center">
                                    {skillsData.total}
                                </TableCell>
                                <TableCell align="center">
                                    {skillsData.highProgramming}
                                </TableCell>
                                <TableCell align="center">
                                    {skillsData.highDriver}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    </div>
            }
        });

        // search for matches
        let teamMatches: IMatchInfo[] = [];
        for (const property in props.matches) {
            const match = props.matches[property] as IMatchInfo;
            let IDs = [];
            IDs.push((match.blue as IAllianceTeams).team1);
            IDs.push((match.blue as IAllianceTeams).team2);
            IDs.push((match.red as IAllianceTeams).team1);
            IDs.push((match.red as IAllianceTeams).team2);
            if (IDs.includes(team.id as string)) {
                teamMatches.push(match);
                console.log (match)
            }
        }
        
        let scheduleOutput: any = [];
        if (teamMatches) {
            for (let i = 0; i < teamMatches.length; i++) {
                const matchItem = <Match teams={props.teams} match={teamMatches[i]} />
                scheduleOutput.push(matchItem);
            }
        }
        else {
            scheduleOutput = <div>No matches for {team.number} found</div>
        }

        return (
            <Fragment>
                <h1 style={{ marginBottom: 0}}>{team.number}</h1>
                <h2 style={{ marginTop: 0}}>{team.name}</h2>
                <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                    Ranking Data
                </AccordionSummary>
                <AccordionDetails>
                {rankingsOutput}
                </AccordionDetails>
                </Accordion>
                <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                    Robot Skills Data
                </AccordionSummary>
                <AccordionDetails>
                {skillsOutput}
                </AccordionDetails>
                </Accordion>
                <Accordion defaultExpanded={true}>
                    <AccordionSummary  expandIcon={<ExpandMoreIcon/>}>
                        Schedule
                    </AccordionSummary>
                    <AccordionDetails>
                        <Table>
                            <TableBody>
                            {scheduleOutput}
                            </TableBody>
                        </Table>
                    </AccordionDetails>
                </Accordion>
                
            </Fragment>

        )
    }
    else {
        return (
            <Waiting />
        )
    }
}