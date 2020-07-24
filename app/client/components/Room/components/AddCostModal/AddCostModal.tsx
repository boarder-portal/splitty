import React, { useCallback, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import styled from 'styled-components';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';

import { ADD_ROOM_COST_QUERY } from 'client/graphql/queries';

import { IRoom, IUser } from 'common/types/room';
import { IAddRoomCostParams } from 'common/types/requestParams';

import getUserNameById from 'client/utilities/getUserNameById';

import Modal from 'client/components/common/Modal/Modal';
import Heading from 'client/components/common/Heading/Heading';
import Button from 'client/components/common/Button/Button';

interface IAddCostModalProps {
  className?: string;
  isOpen: boolean;
  users: IUser[];
  roomId: string;
  onClose(): void;
}

const AddCostModal: React.FC<IAddCostModalProps> = (props) => {
  const { className, users, roomId, isOpen, onClose } = props;

  const [fromUser, setFromUser] = useState<string>('');
  const [toUsers, setToUsers] = useState<string[]>([]);
  const [cost, setCost] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const [addRoomCost] = useMutation<{ addRoomCost: IRoom | null }, IAddRoomCostParams>(ADD_ROOM_COST_QUERY);

  const handleFromUserChange = useCallback((e: React.ChangeEvent<{value: string}>) => {
    setFromUser(e.target.value);
  }, []);

  const handleToUsersChange = useCallback((e: React.ChangeEvent<{value: string[]}>) => {
    const usersIds = e.target.value;

    if (usersIds.includes('all')) {
      if (usersIds.length === users.length + 1) {
        setToUsers([]);
      } else {
        setToUsers(users.map(({ id }) => id));
      }
    } else {
      setToUsers(usersIds);
    }
  }, [users]);

  const handleCostChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCost(e.target.value);
  }, []);

  const handleDescriptionChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  }, []);

  const handleAddCostClick = useCallback(() => {
    setFromUser('');
    setToUsers([]);
    setCost('');
    setDescription('');

    addRoomCost({
      variables: {
        roomId,
        cost: {
          value: Number(cost),
          from: fromUser,
          to: toUsers,
          description,
        },
      },
    });

    onClose();
  }, [addRoomCost, cost, description, fromUser, onClose, roomId, toUsers]);

  return (
    <Modal
      className={className}
      isOpen={isOpen}
      onClose={onClose}
    >
      <Container>
        <Heading level="1">Добавить трату</Heading>

        <FormControl className="fromBlock">
          <InputLabel id="addCostFromUserLabel">Заплатил</InputLabel>

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
          <InputLabel id="addCostToUsersLabel">За кого</InputLabel>

          <Select
            labelId="addCostToUsersLabel"
            value={toUsers}
            multiple
            renderValue={((selected: string[]) => selected.map((userId) => getUserNameById(users, userId)).join(', ')) as any}
            MenuProps={{
              disableAutoFocusItem: true,
              getContentAnchorEl: null,
            }}
            onChange={handleToUsersChange as any}
          >
            <MenuItem value="all">
              <Checkbox checked={toUsers.length === users.length} />

              <ListItemText primary="За всех" />
            </MenuItem>

            {users.map(({ id, name }) => (
              <MenuItem key={id} value={id}>
                <Checkbox checked={toUsers.includes(id)} />

                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          className="cost"
          type="number"
          label="Сколько"
          value={cost}
          onChange={handleCostChange}
        />

        <TextField
          className="description"
          type="text"
          label="Описание"
          value={description}
          onChange={handleDescriptionChange}
        />

        <Button
          className="button"
          disabled={!fromUser || !toUsers.length || !cost }
          onClick={handleAddCostClick}
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

export default styled(React.memo(AddCostModal))`
  .container {
    padding-top: 20px;
    padding-bottom: 32px;
  }

  .fromBlock,
  .toBlock,
  .cost,
  .description {
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
