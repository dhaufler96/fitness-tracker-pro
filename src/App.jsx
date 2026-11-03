import { Routes, Route } from "react-router";
import Layout from "./layout/Layout";
import Register from "./auth/Register";
import Login from "./auth/Login";
import ActivitiesPage from "./activities/ActivitiesPage";
import ActivityDetails from "./activities/ActivityDetails";
import RoutinesPage from "./routines/RoutinesPage";
import RoutineDetails from "./routines/RoutineDetails";
import Error404 from "./Error404";
export default function App() {
  return <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<ActivitiesPage />} />
      <Route path="/activities" element={<ActivitiesPage />} />
      <Route path="/activities/:id" element={<ActivityDetails />} />
      <Route path="/routines" element={<RoutinesPage />} />
      <Route path="/routines/:id" element={<RoutineDetails />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Error404 />} />
    </Route>
  </Routes>;
}
