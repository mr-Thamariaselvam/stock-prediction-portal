import React from "react";

function Footer() {
  return (
    <>
      <footer className="footer py-3 my-3">
        <hr className="border-bottom" />
        <p className="text-light text-center">
          &copy; {new Date().getFullYear()} Built with ❤️ by TS
        </p>
      </footer>
    </>
  );
}

export default Footer;
