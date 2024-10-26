import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../redux/store";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Home from "../pages/Home";

const Routers = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ToastContainer />
                <Router>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <div className="w-full">
                                    <Home />
                                </div>
                            }
                        />

                        {/* <Route
                            path="/customer/menu"
                            element={
                                <ProtectingRoute>
                                    <Menu />
                                    <BotNavBar />
                                </ProtectingRoute>
                            }
                        />

                        <Route
                            path="restaurant/:id/dashboard"
                            element={
                                <ProtectingStaffRoute>
                                    <Layout
                                        style={{
                                            minHeight: '100vh',
                                        }}
                                    >
                                        <SideNavbar />
                                        <Dashboard />
                                    </Layout>
                                </ProtectingStaffRoute>
                            }
                        /> */}
                    </Routes>
                </Router>
            </PersistGate>
        </Provider>
    )
}

export default Routers;