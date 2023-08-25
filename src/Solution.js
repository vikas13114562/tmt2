import React, { useState } from "react";
import {
  Card,
  CardContent,
  Button,
  Grid,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";

import { products, categories } from "./data";

const priceRangeOptions = [
  { label: "0 - 100", range: [0, 100] },
  { label: "100 - 400", range: [100, 400] },
  { label: "400 - 800", range: [400, 800] },
  { label: "800+", range: [800, Infinity] },
];

const Solution = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("Any");
  const [availableOnly, setAvailableOnly] = useState(false);

  //   for loader
  const [loading, setLoading] = useState(false);

  // Filter products based on category, price range, and availability
  const filterProducts = () => {
    setLoading(true); // Start loader
    setTimeout(() => {
      let filtered = products;

      if (selectedCategory !== "All") {
        filtered = filtered.filter(
          (product) => product.category === selectedCategory
        );
      }

      if (selectedPriceRange !== "Any") {
        const range = priceRangeOptions.find(
          (option) => option.label === selectedPriceRange
        ).range;
        filtered = filtered.filter(
          (product) => product.price >= range[0] && product.price <= range[1]
        );
      }

      if (availableOnly) {
        filtered = filtered.filter((product) => product.available);
      }

      setFilteredProducts(filtered);
      setLoading(false); // Stop loader
    }, 1000); // Simulate loading delay
  };

  // Reset filters
  const resetFilters = () => {
    setSelectedCategory("All");
    setSelectedPriceRange("Any");
    setAvailableOnly(false);
    setFilteredProducts(products);
  };

  return (
    <div style={{ padding: 16 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4">Product Filter</Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          {/* Category filter */}
          <FormControl fullWidth>
            <Select
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
            >
              <MenuItem value="All">All Categories</MenuItem>
              {categories.map((ele, ind) => {
                return (
                  <MenuItem key={ind} value={ele}>
                    {ele}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          {/* Price range filter */}
          <FormControl fullWidth>
            <Select
              value={selectedPriceRange}
              onChange={(event) => setSelectedPriceRange(event.target.value)}
            >
              <MenuItem value="Any">Any Price</MenuItem>
              {priceRangeOptions.map((option) => (
                <MenuItem key={option.label} value={option.label}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          {/* Available only filter */}
          <FormControlLabel
            control={
              <Checkbox
                checked={availableOnly}
                onChange={() => setAvailableOnly(!availableOnly)}
              />
            }
            label="Available Only"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          {/* Filter and Reset buttons */}
          <Button
            variant="contained"
            onClick={filterProducts}
            sx={{ marginRight: 2 }}
          >
            Filter
          </Button>
          <Button variant="outlined" onClick={resetFilters}>
            Reset
          </Button>
        </Grid>
        
      </Grid>
    </div>
  );
};

export default Solution;
