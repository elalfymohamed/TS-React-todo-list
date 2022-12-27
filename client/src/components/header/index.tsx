import * as React from "react";

import Image from "next/image";

import Cookies from "js-cookie";

import { FiLogOut } from "react-icons/fi";
import { FaRunning } from "react-icons/fa";
import { RxClock } from "react-icons/rx";

import { userData } from "../../utility/userData";
import useClockCheck from "../../hooks/useClockCheck";

type UserData = {
  first_name: string;
  last_name: string;
};

//  hooks react
const { useEffect, useState, useRef } = React;

export const Header = () => {
  const [user, setUser] = useState<UserData>();
  const [isLogOut, setIsLogOut] = useState<boolean>(false);

  const logOutRef = useRef(null) as React.RefObject<HTMLButtonElement>;

  const isClock = useClockCheck();

  const handelLogOut = () => {
    Cookies.remove("authorization");
    window.location.href = "/";
  };

  useEffect(() => {
    const user = userData();
    setUser(user);
  }, []);

  useEffect(() => {
    if (logOutRef.current === null) return;
    logOutRef.current.addEventListener("mouseout", () => setIsLogOut(false));
    logOutRef.current.addEventListener("mousemove", () => setIsLogOut(true));
    logOutRef.current.addEventListener("touchstart", () => setIsLogOut(true));
  }, []);

  return (
    <header className="App-header">
      <div className="header-nav">
        <div className="nav-container">
          <div className="header-logo">
            <Image
              src="/tasks_icon-home.svg"
              alt="task logo"
              quality={90}
              width={50}
              height={50}
            />
          </div>

          <div className="header-clock">
            <span>
              <RxClock color="#fff" size={18} />
            </span>
            <p className="clock">{isClock}</p>
          </div>

          <ul className="nav-items">
            <li>
              <div className="nav-user">
                <h6 className="user_name">
                  {user?.first_name} {user?.last_name}
                </h6>
              </div>
            </li>
            <li>
              <button
                type="button"
                className="btn btn-login"
                onClick={handelLogOut}
                title="log out"
                ref={logOutRef}
              >
                {isLogOut ? (
                  <FaRunning size={22} color="#000 " />
                ) : (
                  <FiLogOut size={22} color="#fff " />
                )}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};
