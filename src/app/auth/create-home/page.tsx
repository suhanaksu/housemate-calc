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
    homeName: '',
    homeType: '',
    numberOfmembers: '',
    hasGarage: ''
  });

  React.useEffect(() => {
    console.log(user)
    if (user?.user?.firstName) {
      setHomeData((prevState) => ({
        ...prevState,
        homeName: `${user?.user?.firstName}'s homes`,
      }));
    }
  }, [user?.user?.firstName]);



  const handleChange = (event: any) => {
    setHomeData({
      ...homeData,
      [event.target.name as string]: event.target.value
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(homeData);
    router.replace(paths.auth.expenceCategory);
    // Burada form verilerini işleyebilirsiniz.
  };
  return (
    <HomeCheckLayout>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Ev Adı"
              name="homeName"
              value={homeData.homeName}
              onChange={handleChange}
              required
            />
          </Grid>


          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Evdeki Kisi Sayısı"
              name="numberOfmembers"
              type="number"
              value={homeData.numberOfmembers}
              onChange={handleChange}
              required
            />
          </Grid>



          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Ev Oluştur
            </Button>
          </Grid>
        </Grid>
      </form>
    </HomeCheckLayout>
  );
}
