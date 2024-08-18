'use client';

import * as React from 'react';
import type { Metadata } from 'next';

import { config } from '@/config';
import { GuestGuard } from '@/components/auth/guest-guard';
import { Layout } from '@/components/auth/layout';
import { SignInForm } from '@/components/auth/sign-in-form';
import { HomeCheckLayout } from '@/components/auth/home-check-layout';
import { Button, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useUser } from '@/hooks/use-user';
import { useRouter } from 'next/navigation';
import { paths } from '@/paths';



export default function Page(): React.JSX.Element {
  const router = useRouter();
  const user = useUser();
  const [homeData, setHomeData] = useState({

    invitationCode: '',
    user
  });


  const handleChange = (event: any) => {
    setHomeData({
      ...homeData,
      [event.target.name as string]: event.target.value
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(homeData);
    router.replace(paths.dashboard.overview);
    // Burada form verilerini işleyebilirsiniz.
  };
  return (
    <HomeCheckLayout>
      <form onSubmit={handleSubmit}>


        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Davet Kodu"
            name="invitationCode"
            type="string"
            value={homeData.invitationCode}
            onChange={handleChange}
            required
          />
        </Grid>


        <Grid item xs={12} marginTop={3}>
          <Button type="submit" variant="contained" color="primary">
            Eve Katıl
          </Button>
        </Grid>

      </form>
    </HomeCheckLayout>
  );
}
