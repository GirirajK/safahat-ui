import React, { use } from "react";
import demoimg from "../assets/demo.jpg";
import ButtonLoader from "./common/ButtonLoader";
import { toast } from "sonner";
import { apiCall } from "../utilities/apiClient";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const [fileUploading, setFileUploading] = React.useState(false);
  const [processing, setProcessing] = React.useState(false);
  const [clearingFile, setClearingFile] = React.useState(false);
  const [htmlContent, setHtmlContent] = React.useState(null);
  const navigate = useNavigate();
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const email = encodeURIComponent(localStorage.getItem("userEmail") || "");
    if (file) {
      console.log("File uploaded:", file.name);
      setFileUploading(true);
      const formData = new FormData();
      formData.append("files", file);

      const response = await apiCall({
        endpoint: `/file_upload?email=${email}`,
        method: "POST",
        data: formData,
        contentType: "multipart/form-data",
      });

      if (response.success) {
        console.log("Upload success:", response.data);
        toast.success("File uploaded successfully!");
        setFileUploading(false);
        const filePath = response.data.uploaded_file;
        const fileName = filePath.split("/").pop();
        localStorage.setItem("uploadedFileName", fileName);
      } else {
        console.error("Upload failed:", response.message);
        toast.error("File upload failed.");
        setFileUploading(false);
      }
    }
  };
  const handleProcessFile = async () => {
    console.log("Process File clicked");
    setProcessing(true);
    const fileName = encodeURIComponent(
      localStorage.getItem("uploadedFileName") || ""
    );
    const email = encodeURIComponent(localStorage.getItem("userEmail") || "");
    if (fileName) {
      const response = await apiCall({
        endpoint: `/report_process?email=${email}&filename=${fileName}`,
        method: "POST",
      });
      if (response.success) {
        console.log("File processing started:", response.data);
        const decodedHtml = atob(response.data);
        setHtmlContent(decodedHtml);
        toast.success("File processing started!");
        setProcessing(false);
        navigate(`/${fileName}`, {state: { reportHtml: decodedHtml }});
      } else {
        console.error("File processing failed:", response.message);
        toast.error("File processing failed.");
        setProcessing(false);
      }
    }
  };
  const handleClearFile = async () => {
    console.log("Clear File clicked", htmlContent);
    setClearingFile(true);
    const email = encodeURIComponent(localStorage.getItem("userEmail") || "");
    const fileName = encodeURIComponent(
      localStorage.getItem("uploadedFileName") || ""
    );
    if (fileName) {
      const response = await apiCall({
        endpoint: `/file_remove?email=${email}&filename=${fileName}`,
        method: "POST",
      });
      if (response.success) {
        console.log("File cleared:", response.data);
        toast.success("File cleared successfully!");
        setHtmlContent(null);
        setClearingFile(false);
        localStorage.removeItem("uploadedFileName");
      } else {
        console.error("File clearing failed:", response.message);
        toast.error("File clearing failed.");
        setClearingFile(false);
      }
    }
  };
  const fileName = localStorage.getItem("uploadedFileName");
  return (
    <>
      <div className="main-page">
        <div className="processing-container">
          <label htmlFor="file-upload" className="btn btn__primary">
            {fileName ? (
              fileName
            ) : fileUploading ? (
              <ButtonLoader />
            ) : (
              "Upload File"
            )}
          </label>
          <input
            key={fileUploading}
            id="file-upload"
            type="file"
            style={{ display: "none" }}
            accept=".xls,.xlsx,.csv"
            onChange={handleFileUpload}
          />
          <button className="btn btn__green" onClick={handleProcessFile} disabled={htmlContent || !fileName}>
            {processing ? <ButtonLoader loaderColor="var(--color-green)" /> : "Process File"}
          </button>
          <button className="btn btn__red" onClick={handleClearFile} disabled={!fileName && !htmlContent}>
            {clearingFile ? <ButtonLoader loaderColor="var(--color-red)" /> : "Clear File"}
          </button>
          <div className="file-support">
            <svg
              id="info-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="var(--color-primary)"
                strokeWidth="2"
                fill="none"
              />
              <text
                x="12"
                y="16"
                textAnchor="middle"
                fontSize="14"
                fill="var(--color-primary)"
                fontFamily="cursive"
                fontWeight="bold"
              >
                i
              </text>
            </svg>
            <span className="file-support-text">
              Supports .xls, .xlsx and .csv files
            </span>
          </div>
        </div>
        <div className="demo-container">
          <img className="demo__img" alt="demo image" src={demoimg} />
          <div className="demo__desc">
            <p>
              Safhat is a powerful data analytics tool that empowers your team
              to extract valuable insights from your data.
            </p>
            <p dir="rtl">
              صفحات هو أداة تحليل بيانات قوية تمكن فريقك من استخراج رؤى قيمة من
              بياناتك
            </p>
          </div>
        </div>
      </div>
     
    </>
  );
};

export default MainPage;
