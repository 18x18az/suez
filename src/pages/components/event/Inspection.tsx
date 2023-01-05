import { Component, Fragment } from 'react';
import { ITeams, IPath, IInspectionStatus, TeamId } from '@18x18az/rosetta';
import { bifrost } from '../../../ws';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import Waiting from '../Waiting';

interface InspectionProps {
    teams: ITeams | null,
    lastMessagePath: IPath | null,
    lastMessageBody: any
}

interface InspectionState {
    inspection: IInspectionStatus | null
}

export class Inspection extends Component<InspectionProps, InspectionState> {
    constructor(props: InspectionProps) {
        super(props);

        bifrost.get(['inspection']);
        this.state = {
            inspection: null
        };
    }

    static getDerivedStateFromProps(nextProps: InspectionProps, prevState: InspectionState) {
        if (nextProps.lastMessagePath) {
            const route = nextProps.lastMessagePath[0];
            if (route === "inspection") {
                return ({
                    inspection: nextProps.lastMessageBody
                });
            }
        }
    }

    render() {
        if (this.state && this.props.teams && this.state.inspection) {
            if (this.state.inspection.notStarted.length + this.state.inspection.partial.length === 0) {
                return (
                    <Fragment>
                        <h1>Inspection Status</h1>
                        <p>All checked-in teams inspected!</p>
                    </Fragment>
                )
            }
            else {
                let notStarted = <div></div>
                if (this.state.inspection.notStarted.length > 0) {
                    notStarted = <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Not Started</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ul>
                                {
                                    this.state.inspection.notStarted.map((team: TeamId) => {
                                        return(
                                            <li>{this.props.teams![team].number}</li>
                                        )
                                    })
                                }
                            </ul>
                        </AccordionDetails>
                    </Accordion>
                }

                let partial = <div></div>
                if (this.state.inspection.partial.length > 0) {
                    partial = <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Partially Complete</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ul>
                                {
                                    this.state.inspection.partial.map((team: TeamId) => {
                                        return(
                                            <li>{this.props.teams![team].number}</li>
                                        )
                                    })
                                }
                            </ul>
                        </AccordionDetails>
                    </Accordion>
                }

                return (
                    <Fragment>
                        <h1>Inspection Status</h1>
                        {notStarted}
                        {partial}
                    </Fragment>
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