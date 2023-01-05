import { COMPETITION_STAGE, IMatchList, IPath, ITeams } from "@18x18az/rosetta";
import { Component } from "react";
import { bifrost } from "../../../ws";
import Waiting from "../Waiting";
import { Inspection } from "./Inspection";
import { Queuing } from "./Queuing";

interface HomeProps {
    teams: ITeams | null,
    matches: IMatchList | null,
    lastMessagePath: IPath | null,
    lastMessageBody: any
}

interface HomeState {
    stage: COMPETITION_STAGE
}

export class Home extends Component<HomeProps, HomeState> {
    constructor(props: HomeProps) {
        super(props);

        bifrost.get(['stage']);
    }

    static getDerivedStateFromProps(nextProps: HomeProps, prevState: HomeState) {
        if (nextProps.lastMessagePath) {
            const route = nextProps.lastMessagePath[0];
            if (route === "stage") {
                return ({
                    stage: nextProps.lastMessageBody
                })
            }
        }
    }

    render() {
        if (this.state) {
            if (this.state.stage === "INSPECTION") {
                return (
                    <Inspection
                        teams={this.props.teams}
                        lastMessagePath={this.props.lastMessagePath}
                        lastMessageBody={this.props.lastMessageBody}
                    />
                )
            }
            else {
                return (
                    <Queuing
                        teams={this.props.teams}
                        matches={this.props.matches}
                        lastMessagePath={this.props.lastMessagePath}
                        lastMessageBody={this.props.lastMessageBody}
                    />
                )
            }
        }
        else {
            return (
                <Waiting />
            )
        }
    }
}