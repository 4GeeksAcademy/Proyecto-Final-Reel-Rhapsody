import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/card.css";

const Card = () => {
    const { store, actions } = useContext(Context)
    useEffect(() => {
        const getData = async () => {
            await actions.loadSomeFilm()
        }
        getData()

    }, [])
    console.log(store.films)
    return (
        <>
            {store.films == null && <span className="text-white"> Cargando películas...</span>}
            {store.films == false && <span className="text-white"> Ocurrió un error al cargar las películas</span>}
            <div className="py-2 overflow-auto">
				<div className="d-flex flex-row flex-nowrap">
            {store.films && store.films.length > 0 && store.films.map((item => <div key={item.id} className="card mx-1" style={{minWidth: "18rem"}}>
                    <img src={'https://image.tmdb.org/t/p/w500' + item.backdrop_path} className="pic" alt="..." />
                    <div className="card-body">

                        <h5 className="card-title">{item.original_title}</h5>
                        <p className="card-text">Release Date: {item.release_date}</p>
                        <p className="card-text">vote: {item.vote_average}</p>                       
                    </div>
                </div>
            ))} 
             </div>
             </div>       
        </>
    );
};

export default Card