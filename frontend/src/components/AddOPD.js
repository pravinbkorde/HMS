import routes from "../routes"
import { useNavigate } from 'react-router-dom'
export default function AddOPD() {
    const navigate = useNavigate();

    const addOPDForm = ()=>{
        console.log("Add OPD butin click")
        navigate("/formaddopd")
    }
  return (
    <>
    <button className="btn btn-sm btn-outline-primary m-1" onClick={addOPDForm} >Add OPD</button>
    <div>
    <table className="table">
  <thead>
    <tr>
      <th scope="col">Sr.No</th>
      <th scope="col">OPD No</th>
      <th scope="col">Name</th>
      <th scope="col">Role</th>
      <th scope="col">Aaction</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
      <td><button className="btn btn-outline-info btn-sm">
                                <i className="bi bi-eye"></i> View
                            </button>
                            <button className="btn btn-outline-warning btn-sm mx-2">
                                <i className="bi bi-pencil"></i> Edit
                            </button>
                            <button className="btn btn-outline-danger btn-sm">
                                <i className="bi bi-trash"></i> Delete
                            </button></td>
    </tr>
  </tbody>
</table>
    </div>
    </>
  )
}
