import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import SecondNavbar from "../component/SecondNavbar.jsx";
import "../../styles/TheBigWaitingList.css"

const TheBigWaitingList = () => {

    const { store, actions } = useContext(Context);

    const removeFromFavorites = (itemToRemove) => {
        if (itemToRemove && itemToRemove.id !== undefined && itemToRemove.id !== null) {
            actions.updateFavorites(itemToRemove); // Pasar el objeto directamente
        } else {
            console.error("El objeto 'item' no tiene una propiedad 'id' válida.");
        }
    };

    return (
        <>
            <SecondNavbar />

            <h2 className="title">Pending Popcorn</h2>
            <div className="row d-flex flex-wrap justify-content-center">
                {store.favorites && store.favorites.length > 0 && store.favorites
                    // .filter(item => item && item.id !== undefined && item.id !== null)
                    .map((item, index) => {
                        const idx = store.films.findIndex((elm) => elm.id === item.movie_id)
                        return (
                            <div key={index} className="card my-4 mx-4 col" style={{ minWidth: "30rem", maxWidth: "30rem" }}>
                                <img src={'https://image.tmdb.org/t/p/w500' + (item.movie_id ? store.films[idx]?.backdrop_path : store.series[idx]?.backdrop_path)} className="w-100" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{item.movie_id ? store.films[idx]?.original_title : store.series[idx]?.original_title}</h5>
                                    <p className="card-text">Release Date: {item.movie_id ? store.films[idx]?.release_date : store.series[idx]?.release_date}</p>
                                    <p className="card-text">vote: {item.movie_id ? store.films[idx]?.vote_average : store.series[idx]?.vote_average}</p>
                                    <div className="Favorites-butons">
                                        <button className="btn btn-outline-primary mt-3">
                                            More!
                                        </button>
                                        <button className="btn btn-primary" onClick={() => removeFromFavorites(item)}>Watched</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            <Link to={"/home"}>

                <button type="button" className="btn btn-primary">Back</button>

            </Link>
        </>
    );
};

export default TheBigWaitingList;