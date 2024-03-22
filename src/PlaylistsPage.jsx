import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import './App.css';

const PlaylistsPage = ({ location }) => {
  const playlists = location.state?.playlists || [];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '60px',
  };

  return (
    <div>
      <div className="outer-rec"> {/* Apply the outer-rec style */}
      <div className="inner-rec"> {/* Apply the inner-rec style */}
      <h2 style={{ marginBottom: '10px', marginTop: '0px', fontSize: '18px'}}>We think you'll love..</h2> {/* Adjust margin bottom */}
      <Slider {...settings}>
        {playlists.map((playlist) => (
          <div key={playlist.id}>
            <div className="playlist-item">
              <a href={playlist.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                <img src={playlist.images[0]?.url} alt={playlist.name} className="playlist-image" />
              </a>
              <p>{playlist.name}</p>
            </div>
          </div>
        ))}
      </Slider>
      <div className="start-over-button" style={{ marginTop: '20px' }}>
        <a href="http://localhost:5173">Start Over</a>
      </div>
    </div>
  </div>
  </div>
  );
};

export default PlaylistsPage;
