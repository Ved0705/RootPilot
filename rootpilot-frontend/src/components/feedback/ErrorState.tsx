import { Alert } from '@mui/material';
export function ErrorState({ message = 'RootPilot could not load this contract.' }: { message?: string }) { return <Alert severity="error" variant="outlined">{message}</Alert>; }
