import React, { useState } from 'react';
import {
  DialogActions,
  Button,
  DialogTitle,
  DialogContent,
  TextField,
} from '@mui/material';
import DialogForm from './DialogForm';

interface AddCustomClusterDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (data: { name: string; apiUrl: string }) => void;
}

const AddCustomClusterDialog: React.FC<AddCustomClusterDialogProps> = ({
  open,
  onAdd,
  onClose,
}) => {
  const [name, setName] = useState<string>('');
  const [apiUrl, setApiUrl] = useState<string>('');

  return (
    <DialogForm
      open={open}
      onEnter={() => {
        setName('');
        setApiUrl('');
      }}
      onClose={onClose}
      onSubmit={() => onAdd({ name, apiUrl })}
      fullWidth
    >
      <DialogTitle>Add Custom Network</DialogTitle>
      <DialogContent style={{ paddingTop: 16 }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <TextField
            label="Name"
            fullWidth
            variant="outlined"
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value.trim())}
          />
          <TextField
            label="Url"
            fullWidth
            variant="outlined"
            margin="normal"
            value={apiUrl}
            onChange={(e) => setApiUrl(e.target.value.trim())}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button type="submit" color="primary">
          Add
        </Button>
      </DialogActions>
    </DialogForm>
  );
};

export default AddCustomClusterDialog;
