'use client';

import * as React from 'react';
import type { Metadata } from 'next';

import { config } from '@/config';
import { GuestGuard } from '@/components/auth/guest-guard';
import { Layout } from '@/components/auth/layout';
import { SignInForm } from '@/components/auth/sign-in-form';
import { HomeCheckLayout } from '@/components/auth/home-check-layout';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { paths } from '@/paths';
import { useRouter } from 'next/navigation';



export default function Page(): React.JSX.Element {
  const router = useRouter();
  const createHomeButtonOnClick = () => {
    console.log('createHomeButtonOnClick');
    router.replace(paths.auth.createHome);
  };

  const joinHomeButtonOnClick = () => {
    console.log('joinHomeButtonOnClick');
    router.replace(paths.auth.joinHome);

  };


  return (
    <HomeCheckLayout>
      <Box gap={[50, 50]} alignContent={'center'} justifyContent={'center'} flexDirection={'row'} >
        <Box boxShadow={10} width={'100%'} padding={5} margin={5}>

          <Button style={{ width: '100%' }} type='button' color='success' onClick={createHomeButtonOnClick}>
            Ev Yarat
          </Button>
        </Box>
        <Box boxShadow={10} width={'100%'} padding={5} margin={5}>
          <Button style={{ width: '100%' }} type='button' color='warning' onClick={joinHomeButtonOnClick}>
            Eve katıl
          </Button>
        </Box>
      </Box>
    </HomeCheckLayout>
  );
}
