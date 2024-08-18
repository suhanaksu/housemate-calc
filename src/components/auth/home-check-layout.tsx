import * as React from 'react';
import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { paths } from '@/paths';
import { DynamicLogo } from '@/components/core/logo';

export interface LayoutProps {
    children: React.ReactNode;
}

export function HomeCheckLayout({ children }: LayoutProps): React.JSX.Element {
    return (
        <Box
            sx={{
                display: { xs: 'flex', lg: 'flex' },
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                gridTemplateColumns: '2fr 2fr',
                minHeight: '100%',
            }}
        >
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Box sx={{ alignItems: 'center', display: 'flex', flex: '1 1 auto', justifyContent: 'center', p: 3 }}>
                    <Box sx={{ maxWidth: '450px', width: '100%' }}>{children}</Box>
                </Box>
            </Box>

        </Box>
    );
}
