import React from "react";
import logo from "../assets/Falcon_logo.png";

const TopBar = () => {
  const [modalOpen, setModalOpen] = React.useState(false);

  return (
    <div className="topbar">
      <img className="topbar__logo" alt="logo" src={logo} />
      <div className="topbar__title">Safhat صفحات - Data Analytics Tool</div>
      <svg
        className="topbar_icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        onClick={() => setModalOpen(true)}
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4" />
        <path d="M12 8h.01" />
      </svg>
      <dialog
        className={`topbar__modal ${modalOpen ? "topbar__modal--open" : ""}`}
        onClick={() => setModalOpen(false)}
      >
        <div className={`topbar__modal-content ${modalOpen ? "topbar__modal-content--open" : ""}`} onClick={(e) => e.stopPropagation()}>
          <h2>About Safhat صفحات</h2>
          <p>
            Safhat helps teams quickly find insights from data.
            <br />
            <br />
            Upload your Excel or CSV files, get instant analysis, and clean your
            data. <br />
            <br />
            Use it to spot sales trends, improve inventory, personalize
            experiences, streamline patient records, highlight missing values,
            support medical teams, securely report banking transactions, catch
            suspicious activity, and assess financial risks all in one
            user-friendly tool.
          </p>
        </div>
      </dialog>
    </div>
  );
};

export default TopBar;
