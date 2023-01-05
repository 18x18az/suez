import { ITeams, ITeam, IPath, IMatchList, MatchId, IMatchInfo, ISimpleMatchResult, ISkillsRankingData, IRankingData, ISkillsRankings, IRankings } from "@18x18az/rosetta";
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
    lastMessagePath: IPath | null
    lastMessageBody: any
}

export const Team = (props: TeamProps) => {

    const { number } = useParams();
    const [team, setTeam] = useState<ITeam | null>(null);
    const [data, setData] = useState<TeamEventData | null>(null);
    const [skills, setSkills] = useState<ISkillsRankings | null>(null);
    const [rankings, setRankings] = useState<IRankings | null>(null);

    if (!team) {
        for (const property in props.teams) {
            if (props.teams[property].number === number) {
                setTeam(props.teams[property]);
                break;
            }
        }
    }

    if (!data) {
        bifrost.get(['team', number as string]);
    }

    if (!skills) {
        bifrost.get(['skills']);
    }

    if (!rankings) {
        bifrost.get(['rankings']);
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
            setSkills(props.lastMessageBody)
        }
    }, [props])

    if (team && data && rankings && skills && props.teams) {
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

        // search for results
        let results: ISimpleMatchResult[] = [];
        for (const property in data.results) {
            results.push(data.results[property]);
        }

        let matches: IMatchInfo[] = [];
        for (const property in data.schedule) {
            matches.push(data.schedule[property])
        }
        let scheduleOutput = [];
        if (matches) {
            for (let i = 0; i < matches.length; i++) {
                // search for match name in results
                // if we find it, push a ScoredMatch instead
                let isScored: boolean = false;
                for (let j = 0; j < results.length; j++) {
                    console.log(j)
                    if (matches[i].matchId === results[j].name) {
                        isScored = true;
                        break;
                    }
                }
                
                // generate output
                if (isScored) {
                    const resultItem = <ScoredMatch
                        teams={props.teams!}
                        name={data.results[matches[i].matchId].name}
                        match={matches[i]}
                        scoreBlue={data.results[matches[i].matchId].blue.score}
                        scoreRed={data.results[matches[i].matchId].red.score}/>;
                    scheduleOutput.push(resultItem);
                }
                else {
                    const matchItem = <Match teams={props.teams} match={matches[i]} />
                    scheduleOutput.push(matchItem);
                }
            }
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