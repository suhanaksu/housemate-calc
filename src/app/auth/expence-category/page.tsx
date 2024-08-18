'use client';

import * as React from 'react';
import type { Metadata } from 'next';

import { config } from '@/config';
import { GuestGuard } from '@/components/auth/guest-guard';
import { Layout } from '@/components/auth/layout';
import { SignInForm } from '@/components/auth/sign-in-form';
import { HomeCheckLayout } from '@/components/auth/home-check-layout';
import { Alert, Button, Card, Checkbox, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, Snackbar, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useUser } from '@/hooks/use-user';
import { useRouter } from 'next/navigation';
import { paths } from '@/paths';



export default function Page(): React.JSX.Element {
  const initialCategories = [
    { id: 1, name: 'Kira' },
    { id: 2, name: 'Elektrik' },
    { id: 3, name: 'Su' },
    // Diğer kategoriler...
  ];
  const router = useRouter();
  const [categories, setCategories] = useState(initialCategories);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleCategoryChange = (id: number) => {
    setSelectedCategories((prev) =>
      prev.includes(id)
        ? prev.filter((categoryId) => categoryId !== id)
        : [...prev, id]
    );
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      const newCategoryObject = {
        id: categories.length + 1, // Benzersiz bir ID oluşturulur
        name: newCategory.trim(),
      };
      setCategories([...categories, newCategoryObject]);
      handleCategoryChange(newCategoryObject.id);
      setNewCategory('');
    }
  };

  const handleSubmit = () => {
    console.log('Seçilen kategoriler:', selectedCategories);
    if (selectedCategories.length > 0) {
      router.replace(paths.dashboard.overview);
    } else {
      setOpenSnackbar(true);
    }

    // Kaydetme işlemini burada yapabilirsiniz
  };


  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  return (
    <HomeCheckLayout>
      <div>
        <Typography variant="h3" gutterBottom>
          Gider Kategorilerini Seçin
        </Typography>
        <Grid container display={'flex'} alignItems={'center'} justifyContent={'center'} spacing={2} marginTop={2}>
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleAddCategory();
                }
              }}
              type='string'
              label="Yeni Kategori Ekle"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              fullWidth
              onClick={handleAddCategory}
            >
              Ekle
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={2} marginTop={2}>
          {categories.map((category) => (
            <Grid item xs={12} sm={6} md={12} lg={12} key={category.id}>
              <Card style={{
                padding: 10, border: '1px solid #ccc',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',

              }}
                onClick={() => handleCategoryChange(category.id)} >
                <Checkbox
                  checked={selectedCategories.includes(category.id)}
                  onChange={() => handleCategoryChange(category.id)}
                />
                <Typography onClick={() => handleCategoryChange(category.id)} variant="body1">{category.name}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
          onClick={handleSubmit}
        >
          Kaydet
        </Button>

        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={openSnackbar}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity="warning" sx={{ width: '100%' }}>
            Lütfen kategorileri seçin!
          </Alert>
        </Snackbar>
      </div>
    </HomeCheckLayout>
  );
}
