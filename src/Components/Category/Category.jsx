import { Link, useNavigate } from "react-router-dom";
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';

const Category = ({ categories }) => {
    const { categoryName, image, buttonLabel } = categories;
    const navigate = useNavigate()
    return (
        <div className="card card-compact shadow-xl rounded-lg">
            <figure className=" h-64 w-full"><img className=" h-full w-full" src={image} alt="Shoes" /></figure>
            <div className="py-2 px-2">
                <h2 className="text-black font-bold">{categoryName}</h2>
                {/* <p className=" text-black"></p> */}
            </div>
            {/* <AwesomeButton type="primary">Button</AwesomeButton>; */}
            <button className=" p-2 bg-gradient-to-t hover:bg-[#adf6fc] from-[#6fe8f3] rounded-b-lg hover:font-semibold text-left ">{buttonLabel}</button>
        </div>
    );
};

export default Category;