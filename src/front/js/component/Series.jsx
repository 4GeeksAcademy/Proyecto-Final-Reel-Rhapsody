import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/card.css";

const Series = () => {
    const { store, actions } = useContext(Context)
    useEffect(() => {
        actions.loadSomeSerie()
    }, [])
    console.log(store.series)
    return (
        <>
             {store.series == null && <span className="text-white">Cargando series...</span>}
            {store.series == false && <span className="text-white">Ocurrió un error al cargar las series</span>}
            <div className="py-2 overflow-auto">
				<div className="d-flex flex-row flex-nowrap">
            {store.series && store.series.length > 0 && store.series.map((item => <div key={item.id} className="card mx-1" style={{minWidth: "18rem"}}>
                    <img src={'https://image.tmdb.org/t/p/w500' + item.backdrop_path} className="pic" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{item.original_name}</h5>
                        <p className="card-text">Release Date: {item.first_air_date}</p>
                        <p className="card-text">vote: {item.vote_average}</p>                       
                    </div>
                </div>
            ))}
               </div>
               </div>      
        </>
    );
};

export default Series