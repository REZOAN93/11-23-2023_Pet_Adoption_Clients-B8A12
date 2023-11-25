// import React from 'react';
// import ReactDOM from 'react-dom';
// import Modal from 'react-modal';

// const customStyles = {
//     content: {
//         top: '50%',
//         left: '50%',
//         right: 'auto',
//         bottom: 'auto',
//         marginRight: '-50%',
//         transform: 'translate(-50%, -50%)',
//     },
// };

// Modal.setAppElement('#root');

// const BorrowModal = () => {
//     const [modalIsOpen, setIsOpen] = React.useState(false);

//     function openModal() {
//         setIsOpen(true);
//     }

//     function closeModal() {
//         setIsOpen(false);
//     }

//     return (
//         <div>
//             <button onClick={openModal}>Open Modal</button>
//             <Modal
//                 isOpen={modalIsOpen}
//                 // onAfterOpen={afterOpenModal}
//                 onRequestClose={closeModal}
//                 style={customStyles}
//                 contentLabel="Example Modal"
//             >
//                 {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
//                 <button onClick={closeModal}>close</button>
//                 <div>
//                     <h3 className="font-bold text-center text-xl">Request for Borrow</h3>
//                     {/* <p className="py-4">Press ESC key or click the button below to close</p> */}
//                     <div className="modal-action">
//                         <form>
//                             <div className=' grid grid-cols-2 gap-2 pb-3'>
//                                 <div>
//                                     <label htmlFor="">Return Date</label>
//                                     <input className="input input-bordered bg-[#DCE8FF] w-full" type="date" name="returnDate" id="" required />
//                                 </div>
//                                 <div>
//                                     <label htmlFor="">Name</label>
//                                     <input name='name' className="input input-bordered w-full   bg-[#DCE8FF]"  required />
//                                 </div>
//                             </div>
//                             <div className="form-control mb-5">
//                                 <label className="label">
//                                     <span className="label-text">Email</span>
//                                 </label>
//                                 <input type="email" placeholder="email" name='email' className="input bg-[#DCE8FF] input-bordered" required />
//                             </div>
//                             {/* register your input into the hook by invoking the "register" function */}

//                             {/* include validation with required or other standard HTML validation rules */}
//                             {/* <input className="input input-bordered bg-[#DCE8FF]" {...register("exampleRequired", { required: true })} /> */}
//                             {/* errors will return when field validation fails  */}
//                             {/* {errors.exampleRequired && <span>This field is required</span>} */}

//                             <div className=' flex justify-center'>
//                                 {/* <input className='btn bg-emerald-300 hover:bg-emerald-500 w-full' type="submit" /> */}
//                                 <button className='btn bg-emerald-300 hover:bg-emerald-500 w-full'>Submit</button>
//                             </div>
//                             {/* <button>Submit</button> */}
//                         </form>
//                     </div>
//                 </div>
//             </Modal>
//         </div>
//     );
// };

// export default BorrowModal;