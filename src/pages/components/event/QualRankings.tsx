import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const QualRankings = () => {
    return(
        <div>
        { /*<h1>18x18az Suez</h1>*/}
        <Box sx={{ width: '100%', marginBottom: '20vh' }}>
            <nav>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align='left'>Rank</TableCell>
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