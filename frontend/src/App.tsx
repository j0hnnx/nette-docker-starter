import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './pages/Home';
import Todo from './pages/Todo';
import SideBar from "./components/SideBar";

export default function App() {
    return(
        <BrowserRouter>
            <div className="d-flex">
                <SideBar/>
                <main className="flex-grow-1 p-4">
                    <Routes>
                        <Route path="/" element={<Home />}/>
                        <Route path="/todo" element={<Todo />}/>
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    )
}