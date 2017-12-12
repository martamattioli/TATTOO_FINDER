import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return(
        <section>
            <h1>Tattoo Finder</h1>
            <h2>Search for...</h2>
            <ul>
                <li>
                    <Link to="/studios">Studios</Link>
                </li>
                <li>Artists</li>
                <li>Styles</li>
            </ul>
        </section>
    );
}

export default Home;