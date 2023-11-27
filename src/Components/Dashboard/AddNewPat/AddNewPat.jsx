import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Select from 'react-select'
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_Api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`


const AddNewPat = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const dateString = new Date();
    const year = dateString.getFullYear();
    const month = String(dateString.getMonth() + 1).padStart(2, "0");
    const day = String(dateString.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;


    const onSubmit = async (data) => {
        // upload image in the imagebb and then get the url
        // console.log(data.image[0])
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_Api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        console.log(res.data)
        if (res?.data?.success) {
            const image = res.data?.data.display_url;
            const pet_name = data.pet_name;
            const pet_age = data.pet_age;
            const pet_category = data.pet_category;
            const pet_location = data.pet_location;
            const short_description = data.short_description;
            const long_description = data.long_description;
            const adoption_status = 'Not Adopted';
            const max_donation_amount = 0;
            const donated_amount = 0;
            const date_added = formattedDate;
            const petAdderby = user.email;
            const petData = { image, pet_name, petAdderby, pet_age, pet_category, pet_location, short_description, long_description, adoption_status, max_donation_amount, donated_amount, date_added }
            // console.log(petData)

            axiosSecure.post('/addpetbyuser', petData)
                .then(res => {
                    if (res?.data?.acknowledged === true) {
                        navigate('/')
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Added pet Successfully",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                })

        }
    }


    return (
        <div className="text-black px-10 py-5">
            <form onSubmit={handleSubmit(onSubmit)} className=' px-2 py-3'>
                <p className=' text-center text-black text-2xl lg:text-3xl font-bold'>Add New Pet</p>
                <div className=' flex gap-10'>
                    <div className="form-control  w-full">
                        <label className="label">
                            <span className="label-text font-bold text-black">Pet Name</span>
                        </label>
                        <input type="text" placeholder="Enter the Pet Name" {...register("pet_name", { required: true })} className="input input-bordered" />
                        {errors.pet_name && <span className='text-red-700 font-bold'>Please Enter the Pet Name</span>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-bold text-black">Pet Age</span>
                        </label>
                        <input type="number" placeholder="Enter the Pet Age" {...register("pet_age", { required: true })} className="input input-bordered" />
                        {errors.pet_age && <span className='text-red-700 font-bold'>Please Enter the Pet Age</span>}
                    </div>
                </div>
                <div className=' flex gap-10 mt-3'>
                    <div className="form-control  w-full">
                        <label className="label">
                            <span className="label-text font-bold text-black">Pet Location</span>
                        </label>
                        <input type="text" placeholder="Enter the Pet Location" {...register("pet_location", { required: true })} className="input input-bordered" />
                        {errors.pet_location && <span className='text-red-700 font-bold'>Please Enter the pet_location</span>}
                    </div>

                </div>
                <div className=' flex gap-5 mt-3'>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-bold ">Short Description</span>
                        </label>
                        <input type="text" placeholder="Enter Short Description" {...register("short_description", { required: true })} className="input input-bordered" />
                        {errors.short_description && <span className='text-red-700 font-bold'>Please Enter the Short Description</span>}
                    </div>
                </div>
                <div className="form-control mt-3">
                    <label className="label">
                        <span className="label-text font-bold">Select the Pet Category</span>
                    </label>
                    {/* <Select {...register("pet_category")} options={options} /> */}

                    <select className="input input-bordered" {...register("pet_category")}>
                        <option value="" disabled selected>Select Category</option>
                        <option value="Cats">Adorable Cats</option>
                        <option value="Dogs">Playful Dogs</option>
                        <option value="Rabbits">Cheerful Rabbits</option>
                        <option value="Aquatic">Aquatic Friends</option>
                        <option value="Reptile">Reptile Companions</option>
                        <option value="Rodents">Cheerful Rodents</option>
                    </select>
                </div>

                <div className="form-control w-full mt-3">
                    <label className="label">
                        <span className="label-text font-bold ">Long Description</span>
                    </label>
                    <textarea {...register("long_description", { required: true })} className="textarea textarea-bordered" placeholder="Enter Long Description"></textarea>
                    {/* <input type="text" placeholder=""  className="input input-bordered" /> */}
                    {errors.long_description && <span className='text-red-700 font-bold'>Please Enter the Long Description</span>}
                </div>
                <div className="form-control mt-5">
                    <label className="label">
                        <span className="label-text font-bold">Upload the Pet Image </span>
                    </label>
                    <input {...register("image", { required: true })} type="file" className="file-input w-full" />
                    {errors.image && <span className='text-red-700 font-bold'>Please Upload the Image</span>}
                </div>
                <div className="form-control mt-2">
                    <input className="text-white py-2 rounded-lg text-2xl hover:bg-black cursor-pointer font-bold bg-gray-700" type="submit" value="Add New Pet" />
                    {error ? (<><p className=" text-red-600 text-sm text-center mt-2">{error}</p></>) : ("")}
                </div>
            </form>

        </div>

    );
};

export default AddNewPat;



// import { useFormik } from 'formik';
// const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
// const image_hosting_Api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

// const AddNewPat = () => {

//     const formik = useFormik({
//         initialValues: {
//             image: '',
//             lastName: '',
//             email: '',
//         },
//         onSubmit: async (values) => {
//             // alert(JSON.stringify(values, null, 2));
//             // console.log(JSON.stringify(values, null, 2))
//             const imageFile = { image: data.image[0] }
//             const res = await axiosPublic.post(image_hosting_Api, imageFile, {
//                 headers: {
//                     'content-type': 'multipart/form-data'
//                 }
//             })


//             console.log(values)
//         },
//     });
//     return (
//         <div>
//             <div className="card w-full bg-base-100">

//                 <form className="card-body" onSubmit={formik.handleSubmit}>
//                     <div className="form-control">
//                         <label className="label">
//                             <span className="label-text font-bold">Upload the Pet Image</span>
//                         </label>
//                         <input id="image" name="image" type="file" onChange={formik.handleChange} value={formik.values.image} className="file-input w-full" required />
//                     </div>
//                     <div className="form-control">
//                         <label className="label">
//                             <span className="label-text">Email</span>
//                         </label>
//                         <input id="lastName" name="lastName" type="text" onChange={formik.handleChange} value={formik.values.lastName} placeholder="email" className="input input-bordered" required />

//                     </div>
//                     <div className="form-control">
//                         <label className="label">
//                             <span className="label-text">Email</span>
//                         </label>
//                         <input id="email" name="email" type="email" onChange={formik.handleChange} value={formik.values.email} placeholder="email" className="input input-bordered" required />
//                     </div>

//                     <div className="form-control mt-6">
//                         <button type="submit" className="btn btn-primary">Submit</button>
//                     </div>
//                 </form>

//             </div>

//         </div>
//     );
// };

// export default AddNewPat;
