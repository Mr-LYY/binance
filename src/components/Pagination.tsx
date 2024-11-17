import { FC, MouseEvent } from 'react';
import { Box, TablePagination } from '@mui/material';

interface IPaginationProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
}

export const Pagination: FC<IPaginationProps> = (props) => {
  const { count, page, rowsPerPage, onPageChange } = props;

  return count ? (
    <TablePagination
      component="div"
      count={count}
      page={page}
      onPageChange={onPageChange}
      rowsPerPage={rowsPerPage}
      rowsPerPageOptions={[rowsPerPage]}
    />
  ) : (
    <Box sx={{ height: '52px' }} />
  );
};
