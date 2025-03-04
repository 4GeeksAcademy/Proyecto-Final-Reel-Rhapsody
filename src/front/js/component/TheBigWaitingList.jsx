import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../../styles/TheBigWaitingList.css";

const TheBigWaitingList = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            await actions.getFavorite();
        };

        fetchData();
    }, []);

    const goToDetails = async (item) => {
        try {
            await actions.saveItemMovie(item);

            const route = item.movie_id ? `/single/${item.movie_id}` : `/viewSerie/${item.serie_id}`;
            navigate(route);
        } catch (error) {
            console.error(error);
        }
    };

    const removeFromFavorites = (itemToRemove) => {
        if (itemToRemove && itemToRemove.id !== undefined && itemToRemove.id !== null) {
            actions.updateFavorites(itemToRemove);
            showRemoveSuccessAlert();
        } else {
            console.error("El objeto 'item' no tiene una propiedad 'id' válida.");
        }
    };

    const showRemoveSuccessAlert = () => {
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Removed from favorites!",
            showConfirmButton: false,
            timer: 1500,
        });
    };

    return (
        <div>
            {store.currentUser && (
                <div>
                    <h2 className="title">Pending Popcorn</h2>
                    <div className="d-flex flex-wrap justify-content-center">
                        {store.favorites && store.favorites.length > 0 ? (
                            store.favorites.map((item, index) => (
                                <div key={index} className="card card-fav my-4 mx-4 col random-card" style={{ minWidth: "30rem", maxWidth: "30rem" }}>
                                    <img src={'https://image.tmdb.org/t/p/w500' + item.url_img} className="w-100" alt="..." />
                                    <div className="card-body">
                                        <h4 className="card-title d-inline-block text-truncate" style={{ maxWidth: "370px" }}>
                                            {item.title}
                                        </h4>
                                        <div className="Favorites-butons">
                                            <button className="btn btn-outline-primary mt-3 info-buton" onClick={() => goToDetails(item)}>
                                                Learn More!
                                            </button>
                                            <button className="btn btn-outline-primary mt-3 info-buton" onClick={() => removeFromFavorites(item)}>
                                                Watched
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="not-favorites"> You don't have any popcorn pending, do you want to add some? </p>
                        )}
                    </div>
                    <Link to={"/"} className="back-home">
                        <button type="button" className="info-buton">
                            Back Home
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default TheBigWaitingList;

