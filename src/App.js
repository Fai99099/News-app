import React, { useState, useEffect, useMemo } from 'react';
import axios from "axios";
import { styled, alpha} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

function App() {

  const articles = [
    {"source":{"id":"business-insider","name":"Business Insider"},"author":"Graham Rapier,Tim Levin,Grace Dean,Jyoti Mann,Pete Syme","title":"Tesla models, prices, charging, stock: A complete guide to the electric car maker","description":"A complete Tesla guide, from working at the EV maker to TSLA stock history, current and future cars, charging, features, and owner pros and cons.","url":"https://www.businessinsider.com/tesla","urlToImage":"https://www.businessinsider.com/public/assets/BI/US/og-image-logo-social.png","publishedAt":"2023-07-25T07:28:01Z","content":"<ul>\n<li>Tesla has introduced innovative features and products, from its lineup of models to Autopilot.</li>\n<li>Tesla also faces competition from other electric vehicle startups.</li>\n<li>The compan… [+11926 chars]"}
  ]//to delete when i use the api key work(useEffect)
  const [data, setData] = useState([])
  const [searchTitle, setSearchTitle] = useState("")
  
  // useEffect(() => {
  //   axios.get("https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=e40657c323624d8d98c3080da1cf686f")
  //     .then((response) => {
  //       setData(response.data.articles)

  //     })
  // })

  const search = (e) => {
    setSearchTitle(e.target.value)
  }


  const memoizedNews = useMemo(()=>{
let news = [...articles]//(data) nested to articales
if (searchTitle){
news = news.filter(el => el.title.toLowerCase().includes(searchTitle.toLowerCase()) || el.description.toLowerCase().includes(searchTitle.toLowerCase()))
}
return news
  }, [searchTitle])// add data as depncess in the frist


  return (
    <>

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onChange={search}
              />
              {/* {
       
       data.filter((value)=>{
        if(searchTitle===""){
          return value
        }
        else if(value.title.includes(searchTitle)){
          return value
        }
       })} */}
            </Search>
          </Toolbar>
        </AppBar>
      </Box>

      {

memoizedNews?.map((value) => {
          return (
            <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '100vh' }}
          >
            <Card sx={{ maxWidth: 345 }} alignItems="center" >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="200"
                  image={value.urlToImage}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {value.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {value.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary" href={value.url}>
                  see more
                </Button>
              </CardActions>
            </Card>
        </Grid>
          )
        }
        )

        //    <nav class="navbar bg-body-tertiary">
        //   <div class="container-fluid">
        //     <form class="d-flex" role="search">
        //       <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setSearchTitle(e.target.value)}/>
        //       {
        //        eslint-disable-next-line array-callback-return
        //        data.filter((value)=>{
        //         if(searchTitle===""){
        //           return value
        //         }
        //         else if(value.title.includes(searchTitle)){
        //           return value
        //         }
        //        })}
        //     </form>
        //   </div>
        // </nav>
        // <div className="container my-5">
        // <div className="row text-center" >
        // {
        //   data.map((value)=>{
        //     return(
        //       <div className="col-sm-3" >
        // <div class="card h-100" style={{width: "18rem"}}>
        //   <img src={value.urlToImage} class="card-img-top" alt="..."/>
        //   <div class="card-body">
        //     <h5 class="card-title">{value.title}</h5>
        //     <p class="card-text">{value.description}</p>
        //     <a href={value.url} class="btn btn-primary">Go News</a>
        //   </div>
        // </div>
        //   </div> 
        //     )
        //   })
        // }
        // </div>
        // </div>
      }
    </>
  );

}

export default App;
