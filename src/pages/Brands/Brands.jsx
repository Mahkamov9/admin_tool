import React, { useState, useEffect } from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton, TextField, Pagination} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

export default function Brands() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    // Ma'lumotlarni API orqali olish
    fetchData();
  }, [page]);

  const fetchData = async () => {
    try {
      const response = await fetch("https://autoapi.dezinfeksiyatashkent.uz/api/brands");
      const result = await response.json();
      setData(result.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleEdit = (id) => {
    console.log('Edit clicked:', id);
    // Edit funksiyasini implement qiling
  };

  const handleDelete = (id) => {
    console.log('Delete clicked:', id);
    // Delete funksiyasini implement qiling
  };

  const handleAddBrand = () => {
    console.log('Add brand clicked');
    // Add Brand funksiyasini implement qiling
  };

  return (
    <div style={{ padding: '20px' }}>
      <TextField
        variant="outlined"
        placeholder="Search..."
        style={{ marginBottom: '10px' }}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Brand</strong></TableCell>
              <TableCell><strong>Action</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.brand}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEdit(item.id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDelete(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleAddBrand}
        style={{ marginTop: '10px' }}
      >
        Add brand
      </Button>
      <Pagination
        count={10} // O'tgan sonni API-dan olish mumkin
        page={page}
        onChange={(e, value) => setPage(value)}
        style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
      />
    </div>
  );
}
