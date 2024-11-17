import { FC, useEffect, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

import { NOTIFICATION_AUTO_HIDE_DURATION } from '../utils';
import { useAppDispatch, useAppSelector } from '../hooks';
import { clearNotification } from '../store/notificationSlice';

export const NotificationSnackbar: FC = () => {
  const dispatch = useAppDispatch();
  const [isOpened, setIsOpened] = useState(false);
  const message = useAppSelector((state) => state.notification.message);

  useEffect(() => {
    if (!message) {
      setIsOpened(false);

      return;
    }

    setIsOpened(true);
  }, [message]);

  const handleClose = () => {
    setIsOpened(false);
    dispatch(clearNotification());
  };

  return (
    <Snackbar open={isOpened} autoHideDuration={NOTIFICATION_AUTO_HIDE_DURATION} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
