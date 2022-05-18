import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

// Bootstrap imports
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';

function App() {
  // States
  const categories = ['Any', 'Misc', 'Programming', 'Dark', 'Pun', 'Spooky', 'Christmas'];
  const [jokeCategories, setJokeCategories] = useState([]);
  const [searchString, setSearchString] = useState();
  const [currentJoke, setCurrentJoke] = useState(['']);
  const [twoParts, setTwoParts] = useState(false);

  const getSelection = (e) => {
    var updatedCategories = [...jokeCategories];

    if(e.target.checked){
      updatedCategories = [...jokeCategories, e.target.value];
    } else {
      updatedCategories.splice(jokeCategories.indexOf(e.target.value), 1);
    }

    setJokeCategories(updatedCategories);

    setSearchString(jokeCategories.toString());
    // Return search string for button search function
  }

  const getNewJoke = async () => {

    var qString = 'https://v2.jokeapi.dev/joke/' + searchString;

    try{
      const jokeResponse = await axios.get(qString);
      
      setCurrentJoke(jokeResponse.data);

      if(jokeResponse.data.type == "twopart"){
        setCurrentJoke([jokeResponse.data.setup, jokeResponse.data.delivery]);
        setTwoParts(true);
      } else {
        setCurrentJoke([jokeResponse.data.setup]);
        setTwoParts(false);
      }
      
    } catch (err) {
      // Error handling
    } finally {
      //setLoading(false);
    }

  }

  return (
    <Container>
      
      <Row>
        <Col className='d-flex justify-content-center'>
          <h1>Joke App!</h1>
        </Col>
      </Row>

      <Row className='mt-3'>
        <Col className='d-flex justify-content-center'>
          <div>
            <h4 className='text-center'>This is joke!</h4>
            <h4 className='text-center'>Pointe!</h4>
          </div>
        </Col>
      </Row>

      <Row className='mt-3'>
        <Col  className='d-flex justify-content-center'>
          {twoParts && <div><h4 className='text-center'>{currentJoke[0]}</h4><h4 className='text-center'>{currentJoke[1]}</h4></div> }
          {!twoParts && <div><h4 className='text-center'>{currentJoke[0]}</h4></div> }
        </Col>
      </Row>

      <Row className='mt-3'>
        <Col className='d-flex justify-content-center'>
          <Button variant="success" onClick={getNewJoke}>Joke Me!</Button>
        </Col>
      </Row>

      <Row className='mt-3'>
        <Col className='d-flex justify-content-center'>
          <Form.Group>
            {categories.map((item, index) => (
              <Form.Check key={index} value={item} type='checkbox' label={item} onChange={getSelection}></Form.Check>
            ))}
          </Form.Group>
        </Col>
      </Row>

    </Container>
    
  );
}

export default App;
