import * as cors from 'cors';
import * as express from 'express';
import { getAllReferrals, getReferralById, postReferral, deleteReferral, updateReferral } from './referrals/api';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/referrals', getAllReferrals);
app.get('/referrals/:id', getReferralById);
app.post('/referrals', postReferral);
app.delete('/referrals/:id', deleteReferral);
app.put('/referrals/:id', updateReferral);

export default app;
