import { Link } from 'react-router-dom';

const NotFound = () => (
  <main style={{ padding: "1rem" }}>
    <p>Oh No!</p>
    <p>There's nothing here!</p>
    <p>:(</p>
    <Link to="/home">Click to return home.</Link>
  </main>
)

export default NotFound;