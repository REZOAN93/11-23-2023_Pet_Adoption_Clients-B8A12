import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Banner from "../Banner/Banner";
import Header from "../Header/Header";
import Category from "../../Category/Category";
import SectionTitle from "../SectionTitle/SectionTitle";
import CallToAction from "../CallToAction/CallToAction";

const Home = () => {
    const axiosPublic = useAxiosPublic();
    const [category, setCategories] = useState([])

    useEffect(() => {
        axiosPublic.get('/Category')
            .then(res => setCategories(res.data))
    }, [axiosPublic])


    return (
        <div>
            <Header></Header>
            <Banner></Banner>
            <div className="max-w-6xl mt-10 mx-auto">
                <SectionTitle heading="Explore Our Pet Categories" subheading="Discover joy in our pet categories—explore dogs' playful energy, cats' graceful charm, or the allure of exotic pets. Each category is a chapter in the heartwarming story of adoption. Find your perfect companion and celebrate moments filled with unconditional love."></SectionTitle>
                <div className=" grid grid-cols-1 mx-16 lg:mx-0 lg:grid-cols-3 mb-10  gap-5 ">
                    {category.map(na => <Category key={na._id} categories={na}></Category>)}
                </div>
            </div>
            <div className="my-10">
                <CallToAction></CallToAction>
            </div>
            {/* <div className=" my-16">
                <About></About>
            </div>
            <MoreAbout></MoreAbout>
            <div className=" pt-10">
                <UpcommingEvents></UpcommingEvents>
            </div>
            <PeopleComments></PeopleComments> */}
        </div>
    );
};

export default Home;