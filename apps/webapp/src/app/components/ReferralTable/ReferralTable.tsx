import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import { ReactComponent as CreateIcon } from '../../../assets/create-24px.svg';
import { ReactComponent as DeleteIcon } from '../../../assets/delete-24px.svg';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { useHistory, Link } from 'react-router-dom';
import { Referral } from '../../types/referral';
import { IconButton } from '../IconButton';
import style from './ReferralTable.module.css';

const TableHeadCell: React.FC = ({ children }) => (
  <TableCell classes={{ root: style.tableHeadCell }}>{children}</TableCell>
);

const TableBodyCell: React.FC = ({ children }) => (
  <TableCell classes={{ root: style.tableBodyCell }}>{children}</TableCell>
);

interface ActionBodyCellProps {
  onEditClick: () => void;
  onDeleteClick: () => void;
}

interface ActionHeadCellProps {
  onCreateClick: () => void;
}

const ActionBodyCell: React.FC<ActionBodyCellProps> = ({ onEditClick, onDeleteClick }) => (
  <TableCell classes={{ root: style.actionBodyCell }}>
    <IconButton onClick={onEditClick}>
      <CreateIcon />
    </IconButton>
    <IconButton onClick={onDeleteClick}>
      <DeleteIcon />
    </IconButton>
  </TableCell>
);

const ActionHeadCell: React.FC = (props) => (
  <TableCell classes={{ root: style.TableHeadCell }}>
    <Link to="/registerUser">
      <IconButton>
        <AddCircleOutlineIcon />
      </IconButton>
    </Link>
  </TableCell>
);

interface ReferralTableProps {
  referrals: Referral[];
  deleteReferral?: (id: number) => void;
}

const ReferralTable: React.FC<ReferralTableProps> = ({ referrals, deleteReferral }) => {
  return (
    <TableContainer classes={{ root: style.container }}>
      <Table>
        <TableHead>
          <TableRow>
            <ActionHeadCell />
          </TableRow>
          <TableRow>
            <TableHeadCell>Given Name</TableHeadCell>
            <TableHeadCell>Surname</TableHeadCell>
            <TableHeadCell>Email</TableHeadCell>
            <TableHeadCell>Phone</TableHeadCell>
            <TableHeadCell>Actions</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {referrals.map((referral) => (
            <TableRow key={referral.id}>
              <TableBodyCell>{referral.givenName}</TableBodyCell>
              <TableBodyCell>{referral.surName}</TableBodyCell>
              <TableBodyCell>{referral.email}</TableBodyCell>
              <TableBodyCell>{referral.phone}</TableBodyCell>
              <ActionBodyCell
                onEditClick={() => {
                  console.log(`Edit referral ${referral.id} clicked`);
                }}
                onDeleteClick={() => {
                  fetch(`http://localhost:3333/referrals/${referral.id}?version=1`, {
                    method: 'DELETE',
                  }).then((res) => {
                    if (res.ok) {
                      deleteReferral(referral.id);
                    }
                  });
                }}
              />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export { ReferralTable };
