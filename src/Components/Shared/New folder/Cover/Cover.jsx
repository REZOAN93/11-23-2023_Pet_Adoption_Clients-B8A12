import { Parallax } from 'react-parallax';


const Cover = ({ bgImg, menuTitle, menuDescription }) => {
    return (
        <div>
            <Parallax
                blur={{ min: -15, max: 15 }}
                bgImage={bgImg}
                bgImageAlt="the dog"
                strength={-200}
            >
                <div className="hero h-[600px] mb-10">
                    <div className=""></div>
                    <div className="hero-content text-center text-neutral-content">
                        <div style={{ background: 'rgba(21, 21, 21, 0.60)' }} className="w-full px-96 py-20">
                            <h1 className="mb-5 text-5xl font-bold">{menuTitle}</h1>
                            <p className="mb-5">{menuDescription}</p>
                        </div>
                    </div>
                </div>
            </Parallax>
        </div>


    );
};

export default Cover;