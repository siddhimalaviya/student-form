import React, { useEffect, useState, useRef } from "react";
import StdData from "./StdData";
import Swal from "sweetalert2";
import moment from "moment/moment";


const StdFrom = () => {
    const hobbies = ["Learning", "Photography", "Cooking", "Dance", "Drawing", "Handicraft", "Programming", "Painting", "Investment", "Mathematics", "Singing", "Swimming", "Pottery"];

    const [detail, setDetail] = useState({ name: "", email: "", birthdate: "", std: "", hobby:[], gender: "" });
    const [allDetail, setAllDetail] = useState([]);
    const [isEdit, setISEdit] = useState(false);


    const ref = useRef(null);
    const refClose = useRef(null);

    const handleChange = (e) => {
        setDetail({ ...detail, [e.target.name]: e.target.value })
        console.log(detail)
    }

    const handleCheckChange = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;
        // console.log(value,checked);
        if(checked){
           let hobby =([...detail.hobby,value])
           setDetail({ ...detail, hobby: hobby})
            console.log(hobby)
        }else{
            // setDetail(detail.filter((e)=>(e !== value)))
            let remove = (detail.hobby.filter((e)=>(e !== value)))
            setDetail({ ...detail, hobby: remove})
            console.log(remove)

        }
        
    }

    const addData = () => {
        ref.current.click();
        setDetail({ name: "", email: "", birthdate: "", std: "", hobby: [], gender: "" })
        setISEdit(false)

    }

    const saveData = (e) => {
        if (isEdit) {

            console.log("updating the note....");

            let newData = JSON.parse(JSON.stringify(allDetail))
            console.log(newData)
            console.log("exp", detail);

            for (let i = 0; i < newData.length; i++) {
                console.log(detail.index)
                if (i === detail.index) {
                    newData[i].name = detail.name;
                    newData[i].birthdate = detail.birthdate;
                    newData[i].email = detail.email;
                    newData[i].std = detail.std;
                    newData[i].hobby = detail.hobby;
                    newData[i].gender = detail.gender;
                    console.log("index : ", i)
                }
            }
            localStorage.setItem('allDet', JSON.stringify(newData));
            setAllDetail(newData);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Your Detail has been Updated',
                showConfirmButton: false,
                timer: 1500
            })

            console.log(newData)
        } else {
            //Add data
            let newDetail = [...allDetail, detail]
            localStorage.setItem('allDet', JSON.stringify(newDetail));
            setAllDetail(newDetail);
            // setIsAdd(true);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Your Form has been Submitted',
                showConfirmButton: false,
                timer: 1500
            })
            console.log(newDetail)
            // console.log(checkedList)

        }
        refClose.current.click();
        // addNote(note.title, note.description, note.tag);

    }

    const deleteData = (index) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#28B463',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                allDetail.splice(index, 1);
                localStorage.setItem('allDet', JSON.stringify(allDetail));
                setAllDetail(JSON.parse(JSON.stringify(allDetail)));
                Swal.fire(
                    'Deleted!',
                    'Your Data has been deleted.',
                    'success')
            }
        })
    }

    const updateData = (currentData, index) => {
        ref.current.click();
        setDetail({ index, name: currentData.name, email: currentData.email, birthdate: currentData.birthdate, std: currentData.std, hobby: currentData.hobby, gender: currentData.gender })
        setISEdit(true);
        console.log(currentData.hobby)
    }


    const getData = () => {
        const lsData = JSON.parse(localStorage.getItem('allDet'));
        if (lsData != null) {
            setAllDetail(lsData);
            console.log(lsData);
        }
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div className="container my-5">
            <div className="d-flex justify-content-between">

                <h1 className="text-center">Registration Form</h1>
                <button type="button" className="btn " style={{
                    borderRadius: "8px", height: '40px',
                    width: '40px', backgroundColor: "#E59866"
                }} onClick={addData} >
                    <i className="fa-solid fa-plus" style={{ verticalAlign: "middle" }}></i>
                </button>
            </div>
            <hr />
            <div className="d-flex justify-content-center">

                <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
                    Launch demo modal
                </button>


                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content" style={{ backgroundColor: "#F5CBA7" }}>
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">{isEdit ? "Update Data" : "Add Data"}</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="card" style={{ backgroundColor: "#FAE5D3" }}>
                                    <form className="p-4">
                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label"><b> Name :</b> </label>
                                            <input type="text" style={{ backgroundColor: "#FAE5D3" }} className="form-control" id="exampleInputEmail1" value={detail.name} name="name" onChange={handleChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label"><b>Email address : </b> </label>
                                            <input type="email" style={{ backgroundColor: "#FAE5D3" }} className="form-control" id="email" name="email" value={detail.email} onChange={handleChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="birthdate" className="form-label"><b>Birthdate : </b> </label>
                                            <input type="date" style={{ backgroundColor: "#FAE5D3" }} className="form-control" id="birthdate" name="birthdate" value={detail.birthdate} onChange={handleChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="std" className="form-label"><b> Standard : </b></label>
                                            <input type="text" style={{ backgroundColor: "#FAE5D3" }} className="form-control" id="std" name="std" value={detail.std} onChange={handleChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="hobby"><b> Hobby : </b></label> <br />
                                            {hobbies.map((hobby, index) => {
                                                return <div className="form-check form-check-inline" key={index}>
                                                    <input className="form-check-input" type="checkbox" id={ `inlineCheckbox_${index}`} value={hobby} onChange={handleCheckChange} name="hobby"/>
                                                    <label className="form-check-label" htmlFor={`inlineCheckbox_${index}`}>{hobby}</label>
                                                </div>
                                            })}
                                            {/* <div className="form-check form-check-inline" >
                                                <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="Gaming" name="hobby" onChange={(e) => handleCheckChange(e)} />
                                                <label className="form-check-label" htmlFor="inlineCheckbox1">Gaming</label>
                                            </div>
                                            <div className="form-check form-check-inline" >
                                                <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="Learning" name="hobby" onChange={(e) => handleCheckChange(e)} />
                                                <label className="form-check-label" htmlFor="inlineCheckbox1">Learning</label>
                                            </div>
                                            <div className="form-check form-check-inline" >
                                                <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="Photography" name="hobby" onChange={(e) => handleCheckChange(e)} />
                                                <label className="form-check-label" htmlFor="inlineCheckbox1">Photography</label>
                                            </div>
                                            <div className="form-check form-check-inline" >
                                                <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="Dance" name="hobby" onChange={(e) => handleCheckChange(e)} />
                                                <label className="form-check-label" htmlFor="inlineCheckbox1">Dance</label>
                                            </div>
                                            <div className="form-check form-check-inline" >
                                                <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="Cooking" name="hobby" onChange={(e) => handleCheckChange(e)} />
                                                <label className="form-check-label" htmlFor="inlineCheckbox1">Cooking</label>
                                            </div>
                                            <div className="form-check form-check-inline" >
                                                <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="Drawing" name="hobby" onChange={(e) => handleCheckChange(e)} />
                                                <label className="form-check-label" htmlFor="inlineCheckbox1">Drawing</label>
                                            </div> */}

                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="gender" className='form-label'><b>Gender : </b> </label>
                                            <br />
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="gender" id="male" value="Male" onChange={handleChange}/>
                                                    <label className="form-check-label"  htmlFor="male">
                                                        Male
                                                    </label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="gender" id="female" value="Female" onChange={handleChange} />
                                                    <label className="form-check-label"  htmlFor="female">
                                                        Female
                                                    </label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="gender" id="other" value="Other" onChange={handleChange}/>
                                                        <label className="form-check-label" htmlFor="other">
                                                            other
                                                        </label>
                                                </div>                                    
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
                                <button type="submit" className="btn btn-success" onClick={saveData} disabled={detail.name === "" || detail.birthdate === "" || detail.email === "" }>{isEdit ? "Update Data" : "Submit"}</button>

                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <h1 className="text-center">Your Details</h1>
            <br />

            <div className="container-sm" style={{'height': '317px', 'overflowX':'hidden', 'display': 'block'}} >

                     <table className="table table-striped">
                    <thead className="table-dark">
                      <tr>
                        <th scope="col" className="text-center">Index</th>
                        <th scope="col" className="text-center">Name</th>
                        <th scope="col" className="text-center">Email</th>
                        <th scope="col" className="text-center">Birthdate</th>
                        <th scope="col" className="text-center">Hobby</th>
                        <th scope="col" className="text-center">Gender</th>
                        <th scope="col" className="text-center">Edit</th>
                        <th scope="col" className="text-center">Delete</th>
                      </tr>
                    </thead>
                     {allDetail.map((list, index) => {
                     return <tbody key={index}>
                      <tr>
                        <th scope="row" className="bg-success text-white" >{index}</th>
                        <td className="bg-success text-white" >{list.name}</td>
                        <td className="bg-success text-white" >{list.email}</td>
                        <td className="bg-success text-white" >{moment(list.birthdate).format("dddd, MMMM Do YYYY")}</td>
                     
                    <td className="bg-success text-white" >{ list.hobby.join(", ")}</td>
                        <td className="bg-success text-white">{list.gender}</td>
                        <td className="bg-success text-white" style={{textAlign:"center"}} ><button className="btn btn-light" onClick={() => updateData(list, index)}>
                            <i className="fa-solid fa-file-pen mx-2" style={{ cursor: "pointer", color: "green" }} ></i>
                            </button>
                            </td>
                        <td className="bg-success text-white" style={{textAlign:"center"}} ><button className="btn btn-light" onClick={() => deleteData(index)}>

                            <i className="fa-solid fa-trash mx-2" style={{ cursor: "pointer", color: "red" }} ></i>
                        </button>
                            </td>

                      </tr>
                    </tbody>
                    })}
                  </table>
                    
                    {/* // return <StdData key={index}  name={list.name} email={list.email} birthdate={list.birthdate} std={list.std} hobby={list.hobby} gender={list.gender} list={allDetail}/> */}
            </div>
        </div>
    )
}

export default StdFrom