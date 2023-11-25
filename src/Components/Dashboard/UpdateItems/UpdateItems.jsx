import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
// import SectionTitle from '../../../SectionTitle/SectionTitle';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_Api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const UpdateItems = () => {
    const loadedData = useLoaderData()
    console.log(loadedData._id)
    const { register, handleSubmit, reset } = useForm()
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()

    const onSubmit = async (data) => {
        // upload image in the imagebb and then get the url
        // console.log(data.image[0])
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_Api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        
        if (res?.data?.success) {
            // console.log(res.data?.data.display_url)
            // console.log(data)
            const menuItem = {
                name: data.name,
                category: data.category,
                recipe: data.recipe,
                image: res.data?.data.display_url,
                price: parseFloat(data.price)
            }
           
            const menuRes = await axiosSecure.patch(`/updateItems/${loadedData._id}`, menuItem);
            console.log(menuRes.data)
            if (menuRes.data?.modifiedCount>0) {
                reset()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your items has been updated",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    }
    return (
        <div className='my-10'>
            {/* <SectionTitle heading="Update an Item" subheading="What's new?"></SectionTitle> */}
            <div className=' px-20'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Recipe name*</span>
                        </label>
                        <input type="text" defaultValue={loadedData.name} placeholder="Recipe name" {...register("name", { required: true })} className="input input-bordered" />
                    </div>
                    <div className=' grid grid-cols-2 gap-4 mb-3'>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Category*</span>
                            </label>
                            <select defaultValue={loadedData.category} className="input input-bordered" {...register("category")}>
                                <option value="salad<">salad</option>
                                <option value="drinks">drinks</option>
                                <option value="popular">popular</option>
                                <option value="dessert">dessert</option>
                                <option value="pizza">pizza</option>
                                <option value="soup">soup</option>
                                <option value="offered">offered</option>
                            </select>
                        </div>
                        <div className="form-control ">
                            <label className="label">
                                <span className="label-text">Price*</span>
                            </label>
                            <input type="number" defaultValue={loadedData.price} placeholder="Price" {...register("price", { required: true })} className="input input-bordered" />
                        </div>
                    </div>
                    <div className="form-control mb-2">
                        <label className="label">
                            <span className="label-text font-bold">Recipe Details*</span>
                        </label>
                        <textarea type="text" defaultValue={loadedData.recipe} placeholder="Recipe Details" {...register("recipe", { required: true })} className="textarea textarea-bordered h-32" />
                    </div>
                    <input {...register("image", { required: true })} type="file" className="file-input w-full" />
                    <input className=' btn' type="submit" value="Add Item" />
                </form>
            </div>
        </div>
    );
};

export default UpdateItems;