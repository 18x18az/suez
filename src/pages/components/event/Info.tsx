import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const Info = () => {
    return (
        <Stack spacing={2} direction="column">
            TODO: if qual hasnt started, show inspection status: otherwise show recent results and/or top n teams
            <Button variant="contained" href="http://re.18x18az.org">RobotEvents</Button>
        </Stack>
    );
};

export default Info;