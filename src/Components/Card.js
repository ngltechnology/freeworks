import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const list = ['a', 'b', 'c']
const CardApp = () => {
  const Cards = list.map((item, index) => (
    <li className="item" key={index}>
      <Card className="Card">
        <CardActionArea>
          <CardMedia 
            className="CardImage"
            image="../Images/cafe.jpg"
            title="cafe image"
            style={{ height: 140 }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h3">
              title here : {item} {index}
            </Typography>
            <Typography component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
    </li>
  ));
  return (
    <ul className="horizontal-list">{Cards}</ul>
  )
}

export default CardApp;