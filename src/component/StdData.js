import React from 'react'

const StdData = (props) => {
    const {list} = props;
    return (

        <div className="col-md-4">
            <div className="card my-2" style={{ width: "20rem" }}>
                <div className="card-body">
                    <h5 className="card-title">Name : {list.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Email : {list.email}</h6>
                    <p className="card-text">Birthdate : {list.birthdate}</p>
                    <p className="card-text">Standard : {list.std}</p>
                    <p className="card-text">Hobby : {list.hobby}</p>
                    <p className="card-text">Gender : {list.gender}</p>
                </div>
            </div>
        </div>

    )
}

export default StdData