// import React from "react";
import React, { useEffect } from "react";
import { testApi } from "../../api/api";


const Homepage = () => {
    useEffect(() => {
        console.log("Hello!!!!!!!!!!!!!!!!!!!")
        //trigger testAPI
        testApi().then((res) => {
            console.log(res)     //result should be : test API is working
        })

    })


    return (
        <div>
            Homiepage



        </div>
    )
}
export default Homepage



// import React from 'react'

// const AdminDashboard = () => {
//     return (
//         <>

//             <div className='container mt-3'>
//                 <div className='d-flex justify-content-between'>
//                     <h3>Admin Dashboard</h3>
//                     <button className='btn btn-danger'>Add Product</button>


//                 </div>



//             </div>

//             <table className='table'>
//                 <thead className='table-dark'>
//                     <tr>
//                         <th>Product Image</th>
//                         <th>Product Name</th>
//                         <th>Product Price</th>
//                         <th>Catogory</th>
//                         <th>Description</th>
//                         <th>Actions</th>
//                     </tr>

//                 </thead>
//                 <tbody>
//                     <tr>
//                         <td>
//                             <img src="https://th.bing.com/th/id/OIP.JMaeZvEHET0JtH-GBcIWzgAAAA?w=191&h=191&c=7&r=0&o=5&dpr=1.5&pid=1.7" alt="" />
//                         </td>Flower   <td>
//                             <td>200</td>
//                             <td>Indoor</td>
//                             <td>Beautiful Flower</td>

//                         </td>

//                         <td>
//                             <button className='btn btn-danger'>Edit</button>
//                             <button className='btn btn-danger'>Delete</button>
//                         </td>
//                     </tr>
//                 </tbody>



//             </table>



//         </>
//     )
// }

// export default AdminDashboard
