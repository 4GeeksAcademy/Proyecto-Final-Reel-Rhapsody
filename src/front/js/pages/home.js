import React,{useContext} from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import  Card  from "../component/Card.jsx";
import  Series  from "../component/Series.jsx";
import SecondNavbar from "../component/SecondNavbar.jsx";
import imageCinema from "../../img/Vista home.png";

export const Home = () => {
	const { store, actions } = useContext(Context)
	console.log(store)
	return(
	
	<div>
		<SecondNavbar/>
		<div>
			<img className="presentation" src={imageCinema}/>
		</div>
		<div className="container-fluid row">
			<h2 className="col-12 title">MOVIES</h2>
			<div><Card/></div>			
		</div>
		<div className="container-fluid row">
			<h2 className="col-12 title">SERIES</h2>
			<div><Series/></div>
		</div>
		{store.filmsGenres && store.filmsGenres.map((item) => {
			return (
			<div className="container-fluid row">
				<h2 className="col-12 title">{item.name} MOVIES</h2>
			</div>
			)
		} )}
		
	</div>
	);
};
