import React from 'react';
import { useContext } from 'react';
import ContextStore from "../../ContexStore";

const Modal = () => {
  const context = useContext(ContextStore);
  return (
    <div className="modal display-block">
      <section className="modal-main col-10 col-sm-5 col-xl-3 col-lg-4 rounded">
        <p className="col text-center mt-3">Location does not exists, please type correct location name</p>
        <div className="col text-center">
          <button className="btn btn-primary my-2" onClick={context.hideModal}>Close</button></div>
      </section>
    </div>
  );
};
export default Modal;