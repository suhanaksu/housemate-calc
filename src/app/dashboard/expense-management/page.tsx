import * as React from 'react';
import type { Metadata } from 'next';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
import dayjs from 'dayjs';

import { config } from '@/config';
import { Expense, ExpenseTable } from '@/components/dashboard/expense-management/expense-table';
import { ExpenseFilters } from '@/components/dashboard/expense-management/expense-filters';

export const metadata = { title: `Customers | Dashboard | ${config.site.name}` } satisfies Metadata;

const expenses = [
  {
    id: 'EXP-001',
    price: 50.0,
    category: 'Office Supplies',
    user: 'Alcides Antonio',
    date: dayjs().subtract(2, 'hours').format('YYYY-MM-DD HH:mm:ss'),
    action: 'View Details'
  },
  {
    id: 'EXP-002',
    price: 100.0,
    category: 'Travel',
    user: 'Marcus Finn',
    date: dayjs().subtract(2, 'hours').format('YYYY-MM-DD HH:mm:ss'),
    action: 'View Details'
  },
  {
    id: 'EXP-003',
    price: 75.0,
    category: 'Meals',
    user: 'Jie Yan',
    date: dayjs().subtract(2, 'hours').format('YYYY-MM-DD HH:mm:ss'),
    action: 'View Details'
  },
] satisfies Expense[];


export default function Page(): React.JSX.Element {
  const page = 0;
  const rowsPerPage = 5;

  const paginatedCustomers = applyPagination(expenses, page, rowsPerPage);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Giderler</Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Button color="inherit" startIcon={<UploadIcon fontSize="var(--icon-fontSize-md)" />}>
              Import
            </Button>
            <Button color="inherit" startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}>
              Export
            </Button>
          </Stack>
        </Stack>
        <div>
          <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
            Add
          </Button>
        </div>
      </Stack>
      <ExpenseFilters />
      <ExpenseTable
        count={paginatedCustomers.length}
        page={page}
        rows={paginatedCustomers}
        rowsPerPage={rowsPerPage}
      />

    </Stack>
  );
}

function applyPagination(rows: any[], page: number, rowsPerPage: number): any[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
