import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const SkillsRankings = () => {
    return (
        <div>
        { /*<h1>18x18az Suez</h1>*/}
        <Box sx={{ width: '100%', marginBottom: '20vh' }}>
            <nav>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align='left'>Rank</TableCell>
                            <TableCell align='left'>Team</TableCell>
                            <TableCell align='center'>Total</TableCell>
                            <TableCell align='center'>Highest Programming</TableCell>
                            <TableCell align='center'>Highest Driver</TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
            </nav>
        </Box>
        </div>
    );
};

export default SkillsRankings;