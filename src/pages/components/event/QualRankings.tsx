import { ITeams, IPath } from '@18x18az/rosetta';
import { Box } from '@mui/material';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

interface QRankingsProps {
    teams: ITeams | null
    lastMessagePath: IPath | null
    lastMessageBody: any
}

interface QRankingsState {
    rankings: any // TODO: update
}

const QualRankings = () => {
    return(
        <div>
        { /*<h1>18x18az Suez</h1>*/}
        <Box sx={{ width: '100%', marginBottom: '20vh' }}>
            <nav>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align='left'>Team</TableCell>
                            <TableCell align='center'>W-L-T</TableCell>
                            <TableCell align='center'>WP / AP / SP</TableCell>
                        </TableRow>
                    </TableHead>
                    {/** remember to do https://stackoverflow.com/questions/50691049/how-to-add-link-react-router-per-each-material-ui-tablerow */}
                </Table>
            </nav>
        </Box>
        </div>
    );
};

export default QualRankings;