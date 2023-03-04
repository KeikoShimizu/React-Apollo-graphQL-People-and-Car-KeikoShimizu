import './App.css';
import { ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import 'antd/dist/reset.css';
import { Routes, Route} from 'react-router-dom';

import Container from './components/layout/Container';
import EditCar from './components/form/EditCar';
import Detail from './components/layout/Detail';
import EditPerson from './components/form/EditPerson';

const client = new ApolloClient({
  uri: 'http://localhost:4001/graphql',
  cache: new InMemoryCache()
})

function App() {
  return (
    <> 
      <ApolloProvider client={client}>
        <div className="App">
          <Routes>
            <Route exact path="/" element={<Container />} />
            <Route exact path="/edit" element={<EditCar />} />
            <Route exact path="/editpeople" element={<EditPerson/>} />
            <Route exact path="/detail" element={<Detail />} />
          </Routes>
        </div>
      </ApolloProvider >
    </> 
  );
}

export default App;
