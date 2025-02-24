import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import "../../styles/dActor.css"

const DetailActor = () => {
    const { store, actions } = useContext(Context)
    const params = useParams()
    useEffect(() => {
        actions.loadOneActor(params.id)
    }, [])
    console.log(store.OneActor)

    const imagenError = (e) => {
        e.target.src = "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29uYXxlbnwwfHwwfHx8MA%3D%3D"
    }

    return (


        <div className="">
            <div className="">
                <div className="">
                    <div className="contain-detail">
                        <div className="div-img">
                            <img src={'https://image.tmdb.org/t/p/w500' + store.OneActor.profile_path} className="div-pic-act" onError={imagenError} alt="..."></img>
                        </div>
                        <div className="div-cont-act">
                            <h2 className="">{store.OneActor.name}</h2>
                            <div className="">
                                <p className="display-4">Birthday: {store.OneActor.birthday} </p>
                                <p className="display-4">Place of birth: {store.OneActor.place_of_birth} </p>
                                <p className="display-4">Known for: {store.OneActor.known_for_department} </p>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item over">
                        <h2 className="accordion-header" id="panelsStayOpen-headingThree">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                                Biography:
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
                            <div className="accordion-body text1">
                                <p className="">{store.OneActor.biography}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailActor