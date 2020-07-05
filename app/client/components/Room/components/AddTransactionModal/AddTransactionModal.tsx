import React, { useCallback, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

import { ADD_ROOM_TRANSACTION_QUERY } from 'client/graphql/queries';

import { IRoom, IUser } from 'common/types/room';
import { IAddRoomTransactionParams } from 'common/types/requestParams';

import Modal from 'client/components/common/Modal/Modal';
import Heading from 'client/components/common/Heading/Heading';
import Button from 'client/components/common/Button/Button';

interface IAddTransactionModalProps {
  className?: string;
  isOpen: boolean;
  users: IUser[];
  roomId: string;
  onClose(): void;
}

const AddTransactionModal: React.FC<IAddTransactionModalProps> = (props) => {
  const { className, users, roomId, isOpen, onClose } = props;

  const [fromUser, setFromUser] = useState<string>('');
  const [toUser, setToUser] = useState<string>('');
  const [amount, setAmount] = useState<string>('');

  const [addRoomTransaction] = useMutation<{ addRoomTransaction: IRoom | null }, IAddRoomTransactionParams>(ADD_ROOM_TRANSACTION_QUERY);

  const handleFromUserChange = useCallback((e: React.ChangeEvent<{value: string}>) => {
    setFromUser(e.target.value);
  }, []);

  const handleToUserChange = useCallback((e: React.ChangeEvent<{value: string}>) => {
    setToUser(e.target.value);
  }, []);

  const handleAmountChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  }, []);

  const handleAddTransactionClick = useCallback(() => {
    setFromUser('');
    setToUser('');
    setAmount('');

    addRoomTransaction({
      variables: {
        roomId,
        transaction: {
          value: Number(amount),
          from: fromUser,
          to: toUser,
        },
      },
    });

    onClose();
  }, [addRoomTransaction, amount, fromUser, onClose, roomId, toUser]);

  return (
    <Modal
      className={className}
      isOpen={isOpen}
      onClose={onClose}
    >
      <Container>
        <Heading level="1">Добавить перевод</Heading>

        <FormControl className="fromBlock">
          <InputLabel id="addCostFromUserLabel">Перевел</InputLabel>

          <Select
            labelId="addCostFromUserLabel"
            value={fromUser}
            MenuProps={{
              disableAutoFocusItem: true,
              getContentAnchorEl: null,
            }}
            onChange={handleFromUserChange as any}
          >
            {users.map(({ id, name }) => (
              <MenuItem key={id} value={id}>{name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className="toBlock">
          <InputLabel id="addCostToUserLabel">Кому</InputLabel>

          <Select
            labelId="addCostToUserLabel"
            value={toUser}
            MenuProps={{
              disableAutoFocusItem: true,
              getContentAnchorEl: null,
            }}
            onChange={handleToUserChange as any}
          >
            {users.map(({ id, name }) => (
              <MenuItem key={id} value={id}>{name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          className="amount"
          type="number"
          label="Сколько"
          value={amount}
          onChange={handleAmountChange}
        />

        <Button
          className="button"
          disabled={!fromUser || !toUser || !amount }
          onClick={handleAddTransactionClick}
        >
          Добавить
        </Button>

        <Button
          className="button"
          type="secondary"
          onClick={onClose}
        >
          Назад
        </Button>
      </Container>
    </Modal>
  );
};

export default styled(React.memo(AddTransactionModal))`
  .container {
    padding-top: 20px;
    padding-bottom: 32px;
  }

  .fromBlock,
  .toBlock,
  .amount {
    width: 100%;

    &:not(:first-child) {
      margin-top: 8px;
    }
  }

  .button {
    width: 100%;

    margin-top: 20px;
  }
`;
