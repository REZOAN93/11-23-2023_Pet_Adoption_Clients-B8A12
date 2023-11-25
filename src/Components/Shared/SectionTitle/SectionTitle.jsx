
const SectionTitle = ({heading, subheading}) => {
    return (
        <div className="text-center mb-5">
            <p className=" text-center text-lg font-bold text-[#4eecfa]">----{heading}----</p>
            <p className=" mx-auto mt-5 w-5/6 py-2 text-gray-600 border-[#4eecfa] border-b-2 border-t-2">{subheading}</p>
        </div>
    );
};

export default SectionTitle;