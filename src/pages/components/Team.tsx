import { ITeams, ITeam, IPath, IMatchList, MatchId, IMatchInfo, ISimpleMatchResult } from "@18x18az/rosetta";
import { Fragment, useEffect, useState } from "react";
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

    if (!team) {
        for (const property in props.teams) {
            if (props.teams[property].number === number) {
                setTeam(props.teams[property]);
                break;
            }
        }
    }

    if (!data) {
        console.log("brrr");
        bifrost.get(['team', number as string]);
    }

    if (props && props.lastMessagePath && props.lastMessagePath[0] === "team" && props.lastMessagePath.length >= 2) {
        if (props.lastMessagePath[1] === number) {
            setData(props.lastMessageBody);
        }
    }

    useEffect(() => {

    }, [])

    if (team && data) {
        return (
            <Fragment>
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