import React, { useContext, useInsertionEffect, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import Card from "../component/Card.jsx";
import Series from "../component/Series.jsx";
import SecondNavbar from "../component/SecondNavbar.jsx";
import imageCinema from "../../img/Vista home.png";

export const Home = () => {
	const { store, actions } = useContext(Context)
	console.log(store.filmsGenres) 
	useEffect(() => {
		actions.loadFilmsGenres();
	}, [])

	const [selectedGenre, setSelectedGenre ] = useState("action") 

	const handleGenreChange = (genre) => {
        setSelectedGenre(genre);
    };

	return (

		<div>
			<SecondNavbar />
			<div>
				<img className="presentation" src={imageCinema} />
			</div>
			<div className="container-fluid row">
				<h2 className="col-12 title">MOVIES</h2>
				<div><Card /></div>
			</div>
			<div className="container-fluid row">
				<h2 className="col-12 title">SERIES</h2>
				<div><Series /></div>
			</div>

			{/* <div className="btn-group">
				<button type="button" className="erc-vertical-menu-dropdown state-open" data-bs-toggle="dropdown" aria-expanded="false">
					Action
				</button>
				<ul className="dropdown-menu">
					{store.filmsGenres && store.filmsGenres.map((item,index) => {
						return (		
   				 <li key={index}>{item.name}</li>
    				
					);
				} )}
				 </ul>
			</div> */}

<				div className="btn-group">
                <button
                    type="button"
                    className="erc-vertical-menu-dropdown state-open"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    {selectedGenre}
                </button>
                <ul className="dropdown-menu">
                    {store.filmsGenres &&
                        store.filmsGenres.map((item, index) => (
                            <li key={index} onClick={() => handleGenreChange(item.name)}>
                                {item.name}
                            </li>
                        ))}
                </ul>
            </div>
		</div>
	)}
