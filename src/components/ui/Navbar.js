import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { startLogout } from "../../actions/auth";

export const Navbar = () => {
  const [isOnline, setIsOnline] = useState(window.navigator.onLine);

  window.addEventListener("offline", () => {
    setIsOnline(false);
  });

  window.addEventListener("online", () => {
    setIsOnline(true);
  });

  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(startLogout());
  };

  return (
    <div className="navbar navbar-dark bg-dark mb-4">
      <span className="navbar-brand">{name}</span>

      {isOnline ? (
        <span className="badge badge-pill badge-success">Online</span>
      ) : (
        <span className="badge badge-pill badge-danger">Offline - peticiones seran guardadas</span>
      )}

      <button className="btn btn-outline-danger" onClick={handleLogout}>
        <i className="fas fa-sign-out-alt"></i>
        <span> Salir</span>
      </button>
    </div>
  );
};
