import React from "react";
import { useLocation, useParams } from "react-router-dom";

const ReportPage = () => {
  const location = useLocation();
  const { fileName } = useParams();

  React.useEffect(() => {
    const handleLinkClick = (event) => {
      const target = event.target.closest("a");
      if (target && target.getAttribute("href")?.startsWith("#")) {
        event.preventDefault();
        const id = target.getAttribute("href").substring(1);
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    };

    const reportContainer = document.querySelector(".processed-report");
    reportContainer?.addEventListener("click", handleLinkClick);

    return () => {
      reportContainer?.removeEventListener("click", handleLinkClick);
    };
  }, []);
  React.useEffect(() => {
  const html = location.state?.reportHtml;
  if (!html) return;

  const container = document.createElement('div');
  container.innerHTML = html;
  const scripts = container.querySelectorAll('script');
  scripts.forEach((oldScript) => {
    const newScript = document.createElement('script');
    newScript.textContent = oldScript.textContent;
    document.body.appendChild(newScript);
  });
}, [location.state?.reportHtml]);

  return (
    <>
      {location.state?.reportHtml && (
        <div
          className="processed-report"
          dangerouslySetInnerHTML={{ __html: location.state.reportHtml }}
        />
      )}
    </>
  );
};

export default ReportPage;
